import {signin} from './chat-api';
import BirdIndex  from './sprites/BirdIndex.js';

let bird;

window.addEventListener("load", () => {
    
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    document.querySelector(".register").onclick = () => {
        window.location.href = 'register.html';
    }

    bird = new BirdIndex(document.createElement("div"));

    tick();
});

const tick = () => {

    if (document.querySelector('#api-message').textContent != "LOG") {
        document.querySelector('#api-message').style.visibility = "visible";
    }


    bird.tick();
    requestAnimationFrame(tick);
}