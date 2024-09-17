document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    // Загружаем сохранённые сообщения из LocalStorage
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedMessages.forEach(msg => appendMessage(msg));

    // Функция для добавления сообщения в чат
    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Обработчик отправки формы
    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        if (message.trim()) {
            appendMessage(message);
            saveMessage(message);
            messageInput.value = '';
        }
    });

    // Функция для сохранения сообщения в LocalStorage
    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
});
