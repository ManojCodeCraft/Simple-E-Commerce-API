const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const { connectDb } = require("./lib/db/dbConnect");
const api = process.env.API_URL;

const userRoute = require("./routes/user.routes");
const categoryRoute = require("./routes/category.routes");
const productRoute = require("./routes/product.routes");
const cartRoute = require("./routes/cart.routes");
const orderRoute = require("./routes/order.routes");
app.use(`${api}/users`, userRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/carts`, cartRoute);
app.use(`${api}/orders`, orderRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDb();
});
