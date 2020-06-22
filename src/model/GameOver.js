import Inimigos from './Inimigos';

import { 
    DISTANCIAX,
    DISTANCIAY,
    posicionaElementoX, 
    posicionaElementoY,
    removerMusicas
}  from "../utils/Functions";

var inimigos;

const animacoesInimigo = {
    id: 'FOGO',
    leftInimigo: { start: 12, end: 14 },
    upInimigo: { start: 36, end: 38 },
    downInimigo: { start: 0, end: 2 },
    rightInimigo: { start: 24, end: 26 }
};

export class GameOverScene extends Phaser.Scene {

    constructor() {
        super('GameOverScene');
    }

    create(data) {
        this.jogador = data[1];
        
        removerMusicas(this, 'gameOverAudio');
        
        const map = this.make.tilemap({key: "gameOver"});
        this.add.image(posicionaElementoX(-DISTANCIAX+552), posicionaElementoY(-DISTANCIAY+312), 'gameOverImage');

        const tileset1 = map.addTilesetImage('Dungeon_C', 'tilesGameOver1');
        const tileset2 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
       
        const portais1 = map.createStaticLayer("portais1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        
        const ground2 = map.createStaticLayer("ground2", [tileset1, tileset2], posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", [tileset1, tileset2], posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );

        this.jogador.gameOver = true;
        this.jogador.posicionar(this, spawnPoint);

        const colisoes = [
            {
                funcao: false,
                grounds: [ground2, ground3],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'MainScene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, [], false, animacoesInimigo);
    }
    
    update() {
        this.jogador.move();
    }
}