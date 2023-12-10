
export default class Firecamp {
    static FRAME_TOTAL = 23;
    static FIRE_STATE = "fire";
    static ICE_STATE= "ice";
    constructor(node,element,left) {
        this.node = node;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;
        
        this.frame = 0

        this.fireState = "fire";
        this.iceState = "ice";
        this.element = element;

        this.node.classList.add('firecamp');
        this.node.style.left = left+"vw";

        document.body.append(node);

        this.switch = false;
        
        this.node.onclick = () =>{


          this.switch = true;

        } 
    }

    change(element) {
        if (element === Firecamp.ICE_STATE) {
            this.element =Firecamp.ICE_STATE;
            this.node.style.filter = "invert(100%)";
        }else{
            this.element = Firecamp.FIRE_STATE;
            this.node.style.filter = "";
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
