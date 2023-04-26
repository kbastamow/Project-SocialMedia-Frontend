////////////////////////Variables Kat
const profile = document.getElementById("profile")
const API_URL = "http://localhost:8080/"

let user = { id: "6445388da8130f4b9f500867" }

///////////////////////////////Variables Paco
const loginView = document.getElementById('login-view');
const registerView = document.getElementById('register-view');
const mainView = document.getElementById('main-view');
const postView = document.getElementById('post-view');
const mainFeed =  document.getElementById('main-feed');
const loginButton = document.getElementById('login-button');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ4Zjg5NTY0ZTMzNDVkNGM4NGEzMTQiLCJpYXQiOjE2ODI1MDY5NjJ9.wyXaMIsOWZapkwcvZsM9FJooyZ6uRD4gX-JjRy4sboI';


///////////////////////////////////////////////////////////////KAT functions


//Axios get user info

// showUser();  ________________________

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

loginButton.addEventListener('click', login);


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

// displayMainFeed();_____________________