const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const micButton = document.getElementById("mic-button"); // Botão do microfone

// Inicialize o reconhecimento de fala
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = "pt-BR"; // Define o idioma para o reconhecimento de fala

// Quando a fala for reconhecida, envie para o chatbox
recognition.onresult = function (event) {
    const speechToText = event.results[0][0].transcript;
    userInput.value = speechToText; // Defina o valor da entrada de usuário como o texto reconhecido
    sendMessage(); // Chame a função para enviar a mensagem (você pode renomeá-la conforme necessário)
};

// Lidar com erros de reconhecimento de fala
recognition.onerror = function (event) {
    console.error("Erro de reconhecimento de fala: " + event.error);
};

// Lidar com o clique no botão do microfone
micButton.addEventListener("click", function () {
    recognition.start(); // Inicie o reconhecimento de fala quando o botão do microfone for clicado
});

// Função para enviar a mensagem do usuário
function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        appendMessage("Você: " + userMessage, true); // Adicione a mensagem do usuário ao chat
        isTyping = true; // O usuário está digitando antes do bot responder

        // Exibindo a mensagem de "Digitando..."
        const typingMessage = appendMessage("Bot: Digitando...", false);

        setTimeout(function () {
            // Corrigir as palavras da pergunta do usuário
            const perguntaCorrigida = corrigirPalavras(userMessage);

            // Simulando uma resposta após 2 segundos (substitua por sua lógica real)
            const resposta = getRespostaAutomatica(perguntaCorrigida);

            // Removendo a mensagem de "Digitando..."
            chatBox.removeChild(typingMessage);

            // Exibindo a resposta do bot com a animação de digitação
            typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png"); // Substitua pelo caminho correto da imagem do bot
            isTyping = false; // O bot terminou de digitar
        }, 2000); // Aguarde 2 segundos antes de responder (ajuste conforme necessário)

        userInput.value = "";
    }
}

// Função para adicionar uma mensagem do bot ao chat
function appendBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";
    const textElement = document.createElement("p");
    textElement.textContent = message;
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    // Fale a resposta do bot automaticamente quando for exibida
    speakText(message);
}


userInput.addEventListener("input", function () {
    // ...
});

sendButton.addEventListener("click", function () {
    // ...

    // Exemplo de uso:
    typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png");
});

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("div");
    messageElement.className = isUserMessage ? "message user-message" : "message bot-message";

    const textElement = document.createElement("p");
    textElement.textContent = message;

    const avatarElement = document.createElement("img");
    avatarElement.className = isUserMessage ? "avatar user-avatar" : "avatar bot-avatar";
    avatarElement.src = isUserMessage ? "img/chat4 (1).png" : "img/ChatBot-PNG-Photos (1).png"; 

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}

function typeResponse(response, botImageSrc) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";

    const avatarElement = document.createElement("img");
    avatarElement.className = "bot-avatar";
    avatarElement.src = botImageSrc; // Caminho da imagem do bot
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement("p"); // Elemento para a animação de digitação
    messageElement.appendChild(textElement);
    
    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            textElement.textContent += words[index] + " ";
            index++;
        } else {
            // Quando a animação de digitação estiver concluída, exiba a resposta final do bot
            messageElement.appendChild(document.createElement("p")).textContent = response;
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra

    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeResponse(response, botImageSrc) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";

    const avatarElement = document.createElement("img");
    avatarElement.className = "bot-avatar";
    avatarElement.src = botImageSrc; // Caminho da imagem do bot
    messageElement.appendChild(avatarElement);

    const responseElement = document.createElement("p"); // Elemento para a resposta final do bot
    messageElement.appendChild(responseElement);

    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            responseElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra

    chatBox.scrollTop = chatBox.scrollHeight;
}



