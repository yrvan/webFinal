import { signin } from './chat-api';
import BirdIndex from './sprites/BirdIndex.js';
import Cursor from './sprites/Cursor.js';


export const spriteList = [];

const BIRD_MAX = 10;

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    document.querySelector(".register").onclick = () => {
        window.location.href = 'register.html';
    }
    spriteList.push(new BirdIndex(document.createElement("div")));


    tick();
});

const tick = () => {


    if (document.querySelector('#api-message').textContent != "LOG") {
        document.querySelector('#api-message').style.opacity = 1;
        document.querySelector('#api-message').style.animation = "shake 1s";
    }




    spriteList.forEach(sprite => {

        if (spriteList.length < BIRD_MAX) {
            if (Math.round(Math.random() * 100) == 5) {
                spriteList.push(new BirdIndex(document.createElement("div")));
            }
        }

        if (sprite instanceof BirdIndex) {

            if (sprite.opacity <= 0) {
                spriteList.splice(spriteList.indexOf(sprite), 1);
                spriteList.push(new BirdIndex(document.createElement("div")));
            }
        }

        if (sprite instanceof Cursor) {
            if (sprite.frame >= Cursor.FRAME_TOTAL) {
                sprite.node.remove();
                spriteList.splice(spriteList.indexOf(sprite), 1);
            }
        }
        sprite.tick();
    });




    requestAnimationFrame(tick);
}
