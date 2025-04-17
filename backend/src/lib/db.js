import mongoose from 'mongoose'

const connectDB = async ()=>{
 try {
    const conn=await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected host"+conn.connection.host);
    
 } catch (error) {
    console.log("error occured:"+error);
    
 }   
}
export {connectDB}