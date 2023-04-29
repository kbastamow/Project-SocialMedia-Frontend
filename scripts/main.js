////////////////////////Variables Kat
const API_URL = 'http://localhost:8080/'

const profile = document.getElementById('profile')
const profileMain = document.getElementById('profile-main')
const profilePosts = document.getElementById("profile-posts")

//btns
const createPostBtn = document.getElementById("display-create")

//Create post-form
const posttitle= document.getElementById("posttitle");
const postbody= document.getElementById("postbody");
const postimage = document.getElementById('postimage')
const postForm = document.getElementById("post-form")
//Update post-form
const posttitleUD= document.getElementById("posttitle-update");
const postbodyUD= document.getElementById("postbody-update");
const postimageUD = document.getElementById('postimage-update')
const postFormUD = document.getElementById("post-form-update")
const warningDiv = document.getElementById("warning-div")
const deletePostBtn = document.getElementById("delete-post")
const confirmDelete = document.getElementById("confirm-delete")


//Update user form
const updateBio = document.getElementById("update-bio")
const updateTitle = document.getElementById("update-title")
const updateImage = document.getElementById("update-image")
const updateUserForm = document.getElementById("update-user")

//count characters of post body
let currentCount = document.getElementById("current-count")


//modal for user card
const listmodalTitle = document.getElementById("list-modal-title")
const listmodalList = document.getElementById("list-modal-list")


//variable that stores post id information to pass onto update form
let postInfo = {
  "title": "",
  "body": "",
  "postId": "",
} 

let userInfo = { id: '6445388da8130f4b9f500867' }

///////////////////////////////Variables Paco
const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const mainView = document.getElementById('main-view');
const postView = document.getElementById('post-view');
const mainFeed =  document.getElementById('main-feed');
const loginButton = document.getElementById('login-button');
const signUpButton = document.getElementById('sign-up-button');
const redirectToSignUpButton = document.getElementById('redirect-to-sign-up');


//PACO: bootstrap.Modal crashes my page - not recognised???
const forgotPasswordLink = document.getElementById('forgot-password-link');
const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
const forgotPasswordForm = document.getElementById('forgot-password-form');
const sendButtonRecover = document.getElementById('send-button-recover');



const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ4Zjg5NTY0ZTMzNDVkNGM4NGEzMTQiLCJpYXQiOjE2ODI1MDY5NjJ9.wyXaMIsOWZapkwcvZsM9FJooyZ6uRD4gX-JjRy4sboI';


///////////////////////////////////////////////////////////////KAT functions



//Axios get user info

async function showUser(){
  
  try{
    clearDisplay(profileMain)
    // e.preventDefault();
    const res = await axios.get(API_URL + 'users/getbyid/' + userInfo.id)
    const user = res.data
 
    const card = document.createElement("div")
    card.setAttribute('class', 'card shadow w-100 mx-auto')
   
    let picture = '../assets/no_image.jpeg'
    if (user.image){
      picture = API_URL + 'uploads/users/' + user.image
    }
const profilePic = document.createElement("img")
profilePic.setAttribute('class', 'card-img-top')
profilePic.setAttribute('src', picture)
card.appendChild(profilePic)

//Name, title and biography
userInfo.id = user._id  //save userId in a variable to use in other functions - CLEAR ON LOGOUT!!!!!!!!!!!!

const baseInfo = document.createElement("div")
baseInfo.setAttribute('class', 'card-body')

        const userName = `<h5 class="card-title">${user.username}</h5>`
        baseInfo.innerHTML = userName

        if (user.title){
            const userTitle = `<p class="text-primary">${user.title}</p>`
            baseInfo.innerHTML += userTitle
        }

        let userBio= `<p class="card-text">You have not added information about yourself</p>`
        if (user.bio){
            userBio = `<p class="card-text">${user.bio}</p>`   
        }

        baseInfo.innerHTML += userBio

        const addUpdateBtn = document.createElement("button")
        addUpdateBtn.textContent = 'Add/modify public profile'
        addUpdateBtn.setAttribute('class', 'btn btn-link btn-sm text-secondary')
        addUpdateBtn.setAttribute('data-bs-toggle','modal')
        addUpdateBtn.setAttribute('data-bs-target','#form-modal')
        addUpdateBtn.addEventListener('click', showUpdateUser )
        baseInfo.appendChild(addUpdateBtn)

//Add the three links
        const linkList = document.createElement('ul')
        linkList.setAttribute('class', 'list-group list-group-flush')

        const listArray = [{
          "button": "People I follow",
          "function": showFriends  //function but no parenthesis so I can pass it to button click-event
        }, {
          "button": "My followers",
          "function": showFollowers  
        }, {
          "button": "Account settings",
          "function": showFriends //TO BE CHANGED
        } ]   
          

        listArray.forEach(item => {
            const listItem = document.createElement("li")
            listItem.setAttribute('class', 'list-group-item d-grid gap-1')
            const linkBtn = document.createElement("button")
            linkBtn.textContent = item.button
            linkBtn.setAttribute('class', 'btn btn-block bg-success-subtle' )
            linkBtn.setAttribute('data-bs-toggle','modal')
            linkBtn.setAttribute('data-bs-target','#list-modal')
            linkBtn.addEventListener("click", item.function)
            //ADD EVENT LISTENERS!!
            listItem.appendChild(linkBtn)
            linkList.appendChild(listItem)
    })

baseInfo.appendChild(linkList)
card.appendChild(baseInfo)


profileMain.appendChild(card);

   }catch(error){
    console.error(error);
  }
}

