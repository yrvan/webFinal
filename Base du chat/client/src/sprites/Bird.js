
export default class Bird{
    static FRAME_TOTAL = 3;
    static RED_BIRD = "redBirdFrame";
    static BLUE_BIRD = "blueBirdFrame";
    constructor(node) {
        
        this.node = node;
        this.colors = Bird.RED_BIRD.split;
        this.frame = 0

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;


        this.isFlying = true;
        this.y = 200;
        this.x = 200;
        this.node.style.top = this.y+"px";
        this.node.style.left = this.x +"px";
        this.vitesse = 10;
        this.autoStabilization;  

        this.sens = {
            droite: 'scaleX(1)',
            gauche: 'scaleX(-1)',
            haut: 'rotate(-45deg)',
            bas: 'rotate(45deg)',
            stable:'rotate(0deg)'
        };
        this.direction = this.sens["droite"];

        this.node.style.transform = this.direction+this.sens["stable"];

        this.node.classList.add('bird');
        document.body.append(node);

        document.onkeydown = (event) =>{
            let x = this.x;
            let y = this.y;
            if(this.isFlying){
                if (event.key ==="ArrowLeft"){
                    x -= this.vitesse;
                }
                else if (event.key == "ArrowRight"){
                    x += this.vitesse;
                }
                else if (event.key == "ArrowUp"){
                    y -= this.vitesse;
                }
                else if (event.key == "ArrowDown"){
                    y += this.vitesse;
                }

                if(this.x != x){
                    if (x >= 5 && x <= window.innerWidth - 35){

                        if(x< this.x){
                            if(this.direction != this.sens["gauche"]){
                                this.direction = this.sens["gauche"];
                            }
                        }
                        else{
                            if(this.direction != this.sens["droite"]){
                                this.direction = this.sens["droite"];
                            }
                        }
                        this.x = x;
                        this.node.style.transform = this.direction + this.sens["stable"];
                    }
                }
                
                if(this.y != y){
                    clearTimeout(this.autoStabilization);
                    this.autoStabilization = setTimeout(()=>{this.node.style.transform = this.direction+this.sens["stable"];}, 1000);

                    if (y >=5 && y <= window.innerHeight-30){
                        if (y < this.y){
                            if(!this.node.style.transform.includes(this.sens["haut"])){
                                if (!this.node.style.transform.includes(this.sens["stable"])){
                                    this.node.style.transform = this.direction + this.sens["stable"] ;}
                                else{
                                    this.node.style.transform = this.direction + this.sens["haut"];
                                }
                            }  
                        }else{
                            if(!this.node.style.transform.includes(this.sens["bas"])){
                                if (!this.node.style.transform.includes(this.sens["stable"])){
                                    this.node.style.transform = this.direction + this.sens["stable"] ;}
                                else{
                                    this.node.style.transform = this.direction + this.sens["bas"];
                                }
                            }
                        }
                        this.y = y;
                        
                    }
                }
                
            }
        }
    }
        

    tick(){

        this.node.style.top = this.y+"px";
        this.node.style.left = this.x +"px";
        const now = Date.now();
        if (now - this.lastUpdateTime > this.updateInterval) {
            this.frame++;
            if (this.frame >= Bird.FRAME_TOTAL) {
                this.frame = 0;
            }
            this.node.style.backgroundImage = `url('css/spritesheet/${this.color}/frame${this.frame}.png')`;
            this.lastUpdateTime = now;
        }
}   }