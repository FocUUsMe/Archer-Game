    import { Player, ArrowProjectical, arrowsFlying } from "../src/canvas.js";
    let btns = document.querySelectorAll('.btn');

    export function handleShoot(e) {

            if (e.button === 0 ) {
            
                for (let i = 0; i < 14; i++) {
                    setTimeout(Player.shoot, i * 40);
                }
                let Arrow = new ArrowProjectical(Player.x + Player.size / 2, Player.y + Player.size / 2.5, Player.direction, Player.damage);
                if (arrowsFlying.length > 10) {
                    arrowsFlying.slice(0, arrowsFlying.length);
                    arrowsFlying.push(Arrow);
                }
                arrowsFlying.push(Arrow);
            }

        



    }