import {signin} from './chat-api';
import BirdIndex  from './sprites/BirdIndex.js';


window.addEventListener("load", () => {
    
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    document.querySelector(".register").onclick = () => {
        window.location.href = 'register.html';
      }

      tick()
});

const tick = () => {

    if (document.querySelector('#api-message').textContent != "LOG") {
        document.querySelector('#api-message').style.visibility = "visible";
    }

    requestAnimationFrame(tick);
}