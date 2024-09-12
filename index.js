const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./API/user_api");
const payment = require("./API/payment_api");
const product = require("./API/product_api");
const order = require("./API/orders_api");
const category = require("./API/category_api");
const Cart = require("./API/card_api");
const wishlist = require("./API/wishlist_api");

const login = require("../ecommers_backend/login_api/login");
const { logout } = require("./services/user_services");
const adminRoutes = require("./API/admin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// routes
app.use("/admin", adminRoutes);
app.use("/users", user);
app.use("/cart", Cart);
app.use("/product", product);
app.use("/order", order);
app.use("/category", category);
app.use("/login", login);
app.use("/logout", logout);
app.use("/wishlist", wishlist);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://yagashkannan0003:rVXQm9UceaAHUXH9@ecomyagash.0s4pr.mongodb.net/ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
