import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();

    let textareaNode = document.querySelector("#chat-enter");
  
    textareaNode.onfocus = function () {
      this.value = "Moi: ";
    }
  
    textareaNode.onkeydown = function () {
      if (this.value.length < 5) {
        this.value = "Moi: ";
      }
    }
  
    textareaNode.onblur = function () {
      this.value = "";
    }

    tick()
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
    let divNODE = document.createElement("div");
    divNODE.classList.add("message");

    divNODE.innerHTML = '<span style="color:' + couleurAleatoire()+ '; font-size: calc(10px + 0.5vw);">'+ fromUser + '</span>'+' : '+message;

    let chatSpaceNode = document.querySelector("#chat-space");
    chatSpaceNode.append(divNODE);

    chatSpaceNode.scrollTop = chatSpaceNode.scrollHeight;

    console.log(fromUser, message, isPrivate);
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {
    console.log(members);
}



const tick = () =>{
  
    let textareaNode = document.querySelector("textarea");

    textareaNode.style.fontSize = textareaNode.offsetWidth /23 + "px"

    requestAnimationFrame(tick);

  }

  const couleurAleatoire = () => {
    var rouge = Math.floor(Math.random() * 256);
    var vert = Math.floor(Math.random() * 256);
    var bleu = Math.floor(Math.random() * 256);
    return 'rgb(' + rouge + ',' + vert + ',' + bleu + ')';
}