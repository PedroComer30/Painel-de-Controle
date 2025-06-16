let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 5000)

function nextImage(){
    count++;
    if(count>4){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;

}

const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {

        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            
            <span>${maxText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);
}

const openChatBtn = document.getElementById('openChatBtn');
const chatContainer = document.getElementById('chatContainer');

openChatBtn.addEventListener('click', () => {
  const isHidden = chatContainer.classList.contains('hidden');

  if (isHidden) {
    chatContainer.classList.remove('hidden');
    openChatBtn.textContent = 'Fechar Chat';
  } else {
    chatContainer.classList.add('hidden');
    openChatBtn.textContent = 'Abrir Chat';
  }
});

// Envio de mensagens
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  input.value = '';
  botReply(message);
}

function addMessage(message, sender) {
  const chat = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = message;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function botReply(userMessage) {
  const msg = userMessage.toLowerCase();
  let reply;

  if (msg.includes('586')) {
    reply = 'É quando o endereço não foi cadastrado no smart, é comum acontecer quando a casa é nova ou se as últimas fotos no Google forem antigas.';
  } else if (msg.includes('mundial') && msg.includes('palmeiras')) {
    reply = 'Não, o Palmeiras não tem mundial. 51 é pinga!';
  } else if (msg.includes('oi') && msg.includes('olá') && msg.includes('opa')) {
    reply = 'Olá, tudo bem? Seja bem-vindo ao suporte do site, qual é a sua dúvida?';
  } else {
    reply = 'Desculpe não posso responder isso ainda! Faça outra pergunta.'
  }

  setTimeout(() => {
    addMessage(reply, 'bot');
  }, 500);
}

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = ''; // Limpa todas as mensagens
});
