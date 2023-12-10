
export default class Cursor{
    static FRAME_TOTAL = 4;

    constructor(x,y,spriteList) {
        this.x = x;
        this.y = y;

        this.spriteList = spriteList;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;


        this.opacity = 1;
        
        this.frame = 0;

        this.node = document.createElement("div");
        this.node.style.top = this.y +"px";
        this.node.style.left = this.x+"px";

        this.node.classList.add("cursor");

        document.body.append(this.node);


    }

    tick(){
        const now = Date.now();
        if (now - this.lastUpdateTime > this.updateInterval) {
            this.frame++;
            this.node.style.opacity = this.opacity;
            if (this.frame < Cursor.FRAME_TOTAL) {
            this.node.style.backgroundImage = `url('css/spritesheet/cursorFrame/frame${this.frame}.png')`;
            }
            this.lastUpdateTime = now;
        }    

    }
}