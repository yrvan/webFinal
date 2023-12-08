import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';
import Firecamp from './sprites/Firecamp.js';
import BirdChat  from './sprites/BirdChat.js';

let username = localStorage.getItem("username");
let textareaNode;
let firecamp;
let bird;

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

    firecamp = new Firecamp(document.createElement("div"));

    bird = new BirdChat(document.createElement("div"));

    tick()
})

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {

  let couleursMembres = localStorage.getItem("couleursMembres").split(";");
  let couleur = "black";

  if (message.includes('/new_color')){
    let newCouleursMembres;
    for (let couleurMembre of couleursMembres){
      newCouleursMembres += couleurMembre.split(':')[0] +':'+couleurAleatoire()+';';
    }
    localStorage.setItem("couleursMembres",newCouleursMembres)
  }

  for (let couleurMembre of couleursMembres){
    if (couleurMembre.includes(fromUser)){
        couleur = couleurMembre.split(':')[1];
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
    if (couleurMembre.includes(member)){
        couleur = couleurMembre.split(':')[1];
    }
  }
      let divNode = document.createElement("div");
      divNode.classList.add("member");
      divNode.style.fontSize = "calc(10px + 0.5vw)";
      divNode.style.color = couleur;
      divNode.innerHTML = member;
      document.querySelector("#member-space").append(divNode); 
}

let memberOffline = false;
for (let member of members_list) {
  if (!connectedMembers.includes(member)) {
      if(!memberOffline){
        memberOffline=true;
        let divNode = document.createElement("div");
        divNode.classList.add("member");
        divNode.style.fontSize = "calc(10px + 0.5vw)";
        divNode.innerHTML = "Membres Offline :";
        document.querySelector("#member-space").append(divNode); 
      }
      let divNode = document.createElement("div");
      divNode.classList.add("member");
      divNode.style.fontSize = "calc(10px + 0.5vw)";
      divNode.innerHTML = member;
      document.querySelector("#member-space").append(divNode); 
  }
}
  console.log(members);
}


const couleurAleatoire = () => {
  var rouge = Math.floor(Math.random() * 256);
  var vert = Math.floor(Math.random() * 256);
  var bleu = Math.floor(Math.random() * 256);
  return 'rgb(' + rouge + ',' + vert + ',' + bleu + ')';
}

const collision = (element1, element2, distance) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
      rect1.right < rect2.left - distance ||
      rect1.left > rect2.right + distance ||
      rect1.bottom < rect2.top - distance ||
      rect1.top > rect2.bottom + distance
  );
}

const sontProches = (element1, element2, distanceMax) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  // Vérifiez si les éléments sont plus éloignés que la distanceMax dans une direction
  const tropLoinHorizontalement = rect1.right < rect2.left - distanceMax || rect1.left > rect2.right + distanceMax;
  const tropLoinVerticalement = rect1.bottom < rect2.top - distanceMax || rect1.top > rect2.bottom + distanceMax;

  // Si l'un des éléments est trop loin dans l'une des directions, ils ne sont pas proches
  return !(tropLoinHorizontalement || tropLoinVerticalement);
}

const tick = () =>{

      if(firecamp.state == firecamp.fireState){
        bird.color = BirdChat.RED_BIRD;
      }else{
        bird.color = BirdChat.BLUE_BIRD;
      }

      if(bird.opacity <= 0 ){
        bird = new BirdChat(document.createElement("div"));
      }
      
      if (collision(bird.node, firecamp.node,-53)) {
        if(bird.isFlying){
          bird.isFlying = false;
        }  
      }

    textareaNode.style.fontSize = textareaNode.offsetWidth /23 + "px"
    firecamp.tick();
    bird.tick();
    requestAnimationFrame(tick);

  }




