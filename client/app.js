const socket = io();

const loginForm = document.getElementById('welcome-form')
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username')
const messageContentInput = document.getElementById('message-content')
let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', (user) => addMessage('Chat bot', `${user} has joined the chat`))
socket.on('userLeft', (user) => addMessage('Chat bot', `${user} has left the chat`))

function login(event) {

    event.preventDefault();
    if (!userNameInput.value) {
        alert('sorry bro, but you forgot something')
    }

    else {
        userName = userNameInput.value
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', userName);
    }
};

function sendMessage(event) {
    event.preventDefault();

    let messageContent = messageContentInput.value;
    if (!messageContent.length) {
        alert('You have to type something!');
    }
    else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) { 
        message.classList.add('message--self');
    }

    if(author === 'Chat bot') {
        message.style.fontStyle = 'italic';
    }
    
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
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
});

// console.log(userName);
