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

openChatBtn.addEventListener('click', () => {
  const isHidden = chatContainer.classList.contains('hidden');

  if (isHidden) {
    chatContainer.classList.remove('hidden');
    headerBotIcon.classList.add('glow');
  } else {
    chatContainer.classList.add('hidden');
    headerBotIcon.classList.remove('glow');
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

  const msgLower = msg.toLowerCase();

  // Respostas genéricas novas
  if (msgLower.includes('oi') || msgLower.includes('olá') || msgLower.includes('opa')) {
    reply = 'Olá! Como posso ajudar você hoje?';
  } else if (msgLower.includes('tudo bem') || msgLower.includes('como vai')) {
    reply = 'Estou bem, obrigado! E você?';
  } else if (msgLower.includes('que dia é hoje') || msgLower.includes('data de hoje')) {
    const hoje = new Date();
    reply = `Hoje é dia ${hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.`;
  } else if (msgLower.includes('quantos graus') || msgLower.includes('temperatura') || msgLower.includes('tempo')) {
    reply = 'Desculpe, não tenho acesso à temperatura atual, mas posso ajudar em outras dúvidas!';
  } else if (msgLower.includes('586')) {
    reply = 'É quando o endereço não foi cadastrado no smart, é comum acontecer quando a casa é nova ou se as últimas fotos no Google forem antigas.';
  } else if (msgLower.includes('mundial') && msgLower.includes('palmeiras')) {
    reply = 'Não, o Palmeiras não tem mundial. 51 é pinga!';
  } else if (msgLower.includes('móvel') || msgLower.includes('movel')) {
    reply = 'O móvel se tiver vendido a fibra, pode subir os dois juntos no sgv, agora se o cliente não quiser a fibra, então pode indicar para qualquer vendedor de móvel.';
  } else if (msgLower.includes('spam') && msgLower.includes('bloqueio')) {
    reply = 'O bloqueio de spam, serve para bloquear números que ligam com frequencia, caso seu cliente tenha ativado, ele não consegue atender a auditoria, para saber se tem spam, um teste comum é ligar pelo Callix, se cair na caixa postal de primeira, provavelmente o spam está ativo.';
  } else if (msgLower.includes('dados') && msgLower.includes('informações') && msgLower.includes('fechamento')) {
    reply = 'Os dados que precisamos para subir uma venda em sistema são: CNPJ, Email, 2 Números para contato e endereço para instalação.';
  } else if (msgLower.includes('fidelidade') && msgLower.includes('multa') && msgLower.includes('carencia')) {
    reply = 'Sim, temos fidelidade de 24 meses, porém ela serve para manter o preço fixo, em caso de mudança de endereço e insatisfação com o produto, pode ser cancelado sem custos.';
  } else if (msgLower.includes('comissão')) {
    reply = 'As comissões que você deve considerar, são a partir de 12 vendas: 12 Vendas = R$600, 18 vendas = R$2.340, 21 vendas = R$3.150, 26 vendas = R$4940 p/cima.';
  } else {
    reply = 'Desculpe, não posso responder isso ainda! Faça outra pergunta.';
  }

  // Adiciona balão com "digitando..."
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

  // Substitui pelos texto final após 1 segundo
  setTimeout(() => {
    chat.removeChild(typingBubble);
    addMessage(reply, 'bot');
  }, 1000);
}

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = ''; // Limpa todas as mensagens
});
