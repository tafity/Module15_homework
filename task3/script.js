const echo = 'wss://echo-ws-service.herokuapp.com';

const user = document.querySelector('.client')
const sendBtn = document.querySelector('.button-send');
const geoBtn = document.querySelector('.location');
const chat = document.querySelector('.convo-window');
const inputContent = document.querySelector('.input');
const eraseBtn = document.querySelector('.erase');

//Функционал чата
function addMessage(message, position='flex-start') {
    let element = `
        <p class='message-window' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    let convo = chat.innerHTML;
    chat.innerHTML = convo + element;
    chat.scrollTop = chat.scrollHeight;
};


let websocket = new WebSocket(echo); 
websocket.onopen = function(evt) {
    console.log("CONNECTED");
};
websocket.onmessage = function(evt) {
    addMessage(`Ответ сервера: ${evt.data}`, 'flex-end');
};
websocket.onerror = function(evt) {
    addMessage(`server: ${evt.data}`, 'flex-end');
};

sendBtn.addEventListener ('click', () => {
   // inputContent.value;
    websocket.send(inputContent.value);
    addMessage(`Вы: ${inputContent.value}`);
    inputContent.value = '';
});

//Гео-локация 
const error = () => {
	let err = 'Невозможно получить ваше местоположение';
	addMessage(err);
  };

const geo = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	addMessage(`<a  href='${geoLink}' class= 'link' target='_blank'>Ссылка на вашу гео-локацию </a>`);
  };

  geoBtn.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(geo, error);
	}
  });
  eraseBtn.addEventListener('click', () => {
	chat.innerHTML = " ";
  });

/*const wsUri = " wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input');
const btnMess = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.user-messages');
const serverMessages = document.querySelector('.server-messages');
const wrapperChat =  document.querySelector('.wrapper-chat');

//Выводит сообщения
function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMessages.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }

//Объект соединения
 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};
  
  //отправка сообщения
  btnMess.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`Вы: ${message}`);
	input.value = ''

  });

  
  //гео-локация.
  // Функция,  об ошибке
const error = () => {
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
  };
  
  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
  };
  
  btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });

  //удаляем сообщения
  serverMessages.addEventListener('click', () => {
	userMessages.innerHTML = " ";
  });*/