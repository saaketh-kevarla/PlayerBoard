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
    const response  = await fetch('/',{
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
        const getEmAll = await fetch('/api/players') // u need to route a GET
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
    const circDiv = document.createElement('div')
    circDiv.setAttribute('id','circDiv')
    const divDelete = document.createElement('div')
    divDelete.setAttribute('class','circle')
    divDelete.innerText = 'D'
    const add = document.createElement('div');
    add.innerText = '+5';
    add.setAttribute('class','circle');
    const subtract = document.createElement('div');
    subtract.innerText = '-5';
    subtract.setAttribute('class','circle');


    div1.appendChild(divname);
    div1.appendChild(divcountry);
    div1.appendChild(divscore);

    circDiv.appendChild(divDelete);
    circDiv.appendChild(add);
    circDiv.appendChild(subtract);
    div1.appendChild(circDiv);
    playerdiv.appendChild(div1);


    divDelete.addEventListener('click',async () =>{
        console.log('You clicked D button');
        try {
            const response = await fetch(`/api/players`,{
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'text/plain'
                },
                body : player.FirstName
            });
            const data = await response.json();
            playerdiv.innerHTML = '';
            DOMdiv(data);

        } catch (error) {
            console.log('Failed to delete',error);
        }
    })

    add.addEventListener('click',async() =>{
        console.log('you clicked +5 button');

        try {
            const response = await fetch(`/api/players/${player._id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            playerdiv.innerHTML = '';
            DOMdiv(data)
        } catch (error) {
            console.log('error in add button',error);
        }
    })


    subtract.addEventListener('click',async() =>{
        console.log('you clicked -5 button');

        try {
            const response = await fetch(`/api/players/subtract/${player._id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            playerdiv.innerHTML = '';
            DOMdiv(data)
        } catch (error) {
            console.log('error in add button',error);
        }
    })

    
})
}