async function userPosts(){
  
  try{
  clearDisplay(profilePosts)
  let tokenKat = localStorage.getItem('token')
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
    card.setAttribute('class', 'card m-3 shadow')
    const styleDiv = document.createElement("div");
    styleDiv.setAttribute('class', 'row no-gutters w-100 mx-auto')
    
    let picture = './assets/post_img.png'
    if (post.image){
      picture = API_URL + 'uploads/posts/' + post.image
    } 
      const div = document.createElement("div")
      div.setAttribute('class', 'col-md-4 d-flex justify-content-center align-items-center' )
      const img = document.createElement('img');
      img.setAttribute('class', 'img-fluid px-1')
      img.setAttribute('src', picture)
      div.appendChild(img)
      styleDiv.appendChild(div);

      styleDiv.innerHTML += `
          <div class="card-body col-md-8 flex-wrap">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <hr>           
          </div>`
    
     //Likes link

     const childDiv = styleDiv.querySelector(".card-body");
     if (post.likes.length > 0) {  //If there are any likes
      const likes = document.createElement("button")
      likes.innerText = post.likes.length + ' likes'
      likes.setAttribute('class', 'btn btn-link d-block btn-sm text-success')
      likes.setAttribute('data-bs-toggle','modal')
      likes.setAttribute('data-bs-target','#list-modal')
      likes.addEventListener("click", function(e){ showLikers(e, post._id)})
     
      childDiv.appendChild(likes);
     } else {
      const likes = document.createElement("p")
      likes.innerText = post.likes.length + ' likes'
      likes.setAttribute('class', 'small text-success')
      childDiv.appendChild(likes);
     }

     //Update button
     const updateBtn = document.createElement("button")
     updateBtn.setAttribute('class','btn btn-light y btn-sm p-2' )
     updateBtn.setAttribute('data-bs-toggle','modal')
     updateBtn.setAttribute('data-bs-target', '#form-modal')
     updateBtn.textContent = 'Update post'

     updateBtn.addEventListener('click', function(e) {
      showFormUD(e, {title: post.title, body: post.body, postId: post._id})}) //passing parameters to use in update
     styleDiv.querySelector(".card-body").appendChild(updateBtn)


    card.appendChild(styleDiv);
    profilePosts.appendChild(card) 
  });
} catch(error){
  console.error(error);
}
}

async function updateUser(e){ 
  e.preventDefault();
  
  let tokenKat = localStorage.getItem('token')
  const formData = new FormData();
  if (updateTitle.value.length > 0) formData.append("title", updateTitle.value);
  if (updateBio.value.length > 0) formData.append("bio", updateBio.value)
  if (updateImage.length != 0) formData.append("image", updateImage.files[0])
  
  try{
    const res = await axios.put(API_URL + 'users/update/', formData, {
      headers: {
        "Authorization": tokenKat,
        "Content-Type": "multipart/form-data"
      }
    })
    updateUserForm.reset()
    showUser()

  } catch(error){
    console.log(error)
  }
}


