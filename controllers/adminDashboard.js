const counts = require('../models/counts');
const orders = require('../models/orders');
const limit = 6;

exports.dashboard = async (req, res) => {
    const count = await counts.findOne({ countId: "message" });
    const order = await orders.find().sort({ createdAt: -1 }).populate('userId').populate('prodId').limit(limit).lean().exec();
    console.log(order);
    console.log(count);
    res.render('./HTML/Admin/adminDashboard.ejs', { login: true, count: count, order: order });
}