///////////////// targets /////////////////
  // form area
let formUser1 = document.querySelector("#formUser1");
let formUser2 = document.querySelector("#formUser2");

  // input area
let inputUser1 = document.querySelector("#user1");
let inputUser2 = document.querySelector("#user2");

  // messages area
let messagesUser1 = document.querySelector("#messagesUser1");
let messagesUser2 = document.querySelector("#messagesUser2");
let messages = document.querySelectorAll(".message")

///////////////// listeners /////////////////
  // USER 1
formUser1.addEventListener("submit", function(event) {
  event.preventDefault()

  addMessages(messages, inputUser1.value)
  addSelfMessages(messages, inputUser1.value)

  inputUser1.value = '';
});

  // USER 2
formUser2.addEventListener("submit", function(event) {
  event.preventDefault()

  addMessages(messages, inputUser2.value)
  addSelfMessages(messages, inputUser2.value)

  inputUser2.value = '';
});

///////////////// function /////////////////
function addMessages(area, message) {
  area.insertAdjacentHTML('beforeend',
    `<p class="message">
      <span class="time">${getTime()}</span><span class="chat-bubble">${message}</span>
    </p>`
  );
}

function addSelfMessages(area, message) {
  area.insertAdjacentHTML('beforeend',
    `<p class="self-message">
      <span class="self-chat-bubble">${message}</span><span class="time">${getTime()}</span>
    </p>`
  );
  let selfMessages = document.querySelectorAll(".self-message")

  selfMessages.forEach(function (selfMessage, index) {
    selfMessage.addEventListener("click", function(event) {
      if (window.confirm("Souhaitez-vous supprimer le message ?")) {
        removeMessage(selfMessage, index);
      }
    })
  })
}

function removeMessage(selfMessage, index) {
  let messages = document.querySelectorAll(".message")
  selfMessage.remove(selfMessage[index])
      messages.forEach(function (message, index) {
        message.remove(message[index])
      })
}

function getTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var currentTime = hours + ':' + minutes;
  return currentTime
}
