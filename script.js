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
  } else if (msg.includes('móvel') && msg.includes('Móvel') && msg.includes('Movel')) {
    reply = 'O móvel se tiver vendido a fibra, pode subir os dois juntos no sgv, agora se o cliente não quiser a fibra, então pode indicar para qualquer vendedor de móvel.';
	} else if (msg.includes('spam') && msg.includes('bloqueio')) {
    reply = 'O bloqueio de spam, serve para bloquear números que ligam com frequencia, caso seu cliente tenha ativado, ele não consegue atender a auditoria, para saber se tem spam, um teste comum é ligar pelo Callix, se cair caixa postal na de primeira, provavelmente o spam está ativo.';
	} else if (msg.includes('dados') && msg.includes('informações') && msg.includes('fechamento')) {
    reply = 'Os dados que precisamos para subir uma venda em sistema são: CNPJ, Email, 2 Números para contato e endereço para instalação.';
	} else if (msg.includes('fidelidade') && msg.includes('multa') && msg.includes('carencia')) {
    reply = 'Sim, temos fidelidade de 24 meses, porém ela serve para manter o preço fixo, em caso de mudança de endereço e insatisfação com o produto, pode ser cancelado sem custos.';
} else if (msg.includes('Comissão') && msg.includes('comissão')) {
    reply = 'As comissões que você deve considerar, são a partir de 12 vendas: 12 Vendas = R$600, 18 vendas = R$2.340, 21 vendas = R$3.150, 26 vendas = R$4940 p/cima.';
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
