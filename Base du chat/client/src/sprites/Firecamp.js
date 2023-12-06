
export default class Firecamp {
    static FRAME_TOTAL = 23;
    constructor(node) {
        this.node = node;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;
        
        this.frame = 0

        this.fireState = "fire";
        this.iceState = "ice";
        this.state = this.fireState;

        this.node.classList.add('firecamp');

        document.body.append(node);

        this.node.onclick = event => {


            
            if (this.state === this.fireState) {
                this.state =this.iceState;
                this.node.style.filter = "invert(100%)";
            }else{
                this.state = this.fireState;
                this.node.style.filter = "";
            }
        }
    }


    tick(){
        const now = Date.now();
        if (now - this.lastUpdateTime > this.updateInterval) {
            this.frame++;
            if (this.frame >= Firecamp.FRAME_TOTAL) {
                this.frame = 0;
            }
            this.node.style.backgroundImage = `url('css/spritesheet/firecampFrame/frame${this.frame}.png')`;
            this.lastUpdateTime = now;
        }
    }
}
