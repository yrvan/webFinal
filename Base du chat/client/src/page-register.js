import { register } from './chat-api';

import Cloud from './sprites/Cloud';

let spriteList = [];

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }

    document.querySelector("#LOG").onclick = () => {
        window.location.href = "index.html";
    }

    document.body.onkeydown = (event) => {
        if (event.key === " ") {
            spriteList.push(new Cloud(document.createElement("div")));
        }
    }

    tick();

})

const tick = () => {

    if (Math.round(Math.random() * 3000) < 25) {
        spriteList.push(new Cloud(document.createElement("div")));
    }

    if (document.querySelector('#api-message').textContent != "REG") {
        document.querySelector('#api-message').style.opacity = 1;
        document.querySelector('#api-message').style.animation = "shake 1s";
    }

    spriteList.forEach((sprite) => {
        if (sprite instanceof Cloud) {
            sprite.tick();
            if (sprite.del) {
                sprite.node.remove();
                spriteList.splice(spriteList.indexOf(sprite), 1);
            }
        }
    });

    requestAnimationFrame(tick);
}