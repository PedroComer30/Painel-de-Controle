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
let chatOpenedOnce = false; // controla se a mensagem de boas-vindas já foi exibida

openChatBtn.addEventListener('click', () => {
  const isHidden = chatContainer.classList.contains('hidden');

  if (isHidden) {
    chatContainer.classList.remove('hidden');
    headerBotIcon.classList.add('glow');
    openChatBtn.classList.remove('has-notification');
    pendingReply = false; // usuário abriu o chat, não tem notificação pendente

    // Mensagem de boas-vindas só na primeira vez que abrir o chat
    if (!chatOpenedOnce) {
      setTimeout(() => {
        addMessage("Olá, seja bem-vindo ao Chat de Suporte, em que posso te ajudar hoje?", 'bot');
        chatOpenedOnce = true;
      }, 300);
    }
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

  // Se o chat estiver fechado e houver mensagem pendente, mostra notificação fixa
  if (chatContainer.classList.contains('hidden') && pendingReply) {
    openChatBtn.classList.add('has-notification');
  }

  const reply = botReply(message);
  showTypingAndReply(reply);
}

function showTypingAndReply(reply) {
  const chat = document.getElementById('chatMessages');

  // Mostra bolinha de "digitando"
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

    if (typeof reply === 'string') {
      addMessage(reply, 'bot');
    } else if (reply && reply.type === 'link') {
      addMessage(reply, 'bot');
    } else {
      addMessage('Desculpe, não entendi sua pergunta.', 'bot');
    }

    pendingReply = false;
    if (!chatContainer.classList.contains('hidden')) {
      openChatBtn.classList.remove('has-notification');
    }
  }, 1000);
}

