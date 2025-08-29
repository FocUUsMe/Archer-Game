    import { enemies } from "../src/canvas.js";
    import { Enemy } from "../src/canvas.js";

    export function spawnEnemies(){
        console.log('Enemy has spawned');
        enemies.forEach((value) => {
            value.draw(value.x, value.y, value.size);
            value.walk();
        });
        // let randomDamage = Math.floor(Math.random() * 20) + 10;
        // let randomSpeed = Math.floor(Math.random() * 4) + 1;

        let Zombie = new Enemy(canvas.width + 50, 700, 0, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 4) + 1);

        enemies.push(Zombie);
        console.log(Zombie.damage, Zombie.speed);

        enemies.forEach((value, index) => {
            if ( value.lives <= 0 ) {enemies.splice(index, 1)};
        });
    }