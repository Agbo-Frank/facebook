const Notification = require('../Model/Notification')

module.exports.sendNotification = async (id, text) => {
    return await Notification.create({
        userId: id,
        text
    })
}