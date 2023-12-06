
export default class Bird{
    static FRAME_TOTAL = 3;
    static RED_BIRD = "redBirdFrame";
    static BLUE_BIRD = "blueBirdFrame";
    constructor(node) {
        this.node = node;

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;

        this.colors;

        this.frame = 0
        this.tick()

        this.node.classList.add('bird');

        document.body.append(node);

    }

    tick(){
        const now = Date.now();
        if (now - this.lastUpdateTime > this.updateInterval) {
            this.frame++;
            if (this.frame >= Bird.FRAME_TOTAL) {
                this.frame = 0;
            }
            this.node.style.backgroundImage = `url('css/spritesheet/${this.color}/frame${this.frame}.png')`;
            this.lastUpdateTime = now;
        }
    }
}