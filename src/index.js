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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', [ 'assets/brick04.png', 'assets/drawtiles1_n.png' ]);
    this.load.tilemapCSV('map', 'assets/grid.csv');
    this.load.audio('atmosfera', 'assets/audio/gamejamformat.mp3');
    this.load.spritesheet('lui', 'assets/luisPr.png', 
    { frameWidth: 58, frameHeight: 58 });
    this.load.spritesheet('monst1', 'assets/enemie1.png', 
    { frameWidth: 58, frameHeight: 58 });
    this.load.spritesheet('monst2', 'assets/enemigo2.png', 
    { frameWidth: 91, frameHeight: 91 });
   
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

    

    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);

    layer = map.createLayer(0, tileset, 0, 0).setPipeline('Light2D');

     player = this.physics.add.sprite(58, 58, 'lui');
    // player = this.add.image(32+16, 32+16, 'car');
    mons1 = this.add.sprite(300, 58, 'monst2');

    // mons1.animations.add('walk');

    // mons1.animations.play('walk', 30 , true);
    cursors = this.input.keyboard.createCursorKeys();

    let audio = this.sound.add('atmosfera', {loop: true});

    audio.play();

    light = this.lights.addLight(0, 0, 100);

    this.cameras.main.setBounds(0, 0, layer.displayWidth, layer.displayHeight);
    this.cameras.main.startFollow(player);

    scoreText = this.add.text(25, 10, 'score: 0', { fontSize: '19px', fill: '#9B8E78' });

    llave = this.add.text(155, 10, 'key: 0/1', { fontSize: '19px', fill: '#9B8E78' });

    this.lights.enable().setAmbientColor(0x000111);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('lui', { start: 0, end: 3 }),
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


    offsets = [ 0.1, 0.3, 0.5, 0.7 ];
}

function update ()
{
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
