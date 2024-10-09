import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,      // Correct spelling
  useUnifiedTopology: true,   // Correct spelling
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log("Error", error);
});
