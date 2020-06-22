import Inimigos from "./Inimigos";
import Chaves from "./Chaves";

import { 
    DISTANCIAX,
    DISTANCIAY,
    posicionaElementoX, 
    posicionaElementoY,
    removerMusicas
}  from "../utils/Functions";

var inimigos;

const animacoesInimigo = {
    id: 'TERRA',
    leftInimigo: { start: 21, end: 23 },
    upInimigo: { start: 45, end: 47 },
    downInimigo: { start: 9, end: 11 },
    rightInimigo: { start: 33, end: 35 }
};

export class Terra1Scene extends Phaser.Scene {

    constructor() {
        super('Terra1Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaTerraAudio');
        
        const map = this.make.tilemap({key: "mapaTerra1"});

        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );
        this.jogador.posicionar(this, spawnPoint)

        const colisoes = [
            {
                funcao: false,
                grounds: [ground1, ground2, ground3],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'LobbyScene',
                posicao: '4',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Terra2Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, ground3, portais1, portais2];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Terra2Scene extends Phaser.Scene {

    constructor() {
        super('Terra2Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaTerraAudio');

        const map = this.make.tilemap({key: "mapaTerra2"});

        const tileset1 = map.addTilesetImage('Dungeon_A4', 'tilesTerra1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );
        this.jogador.posicionar(this, spawnPoint)

        const colisoes = [
            {
                funcao: false,
                grounds: [ground1, ground2],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'Terra1Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Terra3Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, portais1, portais2];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Terra3Scene extends Phaser.Scene {

    constructor() {
        super('Terra3Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaTerraAudio');

        const map = this.make.tilemap({key: "mapaTerra3"});

        const tileset1 = map.addTilesetImage('Inside_A2', 'tilesTerra2');
        const tileset2 = map.addTilesetImage('Inside_C', 'tilesTerra3');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );
        this.jogador.posicionar(this, spawnPoint)

        const colisoes = [
            {
                funcao: false,
                grounds: [ground1, ground2, ground3],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'Terra2Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Agua2Scene',
                posicao: '2',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, ground3, portais1, portais2];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);

        if(!this.jogador.mapasChavesColetas.includes(this.scene.key)) {
            var chaves = map.createFromObjects('chave', 'chave', {});
            new Chaves(this, chaves, this.jogador);
        }
    }

    update() {
        this.jogador.move();
    }
}