sendButton.addEventListener("click", function () {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        appendMessage("Você: " + userMessage, true); // Mensagem do usuário
        isTyping = true; // O usuário está digitando antes do bot responder

        // Exibindo a mensagem de "Digitando..."
        const typingMessage = appendMessage("Bot: Digitando...", false);

        setTimeout(function () {
            // Corrigir as palavras da pergunta do usuário
            const perguntaCorrigida = corrigirPalavras(userMessage);
            
            // Simulando uma resposta após 2 segundos (substitua por sua lógica real)
            const resposta = getRespostaAutomatica(perguntaCorrigida);
            
            // Removendo a mensagem de "Digitando..."
            chatBox.removeChild(typingMessage);
            
            // Exibindo a resposta do bot com a animação de digitação
            typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png"); // Substitua pelo caminho correto da imagem do bot
            isTyping = false; // O bot terminou de digitar
        }, 2000); // Aguarde 2 segundos antes de responder (ajuste conforme necessário)

        userInput.value = "";
    }
});

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.className = isUserMessage ? "user-message" : "bot-message";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}

function typeResponse(response) {
    const messageElement = document.createElement("p");
    messageElement.className = "bot-message";
    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            messageElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra
}

function getRespostaAutomatica(pergunta) {
    // Simulação de obtenção da resposta do bot
    return "Esta é a resposta do bot para: " + pergunta;
}

function corrigirPalavras(pergunta) {
    const correcoesPalavras = {
        "ola": "olá",
        "voce": "você",
    // Adicione mais correções conforme necessário
    };

    // Separe a pergunta em palavras
    const palavras = pergunta.toLowerCase().split(" ");

    // Corrija cada palavra se houver uma correção disponível
    const palavrasCorrigidas = palavras.map(palavra => {
        if (correcoesPalavras[palavra]) {
            return correcoesPalavras[palavra];
        } else {
            return palavra;
        }
    });

    // Junte as palavras corrigidas de volta em uma pergunta corrigida
    const perguntaCorrigida = palavrasCorrigidas.join(" ");

    return perguntaCorrigida;
}
//perguntas e respostas
function getRespostaAutomatica(pergunta) {
    const perguntasRespostas = {
        "oi": "oie",
        "olá": "Olá! Como posso ajudar?",
        "como você está?": "Estou bem, mais sou apenas uma máquina, então não tenho sentimentos, mas estou funcionando bem!",
        "qual é o seu nome?": "Meu nome é ChatGPT",
        "o que você pode fazer?": "Posso responder perguntas, fornecer informações e ajudar com tarefas simples.",
        "quem criou você?": "Fui criado pela KS-ONLINE.",
        "você gosta de música?": "Eu não tenho preferências, mas posso ajudar você a encontrar música.",
        "qual é a resposta para a vida, o universo e tudo mais?": "A resposta para a vida, o universo e tudo mais é 42, pelo menos de acordo com o livro O Guia do Mochileiro das Galáxias.",
        "você é um robô?": "Sim, sou um programa de computador.",
        "você pode me contar uma piada?": "Claro! Aqui está uma piada: Por que o programador ficou rico? Porque ele usou o seu Ctrl+C e Ctrl+V.",
        "onde você mora?": "Não tenho um local físico de moradia, pois sou apenas um programa de computador.",
        "você tem irmãos ou irmãs?": "Não, sou único.",
        "qual é o seu objetivo?": "Meu objetivo é fornecer assistência e informações úteis.",
        "como você funciona?": "Funciono processando texto e tentando fornecer respostas com base nas informações disponíveis.",
        "você pode fazer café?": "Não, não consigo fazer café, mas posso sugerir uma receita para você.",
        "você pode me ensinar a programar?": "Posso ajudar você a aprender programação, fornecendo recursos e dicas.",
        "qual é o sentido da vida?": "Essa é uma pergunta filosófica profunda e a resposta pode variar de pessoa para pessoa.",
        "quanto é 2 + 2?": "2 + 2 é igual a 4.",
        "você gosta de filmes?": "Eu não tenho preferências, mas posso recomendar alguns filmes populares.",
        "qual é o seu filme favorito?": "Não tenho um filme favorito, mas posso sugerir filmes baseados em seus interesses.",
        "adeus": "Até logo! Se precisar de mais ajuda, é só perguntar."
    };

    const respostasNaoEntendi = [
        "Desculpe, não entendi sua pergunta.",
        "Não tenho certeza do que você está perguntando.",
        "Pode reformular sua pergunta, por favor?",
        "Estou um pouco confuso. Pode tentar outra pergunta?",
    ];

    const resposta = perguntasRespostas[pergunta.toLowerCase()];

    if (resposta) {
        return resposta; // Se houver uma resposta correspondente, retorne-a
    } else {
        // Se não houver correspondência, escolha uma resposta aleatória do conjunto de respostas de não entendimento
        const respostaNaoEntendi = respostasNaoEntendi[Math.floor(Math.random() * respostasNaoEntendi.length)];
        return respostaNaoEntendi;
    }
}
     

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("div");
    messageElement.className = isUserMessage ? "user-message" : "bot-message";

    const avatarContainer = document.createElement("div");
    avatarContainer.className = isUserMessage ? "avatar-container user-avatar" : "avatar-container bot-avatar";

    const avatarImage = document.createElement("img");
    avatarImage.src = isUserMessage ? "img/chat4 (1).png" : "img/ChatBot-PNG-Photos (1).png"; // Substitua pelos caminhos corretos das imagens

    const textElement = document.createElement("p");
    textElement.textContent = message;

    avatarContainer.appendChild(avatarImage);
    messageElement.appendChild(avatarContainer);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}


