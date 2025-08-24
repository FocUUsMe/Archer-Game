import { Player, ArrowType } from './canvas.js';
export let isBtnOnclicked = false;

class Shop {
    constructor(arrows) {
        this.arrows = arrows;
    }
    getArrows() {
        return this.arrows;
    }
}

class GameUI {
    constructor(player, shop) {
        this.player = player;
        this.shop = shop;
        this.marketBtn = document.getElementById('btn-market');
        this.statsBtn = document.getElementById('btn-states');
        this.window = document.getElementById('market-stats-window');
        this.initEvents();
        this.hideAll();
        this.openState = false;
    }

    initEvents() {
        this.marketBtn.onclick = () => this.showMarket();
        this.statsBtn.onclick = () => this.showStats();
    }

    hideAll() {
        this.window.style.display = 'none';
    }

    showMarket() {
        if (this.openState) {
            this.window.style.display = 'none';
            this.openState = false;
            return;
        }
        this.openState = true;
        this.window.style.width = '640px',
            this.window.style.height = '620px';
        this.window.innerHTML = '';
        this.hideAll();
        const header = document.createElement('h2');
        header.textContent = 'Магазин стрел';
        header.classList.add('market-header');
        this.window.appendChild(header);
        const container = document.createElement('div');
        container.classList.add('market-container');
        this.window.appendChild(container);
        const arrows = this.shop.getArrows();
        arrows.forEach(arrow => {
            const div = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = `${arrow.name} (${arrow.damage} урона) - ${arrow.price} золота`;
            const btn = document.createElement('button');
            btn.classList.add('btn')
            btn.textContent = `Купить`;
            div.appendChild(p),
                div.appendChild(btn);
            div.classList.add('market-div'),
                p.classList.add('market-p'),
                btn.onclick = () => {
                

                    if (this.player.buyArrow(arrow)) {
                        console.log(arrow)
                        alert('Стрела куплена!');
                    } else {
                        alert('Недостаточно золота!');
                    }
                };
            btn.classList.add('market-btn');

            container.appendChild(div);
        });

        this.window.style.display = 'block';
    }

    showStats() {
        if (this.openState) {
            this.window.style.display = 'none';
            this.openState = false;
            return;
        }
        this.openState = true;
        this.window.innerHTML = '';
        this.hideAll();
        const stats = this.player.getStats();
        const header = document.createElement('h2');
        header.textContent = 'Характеристика';
        header.classList.add('stats-header');
        const container = document.createElement('div');
        container.classList.add('stats-container');
        this.window.appendChild(header);
        this.window.appendChild(container);
        const arrow_p = document.createElement('p');
        arrow_p.textContent = `Стрела: ${stats.arrow}`;
        const damage_p = document.createElement('p');
        damage_p.textContent = `Урон: ${stats.damage}`;
        const gold_p = document.createElement('p');
        gold_p.textContent = `Золото: ${stats.gold}`;
        const lives_p = document.createElement('p');
        lives_p.textContent = `Здоровье: ${stats.lives}`;
        container.appendChild(lives_p);
        container.appendChild(arrow_p);
        container.appendChild(damage_p);
        container.appendChild(gold_p);
        arrow_p.classList.add('stats-p');
        gold_p.classList.add('stats-p');
        lives_p.classList.add('stats-p');
        damage_p.classList.add('stats-p');
        this.window.style.display = 'block';
    }
}

// Инициализация (вызывать из главного JS после загрузки страницы)
function initMarketStateModule() {
    const arrows = [
        new ArrowType('Деревянная стрела', 5, 0),
        new ArrowType('Каменная стрела', 15, 50),
        new ArrowType('Железная стрела', 25, 90),
        new ArrowType('Золотая стрела', 30, 120),
        new ArrowType('Огненная стрела', 45, 180),
        new ArrowType('Ядовитая стрела', 65, 250)
    ]
    const player = Player;
    const shop = new Shop(arrows);
    new GameUI(player, shop);
}

export { initMarketStateModule };
