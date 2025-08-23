import { keys } from "../module/movement.js";
import { handleMove } from "../module/movement.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerSkin = new Image();
playerSkin.src = './assets/archer/idle/idle00.png';

let zombieSkin = new Image();
zombieSkin.src = './assets/zombie/walk00.png';

let Frame_id;


// класс стрелы
export class Arrow {
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
        this.baseDamage = 5;
        this.arrow = new Arrow('Обычная стрела', 5, 0);
        this.gold = 100;
    }
    //покупка стрел
    buyArrow(arrow) {
        if (this.gold >= arrow.price) {
            this.arrow = arrow;
            this.gold -= arrow.price;
            return true;
        }
        return false;
    }
    //функция для получения статистики
    getStats() {
        return {
            arrow: this.arrow.name,
            damage: this.arrow.damage,
            gold: this.gold,
            lives: this.lives
        };
    }

    draw(x, y, size) {
        ctx.drawImage(playerSkin, x, y, size, size);


        // ctx.fillStyle = "red";
        // ctx.beginPath();
        // ctx.fillRect(x, y, size, size + 40);
        // ctx.closePath();
        // ctx.fill();
    };

    runForward = () => {
        if (this.frame >= 8) {
            this.frame = 0;
        }
        playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;
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
}




playerSkin.onload = function () {
    draw();
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