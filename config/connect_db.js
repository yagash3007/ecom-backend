const mongoose = require("mongoose");

// const connect_db = () => {
//   mongoose.connect("mongodb://localhost:27017/ecommers").then((con) => {
//     console.log("Connected" + con.connection.host);
//   });
// };

const connect_db = async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://yagashkannan0003:rVXQm9UceaAHUXH9@ecomyagash.0s4pr.mongodb.net/ecommerce"
      )
      .then(console.log("connected"));
  } catch (error) {
    console.log(error.message);
  }
  //  .then(() => {
  //   app
  //     .listen(4000, (err) => {
  //       if (err) {
  //         console.log("server failed");
  //       }
  //       console.log("listening now 4000");
  //     })
  //     .catch((error) => {
  //       if (error) {
  //         console.log("Connection Failed");
  //       }
  //     });
  // });
  // console.log("Connected to MongoDB");

  // Reference your models
  //     const User = require("../model/user");
  //     const Cart = require("../model/card");
  //     const Product = require("../model/product");
  //     const payment = require("../model/payment");
  //     const orders = require("../model/orders");
  //     const category = require("../model/Category");

  //     // Example of using the models to trigger collection creation
  //     try {
  //       const user = await User.findOne({});
  //       console.log("Checked User collection", user);
  //     } catch (err) {
  //       console.error("Error finding user:", err);
  //     }

  //     try {
  //       const cart = await Cart.findOne({});
  //       console.log("Checked Cart collection", cart);
  //     } catch (err) {
  //       console.error("Error finding cart:", err);
  //     }
  //   } catch (err) {
  //     console.error("Error connecting to MongoDB:", err.message);
  //   }
};

module.exports = connect_db;
