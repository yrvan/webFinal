import { signin } from './chat-api';
import BirdIndex from './sprites/BirdIndex.js';
import Cursor from './sprites/Cursor.js';
import Wind from './sprites/Wind.js';


export const spriteList = [];
let wind = 0;

const BIRD_MAX = 10;

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }

    document.querySelector(".register").onclick = () => {
        window.location.href = 'register.html';
    }

    document.body.onkeydown = (event) => {
        if (event.key === " ") {
            spriteList.push(new BirdIndex(document.createElement("div")));
        }
    }

    document.addEventListener('wheel', (event) =>{
        if (event.deltaY > 0) {
            wind -= 0.1;
            console.log(wind);
            
        } else {
            wind += 0.1;
            console.log(wind);
        }
    });

    tick();
});

const tick = () => {

    if (Math.round(Math.random() * 3000) < 25) {
        spriteList.push(new Wind(document.createElement("div")));
    }

    if (document.querySelector('#api-message').textContent != "LOG") {
        document.querySelector('#api-message').style.opacity = 1;
        document.querySelector('#api-message').style.animation = "shake 1s";
    }

    if (spriteList.length < BIRD_MAX) {
        if (Math.round(Math.random() * 3000) < 25) {
            spriteList.push(new BirdIndex(document.createElement("div")));
        }
    }

    spriteList.forEach(sprite => {

        if (sprite instanceof BirdIndex) {

            sprite.wind = wind;

            if (sprite.opacity <= 0 && !sprite.propulsion) {
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

        if (sprite instanceof Wind) {

            sprite.interval = sprite.updateInterval -  Math.abs(20 * wind);

            if(wind < 0){
                sprite.sens = "gauche";
            }else{
                sprite.sens = "droite";
            }

            if (sprite.updateInterval <= 50) {
                sprite.updateInterval = 50
            }
            if (sprite.updateInterval >= 200) {
                sprite.updateInterval = 200
            }

            if (sprite.frame >= Wind.FRAME_TOTAL) {
                sprite.node.remove();
                spriteList.splice(spriteList.indexOf(sprite), 1);
            }
        }
        sprite.tick();
    })




    requestAnimationFrame(tick);
}
