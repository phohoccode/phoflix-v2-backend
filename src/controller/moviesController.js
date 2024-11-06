const moviesService = require("../service/moviesService")

const getAllMovies = async (req, res) => {
    try {
        console.log('>>> req.query', req.query)
        const data = await moviesService.handleGetALlMovies(req.query)

        console.log('data', data)
        return res.json({
            EC: data.EC,
            EM: data.EM,
            data: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Lỗi không xác định!'
        })
    }
}

const addMovie = async (req, res) => {
    try {
        console.log('>>>>rawData', req.body)
        const data = await moviesService.handleAddMovie(req.body)

        return res.json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Lỗi không xác định!'
        })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const data = await moviesService.handleDeleteMovie(req.body)

        return res.json({
            EC: data.EC,
            EM: data.EM,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Lỗi không xác định!'
        })
    }
}

const deleteAllMovies = async (req, res) => {
    try {
        const data = await moviesService.handleDeleteAll(req.body)

        return res.json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Lỗi không xác định!'
        })
    }
}



module.exports = {
    deleteAllMovies,
    getAllMovies,
    addMovie,
    deleteMovie
}