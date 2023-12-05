import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
let username = localStorage.getItem("username");

let textareaNode; 

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {

        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();

    textareaNode= document.querySelector("#chat-enter");

    localStorage.setItem("members_list",username);
    localStorage.setItem("couleursMembres",username+":"+couleurAleatoire()+';');

    username = localStorage.getItem("username") + ": ";

    document.querySelector("#username").textContent = localStorage.getItem("username")+"'s chat";


    textareaNode.onfocus = function () {
      if (this.value =="") {
      this.value = username;
      }
    }
    textareaNode.onkeydown = function () {
      if (this.value.length < username.length+1) {
        this.value = username;
      }
    }

    tick()
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {

  let couleursMembres = localStorage.getItem("couleursMembres").split(";");
  let couleur = "dark";

  for (let couleurMembre of couleursMembres){
    let couleur_Membre = couleurMembre.split(':');
    if (couleur_Membre[0] === fromUser){
        couleur = couleur_Membre[1];
    }
  } 
    let divNODE = document.createElement("div");
    divNODE.classList.add("message");
    if (fromUser == localStorage.getItem("username")){
      let username = localStorage.getItem("username") + ": ";
      message = message.substring(username.length);
    }
    divNODE.style.fontSize = "calc(10px + 0.5vw)";
    divNODE.innerHTML = '<span style="color:' + couleur+ '; font-size: calc(10px + 0.5vw);">'+ fromUser + '</span>'+' : '+message;

    let chatSpaceNode = document.querySelector("#chat-space");
    chatSpaceNode.append(divNODE);

    chatSpaceNode.scrollTop = chatSpaceNode.scrollHeight;


  let memberlistNode = document.querySelector("#member-space")

  memberlistNode.scrollTop = memberlistNode.scrollHeight;

    console.log(fromUser, message, isPrivate);
}

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {
  localStorage.setItem('connectedMembers',members);

let members_list = localStorage.getItem("members_list").split(',');
let connectedMembers = localStorage.getItem('connectedMembers').split(',');
let couleursMembres = localStorage.getItem('couleursMembres');

for (let member of connectedMembers){
  if (!members_list.includes(member)){
    members_list.push(member);
    couleursMembres +=member+':'+couleurAleatoire()+';';
    }
}

localStorage.setItem("members_list",members_list);
localStorage.setItem("couleursMembres",couleursMembres);

let memberSpaceNode = document.querySelectorAll("#member-space div");

for (let memberdiv of memberSpaceNode){
  memberdiv.remove();
}  

let couleur;
couleursMembres = localStorage.getItem("couleursMembres").split(";");

for (let member of connectedMembers){
  
  for (let couleurMembre of couleursMembres){
    let couleur_Membre = couleurMembre.split(':');
    if (couleur_Membre[0] === member){
        couleur = couleur_Membre[1];
    }
  }
      let divNode = document.createElement("div");
      divNode.classList.add("member");
      divNode.style.fontSize = "calc(10px + 0.5vw)";
      divNode.style.color = couleur;
      divNode.innerHTML = member;
      document.querySelector("#member-space").append(divNode); 
}

  console.log(localStorage);
  console.log(members);
}



const tick = () =>{
  
    

    textareaNode.style.fontSize = textareaNode.offsetWidth /23 + "px"

    requestAnimationFrame(tick);

  }

  const couleurAleatoire = () => {
    var rouge = Math.floor(Math.random() * 256);
    var vert = Math.floor(Math.random() * 256);
    var bleu = Math.floor(Math.random() * 256);
    return 'rgb(' + rouge + ',' + vert + ',' + bleu + ')';
}