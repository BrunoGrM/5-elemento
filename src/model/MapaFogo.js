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
    id: 'FOGO',
    leftInimigo: { start: 12, end: 14 },
    upInimigo: { start: 36, end: 38 },
    downInimigo: { start: 0, end: 2 },
    rightInimigo: { start: 24, end: 26 }
};

export class Fogo1Scene extends Phaser.Scene {

    constructor() {
        super('Fogo1Scene');
    }

    create(data) {
        this.jogador = data[1];

        if(this.inimigos) {
            this.inimigos.destroy();
        }

        removerMusicas(this, 'mapaFogoAudio');

        geraElemento(this, -516, 588, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaFogo1"});

        const tileset1 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesFogo2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais3 = map.createStaticLayer("portais3", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais4 = map.createStaticLayer("portais4", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais5 = map.createStaticLayer("portais5", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais6 = map.createStaticLayer("portais6", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo4Scene',
                posicao: '1',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Fogo3Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais4,
                cena: 'Fogo3Scene',
                posicao: '1',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais5,
                cena: 'Fogo2Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais6,
                cena: 'Fogo2Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);
       
        const grounds = [ground1, ground2, ground3, portais1, portais2, portais3, portais4, portais5, portais6];
        inimigos = map.createFromObjects('inimigo', 'inimigo', {});
        this.inimigos = new Inimigos(this.physics.world, this, [], inimigos, this.jogador, grounds, true, animacoesInimigo);
    }

    update() {
        this.jogador.move();
    }
}

export class Fogo2Scene extends Phaser.Scene {

    constructor() {
        super('Fogo2Scene');
    }

    create(data) {
        this.jogador = data[1];
        
        removerMusicas(this, 'mapaFogoAudio');
        this.sound.removeByKey('flapWings');

        geraElemento(this, -516, 588, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaFogo2"});

        const tileset1 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesFogo2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');

        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Fogo1Scene',
                posicao: '6',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo1Scene',
                posicao: '5',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Fogo3Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);
    }

    update() {
        this.jogador.move();
    }
}

export class Fogo3Scene extends Phaser.Scene {

    constructor() {
        super('Fogo3Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaFogoAudio');
        this.sound.removeByKey('flapWings');

        geraElemento(this, -516, 588, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaFogo3"});

        const tileset1 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesFogo2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');

        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                grounds: [ground1, ground2, ground3],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'Fogo1Scene',
                posicao: '3',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo1Scene',
                posicao: '4',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Fogo5Scene',
                posicao: '2',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);
    }

    update() {
        this.jogador.move();
    }
}

export class Fogo4Scene extends Phaser.Scene {

    constructor() {
        super('Fogo4Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaFogoAudio');
        this.sound.removeByKey('flapWings');

        geraElemento(this, -516, 588, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaFogo4"});

        const tileset1 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesFogo2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');

        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

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
                grounds: [ground1, ground2],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'Fogo1Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo5Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);
    }

    update() {
        this.jogador.move();
    }
}

export class Fogo5Scene extends Phaser.Scene {

    constructor() {
        super('Fogo5Scene');
    }

    create(data) {
        this.jogador = data[1];

        removerMusicas(this, 'mapaFogoAudio');
        this.sound.removeByKey('flapWings');

        geraElemento(this, -516, 588, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaFogo5"});

        const tileset1 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset2 = map.addTilesetImage('Dungeon_B', 'tilesFogo2');
        const tileset3 = map.addTilesetImage('SF_Outside_B', 'tilesFogo3');

        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const portais1 = map.createStaticLayer("portais1", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset3, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais3 = map.createStaticLayer("portais3", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

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
                cena: 'Fogo4Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo3Scene',
                posicao: '2',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Fogo1Scene',
                posicao: '2',
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