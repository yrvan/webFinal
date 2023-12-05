import {register} from './chat-api';

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }

    document.querySelector("#LOG").onclick =() =>{
        window.location.href="index.html";
    }

    tick();
    
})

const tick = () =>{

    if (document.querySelector('#api-message').textContent != "REG") {
        document.querySelector('#api-message').style.visibility = "visible";
    }

    requestAnimationFrame(tick);
}