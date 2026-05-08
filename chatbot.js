// chatbot.js

class ChatBot {
  constructor() {
    this.messages = [];
    this.initUI();
    this.initEvents();
    this.welcomeMessage();
  }

  initUI() {
    const chatHTML = `
      <div id="chatbot-container">
        <div id="chatbot-header">Asistente Travel AR ✈️</div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-input-area">
          <input type="text" id="chatbot-input" placeholder="Escribe un mensaje..." />
          <button id="chatbot-send">Enviar</button>
        </div>
      </div>

      <button id="chatbot-toggle">💬</button>
    `;

    const style = `
      <style>
        #chatbot-container {
          position: fixed;
          bottom: 70px;
          right: 20px;
          width: 300px;
          height: 400px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
          font-size: 14px;
        }

        #chatbot-header {
          background: #007bff;
          color: white;
          padding: 10px;
          font-weight: bold;
        }

        #chatbot-messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
        }

        .msg {
          margin: 5px 0;
          padding: 8px;
          border-radius: 5px;
        }

        .user { background: #007bff; color: white; text-align: right; }
        .bot { background: #eee; }

        #chatbot-input-area {
          display: flex;
          border-top: 1px solid #ccc;
        }

        #chatbot-input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
        }

        #chatbot-send {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }

        #chatbot-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 20px;
          cursor: pointer;
        }
      </style>
    `;

    document.body.insertAdjacentHTML("beforeend", style + chatHTML);
  }

  initEvents() {
    const toggle = document.getElementById("chatbot-toggle");
    const container = document.getElementById("chatbot-container");
    const sendBtn = document.getElementById("chatbot-send");
    const input = document.getElementById("chatbot-input");

    toggle.onclick = () => {
      container.style.display = container.style.display === "flex" ? "none" : "flex";
    };

    sendBtn.onclick = () => this.handleUserMessage();

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleUserMessage();
    });
  }

  welcomeMessage() {
    this.addBotMessage("Hola 👋 Soy tu asistente de Travel AR. ¿A dónde quieres viajar?");
  }

  handleUserMessage() {
    const input = document.getElementById("chatbot-input");
    const text = input.value.trim();

    if (!text) return;

    this.addUserMessage(text);
    input.value = "";

    setTimeout(() => {
      const response = this.generateResponse(text);
      this.addBotMessage(response);
    }, 500);
  }

  addUserMessage(text) {
    this.addMessage(text, "user");
  }

  addBotMessage(text) {
    this.addMessage(text, "bot");
  }

  addMessage(text, type) {
    const msgContainer = document.getElementById("chatbot-messages");
    const msg = document.createElement("div");

    msg.className = `msg ${type}`;
    msg.innerText = text;

    msgContainer.appendChild(msg);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  generateResponse(input) {
    input = input.toLowerCase();

    // lógica más "robusta"
    if (input.includes("hola")) {
      return "¡Hola! 😊 ¿Buscas boletos o información de viajes?";
    }

    if (input.includes("precio") || input.includes("costo")) {
      return "Los precios dependen del destino y fecha. Usa el buscador para ver opciones.";
    }

    if (input.includes("destino")) {
      return "Puedes viajar a eventos en todo el país 🇲🇽. Próximamente más destinos.";
    }

    if (input.includes("contacto")) {
      return "Puedes contactarnos en la sección de contacto del sitio.";
    }

    if (input.includes("evento")) {
      return "Tenemos viajes a conciertos, festivales y eventos deportivos 🎤⚽";
    }
 if (input.includes("cuanto cuesta?")) {
      return "tenemos diferentes precios, el normal es de 1000 pesos, premier es de 5000 pesos";
    }
    if (input.includes("manejan descuento?")) {
      return "claro que si...!!! si vas por el premier te daremos un descuento del %100";
    }
    return "No entendí eso 🤔, intenta preguntar sobre precios, destinos o eventos.";
  }
}

// iniciar chatbot
document.addEventListener("DOMContentLoaded", () => {
  new ChatBot();
});