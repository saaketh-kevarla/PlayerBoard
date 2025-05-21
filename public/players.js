// This is a FrontEnd JS page which only runs in Browser, cannot import packages here 
// Backend and Nodejs is responsible for that 


const button1 = document.querySelector('#addbutton');

const playerdiv = document.createElement('div');
playerdiv.setAttribute('id','playerdiv');
document.body.appendChild(playerdiv)

button1.addEventListener('click',async() =>{
    const input = document.querySelectorAll('.myinputs'); 
    console.log(input);
    const newPlayer = {
        FirstName : input[0].value,
        LastName : input[1].value,
        Country : input[2].value,
        PlayerScore : input[3].value
    }
    try{
    const response  = await fetch('http://localhost:8000/',{
        method : 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
    })
    let result = await response.json();
    console.log(result);

    playerdiv.innerHTML = '';
    DOMdiv(result)
    }
    catch(err){
        console.log('error !!',err);
        
    }
})


const getPlayersDB = async () =>{
    try {
        const getEmAll = await fetch('http://localhost:8000/api/players') // u need to route a GET
        let result = await getEmAll.json(); // this parses the string

        console.log(result);
        DOMdiv(result)
        
    } catch (error) {
        console.log('error while fetching players',error);
    }
}

getPlayersDB()



const DOMdiv = (arr) =>{
    arr.forEach((player) =>{
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
}





