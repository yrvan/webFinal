import  Bird from './Bird.js';

export default  class BirdChat extends Bird{
    constructor(node) {

        super(node); 

        this.y = Math.random() * (window.innerHeight-40);
        this.x = Math.random() * (window.innerWidth-40);

        this.node.style.top = this.y+"px";
        this.node.style.left = this.x +"px";

        document.onkeydown = (event) =>{this.move(event.key)}

        document.body.append(node);


    }
}