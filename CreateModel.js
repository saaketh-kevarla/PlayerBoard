import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
    FirstName : String,
    LastName : String,
    Country : String,
    PlayerScore : Number
})

const Player = mongoose.model('Player',mySchema);

export default Player;