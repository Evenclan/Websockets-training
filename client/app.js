const loginForm = document.getElementById('welcome-form')
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username')
const messageContentInput = document.getElementById('message-content')
let userName = '';

function login(event) {

    event.preventDefault();
     
    if (userNameInput.value === userName) {
        alert('sorry bro, but you forgot something')
    }

    else {
        console.log('lol', userNameInput.value);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

function sendMessage(event) {
    event.preventDefault();
}

function addMessage(author, content) {
    const message = document.createElement('li');
    console.log(message);
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
}

loginForm.addEventListener('submit', function (event) {
    login(event);
});

addMessageForm.addEventListener('submit', function (event) {
    sendMessage(event);
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
    // console.log(userName);

});
