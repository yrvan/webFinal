import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();

    let textareaNode = document.querySelector("textarea");
  
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
  
    window.requestAnimationFrame(tick)
  
  }