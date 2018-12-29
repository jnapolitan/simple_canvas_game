const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady = false;
const bgImage = new Image();
bgImage.onload = () => {
    bgReady = true;
};
bgImage.src = './images/background.png';

let heroReady = false;
const heroImage = new Image();
heroImage.onload = () => {
    heroReady = true;
};
heroImage.src = './images/hero.png';

let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = () => {
    monsterReady = true;
};
monsterImage.src = './images/monster.png';

const hero = {
    speed: 256,
    x: 0,
    y: 0
};

const monster = {
    x: 0,
    y: 0
};

let monstersCaught = 0;

let keysDown = {};

addEventListener('keydown', e => {
    keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', e => {
    delete keysDown[e.keyCode];
}, false);

const reset = () => {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.width - 64));
};

const update = modifier => {
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};

const render = () => {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
}

const main = () => {
    const now = Date.now();
    const delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();
