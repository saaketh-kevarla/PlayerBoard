import express from 'express';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import url, { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));



const connection = async (req,res) =>{
    try {
        await mongoose.connect('mongodb+srv://saakethk25:AtlAs123@cluster0.ezfcmba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Yipeeeey! connected to Mongo Atlas');
    } catch (error) {
        console.log('caught error',error);
    }
}






const startServer = async () =>{
    await connection();
    app.listen(8000, ()=>{
    console.log("APP is running on PORT 8000");
})
}

startServer();
