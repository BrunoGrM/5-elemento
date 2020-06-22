import { 
    posicionaElementoX, 
    posicionaElementoY
} from "../utils/Functions";

export default class Chave extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, player){
        super(scene, x, y, 'chave');
        this.scene = scene;
        this.player = player;
        this.chaveColetada = false;

        this.scene.physics.world.enable(this);

        this.chave = this.scene.physics.add.sprite(posicionaElementoX(x-540), posicionaElementoY(y-375), 'chave');
        this.chave.setCollideWorldBounds(true);
           
        this.animar();

        this.chave.anims.play('chaveAnims', true); 

        this.timeEvent = this.scene.time.addEvent({
            delay: 1,
            callback: () => {
                if(!this.chaveColetada) {
                    this.player.pause ? this.chave.anims.stop() : this.chave.anims.play('chaveAnims', true)
                }
            },
            loop: true,
            callbackScope: this
        }); 

        this.scene.physics.add.collider(this.chave, this.player.getJogador(), () => {this.player.coletarChave(this.scene); this.remover();}, null, this);

        if(this.player.getVidas() === 0) {
            this.chave.anims.stop();
        }
    }

    animar() {
        this.scene.anims.create({
            key: 'chaveAnims',
            frames: this.scene.anims.generateFrameNumbers('chave', { frames: [90, 78, 66, 54] }),
            frameRate: 5,
            repeat: -1
        });
    }

    remover() {
        this.chaveColetada = true;
        this.chave.destroy()
    }
}