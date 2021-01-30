import 'phaser';

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var light;
var offsets = [];
var player;
var layer;
var cursors;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', [ 'assets/drawtiles1.png', 'assets/drawtiles1_n.png' ]);
    this.load.image('car', 'assets/car90.png');
    this.load.tilemapCSV('map', 'assets/grid.csv');
    this.load.audio('atmosfera', 'assets/audio/gamejamformat.mp3');
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);

    layer = map.createLayer(0, tileset, 0, 0).setPipeline('Light2D');

    player = this.add.image(32+16, 32+16, 'car');

    cursors = this.input.keyboard.createCursorKeys();

    let audio = this.sound.add('atmosfera', {loop: true});

    audio.play();

    light = this.lights.addLight(0, 0, 200);

    this.cameras.main.setBounds(0, 0, layer.displayWidth, layer.displayHeight);
    this.cameras.main.startFollow(player);


    this.lights.enable().setAmbientColor(0x000111);

    // this.input.on('pointermove', function (player) {

    //     light.x = player.x;
    //     light.y = player.y;

    // });


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
