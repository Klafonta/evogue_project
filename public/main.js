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

const user2 = {
  name: "user2",
  form: formUser2,
  input: inputUser2,
  area: areaMessagesUser2
};

let messages = [];
let editingMessage = null;

handleMessage(user1, user2)
handleMessage(user2, user1)

function handleMessage(user, otherUser) {
  user.form.addEventListener("submit", function(event) {
    event.preventDefault();
    const message = user.input.value;

    if (editingMessage == null) {
      const data = { message: message, user: user.name, time: getTime() };

      messages.push(data);
      addMessagesUser(data, messages.length - 1, user);
      addMessagesUser(data, messages.length - 1, otherUser);
    } else {
      const spanUser1 = user.area.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
      spanUser1.innerText = message;

      const spanUser2 = otherUser.area.querySelector(`li[value="${editingMessage}"] span[class="chat-bubble"]`);
      spanUser2.innerText = message;

      editingMessage = null;
    }

    user.input.value = '';
  });
}

// functions
function getTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
}

function addMessagesUser(data, index, user) {

  let newMessage = document.createElement("li");
  newMessage.className = data.user == user.name ? "self-message" : "message";
  newMessage.value = index;
  newMessage.buttons = `<button class="update-button" name="modify"><i class="fa fa-pencil"></i></button>
                        <button class="update-button" name="delete"><i class="fa fa-trash"></i></button>`;

  newMessage.innerHTML = `<span class="chat-bubble">${data.message}</span><span class="time">${data.time}</span>`;
  user.area.appendChild(newMessage);

  if (data.user == user.name) {
    newMessage.addEventListener("mouseenter", function() {
      newMessage.insertAdjacentHTML("beforeend", newMessage.buttons);

      const deleteButton = newMessage.querySelector(`button[name="delete"]`);
      const modifyButton = newMessage.querySelector(`button[name="modify"]`);

      deleteButton.addEventListener("click", () => deleteMessage(index));
      modifyButton.addEventListener("click", modifyMessage.bind(null, user.name, index));

    });

    newMessage.addEventListener("mouseleave", function() {
      newMessage.removeChild(user.area.querySelector(`button[name="delete"]`));
      newMessage.removeChild(user.area.querySelector(`button[name="modify"]`));
    })
  }
}

function deleteMessage(value) {
  user1.area.removeChild(user1.area.querySelector(`li[value="${value}"]`));
  user2.area.removeChild(user2.area.querySelector(`li[value="${value}"]`));
}

function modifyMessage(name, value) {
  editingMessage = value;
  const span1 = areaMessagesUser1.querySelector(`li[value="${value}"] span[class="chat-bubble"]`);
  const span2 = areaMessagesUser2.querySelector(`li[value="${value}"] span[class="chat-bubble"]`);

  if (name == "user1") {
    inputUser1.value = span1.innerText;
    inputUser1.select();
  } else {
    inputUser2.value = span2.innerText;
    inputUser2.select();
  }
}
