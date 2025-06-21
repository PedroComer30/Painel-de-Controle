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
const chatNotification = document.getElementById('chatNotification');
let pendingReply = false;

openChatBtn.addEventListener('click', () => {
  const isHidden = chatContainer.classList.contains('hidden');

  if (isHidden) {
    chatContainer.classList.remove('hidden');
    headerBotIcon.classList.add('glow');
    openChatBtn.classList.remove('has-notification');

    // Mensagem de boas-vindas sempre que abrir o chat
    setTimeout(() => {
      addMessage("Olá, seja bem-vindo ao Chat de Suporte, em que posso te ajudar hoje?", 'bot');
    }, 300);
  } else {
    chatContainer.classList.add('hidden');
    headerBotIcon.classList.remove('glow');
  }
});

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  input.value = '';
  pendingReply = true;

  setTimeout(() => {
    if (chatContainer.classList.contains('hidden') && pendingReply) {
      openChatBtn.classList.add('has-notification');
    }
  }, 900);

  botReply(message);
}

function addMessage(message, sender) {
  const chat = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  if (sender === 'bot' && typeof message === 'object' && message.type === 'link') {
    // Se for resposta com link, cria link clicável
    const linkEl = document.createElement('a');
    linkEl.href = message.url;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkEl.textContent = message.text;
    linkEl.style.color = '#a5006e';
    msg.appendChild(linkEl);
  } else {
    msg.textContent = message;
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function botReply(userMessage) {
  const msg = userMessage.toLowerCase();
  let reply;
  let isLinkReply = false;

  if (msg.includes('oi') || msg.includes('olá') || msg.includes('opa')) {
    reply = 'Olá! Como posso ajudar você hoje?';
  } else if (msg.includes('tudo bem') || msg.includes('como vai')) {
    reply = 'Estou bem, obrigado! E você?';
  } else if (msg.includes('que dia é hoje') || msg.includes('data de hoje')) {
    const hoje = new Date();
    reply = `Hoje é dia ${hoje.toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })}.`;
  } else if (msg.includes('quantos graus') || msg.includes('temperatura') || msg.includes('tempo')) {
    reply = 'Desculpe, não tenho acesso à temperatura atual, mas posso ajudar em outras dúvidas!';
  } else if (msg.includes('586')) {
    reply = 'É quando o endereço não foi cadastrado no smart, é comum acontecer quando a casa é nova ou se as últimas fotos no Google forem antigas.';
  } else if (msg.includes('mundial') || msg.includes('palmeiras')) {
    reply = 'Não, o Palmeiras não tem mundial. 51 é pinga!';
  } else if (msg.includes('móvel') || msg.includes('movel')) {
    reply = 'O móvel se tiver vendido a fibra, pode subir os dois juntos no sgv...';
  } else if (msg.includes('spam') || msg.includes('bloqueio')) {
    reply = 'O bloqueio de spam serve para bloquear números que ligam com frequência...';
  } else if (msg.includes('dados') || msg.includes('informações') || msg.includes('fechamento')) {
    reply = 'Precisamos de CNPJ, Email, 2 telefones e endereço para instalação.';
  } else if (msg.includes('fidelidade') || msg.includes('multa') || msg.includes('carencia')) {
    reply = 'Temos fidelidade de 24 meses, mas há exceções para cancelamento.';
  } else if (msg.includes('comissão')) {
    reply = 'Comissões: 12 vendas = R$600, 18 = R$2.340, 21 = R$3.150, 26+ = R$4.940+';
  } else if (msg.includes('cnpj') || msg.includes('empresa')) {
    reply = 'CNPJ para SGV: 17062925000160';
  } else if (msg.includes('plano') || msg.includes('tv') || msg.includes('canal') || msg.includes('canais')) {
    showImagesWithDownload([
      {
        url: 'images/pacote1.jpg',
        nome: 'Pacote-TV-Básico.jpg'
      },
      {
        url: 'images/pacote2.jpg',
        nome: 'Pacote-TV-Premium.jpg'
      }
    ]);
    pendingReply = false;
    openChatBtn.classList.remove('has-notification');
    return;
  } else if (msg.includes('smart')) {
    reply = { type: 'link', text: 'Smart - https://www.smart.com.br', url: 'https://vivovendas.vivo.com.br/sales_ext/start.swe?SWECmd=GotoView&SWEView=NV+Dealer+Home+Page+View&SWERF=1&SWEHo=vivovendas.vivo.com.br&SWEBU=1&SWEApplet0=NV+Sales+Opportunity+List+Applet+-+Home+Page&SWERowId0=8-7IBK00I4' };
    isLinkReply = true;
  } else if (msg.includes('callix')) {
    reply = { type: 'link', text: 'Callix - https://www.callix.com.br', url: 'https://jrservicos.callix.com.br/login' };
    isLinkReply = true;
  } else if (msg.includes('simplifique')) {
    reply = { type: 'link', text: 'Simplifique - https://www.simplifique.com.br', url: 'https://autenticaint.vivo.com.br/LoginCorp/?bmctx=D3346598D37D25323F24C459B0AA627D72F11002ACA4C6E5F0DC260DDCE7E518&contextType=external&username=string&challenge_topaz=true&challenge_url=https%3A%2F%2Fautenticaint.vivo.com.br%2FLoginCorp%2F&password=secure_string&request_id=-1918812876242615029&authn_try_count=0&locale=pt_BR&resource_url=https%253A%252F%252Fautenticaint.vivo.com.br%252Fms_oauth%252Foauth2%252Fui%252Fvivooauthservice%252Fshowconsent%253Fresponse_type%253Dcode%2526client_id%253D5598f3b889dbd39d9320bfb08954ead8%2526redirect_uri%253Dhttps%25253A%25252F%25252Fsimplifiquevivoemp.com.br%25252Foauth-telefonica.aspx%2526scope%253DSIMPLIFIQUEProfile.me%2526oracle_client_name%253DSIMPLIFIQUE' };
    isLinkReply = true;
  } else if (msg.includes('infob2b')) {
    reply = { type: 'link', text: 'Infob2b - https://www.infob2b.com.br', url: 'https://autenticaint.vivo.com.br/LoginCorp/?bmctx=3125F162882003CD1627B3AE727AEEB366CA6E0DA885B6042DEAF37E3B3193DA&contextType=external&username=string&challenge_topaz=true&challenge_url=https%3A%2F%2Fautenticaint.vivo.com.br%2FLoginCorp%2F&password=secure_string&request_id=-1278206927163946539&authn_try_count=0&locale=pt_BR&resource_url=https%253A%252F%252Fautenticaint.vivo.com.br%252Fms_oauth%252Foauth2%252Fui%252Fvivooauthservice%252Fshowconsent%253Fresponse_type%253Dcode%2526client_id%253D7631b26b13f248ec932bab0b7ac653f3%2526redirect_uri%253Dhttps%25253A%25252F%25252Fwww.portalinfob2b.com.br%25252Flogin%2526scope%253DAPIManager.Default%252BPortalInfoB2B.Default%2526oracle_client_name%253DPortalInfoB2B' };
    isLinkReply = true;
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
    if (isLinkReply) {
      addMessage(reply, 'bot');
    } else {
      addMessage(reply, 'bot');
    }
    pendingReply = false;
    openChatBtn.classList.remove('has-notification');
  }, 1000);
}

function showImagesWithDownload(images) {
  const chat = document.getElementById('chatMessages');

  images.forEach(image => {
    const container = document.createElement('div');
    container.classList.add('message', 'bot');
    container.style.flexDirection = 'column';

    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.nome;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '10px';
    img.style.marginBottom = '5px';

    const downloadBtn = document.createElement('a');
    downloadBtn.href = image.url;
    downloadBtn.download = image.nome;
    downloadBtn.textContent = '📥 Baixar imagem';
    downloadBtn.style.color = '#a5006e';
    downloadBtn.style.textDecoration = 'underline';
    downloadBtn.style.fontSize = '14px';

    container.appendChild(img);
    container.appendChild(downloadBtn);
    chat.appendChild(container);
  });

  chat.scrollTop = chat.scrollHeight;
}

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('chatMessages').innerHTML = '';
});
