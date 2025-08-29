    import { handleMove } from "../module/movement.js";
    import { handleShoot } from "../module/shoot.js";
    import { spawnEnemies } from "../module/spawn.js";
    import { isArrowCollididng, isPlayerCollididng } from "./script.js";
    import { soundPack } from "../module/playlist.js";

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const buttons = document.querySelectorAll('.btn');
    const goldState = document.getElementById('gold_state');
    const killsCount = document.getElementById('kills_count');

    let playerSkin = new Image();
    playerSkin.src = './assets/archer/idle/idle00.png';

    let zombieSkin = new Image();
    zombieSkin.src = './assets/zombie/walk00.png';

    let arrowSkin = new Image();
    arrowSkin.src = './assets/archer/Arrow.png';

    // let coinsIcon = new Image();
    // coinsIcon.src = './assets/icons/coins-icon.png';

    export const arrowsFlying = [];
    export const enemies = [];

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
        kills = 0;

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
            this.gold = 0;

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
                    return;
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
                    return;
                }

                playerSkin.src = `./assets/archer/run/run0${this.frame}.png`;

                this.frameCount = 0;
            }

            this.direction = 'left';
        }

        shoot = () => {
            if (this.frame > 13) {
                this.frame = 0;
                return;
            }

            playerSkin.src = `./assets/archer/shot/shot0${this.frame}.png`;
            this.frame++;
        }
    }

    export class Enemy{
        constructor(x, y, frame, lives, damage, speed){
            this.x = x;
            this.y = y;
            this.frame = frame;
            this.size = 250;

            this.frameCount = 0;
            this.frameSpeed = 10;
            
            this.lives = lives;
            this.damage = damage;
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

            this.frameCount++;
            if(this.frameCount >= this.frameSpeed){
                this.frame++;

                if(this.frame >= 8){
                    this.frame = 0;
                }

                zombieSkin.src = `./assets/zombie/walk0${this.frame}.png`;
                this.frameCount = 0;
            }
        }
    }


    export let Player = new Archer(100, 700, 0, 'right', 10);
    let Arrow = new ArrowProjectical(Player.x + Player.size / 2, Player.y + Player.size / 2.5, Player.direction, Player.damage);
    // let Zombie = new Enemy(canvas.width - 200, canvas.height / 2.5 + 250, 0, 1);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Player.draw(Player.x, Player.y, Player.size);
        // Zombie.draw(Zombie.x, Zombie.y, Zombie.size);
        arrowsFlying.forEach(arrow => {
            if (arrow.direction == 'right') {
                arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height)
                
            }else{
                arrow.draw(arrow.x += arrow.speed, arrow.y, arrow.width, arrow.height) 
            }

        });

        goldState.innerHTML = `COINS: ${Player.gold}`;
        killsCount.innerHTML = `KILLS: ${Player.kills}`;
    }

    playerSkin.onload=()=>{
        draw();
        
    }

    function render() {
        if (Player.lives > 0) {
            draw();

            let coinsRandom = Math.floor(Math.random() * 5) + 5;

            if(Math.floor(Math.random() * 500 < 3)){ spawnEnemies(); }


            enemies.forEach((value, index) => {
                value.draw(value.x, value.y, value.size);
                value.walk();
                if ( value.lives <= 0 ) {enemies.splice(index, 1)};
            });

            arrowsFlying.forEach((arrow, arrowIndex) => {
                if(arrow.y < 0){
                    arrowsFlying.splice(arrowIndex, 1);
                }

                enemies.forEach((enemy, enemyIndex) => {
                    if( isArrowCollididng(enemy, arrow) ) {
                        enemy.lives -= Player.damage;
                        arrowsFlying.splice(arrowIndex, 1);

                            if( enemy.lives <= 0 ) {
                                let deadSound = new Audio(soundPack.zombie);
                                deadSound.currentTime = 0.1;
                                deadSound.volume = 0.8;
                                deadSound.play();

                                enemies.splice(enemyIndex, 1);
                                Player.kills++;
                                Player.gold += coinsRandom;
                            }
                    }
                })
            });

            enemies.forEach((value, index) => {
                if ( isPlayerCollididng(value, Player) ) {
                    Player.lives -= value.damage;
                    enemies.splice(index, 1);
                }
            });

            requestAnimationFrame(render);
        } else {
            Player.y = canvas.height + 500;
            goldState.style.display = 'none';
            killsCount.style.display = 'none';
            buttons.forEach((value) => { value.style.display = 'none' });

            let looseSound = new Audio(soundPack.loose);
            looseSound.volume = 0.8;
            looseSound.play();

            let endWindow = document.createElement( 'div' );
            endWindow.classList = 'end-window';
            endWindow.textContent = 'Game Over! Zombies have eaten you. HAHAHAHAHA !';
            document.body.appendChild( endWindow );
            endWindow.style.display = 'block';
        }
    }

    render();

    window.addEventListener('DOMContentLoaded', () => {  let bgMusic = new Audio(soundPack.bg_track); bgMusic.volume = 0.5; bgMusic.play(); bgMusic.loop = true; });
    window.addEventListener('keydown', handleMove);
    window.addEventListener('keyup', () => { playerSkin.src = './assets/archer/idle/idle00.png'; });
    canvas.addEventListener('mousedown', handleShoot);