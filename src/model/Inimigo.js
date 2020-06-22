import { 
    posicionaElementoX, 
    posicionaElementoY
} from "../utils/Functions";

export default class Inimigo extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, player, grounds, animate, animacoesInimigo){
        super(scene, x, y, 'monster', 0, animate, animacoesInimigo);
        this.scene = scene;
        this.player = player;
        this.animacoesInimigo = animacoesInimigo;
        this.pause = false;

        this.scene.physics.world.enable(this);

        const inimigo = this.scene.physics.add.sprite(posicionaElementoX(x-540), posicionaElementoY(y-375), 'monster');
        inimigo.setCollideWorldBounds(true);
         
        if(this.animacoesInimigo.id === 'FOGO') {
            this.scene.sound.sounds.forEach((sound, index) => {
                if( (index > 0 || this.scene.sound.sounds.length === 1) && sound.key !== 'flapWings') {
                    this.scene.sound.play('flapWings', {
                        volume: 2.0,
                        loop: true
                    });
                    return;
                }
            });
        }

        this.animar();

        inimigo.anims.play(`downInimigo${this.animacoesInimigo.id}`, true);

        this.timeEvent = this.scene.time.addEvent({
            delay: 1,
            callback: () => this.player.pause ? inimigo.anims.stop() : inimigo.anims.play(inimigo.anims.currentAnim.key, true),
            loop: true,
            callbackScope: this
        });        

        if(animate) {     
            this.scene.physics.add.collider(inimigo, this.player.getJogador(), () => this.player.morrer(this.scene), null, this);
            
            grounds.push(inimigo);
            grounds.forEach(ground => this.scene.physics.add.collider(inimigo, ground));

            if(this.player.getVidas() === 0) {
                inimigo.anims.stop();
            }

            this.timeEvent = this.scene.time.addEvent({
                delay: 3000,
                callback: () => this.move(inimigo),
                loop: true,
                callbackScope: this
            });
        }
    }

    animar() {
        this.scene.anims.create({
            key: `leftInimigo${this.animacoesInimigo.id}`,
            frames: this.scene.anims.generateFrameNumbers('monster', this.animacoesInimigo.leftInimigo),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: `upInimigo${this.animacoesInimigo.id}`,
            frames: this.scene.anims.generateFrameNumbers('monster', this.animacoesInimigo.upInimigo),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: `downInimigo${this.animacoesInimigo.id}`,
            frames: this.scene.anims.generateFrameNumbers('monster', this.animacoesInimigo.downInimigo),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: `rightInimigo${this.animacoesInimigo.id}`,
            frames: this.scene.anims.generateFrameNumbers('monster', this.animacoesInimigo.rightInimigo),
            frameRate: 10,
            repeat: -1
        });
    }

    move(inimigo){
        if(this.player.getVidas() === 0 || this.player.pause) {
            this.pause = true;
            return;
        }
        
        const randNumber = Math.floor(Math.random() * 4 + 1);
        switch(randNumber){
            case 1: 
                inimigo.setVelocityX(160);
                inimigo.anims.play('rightInimigo', true);
                break
            case 2: 
                inimigo.setVelocityX(-160);
                inimigo.anims.play('leftInimigo', true);
                break
            case 3: 
                inimigo.setVelocityY(160);
                inimigo.anims.play('downInimigo', true);
                break
            case 4: 
                inimigo.setVelocityY(-160);
                inimigo.anims.play('upInimigo', true);
                break
            default: 
                inimigo.anims.play('downInimigo', true);
        }

        this.scene.time.addEvent({
            delay:500,
            callback: () => {
                inimigo.setVelocity(0)
            },
            callbackScope: this,
        })

        this.pause = false;
    }
}