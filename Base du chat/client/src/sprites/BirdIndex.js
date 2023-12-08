import  Bird from './Bird.js';

export default  class BirdIndex extends Bird{
    constructor(node) {

        super(node); 

        this.y = Math.random() * (window.innerHeight-40);
        this.x = Math.random() * (window.innerWidth-40);

        this.node.style.top = this.y+"px";
        this.node.style.left = this.x +"px";

        document.body.append(node);

    }
}