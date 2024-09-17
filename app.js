document.addEventListener('DOMContentLoaded', () => {
    const nicknameForm = document.getElementById('nickname-form');
    const nicknameInput = document.getElementById('nickname-input');
    const nicknameContainer = document.getElementById('nickname-container');
    const chatContainer = document.getElementById('chat-container');
    const messagesContainer = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    // Проверяем, есть ли уже сохранённый никнейм
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        showChat();
    }

    // Обработчик формы для ввода никнейма
    nicknameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nickname = nicknameInput.value;
        if (nickname.trim()) {
            localStorage.setItem('nickname', nickname);
            showChat();
        }
    });

    // Загружаем сохранённые сообщения из LocalStorage
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedMessages.forEach(msg => appendMessage(msg.nickname, msg.text));

    // Функция для показа чата
    function showChat() {
        nicknameContainer.style.display = 'none'; // Скрываем ввод никнейма
        chatContainer.style.display = 'flex'; // Отображаем чат

        // Если у нас уже есть сохранённый никнейм, отображаем его
        const nickname = localStorage.getItem('nickname');
        if (nickname) {
            alert(`Добро пожаловать, ${nickname}!`);
        }
    }

    // Функция для добавления сообщения в чат
    function appendMessage(nickname, text) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${nickname}: ${text}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Обработчик отправки формы чата
    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        const nickname = localStorage.getItem('nickname');
        if (message.trim() && nickname) {
            appendMessage(nickname, message);
            saveMessage(nickname, message);
            messageInput.value = '';
        }
    });

    // Функция для сохранения сообщения в LocalStorage
    function saveMessage(nickname, text) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ nickname, text });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
});