async function createPost(e){ 
  e.preventDefault();

  let tokenKat = localStorage.getItem('token')

  
  const formData = new FormData();
  formData.append("title", posttitle.value);
  formData.append("body", postbody.value)
  formData.append("image", postimage.files[0])
  console.log(formData)

  try{
    const res = await axios.post(API_URL + 'posts/create', formData, {
      headers: {
        "Authorization": tokenKat,
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res.data)
    userPosts()
  } catch(error){
    console.log(error)
  }
}

async function updatePost(e){ 
  e.preventDefault();
  
  let tokenKat = localStorage.getItem('token')
  const formData = new FormData();
  formData.append("title", posttitleUD.value);
  formData.append("body", postbodyUD.value)
  if (postimageUD.length != 0) formData.append("image", postimageUD.files[0])

  //in the following, postId is a global variable where I've temporarily stored post's id when it's update button is clicked
  try{
    const res = await axios.put(API_URL + 'posts/update/' + postInfo.postId, formData, {
      headers: {
        "Authorization": tokenKat,
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res.data)
    userPosts()
    
    
    posttitleUD.removeAttribute('value', postInfo.title);
    postbodyUD.textContent = ""
  } catch(error){
    console.log(error)
  }
}

async function deletePost(e) {
  e.preventDefault();
  console.log("Write delete post function")
  console.log(postInfo.postId)
  let tokenKat = localStorage.getItem('token')
  try {
    const res = await axios.delete(API_URL + 'posts/delete/' + postInfo.postId, {
      headers: {
        "Authorization": tokenKat,
      }
    })
    console.log("post deleted")
    warningDiv.classList.add("hidden")
    userPosts()

  }catch(error){
    console.log(error)
  }
}



async function showFriends(e){
  e.preventDefault();

  try {
  listmodalTitle.innerText = 'People you follow'
  clearDisplay(listmodalList)
  const res = await axios.get(API_URL + 'users/getbyid/' + userInfo.id)
  let picture = '../assets/no_image.jpeg'
  
  res.data.following.forEach(person => {
    const li = document.createElement("li")
    li.setAttribute('class', 'container custom-height')


    if (person.image){
      picture = API_URL + 'uploads/users/' + person.image
    }
    
    const image = document.createElement('img')
    image.setAttribute('src', picture)
    image.setAttribute('class', 'col-3 rounded-circle p-2 friendlist-img')

    const personLink= document.createElement('button')
    personLink.innerText = person.username
    personLink.setAttribute('class', 'btn btn-link')
    personLink.addEventListener("click", function(e){otherUser(e, person.username) })
   
 
    li.appendChild(image)
    li.appendChild(personLink)

    listmodalList.appendChild(li)
  })
} catch(error) {
  console.error(error)
}
}

async function showFollowers(e){
  e.preventDefault();

  try {
  listmodalTitle.innerText = 'People who follow you'
  clearDisplay(listmodalList)
  const res = await axios.get(API_URL + 'users/getbyid/' + userInfo.id)

  res.data.followers.forEach(person => {
    const li = document.createElement("li")
    li.setAttribute('class', 'container custom-height')

    let picture = '../assets/no_image.jpeg'
    if (person.image){
      picture = API_URL + 'uploads/users/' + person.image
    }
    const image = document.createElement('img')
    image.setAttribute('src', picture)
    image.setAttribute('class', 'col-3 rounded-circle p-2 friendlist-img')
    
    const personLink= document.createElement('button')
    personLink.innerText = person.username
    personLink.setAttribute('class', 'btn btn-link')
    personLink.addEventListener("click", function(e){otherUser(e, person.username) })

    li.appendChild(image)
    li.appendChild(personLink)

    listmodalList.appendChild(li)
  })
} catch(error) {
  console.error(error)
}
}


async function showLikers(e, postId){
  e.preventDefault();
  console.log(postId)

  try {
  listmodalTitle.innerText = 'People who liked your post'
  clearDisplay(listmodalList)
  const res = await axios.get(API_URL + 'posts/getbyid/' + postId)
  console.log(res.data)
  res.data.likes.forEach(person => {
    const li = document.createElement("li")

       const icon = document.createElement('span')
       icon.innerHTML = `<i class="fa-solid fa-heart-circle-plus fa-xl" style="color: #f60909;"></i>`         
       const personLink= document.createElement('button')
       personLink.innerText = person.username
       personLink.setAttribute('class', 'btn btn-link text-decoration-none')
       personLink.addEventListener("click", function(e){otherUser(e, person.username) })

       li.appendChild(icon)
       li.appendChild(personLink)

    listmodalList.appendChild(li)
  })
} catch(error) {
  console.error(error)
}
}

//Counts the characters left when creating a post
function countCharacters(){
let enteredText = postbody.value.length;
let whatsLeft = 700 - enteredText;
currentCount.innerText = whatsLeft + "/700";
};



function clearDisplay(element){
 while (element.firstChild){
    element.removeChild(element.firstChild);
    }
  }

  function showUpdateUser(e){
    postFormUD.classList.add("hidden")
    postForm.classList.add("hidden")
    updateUserForm.classList.remove("hidden")
   }


function showForm(e){
  e.preventDefault();
  postFormUD.classList.add("hidden")
  updateUserForm.classList.add("hidden")
  postForm.classList.remove("hidden")
 
}

function showFormUD(e, dataFromBtn){
  e.preventDefault();
  postInfo = {  //Clear global variable in case there is old data left
    "title":"",
    "body": "",
    "postId": ""
  }

  postInfo = {  //Set with new variables
    title: dataFromBtn.title,
    body: dataFromBtn.body,
    postId: dataFromBtn.postId
  } 
  warningDiv.classList.add("hidden")
  posttitleUD.setAttribute('value', postInfo.title);
  postbodyUD.textContent = postInfo.body
  //global variable that can store this data temporarily
  
  postForm.classList.add("hidden")
  updateUserForm.classList.add("hidden")
  postFormUD.classList.remove("hidden")
}

function showWarning(e){
  e.preventDefault();
  warningDiv.classList.remove("hidden");
}

function otherUser(e, username){  //FUNCTION YET TO BE WRITTEN
  e.preventDefault();  
  console.log("Write function to see other user's profile")
}

showUser();
userPosts();

postForm.addEventListener("submit", createPost)
postFormUD.addEventListener("submit", updatePost)
updateUserForm.addEventListener("submit", updateUser)
postbody.addEventListener("input", countCharacters)
createPostBtn.addEventListener("click", showForm)
deletePostBtn.addEventListener("click", showWarning)
confirmDelete.addEventListener("click", deletePost)

///////////////////////////////////////////////////////////////////PACO functions



async function login(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(API_URL + 'users/login', {
      email: email,
      password: password
    });
    if (response.status === 200) {
      alert('Login successful!');
      // Store token in LocalStorage
      let token = response.data.token;
      localStorage.setItem('token', token);
      // Go to mainView
      loginView.classList.add('hidden');
      mainView.classList.remove('hidden');
      displayMainFeed();
    } else {
      alert('Incorrect email/password. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during login. Please try again.');
  }
}

async function signUp(e) {
  e.preventDefault();
  const username = document.getElementById('new-username').value;
  const email = document.getElementById('new-email').value;
  const password = document.getElementById('new-password').value;
  const passwordConfirm = document.getElementById('new-password-confirm').value;

  if (password !== passwordConfirm) {
    return alert('Passwords don\'t match');
  }

  try {
    const response = await axios.post(API_URL + 'users/create', {
      username: username,
      email: email,
      password: password
    });
    if (response.status === 201) {
      alert(response.data.message);
      // Store token in LocalStorage
      let token = response.data.token;
      localStorage.setItem('token', token);
      // Go to mainView
      registerView.classList.add('hidden');
      loginView.classList.remove('hidden');
      // displayMainFeed();
    } else {
      alert('Incorrect email/password. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during login. Please try again.');
  }
}

forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  forgotPasswordModal.show();
});


sendButtonRecover.addEventListener('click', async (e) => {
  e.preventDefault();
  const emailInput = forgotPasswordForm.querySelector('#email-input-recover');
  const email = emailInput.value;
  console.log(email);
  try {
    const response = await axios.get(API_URL + 'users/recoverPassword/' + email);
    if (response.status === 200) {
      alert('Confirmation email sent!');
      const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
      forgotPasswordModal.hide();
    } else {
      alert('Error sending confirmation email. Please try again later.');
    }
  } catch (error) {
    console.error(error);
    alert('Error sending confirmation email. Please try again later.');
  }
});


async function displayMainFeed() {
  try {
    let response = await axios.get(API_URL + 'posts/getFriendsPosts',{
      headers: {
        Authorization: token
      }
    });

    friendsPosts = response.data.posts;

    friendsPosts.forEach(post => {
      const card = document.createElement("div");
      card.setAttribute('class', 'card m-3 shadow')
      const styleDiv = document.createElement("div");
      styleDiv.setAttribute('class', 'row no-gutters w-100')
      let picture = './assets/post_img.png'
      // card.setAttribute('style', 'width: 18rem')
      if (post.image){
        picture = API_URL + 'uploads/posts/' + post.image
      } 
      const div = document.createElement("div")
      div.setAttribute('class', 'col-md-4 d-flex justify-content-center align-items-center' )
      const img = document.createElement('img');
      img.setAttribute('class', 'img-fluid px-1')
      img.setAttribute('src', picture)
      div.appendChild(img)
      styleDiv.appendChild(div);
    
      styleDiv.innerHTML += `
            <div class="card-body col-md-8">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p> 
              <p class="small">${post.likes.length} likes</p>          
            </div>`
      
      card.appendChild(styleDiv);
      mainFeed.appendChild(card)
    });
  } catch (error) {
    console.error(error);
  }
};

async function redirectToSignUp() {
  loginView.classList.add('hidden');
  registerView.classList.remove('hidden');
};

loginButton.addEventListener('click', login);
signUpButton.addEventListener('click', signUp);
redirectToSignUpButton.addEventListener('click', redirectToSignUp);

// displayMainFeed();

// Start from main view: must uncomment next 3 lines
loginView.classList.add('hidden');
mainView.classList.remove('hidden');
displayMainFeed();
