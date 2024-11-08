const searchHisoryService = require('../service/searchHistoryService')

const getSearchHistory = async (req, res) => {
    try {
        const userId = req.params?.userId ?? ""
        const data = await searchHisoryService.handleGetSearchHistory(userId)

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

const addSearchHistory = async (req, res) => {
    try {
        const data = await searchHisoryService.handleAddSearchHistory(req.body)

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

const deleteSearchHistory = async (req, res) => {
    try {
        const idSearchHistory = req.body?.idSearchHistory ?? ""
        const data = await searchHisoryService.handleDeleteSearchHistory(idSearchHistory)

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
    addSearchHistory,
    getSearchHistory,
    deleteSearchHistory
}