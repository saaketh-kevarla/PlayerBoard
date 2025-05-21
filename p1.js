const func1 = async() =>{
    try {
        const response = await fetch('http://localhost:8000/api/players');
        const data =  response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

func1()