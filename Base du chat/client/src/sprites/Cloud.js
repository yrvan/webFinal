export default class Cloud {

    static FRAME_TOTAL = 5;


    constructor(node) {

        this.node = node;

        this.frame = 0;

        this.speed = Math.random() * (5 - 0.1) + 0.1;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 500/this.speed;

        if (Math.random()>0.49) {
            this.sens = "droite";
            this.x = -100;
        }else {
            this.sens = "gauche";
            this.x = window.innerWidth+10;
        }

        this.y = Math.random() * (window.innerHeight - 100);

        this.speedx = 1 * this.speed+0,1;

        this.opacity = Math.random();

        this.node.style.opacity = this.opacity;

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        this.node.classList.add("cloud");

        document.body.append(this.node);

        this.del = false;

        this.reduce_opacity = false;



        this.node.onmouseover = () =>{
            this.reduce_opacity = true;
        }

        this.node.onmouseout = () =>{
            this.reduce_opacity = false;
        }


    }

    move(){
        if(this.sens == "droite"){
            this.x += this.speedx;
        }
        else{
            this.x -= this.speedx;
        }
    }

    deleteCheck(){
        if(this.sens == "droite"){
            if(this.x > window.innerWidth+10){
                this.del = true;
            }
        }else{
            if(this.x < -100){
                this.del = true;
            }
        }

        if(this.opacity <= 0){
            this.del = true;
        }
    }

    opacityCheck() {
        if (this.reduce_opacity) {
            this.opacity -= 0.01;
            console.log(this.opacity);
        }
    }

    tick() {

        this.opacityCheck();

        this.deleteCheck();

        this.move();
        
        this.node.style.opacity = this.opacity;

        this.node.style.left = this.x + "px";

        const now = Date.now();
        if (now - this.lastUpdateTime > this.updateInterval) {
            this.frame++;
            if (this.frame >= Cloud.FRAME_TOTAL) {
                this.frame = 0;
            }
            this.node.style.backgroundImage = `url('css/spritesheet/cloudFrame/frame${this.frame}.png')`;
            this.lastUpdateTime = now;
        }
    }
}