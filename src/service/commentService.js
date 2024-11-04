const db = require('../models/mysql/index')
const { v4: uuidv4 } = require('uuid');

const handleGetComments = async (movieSlug) => {
    try {
        const response = await db.Comments.findAll({
            where: { movie_slug: movieSlug },
            include: [{ model: db.Users, as: 'user', attributes: ['username'] }],
            raw: true
        });

        return {
            EC: 0,
            EM: 'Lấy danh sách bình luận thành công',
            DT: response
        }


    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const handleAddComment = async (rawData) => {
    try {
        const response = await db.Comments.create({
            id: uuidv4(),
            user_id: rawData.user_id,
            movie_slug: rawData.movie_slug,
            content: rawData.content
        })

        if (response?.isNewRecord) {
            return {
                EC: -1,
                EM: 'Thêm bình luận thất bại!'
            }
        } else {
            return {
                EC: 0,
                EM: 'Thêm bình luận thành công!'
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

const handleDeleteComment = async (idComment) => {
    try {
        console.log('>>>> idComment', idComment)
        const response = await db.Comments.destroy({
            where: { id: idComment }
        })

        return {
            EC: 0,
            EM: "Xoá bình luận thành công"
        }
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}

const handleUpdateComment = async (rawData) => {
    try {
        console.log('>>> rawData', rawData)
        const response = await db.Comments.update(
            { content: rawData.content },
            { where: { id: rawData.idComment } }
        )

        return {
            EC: 0,
            EM: "Chỉnh sửa bình luận thành công"
        }
    } catch (error) {
        console.log(error)
        return {
            EC: -1,
            EM: 'Lỗi không xác định!'
        }
    }
}


module.exports = {
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
    handleGetComments
}