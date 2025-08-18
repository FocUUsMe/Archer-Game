// market_states_module.js

class Arrow {
    constructor(name, damage, price) {
        this.name = name;
        this.damage = damage;
        this.price = price;
    }
}

class Player {
    constructor() {
        this.baseDamage = 5;
        this.arrow = new Arrow('Обычная стрела', 5, 0);
        this.gold = 100;
    }
    buyArrow(arrow) {
        if (this.gold >= arrow.price) {
            this.arrow = arrow;
            this.gold -= arrow.price;
            return true;
        }
        return false;
    }
    getStats() {
        return {
            arrow: this.arrow.name,
            damage: this.arrow.damage,
            gold: this.gold
        };
    }
}

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
        this.statsBtn = document.getElementById('btn-stats');
        this.marketWindow = document.getElementById('market-window');
        this.statsWindow = document.getElementById('stats-window');
        this.initEvents();
        this.hideAll();
    }

    initEvents() {
        this.marketBtn.onclick = () => this.showMarket();
        this.statsBtn.onclick = () => this.showStats();
    }

    hideAll() {
        this.marketWindow.style.display = 'none';
        this.statsWindow.style.display = 'none';
    }

    showMarket() {
        this.hideAll();
        this.marketWindow.innerHTML = '<h2>Магазин стрел</h2>';
        const arrows = this.shop.getArrows();
        arrows.forEach(arrow => {
            const btn = document.createElement('button');
            btn.textContent = `${arrow.name} (${arrow.damage} урона) - ${arrow.price} золота`;
            btn.onclick = () => {
                if (this.player.buyArrow(arrow)) {
                    alert('Стрела куплена!');
                    this.showStats();
                } else {
                    alert('Недостаточно золота!');
                }
            };
            this.marketWindow.appendChild(btn);
        });
        this.marketWindow.style.display = 'block';
    }

    showStats() {
        this.hideAll();
        const stats = this.player.getStats();
        this.statsWindow.innerHTML =
            `<h2>Характеристики персонажа</h2>
             <p>Стрела: ${stats.arrow}</p>
             <p>Урон: ${stats.damage}</p>
             <p>Золото: ${stats.gold}</p>`;
        this.statsWindow.style.display = 'block';
    }
}

// Инициализация (вызывать из главного JS после загрузки страницы)
function initMarketStateModule() {
    const arrows = [
        new Arrow('Деревянная стрела', 5, 0),
        new Arrow('Каменная стрела', 15, 50),
        new Arrow('Железная стрела', 25, 90),
        new Arrow('Золотая стрела', 30, 120),
        new Arrow('Огненная стрела', 45, 180),
        new Arrow('Магическая стрела', 65, 250)

    ];
    const player = new Player();
    const shop = new Shop(arrows);
    new GameUI(player, shop);
}

export { initMarketStateModule };
