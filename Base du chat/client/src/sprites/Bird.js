


export default class Bird {
    static FRAME_TOTAL = 3;
    static YELLOW_BIRD = "yellowBirdFrame";

    constructor(node) {

        this.node = node;
        this.color = Bird.YELLOW_BIRD;
        this.frame = 0

        this.lastUpdateTime = Date.now();
        this.updateInterval = 100;

        this.isFlying = true;
        this.y;
        this.x;
        this.autoStabilization; //contiendras le timer qui remet bird stable apres une montée ou descente 

        this.velocityY = 0.2;

        this.sens = {
            droite: 'scaleX(1)',
            gauche: 'scaleX(-1)',
            haut: 'rotate(-45deg)',
            bas: 'rotate(45deg)',
            stable: 'rotate(0deg)'
        };
        this.direction = this.sens["droite"];
        this.opacity = 1;

        this.node.style.transform = this.direction + this.sens["stable"];

        this.node.classList.add('bird');



    }

    move(key) {
        let x = this.x;
        let y = this.y;
        if (this.isFlying) {
            if (key === "ArrowLeft") {
                x -= this.speedx;
            }
            else if (key == "ArrowRight") {
                x += this.speedx;
            }
            else if (key == "ArrowUp") {
                y -= this.speedy;
            }
            else if (key == "ArrowDown") {
                y += this.speedy;
            }

            this.updateMove(x, y);

        }
    }

    updateMove(x, y) {
        if (this.x != x) {
            if (x >= this.mur_droit && x <= this.mur_gauche) {

                if (x < this.x) {
                    if (this.direction != this.sens["gauche"]) {
                        this.direction = this.sens["gauche"];
                    }
                }
                else {
                    if (this.direction != this.sens["droite"]) {
                        this.direction = this.sens["droite"];
                    }
                }
                this.x = x;
                this.node.style.transform = this.direction + this.sens["stable"];
            }
        }

        if (this.y != y) {
            clearTimeout(this.autoStabilization);
            this.autoStabilization = setTimeout(() => { this.node.style.transform = this.direction + this.sens["stable"]; }, 500);

            if (y >= this.plafond && y <= this.sol) {
                if (y < this.y) {
                    if (!this.node.style.transform.includes(this.sens["haut"])) {
                        if (!this.node.style.transform.includes(this.sens["stable"])) {
                            this.node.style.transform = this.direction + this.sens["stable"];
                        }
                        else {
                            this.node.style.transform = this.direction + this.sens["haut"];
                        }
                    }
                } else {
                    if (!this.node.style.transform.includes(this.sens["bas"])) {
                        if (!this.node.style.transform.includes(this.sens["stable"])) {
                            this.node.style.transform = this.direction + this.sens["stable"];
                        }
                        else {
                            this.node.style.transform = this.direction + this.sens["bas"];
                        }
                    }
                }
                this.y = y;

            }
        }
    }

    fall() {
        this.y += this.speedy;
        this.speedy += this.velocityY;

        if (this.y > this.sol) {
            this.y = this.sol;
            this.speedy = -this.speedy * 0.1; // Rebondir avec une perte d'énergie
            this.speedx *= 0.85;
        }


        if (this.direction == this.sens["droite"]) {
            this.x += this.speedx;
        } else {
            this.x -= this.speedx;
        }


        if (Math.abs(this.speedx) < 0.01) {
            this.speedx = 0;
        }
    }
    tickVie() {
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

    etatMort() {
        this.node.style.backgroundImage = `url('css/spritesheet/deadBirdFrame/frame.png')`;
        this.node.style.transform = this.direction + "scaleY(-1)";
        this.speedx = 2;
        this.speedy = 2;
    }

    tickMort() {
        if (!this.node.style.backgroundImage.includes("deadBirdFrame")) {
            this.etatMort();
        }
        if (this.speedx > 0) { this.fall(); }

        if (this.speedx <= 0) {
            if (this.opacity > 0) {
                this.opacity -= 0.01;
                this.node.style.opacity = this.opacity;
            }
            else { this.opacity = 0; }
        }

        if (this.opacity <= 0) {
            this.node.remove();
        }

    }

    tick() {
        this.limite();

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        if (this.isFlying) {
            this.tickVie();
        } else {
            this.tickMort();
        }

    }
}


