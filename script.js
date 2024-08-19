// Theme Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Chatbot Interaction
const chatbotButton = document.getElementById('chatbot-button');
const chatbotModal = document.getElementById('chatbot-modal');
const closeChatbot = document.getElementById('close-chatbot');
const sendMessage = document.getElementById('send-message');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Open Chatbot Modal
chatbotButton.addEventListener('click', () => {
    chatbotModal.style.display = 'flex';
});

// Close Chatbot Modal
closeChatbot.addEventListener('click', () => {
    chatbotModal.style.display = 'none';
});

// Send Message to Cody Buddy
sendMessage.addEventListener('click', async () => {
    const userMessage = chatbotInput.value;
    if (userMessage.trim() !== '') {
        displayMessage('User', userMessage);
        chatbotInput.value = '';
        const aiResponse = await getAiResponse(userMessage);
        displayMessage('Cody Buddy', aiResponse);
    }
});

// Fetch AI Response
async function getAiResponse(message) {
    const response = await fetch('https://apps.taskmagic.com/api/v1/webhooks/ujk7lzrNfFMSCdS6mIlC3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.response;
}

// Display Message
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