function typeResponse(response, botImageSrc) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";

    const avatarElement = document.createElement("img");
    avatarElement.className = "bot-avatar";
    avatarElement.src = botImageSrc; // Caminho da imagem do bot
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement("p");
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            textElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra

    chatBox.scrollTop = chatBox.scrollHeight;
}
typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png"); // Substitua pelo caminho correto da imagem do bot

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.className = isUserMessage ? "user-message" : "bot-message";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}

function typeResponse(response) {
    const messageElement = document.createElement("p");
    messageElement.className = "bot-message";
    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            messageElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra
}

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("div");
    messageElement.className = isUserMessage ? "user-message" : "bot-message";

    const avatarContainer = document.createElement("div");
    avatarContainer.className = isUserMessage ? "avatar-container user-avatar" : "avatar-container bot-avatar";

    const avatarImage = document.createElement("img");
    avatarImage.src = isUserMessage ? "img/chat4 (1).png" : "img/ChatBot-PNG-Photos (1).png"; // Substitua pelos caminhos corretos das imagens

    const textElement = document.createElement("p");
    textElement.textContent = message;

    avatarContainer.appendChild(avatarImage);
    messageElement.appendChild(avatarContainer);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}


function typeResponse(response, botImageSrc) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";

    const avatarElement = document.createElement("img");
    avatarElement.className = "bot-avatar";
    avatarElement.src = botImageSrc; // Caminho da imagem do bot
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement("p");
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            textElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra

    chatBox.scrollTop = chatBox.scrollHeight;
}
typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png"); // Substitua pelo caminho correto da imagem do bot 

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement("div");
    messageElement.className = isUserMessage ? "user-message" : "bot-message";

    const avatarContainer = document.createElement("div");
    avatarContainer.className = isUserMessage ? "avatar-container user-avatar" : "avatar-container bot-avatar";

    const avatarImage = document.createElement("img");
    avatarImage.src = isUserMessage ? "img/chat4 (1).png" : "img/ChatBot-PNG-Photos (1).png"; // Substitua pelos caminhos corretos das imagens

    const textElement = document.createElement("p");
    textElement.textContent = message;

    avatarContainer.appendChild(avatarImage);
    messageElement.appendChild(avatarContainer);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}


function typeResponse(response, botImageSrc) {
    const messageElement = document.createElement("div");
    messageElement.className = "bot-message";

    const avatarElement = document.createElement("img");
    avatarElement.className = "bot-avatar";
    avatarElement.src = botImageSrc; // Caminho da imagem do bot
    messageElement.appendChild(avatarElement);

    const textElement = document.createElement("p");
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);

    const words = response.split(" ");
    let index = 0;

    const typingInterval = setInterval(function () {
        if (index < words.length) {
            textElement.textContent += words[index] + " ";
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Intervalo de 100 milissegundos entre cada palavra

    chatBox.scrollTop = chatBox.scrollHeight;
}
typeResponse("Bot: " + resposta, "img/ChatBot-PNG-Photos (1).png"); // Substitua pelo caminho correto da imagem do bot