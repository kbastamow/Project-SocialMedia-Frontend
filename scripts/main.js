////////////////////////Variables Kat
const API_URL = 'http://localhost:8080/'

const profile = document.getElementById('profile')
const profileMain = document.getElementById('profile-main')
const profilePosts = document.getElementById("profile-posts")

const postForm = document.getElementById("post-form")

let userInfo = { id: '6445388da8130f4b9f500867' }

///////////////////////////////Variables Paco
const mainFeed =  document.getElementById('main-feed');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ4Zjg5NTY0ZTMzNDVkNGM4NGEzMTQiLCJpYXQiOjE2ODI1MDY5NjJ9.wyXaMIsOWZapkwcvZsM9FJooyZ6uRD4gX-JjRy4sboI';


///////////////////////////////////////////////////////////////KAT functions

/*

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
  clearDisplay(profilePosts)
  try{

  let tokenKat = " " //Change this when token is in local storage!!!!!!
  const res = await axios.get(API_URL + 'posts/getUsersPosts', {
      headers: {
        "Authorization": tokenKat,
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

//THIS DOES NOT WORK UNTIL WE HAVE LOGIN IN PLACE as I need req.user._id value!!!
async function createPost(e){ 
  e.preventDefault();

  let tokenKat = " " //Change this when token is in local storage!!!!!!


  const posttitle= document.getElementById("posttitle");
  const postbody= document.getElementById("postbody");
  const postimage = document.getElementById('postimage')
  const formData = new FormData();
  formData.append("title", posttitle.value);
  formData.append("body", postbody.value)
  formData.append("image", postimage.files[0])
  console.log(formData)

  try{
    const res = await axios.post(API_URL + 'posts/create', formData, {
      headers: {
        "Authorization": tokenKat,
        "userId": userInfo.id,  //Replace this when login is in place!!
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res.data)
    userPosts()
  } catch(error){
    console.log(error)
  }
}


function clearDisplay(element){
 while (element.firstChild){
    element.removeChild(element.firstChild);
    }
  }
 
showUser();
userPosts();

postForm.addEventListener("submit", createPost);
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////PACO functions


// Display main feed
async function displayMainFeed() {
  try {
    let friendsPosts = await axios.get(API_URL + 'posts/getFriendsPosts',{
      headers: {
        Authorization: token
      }
    });

    friendsPosts = friendsPosts.data.posts;

    friendsPosts.forEach(post => {
      const col = document.createElement('div')
      const card = document.createElement('div')
      const img = document.createElement('img')
      const cardBody = document.createElement('div')
      const cardTitle = document.createElement('h5')
      const cardMessage = document.createElement('p')
      const form = document.createElement('form')
      const input = document.createElement('input')
      const button = document.createElement('button')

      // Set classes and attributes
      col.className = 'col'
      card.className = 'card'
      img.className = 'card-img-top'
      cardBody.className = 'card-body'
      cardTitle.className = 'card-title'
      input.className = 'form-control'
      button.className = 'btn btn-primary'

      // img.src = post.image
      img.setAttribute('src', 'http://localhost:8080/uploads/users/' + user.image)
      cardTitle.textContent = post.title
      cardMessage.textContent = post.body
      input.placeholder = 'Write a comment...'
      button.href = '#'
      button.textContent = 'Comment'

      // Append elements
      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardMessage)
      cardBody.appendChild(input)
      cardBody.appendChild(button)
      card.appendChild(img)
      card.appendChild(cardBody)
      col.appendChild(card)
      mainFeed.appendChild(col)
    })


    console.log(friendsPosts);        
  } catch (error) {
    console.error(error);
  }
};

displayMainFeed();

