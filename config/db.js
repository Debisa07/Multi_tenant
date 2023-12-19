const mongoose = require("mongoose");
//connect mongodb atlas
mongoose.connect(
  `mongodb+srv://debisaabebesa:${process.env.MONGODB_PASS}@cluster0.5nzmz5j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);