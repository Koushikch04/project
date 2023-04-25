const orderModel = require("../models/orders");
const countsSchema = require("../models/counts");
const pageLimitSize = 10;

exports.ordersSortSearchAndFilters = async (req, res) => {
  try {
    console.log(req.query);
    let allOrders, status;
    let searchInitial;
    if (req.query) searchInitial = req.query.search;
    else searchInitial = "";
    const searchText = searchInitial;
    if (!req.query || !req.query.hasOwnProperty("status")) {
      status = "All";
    } else {
      status = req.query.status;
    }

    const count = await countsSchema.findOne({ countId: "message" });
    // let sorting;
    let givenSorting;
    if (!req.query.hasOwnProperty("sortSelector")) givenSorting = 0;
    else givenSorting = req.query.sortSelector;
    const sorting = givenSorting == 0 ? -1 : 1;

    console.log(sorting, searchText);
    if (sorting == 1) {
      allOrders = await orderModel
        .find()
        .sort({ createdAt: 1 })
        .populate("userId")
        .populate("prodId").lean().exec();
    } else {
      allOrders = await orderModel
        .find()
        .sort({ createdAt: -1 })
        .populate("userId")
        .populate("prodId").lean().exec();
    }
    if (searchText && searchText != "" && searchText.length > 0) {
      allOrders = allOrders.filter((order) => {
        return (
          order.prodId.productDetails.Name == searchText ||
          order.userId.name.firstName == searchText
        );
      });
    }

    if (status != "All") {
      allOrders = allOrders.filter((order) => {
        return order.status == status;
      });
    }

    if (!givenSorting) givenSorting = 0;
    const endingPage = Math.ceil(allOrders.length / pageLimitSize);
    let currentPage;
    if (!req.query || !req.query.pagination) currentPage = 1;
    else currentPage = req.query.pagination;
    const filtersApplied = [status];
    console.log(allOrders);
    res.render("./HTML/Admin/adminOrders.ejs", {
      messageCount: count.countOrders,
      login: true,
      messages: allOrders,
      select: givenSorting,
      searchText: searchText,
      endingPage: endingPage,
      currentPage: currentPage,
      limit: pageLimitSize,
      filtersApplied: filtersApplied,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

exports.deleteProduct = async (req, res) => {
  let deleteIdsArray = [];
  if (Array.isArray(req.query.deleteMessage)) {
    deleteIdsArray = req.query.deleteMessage;
  } else {
    deleteIdsArray.push(req.query.deleteMessage);
  }
  const idArray = deleteIdsArray;
  for (let i = 0; i < idArray.length; i++) {
    await orderModel.findByIdAndRemove(idArray[i]);
  }
  res.redirect("/profile/admin/orders");
};
