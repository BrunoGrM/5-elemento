import { 
    posicionaElementoX, 
    posicionaElementoY
} from "../utils/Functions";

export default class Chefao extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, player, grounds){
        super(scene, x, y, 'monster', 0);
        this.scene = scene;
        this.player = player;
        this.pause = false;

        this.scene.physics.world.enable(this);

        const boss = this.scene.physics.add.sprite(posicionaElementoX(x-540), posicionaElementoY(y-375), 'boss');
        boss.setCollideWorldBounds(true);

        this.animar();

        boss.setVelocityY(250);
        boss.anims.play('downBoss', true);

        this.timeEvent = this.scene.time.addEvent({
            delay: 1,
            callback: () => this.player.pause ? boss.anims.stop() : boss.anims.play(boss.anims.currentAnim.key, true),
            loop: true,
            callbackScope: this
        });        

        this.scene.physics.add.collider(boss, this.player.getJogador(), () => this.player.morrer(this.scene), null, this);
        
        grounds.push(boss);
        grounds.forEach(ground => this.scene.physics.add.collider(boss, ground));

        if(this.player.getVidas() === 0) {
            boss.anims.stop();
        }

        this.timeEvent = this.scene.time.addEvent({
            delay: 2000,
            callback: () => this.move(boss),
            loop: true,
            callbackScope: this
        });
    }

    animar() {   
        this.scene.anims.create({
            key: 'upBoss',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'downBoss',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    move(boss){
        if(this.player.getVidas() === 0 || this.player.pause) {
            this.pause = true;
            return;
        }

        if(boss.y === 717) {
            boss.setVelocityY(-250);
            boss.anims.play('upBoss', true);
        } else{
            boss.setVelocityY(250);
            boss.anims.play('downBoss', true);
        }

        this.pause = false;
    }
}