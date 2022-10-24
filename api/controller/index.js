const { text } = require("body-parser");
const modelUser = require("../model/index");

exports.getPaginate = async (req, res) => {
  try {
     
    const listItem = await modelUser.find();
    res.send({ listItem, message: "success" });
  } catch (error) {
    res.send(error);
  }
};

exports.searchPaginate = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const activePage = parseInt(req.query.activePage);
    const textSearch = req.query.textSearch;

    const totalItem = await modelUser.countDocuments({
      name: { $regex: textSearch, $options: "i" },
    });
    const totalPage = await Math.ceil(totalItem / limit);
    const skip = (await (activePage - 1)) * limit;

    const listData = await modelUser
      .find({ name: { $regex: textSearch, $options: "i" } })
      .skip(skip)
      .limit(limit);
    res.send({ listData, totalPage, activePage, textSearch });
  } catch (error) {
    res.send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const _id = req.body.id;
    console.log("id", req.params.id);
    await modelUser.findByIdAndDelete(_id);
    res.send({ message: "SUCC" });
    console.log("vafo day ");
  } catch (error) {
    res.send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.body.id;
    console.log();
    const name = req.body.nameUpdate;
    console.log("name", name);
    await modelUser.findByIdAndUpdate(_id, { name });
    res.send({ message: "SUCC" });
  } catch (error) {
    res.send(error);
  }
};

exports.add = async (req, res) => {
  try {
    const name = req.body.name;
    await modelUser.create({ name });
    res.send({ message: "SUCC" });
  } catch (error) {
    res.send(error);
  }
};
