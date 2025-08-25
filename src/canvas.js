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
            this.size = 250;
            this.frameCount = 0; //Счетчик кадров !!НЕ this.frame!!
            this.frameSpeed = 2; //Чем больше, тем медленней прокрутка кадров

            this.speed = speed;
            this.lives = 100;
            this.damage = 5;
            this.gold = 100;

            this.arrowType = new ArrowType('Обычная стрела', 5, 0);
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
            this.x += this.speed;

            this.frameCount++;
            if(this.frameCount >= this.frameSpeed){
                this.frame++;

                if (this.frame >= 8) {
                    this.frame = 0;
                }

                playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;

                this.frameCount = 0;
            }
            this.direction = 'right';
        };

        runBack = () => {
            this.x -= this.speed;

            this.frameCount++;
            if(this.frameCount >= this.frameSpeed){
                this.frame++;

                if (this.frame >= 8) {
                    this.frame = 0;
                }

                playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;

                this.frameCount = 0;
            }

            this.direction = 'left';
        }

        shoot = () => {
            if (this.frame > 13) {
                this.frame = 0;
            }
            playerSkin.src = `./assets/archer/shot/shot0${this.frame}.png`;
            this.frame++;
        }
    }



    class Enemy{
        constructor(x, y, frame, speed){
            this.x = x;
            this.y = y;
            this.frame = frame;
            this.size = 250;
            
            this.lives = 100;
            this.damage = 10;
            this.speed = speed;
        }

        draw(x, y, size) {
            ctx.save();
            ctx.translate(x + size / 2, y);
            ctx.scale(-1, 1);
            ctx.drawImage(zombieSkin, -size / 2, 0, size, size);
            ctx.restore();
        }

        walk() {
            this.x -= this.speed;


            if(this.frame >= 8){
                this.frame = 0;
                this.draw();
            }

            zombieSkin.src = `./assets/zombie/walk0${this.frame}.png`;
            this.frame++;
            this.x -= this.speed;
        }
    }


    export let Player = new Archer(canvas.width / 8, canvas.height / 2.5 + 250, 0, 'right', 10);
    export let Zombie = new Enemy(canvas.width - 200, canvas.height / 2.5 + 250, 0, 1);


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Player.draw(Player.x, Player.y, Player.size);
        Zombie.draw(Zombie.x, Zombie.y, Zombie.size);
        arrowsFlying.forEach(arrow => {
            if (arrow.direction == 'right') {
                arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height)
                
            }else{
                arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height) 
            }

        });
    }

    playerSkin.onload = ()=>{
        draw();
    }

    function render() {
        if (Player.lives > 0) {
            draw();
            Zombie.walk();
            requestAnimationFrame(render);
        } else {
            alert('Game over!');
        }
    }

    render();

    window.addEventListener('keydown', handleMove);
    canvas.addEventListener('mousedown', handleShoot);