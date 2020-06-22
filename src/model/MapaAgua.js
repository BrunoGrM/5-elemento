import Inimigos from "./Inimigos";
import Chaves from './Chaves';

import { 
    DISTANCIAX,
    DISTANCIAY,
    geraElemento, 
    posicionaElementoX, 
    posicionaElementoY,
    removerMusicas 
}  from "../utils/Functions";

var inimigos;

const animacoesInimigo = {
    id: 'AGUA',
    leftInimigo: { start: 15, end: 17 },
    upInimigo: { start: 39, end: 41 },
    downInimigo: { start: 3, end: 5 },
    rightInimigo: { start: 27, end: 29 }
};

export class Agua1Scene extends Phaser.Scene {

    constructor() {
        super('Agua1Scene');
    }

    create(data) {
        this.jogador = data[1];

        if(this.inimigos) {
            this.inimigos.destroy();
        }
        
        removerMusicas(this, 'mapaAguaAudio');

        geraElemento(this, -526, 578, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        const map = this.make.tilemap({key: "mapaAgua1"});

        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
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
                posicao: '3',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Agua2Scene',
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

export class Agua2Scene extends Phaser.Scene {

    constructor() {
        super('Agua2Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaAguaAudio');

        geraElemento(this, -526, 578, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        const map = this.make.tilemap({key: "mapaAgua2"});

        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
        const ground1 = map.createStaticLayer("ground1", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", [tileset1, tileset2], posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais3 = map.createStaticLayer("portais3", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Agua1Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Agua3Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Agua3Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, portais1, portais2, portais3];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Agua3Scene extends Phaser.Scene {

    constructor() {
        super('Agua3Scene');
    }

    create(data) {
        this.jogador = data[1];
        
        removerMusicas(this, 'mapaAguaAudio');

        geraElemento(this, -526, 578, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        const map = this.make.tilemap({key: "mapaAgua3"});

        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais3 = map.createStaticLayer("portais3", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais4 = map.createStaticLayer("portais4", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Agua2Scene',
                posicao: '3',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Agua2Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Agua4Scene',
                posicao: '1',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais4,
                cena: 'Agua5Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, ground3, portais1, portais2, portais3, portais4];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Agua4Scene extends Phaser.Scene {

    constructor() {
        super('Agua4Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaAguaAudio');

        geraElemento(this, -526, 578, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        const map = this.make.tilemap({key: "mapaAgua4"});

        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Agua3Scene',
                posicao: '3',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        const grounds = [ground1, ground2, ground3, portais1];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Agua5Scene extends Phaser.Scene {

    constructor() {
        super('Agua5Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaAguaAudio');
        this.sound.removeByKey('flapWings');
        
        geraElemento(this, -526, 578, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        const map = this.make.tilemap({key: "mapaAgua5"});

        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesAgua2');
        const tileset3 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
        const ground1 = map.createStaticLayer("ground1", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Agua3Scene',
                posicao: '4',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        if(!this.jogador.mapasChavesColetas.includes(this.scene.key)) {
            var chaves = map.createFromObjects('chave', 'chave', {});
            new Chaves(this, chaves, this.jogador);
        }
    }

    update() {
        this.jogador.move();
    }
}