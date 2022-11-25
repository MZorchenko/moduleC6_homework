const wsUri = "ws://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.btn-send');
let output = document.querySelector('.output');
let websocket;

function writeToScreen(message, classForDiv) {
  let pre = document.createElement("div");
  let output = document.querySelector('#output');
  pre.style.wordWrap = "break-word";
  pre.classList.add(classForDiv)
  pre.innerHTML = message;
  output.append(pre);
  document.getElementById("message").value = ("");
}

btnSend.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  let message = document.getElementById("message").value;

  websocket.onopen = function(evt) {
    console.log("CONNECTED");
    writeToScreen(evt.data);
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(evt.data, "server-message");
  };

  websocket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
  });

  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };

  writeToScreen(message, "user-message");
  websocket.onopen = () => websocket.send(message);
});

// GEOLACATION //

const status = document.querySelector('#status');
const btnGeolocation = document.querySelector('.btn-geolocation');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  writeToScreen(`Широта: ${latitude} °, Долгота: ${longitude} ° <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на карту</a>`, "server-message");
  status.textContent = '';
}

btnGeolocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});