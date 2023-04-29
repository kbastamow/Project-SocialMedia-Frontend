////////////////////////Variables Kat
const API_URL = 'http://localhost:8080/'

const profile = document.getElementById('profile')
const profileMain = document.getElementById('profile-main')
const profilePosts = document.getElementById("profile-posts")

const postForm = document.getElementById("post-form")

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

const forgotPasswordLink = document.getElementById('forgot-password-link');
const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
const forgotPasswordForm = document.getElementById('forgot-password-form');
const sendButtonRecover = forgotPasswordForm.querySelector('button[type="submit"]');



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
*/

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
    console.log(response);
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


sendButtonRecover.addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = forgotPasswordForm.querySelector('#email-input');
  const email = emailInput.value;
  try {
    const response = await axios.post(API_URL + '/recoverPassword/' + email);
    if (response.data.success) {
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
      img.setAttribute('src', 'http://localhost:8080/uploads/users/' + post.image)
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

async function redirectToSignUp() {
  loginView.classList.add('hidden');
  registerView.classList.remove('hidden');
};

loginButton.addEventListener('click', login);
signUpButton.addEventListener('click', signUp);
redirectToSignUpButton.addEventListener('click', redirectToSignUp);

// displayMainFeed();

