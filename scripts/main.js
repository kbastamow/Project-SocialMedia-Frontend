////////////////////////Variables Kat
const API_URL = 'http://localhost:8080/'

const profile = document.getElementById('profile')
const profileMain = document.getElementById('profile-main')
const profilePosts = document.getElementById("profile-posts")



let userInfo = { id: '6445388da8130f4b9f500867' }

///////////////////////////////Variables Paco





///////////////////////////////////////////////////////////////KAT functions


//Axios get user info



async function showUser(){
  try{
    // e.preventDefault();
    const res = await axios.get(API_URL + 'users/getbyid/' + userInfo.id)
    const user = res.data
    console.log(user);
    let picture = '../assets/no_image.jpeg'
    if (user.image){
      picture = API_URL + 'uploads/users/' + user.image
    }

    const card = document.createElement("div")
    card.setAttribute('class', 'card')
    card.setAttribute('style', 'width: 25rem')
    card.innerHTML =  `
                    <img src=${picture} class="card-img-top" alt="Profile picture">
                    <div class="card-body">
                      <h5 class="card-title">${user.username}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">Update your info</a>
                      <a href="#" class="card-link">Reset password</a>
                    </div>
                  </div>`

   profileMain.appendChild(card);

   }catch(error){
    console.error(error);
  }
}


async function userPosts(){
  try{
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1Mzg4ZGE4MTMwZjRiOWY1MDA4NjciLCJpYXQiOjE2ODI1MTg1OTR9.R8SA-WMYm8RqFqISxe7tQIWRxuz21e47rTVIuRvuGVM" //Change this when token is in local storage!!!!!!
  const res = await axios.get(API_URL + 'posts/getUsersPosts', {
      headers: {
        "Authorization": token,
        "_id": userInfo.id  //Replace this when login is in place!!
      }
  })
  const posts = res.data;
  console.log(posts);
  posts.posts.forEach(post => {

    
    const card = document.createElement("div");
    card.setAttribute('class', 'card m-3')
    card.setAttribute('style', 'width: 18rem')
    if (post.image){
      const picture = API_URL + 'uploads/posts/' + post.image
      console.log(picture);
      const img = document.createElement('img');
      img.setAttribute('class', 'card-img-top')
      img.setAttribute('src', picture)
      card.appendChild(img);
    }
    card.innerHTML += `
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
           <a href="#" class="btn btn-primary">Go somewhere</a>
         </div>`
    profilePosts.appendChild(card) 
  });
} catch(error){
  console.error(error);
}
}

//   <div id="profile-posts" class="d-flex flex-wrap bg bg-danger p-3">
//   <div class="card" style="width: 18rem;">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>

// }


showUser();
userPosts();



///////////////////////////////////////////////////////////////////////////////////////////////////////////PACO functions
