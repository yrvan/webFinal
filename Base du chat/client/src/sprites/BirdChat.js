import  Bird from './Bird.js';

export default  class BirdChat extends Bird{
    constructor(node) {

        super(node); 

        this.limite();

        this.speedx = 20;
        this.speedy = 15;
        
        this.y = Math.random() * (window.innerHeight-100);
        this.x = Math.random() * (window.innerWidth-40);

        this.node.style.top = this.y+"px";
        this.node.style.left = this.x +"px";

        document.onkeydown = (event) =>{this.move(event.key)}

        document.body.append(node);


    }

    limite(){
        this.plafond = Math.floor(window.innerHeight/216);
        this.sol = window.innerHeight - Math.floor(window.innerHeight/10);
        this.mur_droit = Math.floor(window.innerWidth/384);
        this.mur_gauche = window.innerWidth - Math.floor(window.innerWidth/50);
    }
}