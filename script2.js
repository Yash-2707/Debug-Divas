const channel = new BroadcastChannel('message_channel');
const live = new BroadcastChannel('live_channel');

function closeChatBox() {
    document.getElementById("chat_box_outer_container").style.display = "none";
}

function openChat(button) {
    var container = button.closest('.faculty-card');
    var img = container.querySelector('img');
    var h3 = container.querySelector('h3');
    var span = container.querySelector('h5');
    var imgUrl = img.src;
    document.getElementById("profile-image").src = imgUrl;
    document.getElementById("chat_box_outer_container").style.display = "block";
    document.getElementById("profile-name").textContent = h3.textContent;

    var chat_box = document.getElementById("chat_box");
    chat_box.innerHTML = '';

    document.getElementById('live').textContent = span.textContent;
}

function getTextWidth(text, font = '20px Arial') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
}

function sendMessageThroughMessageChannel(message=null) {
    message = document.getElementById('messageInput').value;
    document.getElementById("messageInput").value = "";
    const fullMessage = {
        text: message,
        url: window.location.href
    };
    channel.postMessage(fullMessage);

    const chatBox = document.getElementById('chat_box');

    let pElement = document.createElement("p");
    pElement.textContent = message;
    pElement.style.color = "white";
    pElement.style.font = "20px Arial";

    const width = getTextWidth(message);

    let container = document.createElement("div");
    container.appendChild(pElement);
    container.style.boxShadow = "0px 0px 7px gray";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.width = `${width}px`;
    container.style.maxWidth = "60%";
    container.style.height = "auto";
    container.style.wordWrap = "break-all";
    container.style.overflowX = "scroll";
    container.style.backgroundColor = "#3fcaca";
    container.style.paddingLeft = "10px";
    container.style.paddingRight = "10px";
    container.style.alignSelf = "flex-start";
    container.style.marginLeft = "2.5%";

    let chat_box = document.getElementById("chat_box");
    chat_box.appendChild(container);
    
    chat_box.scrollTop = chat_box.scrollHeight;
}

function sendMessage_live_channel(message) {
    const fullMessage = {
        text: message,
        url: window.location.href
    };
    live.postMessage(fullMessage);
}

channel.onmessage = function(event) {
    const messageData = event.data;
    if (messageData.url.endsWith("Dr_Birmohan_Singh.html")){
        const chatBox = document.getElementById('chat_box');

        let pElement = document.createElement("p");
        pElement.textContent = messageData.text;
        pElement.style.color = "#6082B6";
        pElement.style.font = "20px Arial";

        const width = getTextWidth(messageData.text);

        let container = document.createElement("div");
        container.appendChild(pElement);
        container.style.boxShadow = "0px 0px 7px gray";
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.width = `${width}px`;
        container.style.maxWidth = "60%";
        container.style.height = "auto";
        container.style.wordWrap = "break-all";
        container.style.overflowX = "scroll";
        container.style.backgroundColor = "gainsboro";
        container.style.paddingLeft = "10px";
        container.style.paddingRight = "10px";
        container.style.alignSelf = "flex-end";
        container.style.marginRight = "2.5%";

        let chat_box = document.getElementById("chat_box");
        chat_box.appendChild(container);
        
        chat_box.scrollTop = chat_box.scrollHeight;
    }
};

live.onmessage = function(event) {
    const messageData = event.data;
    if (messageData.url.endsWith("Dr_Birmohan_Singh.html")){
        if (document.getElementById('Dr_Birmohan_Singh').textContent != messageData.text) {
            document.getElementById('Dr_Birmohan_Singh').textContent = messageData.text;
            document.getElementById('livee').textContent = messageData.text;
            sendMessage_live_channel(message="online")
        }
    }
};

window.addEventListener('load', function () {
    sendMessage_live_channel(message="online")
});

window.addEventListener('beforeunload', function () {
    sendMessage_live_channel(message="offline")
});