const db = require('../models/mysql/index')
const { v4: uuidv4 } = require('uuid');

const handleGetRating = async (movieSlug) => {
    try {
        const response = await db.Ratings.findAll({
            where: { movie_slug: movieSlug },
            include: [{ model: db.Users, as: 'user', attributes: ['username'] }],
            raw: true
        });

        // Kiểm tra nếu có đánh giá
        if (response.length === 0) {
            return {
                EC: 0,
                EM: 'Không có đánh giá nào.',
                DT: {
                    average_rating: 0,
                    count: 0
                }
            };
        }

        // Tính toán giá trị trung bình rating và số lượng rating
        const totalRating = response.reduce((acc, rating) => acc + rating.rating, 0);
        const average_rating = totalRating / response.length;
        const count = response.length;

        // In kết quả
        console.log('>>> rating', response);
        console.log('>>> average rating', average_rating);
        console.log('>>> count', count);

        return {
            EC: 0,
            EM: 'Lấy danh sách đánh giá thành công',
            DT: {
                average_rating: average_rating,
                count: count
            }
        };

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Lỗi không xác định!'
        })
    }
}

const handleAddRating = async (rawData) => {
    try {

        const rating = await db.Ratings.findOne({
            where: { user_id: rawData.user_id }
        })

        console.log(rating)

        if (!rating) {
            const response = await db.Ratings.create({
                id: uuidv4(),
                user_id: rawData.user_id,
                movie_slug: rawData.movie_slug,
                rating: rawData.rating
            })
        } else {
            const response = await db.Ratings.update({
                rating: rawData.rating
            }, { where: { user_id: rawData.user_id } })
        }

        return {
            EC: 0,
            EM: "Đánh giá phim thành công!"
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
    handleAddRating,
    handleGetRating
}