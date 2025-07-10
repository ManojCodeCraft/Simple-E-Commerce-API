const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({});

exports.Product = mongoose.model("Category", categorySchema);
