    import { enemies } from "../src/canvas.js";
    import { Enemy } from "../src/canvas.js";

    export function spawnEnemies(){
        console.log('Enemy has spawned');
        
        let randomDamage = Math.floor(Math.random() * 20) + 10;
        let randomSpeed = Math.floor(Math.random() * 4) + 1;
        let randomLives = Math.floor(Math.random() * 100) + 50;

        let Zombie = new Enemy(canvas.width + 50, 700, 0, randomLives, randomDamage, randomSpeed);

        enemies.push(Zombie);
        console.log(Zombie.damage, Zombie.speed);
    }