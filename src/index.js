import 'phaser';

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var light;
var offsets = [];
var player ;
var layer;
var cursors;
var scoreText;
var llave;
var mons1;
var walk1;
var mons2;
var walk2;
var key;
var textWin;
var audmonster;
var audwingame;
var audcatch;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', [ 'assets/brick04.png', 'assets/drawtiles1_n.png' ]);
    this.load.image('key', 'assets/key.png');
    this.load.tilemapCSV('map', 'assets/grid.csv');
    this.load.audio('atmosfera', 'assets/audio/gamejamformat.mp3');
    this.load.audio('monster', 'assets/audio/vozenemigogamejam.mp3');
    this.load.audio('win', 'assets/audio/wingamejam.mp3');
    this.load.audio('catch', 'assets/audio/atrapar.mp3')
    this.load.spritesheet('lui', 'assets/luisp.png', 
    { frameWidth: 45, frameHeight: 32 });
    this.load.spritesheet('monst1', 'assets/enemie1.png', 
    { frameWidth: 58, frameHeight: 58 });
    this.load.spritesheet('monst2', 'assets/enemigo2.png', 
    { frameWidth: 79, frameHeight: 91 });
    
   
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);

    layer = map.createLayer(0, tileset, 0, 0).setPipeline('Light2D');

    key = this.add.image(748, 334, 'key');
    key.setDataEnabled();
    key.data.set('key', 0);

    key.visible = false;

    player = this.physics.add.sprite(47, 47, 'lui');
    
    mons1 = this.add.sprite(300, 58, 'monst2');

    mons1.visible=false;
  
    cursors = this.input.keyboard.createCursorKeys();

    let audio = this.sound.add('atmosfera', {loop: true});
    audmonster = this.sound.add('monster');
    audwingame = this.sound.add('win');
    audcatch = this.sound.add('catch');

    audio.play();
 
     light = this.lights.addLight(0, 0, 100);
     this.lights.enable().setAmbientColor(0x000111);

    this.cameras.main.setBounds(0, 0, layer.displayWidth, layer.displayHeight);
    this.cameras.main.startFollow(player);

    scoreText = this.add.text(25, 10, 'score: 0', { fontSize: '19px', fill: '#9B8E78' });

    llave = this.add.text(155, 10, 'key: 0/1', { fontSize: '19px', fill: '#9B8E78' });

    textWin = this.add.text(400,2000,'you win!', { fontSize: '20px', fill: '#82A07D' });

    textWin.visible = false;

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('lui', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('lui', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('lui', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('lui', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('monst2', {start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });


    offsets = [ 0.1, 0.3, 0.5, 0.7 ];
}

var isCharacterWithKey = 0;

function update ()
{

    if(player.x >= 700 && player.y >= 330){
        key.visible = true;
    }else{
        key.visible = false;
    }

    if(player.x >= 255 && player.y >= 58){
        audmonster.play();
        mons1.visible = true;
        mons1.anims.play('walk', true);
   }else 
   {
      mons1.visible = false;
      mons1.anims.stop();
   }


    if (this.input.keyboard.checkDown(cursors.left, 100))
    {
        var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
           
            player.x -= 32;
            player.angle = 180;
        }
    }
    else if (this.input.keyboard.checkDown(cursors.right, 100))
    {
        var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);
        
        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else if (tile.index === 3 && isCharacterWithKey == 0) {
       
            llave.destroy();
            llave = this.add.text(155, 10, 'key: 1/1', { fontSize: '19px', fill: '#9B8E78' });
            key.destroy();
            isCharacterWithKey = 1;
            player.x += 32;
            player.angle = 0;
            audcatch.play();

        }
        else
        {
            player.x += 32;
            player.angle = 0;
        }
    }
    else if (this.input.keyboard.checkDown(cursors.up, 100))
    {
        var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= 32;
            player.angle = -90;
        }
    }
    else if (this.input.keyboard.checkDown(cursors.down, 100))
    {
        var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else if (tile.index === 4) {
            if (isCharacterWithKey == 1 ) {
                textWin.visible = true;
                audwingame.play();
                player.y += 32;
                player.angle = 90;
                let time = 15;
                for(time; time<=0; time--){
                    console.log(time);
                 
                }
                {
                  this.scene.restart();
                }
            }
            else {
                console.log("NOT KEY")
            }
        }
        else
        {
            player.y += 32;
            player.angle = 90;
        }
    }


    if (cursors.left.isDown)
    {
        player.anims.play('left', true);
        scoreText.setScrollFactor(-0.1);
        llave.setScrollFactor(-0.1);
    }
    else if (cursors.right.isDown)
    {
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown)
    {
        player.anims.play('up', true);
    }
    else if (cursors.down.isDown)
    {
        player.anims.play('down', true);
    }
    else
    {
        player.anims.stop();
    }

     light.x = player.x-3;
     light.y = player.y-3;

    // var index = 0;

    // this.lights.lights.forEach(function (currLight) {
    //     if (light !== currLight)
    //     {
    //         currLight.x = 400 + Math.sin(offsets[index]) * 1000;
    //         offsets[index] += 0.02;
    //         index += 1;
    //     }
    // });
}
