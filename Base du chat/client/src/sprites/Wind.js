export default class Wind {
    static FRAME_TOTAL = 16;
    constructor(node) {
        this.node = node;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 200;
        this.interval;


        this.frame = 0

        this.sens = "droite";

        this.node.classList.add('wind');

        this.y = Math.random() * (window.innerHeight - 100);
        this.x = Math.random() * (window.innerWidth - 40);

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        document.body.append(node);

    }

    tick() {

        if (this.sens == "droite") {
            'scaleX(1)';
        }else {
            this.node.style.transform = 'scaleX(-1)';
        }
        
        
        const now = Date.now();
        if (now - this.lastUpdateTime > this.interval) {
            this.frame++;
            if (this.frame < Wind.FRAME_TOTAL) {
                this.node.style.backgroundImage = `url('css/spritesheet/windFrame/frame${this.frame}.png')`;
            }
            this.lastUpdateTime = now;
        }
    }
}