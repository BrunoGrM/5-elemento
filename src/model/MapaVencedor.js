import { 
    DISTANCIAX,
    DISTANCIAY,
    posicionaElementoX, 
    posicionaElementoY,
    removerMusicas
}  from "../utils/Functions";

export class MapaVencedorScene extends Phaser.Scene {

    constructor() {
        super('MapaVencedorScene');
    }

    create() {
        this.physics.add.sprite(posicionaElementoX(DISTANCIAX-526), posicionaElementoY(DISTANCIAY-434), 'ImagemFinal1').setInteractive({useHandCursor: true});

        const mensagem = this.physics.add.sprite(posicionaElementoX(DISTANCIAX-526), posicionaElementoY(DISTANCIAY-434), 'ImagemFinal2').setInteractive({useHandCursor: true});
        mensagem.setAlpha(0);

        this.tweens.add({
            targets: mensagem,
            alpha: 1,
            duration: 2000,
        }, this);

        this.input.on('gameobjectdown', () => window.location.reload());
    }
    
    update() {
    }
}