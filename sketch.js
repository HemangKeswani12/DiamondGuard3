var Diamond;
var DiamondRadius;
var Guard;
var Gun1, Gun2, Gun3;
var Bullet;
var Zombie;
var gunStage = 1;
var score = 0;
var gameState = "play";
var attached = 0;
var zombieGroup;
var bulletGroup;
var zombieGunGroup;
var zombieBulletGroup;
var wall, wallImage;
var diamondImage;
var zombieAnimation;
var Gun1Img, Gun2Img, Gun3Img;
var guardStanding, guardRunning;
var zombieGun, zombieGunImg;
var zombBullet;

function preload() {

    guardRunning = loadAnimation("images/guard1.png", "images/guard2.png", "images/guard3.png", "images/guard2.png")
    zombieAnimation = loadAnimation("images/zomb1.png", "images/zomb2.png", "images/zomb3.png", "images/zomb2.png")
    wallImage = loadImage("images/wall.png")
    diamondImage = loadImage("images/diamond.png");
    Gun1Img = loadImage("images/gun1.png");
    Gun2Img = loadImage("images/gun2.png");
    Gun3Img = loadImage("images/gun3.png");
    zombieGunImg = loadImage("images/zombieGun.png");

}

function setup() {

    createCanvas(1200, 800);

    gameState = "play";

    Diamond = createSprite(240, 400, 15, 15);
    Diamond.addImage("diamondImg", diamondImage);
    Diamond.scale = 0.5;

    Guard = createSprite(200, 400, 30, 50);
    Guard.addAnimation("guard", guardRunning);

    Gun1 = createSprite(Guard.x, Guard.y, 15, 7);
    Gun1.scale = 0.5;
    Gun1.addImage("Gun1", Gun1Img);

    Gun2 = createSprite(Guard.x, Guard.y, 18,8);
    Gun2.scale = 0.5;
    Gun2.addImage("Gun2", Gun2Img);

    Gun3 = createSprite(Guard.x, Guard.y, 22, 12);
    Gun3.scale = 0.6;
    Gun3.addImage("Gun3", Gun3Img);

    DiamondRadius = createSprite(Diamond.x, Diamond.y, 50, 50);
    DiamondRadius.visible = false;

    wall = createSprite(0, 400, 15, 850);
    wall.addImage("wall", wallImage);

    zombieGroup = new Group();
    bulletGroup = new Group();
    zombieGunGroup = new Group();
    zombieBulletGroup = new Group();

}

function draw() {
    
    background("white");

    Guard.scale = 1.3;

    textSize(20);
    fill("black");
    text("Press w, a, s and d keys to move around, and space to shoot! You can pick up and move the diamond by pressing shift!", 50 ,50);
    text("Don't let the Zombies touch you, the diamond or the wall of the room!", 50, 70)

    if(gameState === "play") {
        score = score+Math.round(getFrameRate()/50);
    }

    textSize(35);
    text("Score: "+score, 50, 760);

    if(gameState === "play") {
        spawnZombie();
    }

    DiamondRadius.x = Diamond.x;
    DiamondRadius.y = Diamond.y;

    Gun1.x = Guard.x+14;
    Gun1.y = Guard.y-17;

    Gun2.x = Guard.x+15;
    Gun2.y = Guard.y-19;

    Gun3.x = Guard.x+13;
    Gun3.y = Guard.y-10;

    if(score < 120) {
        gunStage = 1;
    }

    if(score >= 120 && score < 200) {
        gunStage = 2;
    }

    if(score > 230) {
        gunStage = 3;
    }

    if(gunStage === 1 && gameState === "play") {
        Gun1.visible = true;
        Gun2.visible = false;
        Gun3.visible = false;
    }

    if(gunStage === 2 && gameState === "play") {
        Gun1.visible = false;
        Gun2.visible = true;
        Gun3.visible = false;
    }

    if(gunStage === 3 && gameState === "play") {
        Gun1.visible = false;
        Gun2.visible = false;
        Gun3.visible = true;
    }

    if(Guard.isTouching(DiamondRadius) && keyWentDown("shift")) {
        Diamond.held = true;
    } else{Diamond.held = false};

    if(keyWentDown("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(keyWentUp("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(attached/2 % 2 === 0 && Guard.isTouching(DiamondRadius)) {
        Diamond.x = Guard.x-10;
        Diamond.y = Guard.y;
    } 

    if(keyCode === 87 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = -4;
        Guard.velocityX = 0;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 87 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = -2.5;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 65 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = -4;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 65 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = -2.5;
        Guard.velocityY = 0;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 68 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = 4;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 68 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 2.5;
        Guard.velocityY = 0;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 83 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 4;
        Guard.velocityX = 0;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 87 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = 2.5;
        Guard.addAnimation("running", guardRunning);
    }

    shoot();

    if(bulletGroup.isTouching(zombieGroup)) {
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        zombieGunGroup.destroyEach();
    }

    if(zombieGroup.isTouching(Diamond) || zombieGroup.isTouching(wall) || zombieGroup.isTouching(Guard) || zombieBulletGroup.isTouching(Guard)) {
        gameState = "end";
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        zombieGunGroup.destroyEach();
        zombieBulletGroup.destroyEach();
        Gun1.visible = false;
        Gun2.visible = false;
        Gun3.visible = false;
    }

    if(gameState === "end") {
        bulletGroup.destroyEach;
        zombieGroup.destroyEach;
        Guard.visible = false;
        zombieBulletGroup.destroyEach();
        Diamond.visible = false;

        textSize(60);
        fill("red");
        text("GAME OVER", width/3, 400);
    }

    drawSprites();
}

function shoot () {

    if(keyWentDown("space") && gunStage === 1) {
        Bullet = createSprite(Gun1.x, Gun1.y, 6, 3);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 8;
        Bullet.velocityY = Math.round(random(-1, 2));
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 2) {
        Bullet = createSprite(Guard.x, Guard.y, 9, 6);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 10;
        Bullet.velocityY = Math.round(random(-2, 3));
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 3) {
        Bullet = createSprite(Guard.x, Guard.y, 13, 13);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 14;
        Bullet.velocityY = Math.round(random(-0.7, 0.7));
        bulletGroup.add(Bullet);
    }

}

function spawnZombie() {
  
    if(frameCount % 17 === 0) {
      var Zombie = createSprite(1220, 100, 10, 10);
      Zombie.addAnimation("zombie", zombieAnimation);
      Zombie.y = Math.round(random(150, 750));
      Zombie.scale = 1;
      Zombie.lifetime = 800;
      Zombie.velocityX = -5;
      zombieGroup.add(Zombie);

      if(score >= 250 && gameState === "play") {
        zombieGun = createSprite(Zombie.x-10, Zombie.y -10, 15, 15);
        zombieGun.addImage("zombieGun", zombieGunImg);
        zombieGun.scale = 0.2;
        zombBullet = createSprite(zombieGun.x, zombieGun.y, 9, 3);
        zombieGun.x = Zombie.x;
        zombieGun.velocityX = Zombie.velocityX;
        zombieGun.y = Zombie.y;
        zombieGunGroup.add(zombieGun);
        if(frameCount % 5 === 0) {
            zombBullet = createSprite(zombieGun.x, zombieGun.y, 10, 3);
            zombBullet.velocityX = -7;
            zombBullet.velocityY = Math.round(random(0.2, 1.5));
            zombieBulletGroup.add(zombBullet);
        }
    }
    }
    
  } 