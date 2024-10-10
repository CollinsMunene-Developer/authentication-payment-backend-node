import mongoose from "mongoose";

const connectDB = async ()=> {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("connected to MongoDb")
    
  } catch (error) {
    console.log("error connecting to the  mongodb database ", error)
    process.exit(1)
    
  }
}
export default connectDB