import { keys } from "../module/movement.js";
import { handleMove } from "../module/movement.js";
import { handleShoot } from "../module/shoot.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerSkin = new Image();
playerSkin.src = './assets/archer/idle/idle00.png';

let zombieSkin = new Image();
zombieSkin.src = './assets/zombie/walk00.png';

let arrowSkin = new Image();
arrowSkin.src = './assets/archer/Arrow.png';

export const arrowsFlying = [];

// класс стрелы
export class ArrowProjectical {
    constructor(x, y, direction, damage) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.direction = direction;
        this.speed = 20;
        this.width = 100;
        this.height = 100;


    }
    draw() {
        ctx.save();
        if (this.direction === 'left') {
            console.log('left');
            this.speed = -20;
            ctx.translate(this.x + this.width / 2, this.y);
            ctx.scale(-1, 1);

            ctx.drawImage(arrowSkin, -this.width / 2, 0, this.width, this.height);
        } else {
            ctx.drawImage(arrowSkin, this.x, this.y, this.width, this.height);
        }
        ctx.restore();

    }

}
export class ArrowType {
    constructor(name, damage, price) {
        this.name = name;
        this.damage = damage;
        this.price = price;
    }
}

class Archer {
    constructor(x, y, frame, direction, speed) {
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.direction = direction;
        this.speed = speed;
        this.size = 250;
        this.lives = 100;
        //добавил урон, валюту , а также стрелу
        this.arrowType = new ArrowType('Обычная стрела', 5, 0);
        this.damage = 5;
        this.gold = 100;
    }
    //покупка стрел
    buyArrow(arrowType) {
        if (this.gold >= arrowType.price) {
            this.arrowType = arrowType;
            this.arrowType.name = arrowType.name;
            this.gold -= arrowType.price;
            this.damage = arrowType.damage;
            return true;
        }
        return false;
    }
    //функция для получения статистики
    getStats() {
        return {
            arrow: this.arrowType.name,
            damage: this.arrowType.damage,
            gold: this.gold,
            lives: this.lives
        };
    }

    draw(x, y, size) {
        ctx.save();
        if (this.direction === 'left') {
            ctx.translate(x + size / 2, y);
            ctx.scale(-1, 1);
            ctx.drawImage(playerSkin, -size / 2, 0, size, size);
            
        } else {
            ctx.drawImage(playerSkin, x, y, size, size);
        }
        ctx.restore();

    };

    runForward = () => {
        if (this.frame >= 8) {
            this.frame = 0;
        }
        playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;
        this.frame++;
        this.direction = 'right';
        this.x += this.speed;
    };

    runBack = () => {
        if (this.frame >= 8) {
            this.frame = 0;
        }


        playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;
        this.frame++;
        this.direction = 'left';
        this.x -= this.speed;

    }
    shoot = () => {

        if (this.frame > 13) {
            this.frame = 0;
        }
        playerSkin.src = `./assets/archer/shot/shot0${this.frame}.png`;
        this.frame++;

    }

}



    class Zombie{
        constructor(posx, posy, frame, direction, speed){
            this.posx = posx;
            this.posy = posy;
            this.frame = frame;
            this.direction = direction;
            this.speed = speed;
        }
    }


export let Player = new Archer(canvas.width / 8, canvas.height / 2.5 + 250, 0, 'right', 10);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Player.draw(Player.x, Player.y, Player.size);
    arrowsFlying.forEach(arrow => {
        if (arrow.direction == 'right') {
            arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height)
            
        }else{
            arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height) 
        }

    })


}





playerSkin.onload = function () {
    draw();
}
arrowSkin.onload = function () {

    draw()
}

function render() {
    if (Player.lives > 0) {
        draw();
        requestAnimationFrame(render);
    } else {
        alert('Game over! How?')
    }
}

render();

window.addEventListener('keydown', handleMove);
window.addEventListener('mousedown', handleShoot);