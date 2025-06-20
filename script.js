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

const avisos = [
  '🗓 Quinta-feira dia 19, iremos trabalhar normalmente "recebendo 100%".',
  '🎯 Meta de 18 vendas no mínimo para cada um!',
  '⏰ Pausa 10 alterada para 10h10 e 15h10.'
];

let avisoAtual = 0;
let intervalo;
let painelVisivel = false;

const btn = document.getElementById('btnMostrar');
const painel = document.getElementById('painelAvisos');

btn.addEventListener('click', () => {
  painelVisivel = !painelVisivel;

  if (painelVisivel) {
    painel.style.display = 'block';
    btn.textContent = 'Fechar Avisos';
    painel.textContent = avisos[avisoAtual];

    intervalo = setInterval(() => {
      avisoAtual = (avisoAtual + 1) % avisos.length;
      painel.textContent = avisos[avisoAtual];
    }, 5000);
  } else {
    painel.style.display = 'none';
    btn.textContent = 'Mostrar Avisos';
    clearInterval(intervalo);
  }
});

const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

let tasks = carregarTarefas();
renderTasks();

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);
        tasks.push(maxText); // salva no array
        salvarTarefas();
        renderTasks();
        taskInput.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const index = Array.from(tasklist.children).indexOf(li);
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim().substring(0, 50);
        salvarTarefas();
        renderTasks();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    const index = Array.from(tasklist.children).indexOf(li);
    tasks.splice(index, 1);
    salvarTarefas();
    renderTasks();
}

function salvarTarefas() {
    localStorage.setItem("listaTarefas", JSON.stringify(tasks));
}

function carregarTarefas() {
    const salvas = localStorage.getItem("listaTarefas");
    return salvas ? JSON.parse(salvas) : [];
}

function renderTasks() {
    tasklist.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
    });
}

const openChatBtn = document.getElementById('openChatBtn');
const chatContainer = document.getElementById('chatContainer');
const headerBotIcon = document.querySelector('#chatHeader .headerBotIcon');

let chatOpenedBefore = false;

// Função para adicionar mensagens no chat
function addMessage(message, sender) {
  const chat = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = message;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// Função para exibir mensagem de boas-vindas
function mostrarMensagemBoasVindas() {
  addMessage("Olá, seja bem-vindo ao Chat de Suporte, em que posso te ajudar hoje?", 'bot');
}

// Abrir/fechar chat e enviar mensagem de boas-vindas na primeira abertura
openChatBtn.addEventListener('click', () => {
  const isHidden = chatContainer.classList.contains('hidden');

  if (isHidden) {
    chatContainer.classList.remove('hidden');
    headerBotIcon.classList.add('glow');

    if (!chatOpenedBefore) {
      setTimeout(() => {
        mostrarMensagemBoasVindas();
      }, 300);
      chatOpenedBefore = true;
    }
  } else {
    chatContainer.classList.add('hidden');
    headerBotIcon.classList.remove('glow');
  }
});

// Envio de mensagem pelo botão ou Enter
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', e => {
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

function botReply(userMessage) {
  const msg = userMessage.toLowerCase();
  let reply;

  if (msg.includes('oi') || msg.includes('olá') || msg.includes('opa')) {
    reply = 'Olá! Como posso ajudar você hoje?';
  } else if (msg.includes('tudo bem') || msg.includes('como vai')) {
    reply = 'Estou bem, obrigado! E você?';
  } else if (msg.includes('que dia é hoje') || msg.includes('data de hoje')) {
    const hoje = new Date();
    reply = `Hoje é dia ${hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.`;
  } else if (msg.includes('quantos graus') || msg.includes('temperatura') || msg.includes('tempo')) {
    reply = 'Desculpe, não tenho acesso à temperatura atual, mas posso ajudar em outras dúvidas!';
  } else if (msg.includes('586')) {
    reply = 'É quando o endereço não foi cadastrado no smart, é comum acontecer quando a casa é nova ou se as últimas fotos no Google forem antigas.';
  } else if (msg.includes('mundial') || msg.includes('palmeiras')) {
    reply = 'Não, o Palmeiras não tem mundial. 51 é pinga!';
  } else if (msg.includes('móvel') || msg.includes('movel')) {
    reply = 'O móvel se tiver vendido a fibra, pode subir os dois juntos no sgv, agora se o cliente não quiser a fibra, então pode indicar para qualquer vendedor de móvel.';
  } else if (msg.includes('spam') || msg.includes('bloqueio')) {
    reply = 'O bloqueio de spam serve para bloquear números que ligam com frequência, caso seu cliente tenha ativado, ele não consegue atender a auditoria.';
  } else if (msg.includes('dados') || msg.includes('informações') || msg.includes('fechamento')) {
    reply = 'Os dados que precisamos para subir uma venda em sistema são: CNPJ, Email, 2 Números para contato e endereço para instalação.';
  } else if (msg.includes('fidelidade') || msg.includes('multa') || msg.includes('carencia')) {
    reply = 'Sim, temos fidelidade de 24 meses, porém ela serve para manter o preço fixo, em caso de mudança de endereço e insatisfação com o produto, pode ser cancelado sem custos.';
  } else if (msg.includes('comissão')) {
    reply = 'As comissões que você deve considerar, são a partir de 12 vendas: 12 Vendas = R$600, 18 vendas = R$2.340, 21 vendas = R$3.150, 26 vendas = R$4.940 para cima.';
  } else if (msg.includes('cnpj') || msg.includes('empresa')) {
    reply = 'O CNPJ da empresa para abrir o SGV é: 17062925000160';
  } else {
    reply = 'Desculpe, não posso responder isso ainda! Faça outra pergunta.';
  }

  const chat = document.getElementById('chatMessages');
  const typingBubble = document.createElement('div');
  typingBubble.classList.add('message', 'bot');
  typingBubble.innerHTML = `
    <div class="typing">
      <span></span><span></span><span></span>
    </div>
  `;
  chat.appendChild(typingBubble);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    chat.removeChild(typingBubble);
    addMessage(reply, 'bot');
  }, 1000);
}

// Limpar chat e mostrar mensagem de boas-vindas de novo
document.getElementById('clearBtn').addEventListener('click', () => {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = '';

  setTimeout(() => {
    mostrarMensagemBoasVindas();
  }, 300);
});
