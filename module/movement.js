    import { Player } from "../src/canvas.js";
    
    export let keys = {};

    export function handleMove(e){
        console.log(e.key);

        switch(e.key){
            case 'd':
                Player.runForward();
                break;
            case 'a':
                Player.runBack();
                break;
        }
    }