class Scene1 extends Phaser.Scene{
    map;
    tiles;
    platforms;
    player;
    cursors;
    keysWASD;
    spacebar;
    constructor(){
        // register scene with game engine
        super("Scene1");
    }
    preload(){
        //preload a;; assets
        //load tile assets - 1st param = Phaser "key", 2nd param = path to file
        this.load.image("platform-tiles", "Tiles/tiles_1024_128x128.png");
        //load JSON map, params as above
        this.load.tilemapTiledJSON("scene1map", "tiled/platformen.tmj")
        //load spritesheet
        this.load.spritesheet("boy-run", "Sprite_sheet/boy-run.png",{
            frameWidth:100,
            frameHeight:160
        })
    }
    create(){
        //place items on screen etc
        this.physics.world.setBounds(0,0,2816,1280);
        //creates map map based on tiled json file
        this.map = this.make.tilemap({key:"scene1map"})
        //add tileset images, 1st param = name of tileset, 2nd param = Phaser key
        this.tiles = this.map.addTilesetImage("platforms","platform-tiles")
        //create layers1st param = name of layer tiles, 2nd = Phaser tiles ref
        this.platforms = this.map. createLayer("platforms",this.tiles)
        //set up collision
        this.map.setCollisionBetween(0,9999);
        this.player = this.physics.add.sprite(128,1280-128*3,"boy-run")
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms)
        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys("W,A,S,D");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        //update game elements each frame
        this.player.body.setVelocityX(0);
        if(this.cursors.left.isDown || this.keysWASD.A.isDown){
            this.player.body.setVelocityX(-128*3)
        }else if(this.cursors.right.isDown ||this.keysWASD.D.isDown){
            this.player.body.setVelocityX(128*3);
        }
        const istouchingGround = this.player.body.touching.down || this.player.body.blocked.down;
    }
}