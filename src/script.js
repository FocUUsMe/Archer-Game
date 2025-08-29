    export function isArrowCollididng(a, b){
        let collid = a.x < b.x + b.width &&
        a.x + a.size > b.x   &&
        a.y < b.y + b.height  &&
        a.y + a.size > b.y;

        // console.log(collid);
        return collid;
    }

    export function isPlayerCollididng(a, b){
        let collid = a.x < b.x + b.size &&
        a.x + a.size > b.x   &&
        a.y < b.y + b.size  &&
        a.y + a.size > b.y;

        // console.log(collid);
        return collid;
    }