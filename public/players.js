import mongoose from "mongoose";

let playersSet = [
    {FirstName : 'John',LastName : 'Wick',Country: 'HongKong', PlayerScore:95},
    {FirstName : 'Indiana',LastName : 'Jones',Country: 'USA', PlayerScore:89},
]

const button1 = document.querySelector('#addbutton');

const playerdiv = document.createElement('div');
playerdiv.setAttribute('id','playerdiv');
document.body.appendChild(playerdiv)

button1.addEventListener('click',() =>{
    const input = document.querySelectorAll('.myinputs'); 
    console.log(input);
    const newPlayer = {
        FirstName : input[0].value,
        LastName : input[1].value,
        Country : input[2].value,
        PlayerScore : input[3].value
    }
    playersSet.push(newPlayer);

    playerdiv.innerHTML = ''
    playersSet.forEach((player) =>{
    const div1 = document.createElement('div')
    div1.setAttribute('id','div1')
    const divname = document.createElement('div')
    divname.setAttribute('id','divname')
    divname.textContent = player.FirstName + " " + player.LastName;
    const divcountry = document.createElement('div')
    divcountry.setAttribute('id','divcountry')
    divcountry.textContent = player.Country
    const divscore = document.createElement('div')
    divscore.setAttribute('id','divscore')
    divscore.textContent = player.PlayerScore
    div1.appendChild(divname);
    div1.appendChild(divcountry);
    div1.appendChild(divscore);
    playerdiv.appendChild(div1);
})


})





playersSet.forEach((player) =>{
    const div1 = document.createElement('div')
    div1.setAttribute('id','div1')
    const divname = document.createElement('div')
    divname.setAttribute('id','divname')
    divname.textContent = player.FirstName + " " + player.LastName;
    const divcountry = document.createElement('div')
    divcountry.setAttribute('id','divcountry')
    divcountry.textContent = player.Country
    const divscore = document.createElement('div')
    divscore.setAttribute('id','divscore')
    divscore.textContent = player.PlayerScore
    div1.appendChild(divname);
    div1.appendChild(divcountry);
    div1.appendChild(divscore);
    playerdiv.appendChild(div1);
})