function addMessage(message, sender) {
  const chat = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  if (sender === 'bot' && typeof message === 'object' && message.type === 'link') {
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

// Variáveis e funções para fluxos guiados (confirmação e checklist)
let creatingConfirmation = false;
let confirmationStep = 0;
let confirmationData = {
  portabilidades: '',
  numerosPlano: '',
  plano: '',
  valor: '',
  cnpj: ''
};

let fillingChecklist = false;
let checklistStep = 0;
let checklistData = {
  nomeRepresentante: '',
  cpf: '',
  rg: '',
  cnpj: '',
  telefone: '',
  email: '',
  tipoVenda: '',
  numeroLinha: '',
  plano: '',
  valor: '',
  quantidadeLinhas: ''
};

function botReply(userMessage) {
  const msg = userMessage.toLowerCase();
  let reply;

  if (msg.includes('preencha') && !msg.includes('confirmação') && !msg.includes('checklist')) {
    return 'O que você deseja preencher? Opções:\n1. Confirmação\n2. Checklist móvel';
  }

  if (msg.includes('monte') && msg.includes('confirmação')) {
    creatingConfirmation = true;
    confirmationStep = 1;
    return 'Quantas portabilidades:';
  }

  if (msg.includes('checklist') && !creatingConfirmation) {
    fillingChecklist = true;
    checklistStep = 1;
    return 'Informe o Nome do representante legal:';
  }

  if (!creatingConfirmation && !fillingChecklist) {
    if (msg === '1' || msg === 'confirmação') {
      creatingConfirmation = true;
      confirmationStep = 1;
      return 'Quantas portabilidades:';
    } else if (msg === '2' || msg === 'checklist móvel') {
      fillingChecklist = true;
      checklistStep = 1;
      return 'Informe o Nome do representante legal:';
    }
  }

  if (creatingConfirmation) {
    if (confirmationStep === 1) {
      confirmationData.portabilidades = userMessage; // Quantas portabilidades
      reply = 'Número(s) do plano:';
      confirmationStep++;
    } else if (confirmationStep === 2) {
      confirmationData.numerosPlano = userMessage; // Número(s) do plano
      reply = 'Plano contratado:';
      confirmationStep++;
    } else if (confirmationStep === 3) {
      confirmationData.plano = userMessage; // Plano contratado
      reply = 'Valor:';
      confirmationStep++;
    } else if (confirmationStep === 4) {
      confirmationData.valor = userMessage; // Valor
      reply = 'Informe o CNPJ:';
      confirmationStep++;
    } else if (confirmationStep === 5) {
      confirmationData.cnpj = userMessage; // CNPJ

      reply = `Só confirmando o plano contratado é:\n` +
              `${confirmationData.portabilidades} PORTABILIDADES nos números ${confirmationData.numerosPlano} com plano de ${confirmationData.plano}\n` +
              `VALOR: ${confirmationData.valor}\n` +
              `Vai ser feita a contratação de ${confirmationData.portabilidades} *PORTABILIDADE*\n\n` +
              `Você está ciente que é necessário efetuar a compra do chip para fazer a ativação?\n\n` +
              `CNPJ: ${confirmationData.cnpj}\n` +
              `Posso confirmar?`;

      // Resetar os dados e o fluxo
      creatingConfirmation = false;
      confirmationStep = 0;
      confirmationData = {
        portabilidades: '',
        numerosPlano: '',
        plano: '',
        valor: '',
        cnpj: ''
      };
    }
    return reply;
  }

  if (fillingChecklist) {
    if (checklistStep === 1) {
      checklistData.nomeRepresentante = userMessage;
      reply = 'Informe o CPF:';
      checklistStep++;
    } else if (checklistStep === 2) {
      checklistData.cpf = userMessage;
      reply = 'Informe o RG:';
      checklistStep++;
    } else if (checklistStep === 3) {
      checklistData.rg = userMessage;
      reply = 'Informe o CNPJ:';
      checklistStep++;
    } else if (checklistStep === 4) {
      checklistData.cnpj = userMessage;
      reply = 'Informe o telefone:';
      checklistStep++;
    } else if (checklistStep === 5) {
      checklistData.telefone = userMessage;
      reply = 'Informe o email:';
      checklistStep++;
    } else if (checklistStep === 6) {
      checklistData.email = userMessage;
      reply = 'Qual o tipo de venda? (ex: Número Novo, Portabilidade, Portabilidade c/ Transf. Titularidade, Migração)';
      checklistStep++;
    } else if (checklistStep === 7) {
      checklistData.tipoVenda = userMessage;
      reply = 'Número da linha:';
      checklistStep++;
    } else if (checklistStep === 8) {
      checklistData.numeroLinha = userMessage;
      reply = 'Plano:';
      checklistStep++;
    } else if (checklistStep === 9) {
      checklistData.plano = userMessage;
      reply = 'Valor:';
      checklistStep++;
    } else if (checklistStep === 10) {
      checklistData.valor = userMessage;
      reply = 'Quantidade de linhas:';
      checklistStep++;
    } else if (checklistStep === 11) {
      checklistData.quantidadeLinhas = userMessage;

      reply = `Checklist Móvel: \n\n` +
        `NOME REPRESENTANTE LEGAL: ${checklistData.nomeRepresentante}\n` +
        `CPF: ${checklistData.cpf}\n` +
        `RG: ${checklistData.rg}\n` +
        `CNPJ: ${checklistData.cnpj}\n` +
        `TELEFONE : ${checklistData.telefone}\n` +
        `EMAIL : ${checklistData.email}\n` +
        `Tipo de Venda: `;

      // Monta os tipos de venda marcando o correto com "x"
      const tipos = ["Número Novo", "Portabilidade", "Portabilidade c/ Transf. Titularidade", "Migração"];
      const tipoMinusculo = checklistData.tipoVenda.toLowerCase();
      tipos.forEach(tipo => {
        const marcado = tipo.toLowerCase() === tipoMinusculo ? 'x' : ' ';
        reply += `(${marcado}) ${tipo} `;
      });

      reply += `\n\nCLIENTE CIENTE DA COMPRA DO CHIP: SIM (x) NÃO ()\n\n` +
               `Número da(s) linha(s): ${checklistData.numeroLinha}\n` +
               `Plano: ${checklistData.plano}\n` +
               `Valor: ${checklistData.valor}\n\n` +
               `Quantidade de Linha(s): ${checklistData.quantidadeLinhas}\n` +
               `Campanha: AVULSO\n` +
               `Vencimento: 26`;

      fillingChecklist = false;
      checklistStep = 0;
      checklistData = {
        nomeRepresentante: '',
        cpf: '',
        rg: '',
        cnpj: '',
        telefone: '',
        email: '',
        tipoVenda: '',
        numeroLinha: '',
        plano: '',
        valor: '',
        quantidadeLinhas: ''
      };
      return reply;
    }
    return reply;
  }

  // Perguntas genéricas
  if (msg.includes('oi') || msg.includes('olá') || msg.includes('ola') || msg.includes('bom dia') || msg.includes('boa tarde') || msg.includes('boa noite')) {
    return 'Olá! Como posso ajudar você hoje?';
  }
  if (msg.includes('tudo bem')) {
    return 'Tudo ótimo, obrigado por perguntar! E você?';
  }
  if (msg.includes('que dia é hoje')) {
    const today = new Date();
    return `Hoje é dia ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  }
  if (msg.includes('quantos') && msg.includes('você')) {
    return 'Eu posso responder suas perguntas e ajudar com confirmações e checklists!';
  }

  return 'Desculpe, não entendi sua pergunta.';
}

// Limpar chat
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('chatMessages').innerHTML = '';
  // Reseta estados de fluxos
  creatingConfirmation = false;
  confirmationStep = 0;
  fillingChecklist = false;
  checklistStep = 0;
  pendingReply = false;
  openChatBtn.classList.remove('has-notification');
});

// Botão para aumentar/reduzir tamanho do chat
const toggleSizeBtn = document.getElementById('toggleSizeBtn');
toggleSizeBtn.addEventListener('click', () => {
  chatContainer.classList.toggle('large');
});
