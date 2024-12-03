var ground, groundIMG, trex, trexIMG,trexDieImg, cloud, cloudIMG, gameOver, gameOverIMG, restart, restartIMG, obs, obs1, obs2, obs3, obs4, obs5, obs6
var checkSound, dieSound, jumpSound
var fakeGround
var obsGroup, cloudsGroup
var gameState = "play"
var scoreScore = 0
// global variable - global is stand alone
// local variable - in {} only avaliable to you

function preload(){
    groundIMG = loadImage("assets/ground2.png")
    trexIMG = loadAnimation("assets/trex1.png","assets/trex3.png","assets/trex4.png")
    cloudIMG = loadImage("assets/cloud.png")
    gameOverIMG = loadImage("assets/gameOver.png")
    restartIMG = loadImage("assets/restart.png")
    obs1 = loadImage("assets/obstacle1.png")
    obs2 = loadImage("assets/obstacle2.png")
    obs3 = loadImage("assets/obstacle3.png")
    obs4 = loadImage("assets/obstacle4.png")
    obs5 = loadImage("assets/obstacle5.png")
    obs6 = loadImage("assets/obstacle6.png")
    checkSound = loadSound("assets/checkpoint.mp3")
    dieSound = loadSound("assets/die.mp3")
    jumpSound = loadSound("assets/jump.mp3")
    trexDieImg = loadAnimation("assets/trex_collided.png")
    
}

function setup(){
    
    createCanvas(600, 200)
    ground = createSprite(120,170);
    ground.addImage(groundIMG);

    fakeGround = createSprite(120,173, 400,3);
    fakeGround.visible = false

    trex = createSprite(120,160);
    trex.addAnimation("running", trexIMG);
    trex.addAnimation("die", trexDieImg);
    trex.scale=0.35;

    gameOver = createSprite(300,70)
    gameOver.addImage(gameOverIMG)
    gameOver.scale = 0.7
    gameOver.visible = false

    restart = createSprite(300,120)
    restart.addImage(restartIMG)
    restart.scale = 0.5
    restart.visible = false


    obsGroup = createGroup()
    cloudsGroup = createGroup()

}
function draw(){
    background("grey")

    if(gameState == "play"){
        trex.changeAnimation("running", trexIMG);
        ground.velocityX= -(5+ scoreScore/100);
        score()

        // looping your ground
        if(ground.x <0){
            ground.x = ground.width/2
        }
        if(keyDown("space") && trex.y > 150){
            trex.velocityY= -12;
            jumpSound.play()
        }
        if(trex.isTouching(obsGroup)){
            gameState = "end"
            dieSound.play()
        }
        if(scoreScore % 200 == 0){
            checkSound.play()
        }
        trex.velocityY=  trex.velocityY+0.8; 
        spawnBigBois()
        obstacles()
        gameOver.visible = false
        restart.visible = false
        
    }
    if(gameState == "end"){
       
        ground.velocityX= 0;
        obsGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)
        trex.changeAnimation("die", trexDieImg);
        trex.velocityY= 0;
        
        gameOver.visible = true
        restart.visible = true

        gameOver.depth = cloud.depth + 1
        restart.depth = cloud.depth + 1

        if(mousePressedOver(restart)){
            gameState = "play"
            scoreScore = 0
            obsGroup.destroyEach()
            cloudsGroup.destroyEach()
            
        }
    }

    
    
    drawSprites()
    
    textSize(15)
    fill("black")
    text("Score: "+ scoreScore , 30, 30)
   
    trex.collide(fakeGround)

   

   
 
}

function obstacles(){
    if(frameCount % 40 == 0){
        obs = createSprite(620, 155)
        obsGroup.add(obs)
        var randNum = Math.round(random(1,6))
        switch(randNum){
            case 1:obs.addImage(obs1);
            break;
            case 2:obs.addImage(obs2);
            break;
            case 3:obs.addImage(obs3);
            break;
            case 4:obs.addImage(obs4);
            break;
            case 5:obs.addImage(obs5);
            break;
            case 6:obs.addImage(obs6);
            break;
        }
       
        obs.velocityX = -(5+ scoreScore/100);
        obs.scale = 0.45;
    }
}

function spawnBigBois(){
    if(frameCount % 40 == 0){
        cloud = createSprite(620, 100);
        cloudsGroup.add(cloud)
        cloud.addImage(cloudIMG);
        cloud.velocityX = -(7+ scoreScore/100) ;
        cloud.scale = random(0.3, 0.7)
        cloud.y = random(10, 100)
        trex.depth = cloud.depth+1;

    }
}

function score(){       
    if(frameCount % 1 == 0 && frameCount != 0 ){
        scoreScore= scoreScore + 1
    }
}

//Homework:
//in flappybird, delete the pics you dont need, delete code from sketch.js, find bg for flappy bird and get flappy bird pic,
//finish making the sprite and make the flappy bird fly when space is pressed restart