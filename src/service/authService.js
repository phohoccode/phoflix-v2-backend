const db = require('../models/mysql/index')
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password, salt) => {
    return bcrypt.hashSync(password, salt)
}

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

const checkExistEmail = async (emailUser) => {
    try {
        const email = await db.Users.findOne({
            where: { email: emailUser, type_account: 'LOCAL' },
            raw: true
        })

        return email ? true : false
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const insertCodeToDB = async (email, code, type) => {
    try {

        const user = await db.OTPs.findOne({
            where: { email: email, type_otp: type }
        })

        if (!user) {
            const response = await db.OTPs.create({
                email: email,
                code: code,
                type_otp: type
            })

            if (response?.isNewRecord) {
                return {
                    EC: -1,
                    EM: 'Thêm mã xác thực thất bại!'
                }
            } else {
                return {
                    EC: 0,
                    EM: 'Thêm mã xác thực thành công!'
                }
            }
        }

        const rows = await db.OTPs.update(
            { code: code },
            { where: { email: email, type_otp: type } }
        )

        if (rows[0] > 0) {
            return {
                EC: 0,
                EM: 'Cập nhật mã thành công!'
            }
        } else {
            return {
                EC: -1,
                EM: 'Cập nhật mã thất bại!'
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const handleLogin = async (rawData) => {
    try {
        const user = await db.Users.findOne({
            where: {
                email: rawData.email,
                type_account: 'LOCAL'
            },
            raw: true
        })

        if (!user) {
            return {
                EC: -1,
                EM: 'Tài khoản hoặc mật khẩu không chính xác!'
            }
        }

        const isCorrectPassword = checkPassword(rawData.password, user.password)

        if (!isCorrectPassword) {
            return {
                EC: -1,
                EM: 'Mật khẩu không chính xác!'
            }
        }

        if (+user.isLock === 1) {
            return {
                EC: -1,
                EM: 'Tài khoản đã bị khoá!'
            }
        }

        return {
            EC: 0,
            EM: 'Đăng nhập thành công!',
            DT: {
                user: {
                    username: user.username,
                    email: user.email,
                    address: user.address,
                    phone_number: user.phone_number,
                    gender: user.gender,
                    refresh_token: uuidv4(),
                },
                status: {
                    EC: 0,
                    EM: 'Đăng nhập thành công!'
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const handleRegister = async (rawData) => {
    try {

        const email = await checkExistEmail(rawData.email)

        if (email) {
            return {
                EC: -1,
                EM: 'Email đã tồn tại!',
            }
        }

        const user = await db.OTPs.findOne({
            where: { email: rawData.email, type_otp: rawData.type_otp },
            raw: true
        })

        if (!user || user.code !== rawData.code) {
            return {
                EC: -1,
                EM: 'Mã xác nhận không chính xác!',
            }
        }

        const hashPassword = hashUserPassword(rawData.password, salt)

        const response = await db.Users.create({
            username: rawData.username,
            email: rawData.email,
            password: hashPassword,
            gender: "Nam",
            isLock: false,
            phone_number: "",
            address: "",
            type_account: 'LOCAL'
        })

        if (response?.isNewRecord) {
            return {
                EC: 0,
                EM: 'Đăng ký tài khoản thất bại!',
            }
        }

        return {
            EC: 0,
            EM: 'Đăng ký tài khoản thành công!',
        }
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const findOrInsertProfileSocialToDB = async (rawData) => {
    try {
        let user = null

        user = await db.Users.findOne({
            where: { email: rawData.email, type_account: rawData.type },
            raw: true
        })

        if (!user) {
            user = await db.Users.create({
                username: rawData.username,
                email: rawData.email,
                type_account: rawData.type
            })

            user = user.dataValues
        }
        return user
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}


module.exports = {
    handleRegister,
    handleLogin,
    insertCodeToDB,
    findOrInsertProfileSocialToDB
}