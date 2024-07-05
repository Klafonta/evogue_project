// targets
const formUser1 = document.querySelector("#formUser1");
const formUser2 = document.querySelector("#formUser2");

const inputUser1 = document.querySelector("#user1");
const inputUser2 = document.querySelector("#user2");

const areaMessagesUser1 = document.querySelector("#messagesUser1");
const areaMessagesUser2 = document.querySelector("#messagesUser2");

const user1 = {
  name: "user1",
  form: formUser1,
  input: inputUser1,
  area: areaMessagesUser1
};

let messages = [];
let editingMessage = null;

// listeners
formUser1.addEventListener("submit", function(event) {
  event.preventDefault();
  const message = inputUser1.value;

  if (editingMessage == null) {
    const data = { message: message, user: 'user1', time: getTime() }

    messages.push(data)
    addMessagesUser(data, messages.length - 1, areaMessagesUser1, "user1")
    addMessagesUser(data, messages.length - 1, areaMessagesUser2, "user2")
  } else {
    const spanUser1 = areaMessagesUser1.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
    spanUser1.innerText = message;

    const spanUser2 = areaMessagesUser2.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
    spanUser2.innerText = message;

    editingMessage = null;
  }

  inputUser1.value = '';
});

formUser2.addEventListener("submit", function(event) {
  event.preventDefault();
  const message = inputUser2.value;

  if (editingMessage == null) {
    const data = { message: message, user: 'user2', time: getTime() }

    messages.push(data)
    addMessagesUser(data, messages.length - 1, areaMessagesUser1, "user1")
    addMessagesUser(data, messages.length - 1, areaMessagesUser2, "user2")
  } else {
    const spanUser1 = areaMessagesUser1.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
    spanUser1.innerText = message;

    const spanUser2 = areaMessagesUser2.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
    spanUser2.innerText = message;

    editingMessage = null;
  }

  inputUser2.value = '';
});

// functions
function getTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
}

function addMessagesUser(data, index, area, user) {

  let newMessage = document.createElement("li");
  newMessage.className = data.user == user ? "self-message" : "message";
  newMessage.value = index;
  newMessage.buttons = `<button class="update-button" name="modify"><i class="fa fa-pencil"></i></button>
                        <button class="update-button" name="delete"><i class="fa fa-trash"></i></button>`;

  newMessage.innerHTML = `<span class="chat-bubble">${data.message}</span><span class="time">${data.time}</span>`;

  area.appendChild(newMessage);

  if (data.user == user) {
    newMessage.addEventListener("mouseenter", function() {
      newMessage.insertAdjacentHTML("beforeend", newMessage.buttons)

      const deleteButton = newMessage.querySelector(`button[name="delete"]`);
      const modifyButton = newMessage.querySelector(`button[name="modify"]`);

      deleteButton.addEventListener("click", () => deleteMessage(index));
      modifyButton.addEventListener("click", modifyMessage.bind(null, user, index))

    });

    newMessage.addEventListener("mouseleave", function() {
      newMessage.removeChild(area.querySelector(`button[name="delete"]`));
      newMessage.removeChild(area.querySelector(`button[name="modify"]`));
    })
  }
}

function deleteMessage(value) {
  areaMessagesUser1.removeChild(areaMessagesUser1.querySelector(`li[value="${value}"]`))
  areaMessagesUser2.removeChild(areaMessagesUser2.querySelector(`li[value="${value}"]`))
}

function modifyMessage(user, value) {
  editingMessage = value
  const span1 = areaMessagesUser1.querySelector(`li[value="${value}"] span[class="chat-bubble"]`)
  const span2 = areaMessagesUser2.querySelector(`li[value="${value}"] span[class="chat-bubble"]`)

  if (user == "user1") {
    inputUser1.value = span1.innerText
    inputUser1.select()
  } else {
    inputUser2.value = span2.innerText
    inputUser2.select()
  }
}
// ATTENTION USER2 A FAIRE -> Passer User en params
