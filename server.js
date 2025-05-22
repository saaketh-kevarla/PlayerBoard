import express from 'express';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import url, { fileURLToPath } from 'url';
import Player from './CreateModel.js';
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Atlas_url = process.env.Atlas_URL;


app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')));



const connection = async (req,res) =>{
    try {
        await mongoose.connect(Atlas_url)
        console.log('Yipeeeey! connected to Mongo Atlas');
    } catch (error) {
        console.log('caught error',error);
    }
}


app.post('/',async(req,res) =>{
    
    try {
        const myPlayer = new Player(req.body);
        await myPlayer.save()

        const allPlayers = await Player.find().sort({PlayerScore : -1});
        console.log(req.body);
        console.log(allPlayers);
        res.json(allPlayers)
    } catch (error) {
        console.log('failed to save doc',error);
    }
})


app.get('/api/players',async(req,res) =>{
    try {
        const allOfEm = await Player.find().sort({PlayerScore : -1});
        console.log(allOfEm);
        res.json(allOfEm)
    } catch (error) {
        console.log('cant fetch em all',error);
    }
})

app.put('/api/players/:id',async(req,res) =>{
    try {
        const thatPlayer = await Player.findOne({_id:req.params.id})
        thatPlayer.PlayerScore += 5;
        await thatPlayer.save();
        const allOfEm = await Player.find().sort({PlayerScore : -1});
        res.json(allOfEm)
    } catch (error) {
        console.log('failed to add 5',error);
    }
})

app.put('/api/players/subtract/:id',async(req,res) =>{
    try {
        const thatPlayer = await Player.findOne({_id:req.params.id})
        thatPlayer.PlayerScore -= 5;
        await thatPlayer.save();
        const allOfEm = await Player.find().sort({PlayerScore : -1});
        res.json(allOfEm)
    } catch (error) {
        console.log('failed to subtract 5',error);
    }
})

app.delete('/api/players',async(req,res) =>{
    try {
        const delPlayer = await Player.findOne({FirstName : req.body})
        await Player.deleteOne(delPlayer);
        const allOfEm = await Player.find().sort({PlayerScore : -1});
        res.json(allOfEm)
    } catch (error) {
        console.log('failed to delete',error);
    }
})



const startServer = async () =>{
    await connection();
    app.listen(8000, ()=>{
    console.log("APP is running on PORT 8000");
})
}

startServer();
