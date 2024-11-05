const activityLogService = require("../service/activityLogService")

const getActivityLog = async (req, res) => {
    try {
        const { userId } = req.params ?? ""
        const data = await activityLogService.handleGetActivityLog(userId)

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

const addActivityLog = async (req, res) => {
    try {
        const data = await activityLogService.handleAddActivityLog(req.body)

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

const deleteActivityLog = async (req, res) => {
    try {

        const data = await activityLogService.handleDeleteActivityLog();

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
    addActivityLog,
    deleteActivityLog,
    getActivityLog
}