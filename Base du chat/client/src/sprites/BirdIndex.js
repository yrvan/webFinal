import Bird from './Bird.js';

import Cursor from "./Cursor";
import { spriteList } from "../page-index";


export default class BirdIndex extends Bird {
    constructor(node) {

        super(node);

        this.node = node;

        if (Math.round(Math.random() * 1) == 1) {
            this.spawm = "#tuyau1";
        } else {
            this.spawm = "#tuyau2";
        }

        this.tuyau = document.querySelector(this.spawm).getBoundingClientRect();

        this.limite();

        this.x = 25;
        this.y = 0;

        this.opacity = 0;
        this.node.style.opacity = this.opacity;

        this.speedy = 10;
        this.speedx = 60;

        this.wind;

        document.querySelector(this.spawm).append(this.node);

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        this.propulsion = true;

        this.simulerPropulsion(0.1, 900);

        this.node.onmouseover = (evt) => {
            if (this.isFlying && !this.propulsion) {
                spriteList.push(new Cursor(evt.x, evt.y));
                this.isFlying = false;
            }
        }
    }

    limite() {
        this.sol = Math.abs((window.innerHeight - Math.floor(window.innerHeight / 15)) - this.tuyau.height);
        this.plafond = Math.floor(window.innerHeight / 210) - this.tuyau.height;
        this.mur_droit = (window.innerWidth - this.tuyau.x) - 20;
        this.mur_gauche = (-1) - this.tuyau.x;
    }

    move() {
        let x = this.x;
        let y = this.y;
        let random = Math.round(Math.random() * 10)

        if (random == 1 || random == 5 || random == 7) {
            x -= this.speedx;
        }
        else if (random == 2 || random == 9 || random == 8) {
            x += this.speedx;
        }
        else if (random == 3) {
            y -= this.speedy;
        }
        else if (random == 4 || random == 6 || random == 5 || random == 10) {
            y += this.speedy;
        }

        this.updateMove(x, y);

    }

    updateMove(x, y) {
        if (this.x != x) {
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

        if (this.y != y) {
            clearTimeout(this.autoStabilization);
            this.autoStabilization = setTimeout(() => { this.node.style.transform = this.direction + this.sens["stable"]; }, 500);

            if (y < this.y) {
                if (!this.node.style.transform.includes(this.sens["haut"])) {
                    if (!this.node.style.transform.includes(this.sens["stable"])) {
                        this.node.style.transform = this.direction + this.sens["stable"];
                    }
                    else {
                        this.sens_y = this.sens["haut"];
                    }
                }
            } else {
                if (!this.node.style.transform.includes(this.sens["bas"])) {
                    if (!this.node.style.transform.includes(this.sens["stable"])) {
                        this.node.style.transform = this.direction + this.sens["stable"];
                    }
                    else {
                        this.sens["bas"];
                    }
                }
            }
            this.node.style.transform = this.direction + this.sens_y;
            this.y = y;

        }
    }

    simulerPropulsion(acceleration, duree) {

        if (Math.round(Math.random() * 1) == 1) {
            this.direction = this.sens["droite"];
        } else {
            this.direction = this.sens["gauche"];
        }

        let tempsActuel = 0;
        let vitesse = 0.1;

        const interval = setInterval(() => {
            tempsActuel += 10;
            this.opacity += 0.01;
            this.node.style.opacity = this.opacity;
            vitesse += acceleration;
            this.y -= vitesse;

            if (this.direction == this.sens["droite"]) {
                this.x += vitesse;
            } else {
                this.x -= vitesse;
            }

            if (this.direction == this.sens["droite"]) {
                this.x += vitesse;
            } else {
                this.x -= vitesse;
            }

            this.node.style.transform = this.direction + this.sens["haut"];
            if (tempsActuel >= duree) {
                clearInterval(interval);
                this.propulsion = false;
            }
        }, 10);
    }

    tick() {
        this.limite();
        this.tuyau = document.querySelector(this.spawm).getBoundingClientRect();

        if (this.isFlying && this.y == this.sol) {
            this.isFlying = false;
        }

        this.x +=this.wind;

        if (this.x < this.mur_gauche) {
            this.x = this.mur_droit;
        } else if (this.x > this.mur_droit) {
            this.x = this.mur_gauche;
        }

        if (Math.round(Math.random() * 40) == 7) {
            this.move();
        }

        if (this.isFlying) {
            this.tickVie();
        } else {
            this.tickMort();
        }

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

    }

}