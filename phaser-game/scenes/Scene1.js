class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }

    preload() {
        this.load.image('platform-tiles', 'Tiles/tiles_1024_128x128.png');
        this.load.tilemapTiledJSON('scene1map', 'tiled/platformen.tmj');
        this.load.spritesheet('boy-run', 'Sprite_sheet/boy-run.png', {
            frameWidth: 100, frameHeight: 160
        });
        for (let layer = 1; layer <= 3; layer++) {
            this.load.image(`background-${layer}`, `Background_1/Background1_Layer_${layer}.png`);
        }
    }

    create() {
        this.completed = false;
        this.map = this.make.tilemap({ key: 'scene1map' });
        const width = this.map.widthInPixels;
        const height = this.map.heightInPixels;
        for (let layer = 1; layer <= 3; layer++) {
            this.add.image(0, 0, `background-${layer}`).setOrigin(0).setDisplaySize(width, height);
        }
        this.tiles = this.map.addTilesetImage('platforms', 'platform-tiles');
        this.platforms = this.map.createLayer('platforms', this.tiles);
        // Keep the existing Tiled layout and make every occupied tile solid.
        this.platforms.setCollisionByExclusion([-1]);
        this.physics.world.setBounds(0, 0, width, height);
        this.player = this.physics.add.sprite(192, 1024, 'boy-run');
        // Fit the collision body to the character, leaving room below low platforms.
        this.player.body.setSize(60, 110).setOffset(20, 50);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        if (!this.anims.exists('run')) {
            this.anims.create({ key: 'run', frames: this.anims.generateFrameNumbers('boy-run', {
                start: 0, end: 49
            }), frameRate: 30, repeat: -1 });
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys('W,A,S,D');
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Place the finish on the right-hand platform, reachable from the ground.
        const finishX = (this.map.width - 4) * this.map.tileWidth + this.map.tileWidth / 2;
        const finishY = 4 * this.map.tileHeight;
        this.add.rectangle(finishX, finishY - 90, 10, 180, 0xffffff);
        this.add.triangle(finishX + 5, finishY - 180, 0, 0, 100, 32, 0, 64, 0xffcf56).setOrigin(0);
        this.finish = this.add.zone(finishX, finishY - 90, 110, 180);
        this.physics.add.existing(this.finish, true);
        this.physics.add.overlap(this.player, this.finish, this.completeLevel, null, this);

        this.add.text(50, 36, 'FOREST RUN', { fontSize: '48px', color: '#ffffff', stroke: '#182c34', strokeThickness: 8 });
        this.add.text(50, 100, 'Move: A/D or arrows   |   Jump: Space, W or Up   |   Restart: R\nReach the golden flag!', {
            fontSize: '30px', color: '#ffffff', stroke: '#182c34', strokeThickness: 6
        });
    }

    completeLevel() {
        if (this.completed) return;
        this.completed = true;
        this.player.setVelocity(0, 0);
        this.player.anims.stop();
        this.physics.pause();
        const x = this.map.widthInPixels / 2;
        const y = this.map.heightInPixels / 2;
        this.add.rectangle(x, y, 1200, 300, 0x10252d, 0.95);
        this.add.text(x, y, 'Level complete!\nPress R to play again', {
            fontSize: '64px', color: '#ffcf56', align: 'center'
        }).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            this.physics.resume();
            this.scene.restart();
            return;
        }
        if (this.completed) return;
        let direction = 0;
        if (this.cursors.left.isDown || this.keysWASD.A.isDown) direction = -1;
        else if (this.cursors.right.isDown || this.keysWASD.D.isDown) direction = 1;
        this.player.setVelocityX(direction * 384);
        const grounded = this.player.body.touching.down || this.player.body.blocked.down;
        // Consume each press even in the air, so holding jump cannot cause repeated jumps.
        const spacePressed = Phaser.Input.Keyboard.JustDown(this.spacebar);
        const upPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const wPressed = Phaser.Input.Keyboard.JustDown(this.keysWASD.W);
        if (grounded && (spacePressed || upPressed || wPressed)) this.player.setVelocityY(-1200);
        this.player.setFlipX(direction < 0 || (direction === 0 && this.player.flipX));
        if (direction !== 0 && grounded) this.player.anims.play('run', true);
        else {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
    }
}
