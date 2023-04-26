////////////////////////Variables Kat
const profile = document.getElementById("profile")
const API_URL = "http://localhost:8080/"

let user = { id: "6445388da8130f4b9f500867" }

///////////////////////////////Variables Paco






///////////////////////////////////////////////////////////////KAT functions


//Axios get user info

showUser();

async function showUser(){
  try{
    // e.preventDefault();
    const res = await axios.get(API_URL + 'getbyid/' + '6445388da8130f4b9f500867')
    const user = user.data
    console.log(user);
  }catch(error){
    console.log(error);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////PACO functions
