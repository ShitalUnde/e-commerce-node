const mongoose = require("mongoose");
const dbConnect = () => {
   mongoose.connect(
    `${process.env.DB_CONNECTION}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((resp) => {
    console.log("connected to Database ");
  })
  .catch((error) => {
    console.log("fail", error);
  }); 
};

module.exports = dbConnect