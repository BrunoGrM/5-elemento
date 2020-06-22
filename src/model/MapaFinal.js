import Chefoes from "./Chefoes";

import { 
    DISTANCIAX,
    DISTANCIAY,
    posicionaElementoX, 
    posicionaElementoY,
    removerMusicas
}  from "../utils/Functions";

var boss;

export class MapaFinalScene extends Phaser.Scene {

    constructor() {
        super('MapaFinalScene');
    }

    create(data) {
        this.jogador = data[1];

        if(!localStorage.getItem('vidas')) {
            localStorage.setItem('vidas', this.jogador.getVidas())
        }

        removerMusicas(this, 'salaPrincesa');

        const map = this.make.tilemap({key: "mapaFinal"});
        
        const tileset1 = map.addTilesetImage('World_A', 'tilesAgua1');
        const tileset2 = map.addTilesetImage('Dungeon_C', 'tilesGameOver1');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        map.createStaticLayer("portais1", tileset2, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );
        this.jogador.posicionar(this, spawnPoint)

        const spawnPointQuintoElemento = map.findObject(
            'heroi2',
            objects => objects.name === 'posicaoHeroi2'
        );

        const quintoElemento = this.physics.add.sprite(posicionaElementoX(spawnPointQuintoElemento.x-DISTANCIAX), posicionaElementoY(spawnPointQuintoElemento.y-DISTANCIAY), "quintoElemento");
        quintoElemento.setCollideWorldBounds(true);

        this.anims.create({
            key: 'deitado',
            frames: this.anims.generateFrameNumbers('quintoElemento', { frames: [53] }),
            frameRate: 10,
            repeat: -1
        });
        quintoElemento.anims.play('deitado', true);

        const colisoes = [
            {
                funcao: false,
                grounds: [ground1, ground2, ground3],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: quintoElemento,
                cena: 'MapaVencedorScene',
                posicao: '0',
                jogador: data[1]
            },
        ];

        this.jogador.colisao(colisoes);
        
        const grounds = [ground1, ground2, ground3];
        boss = map.createFromObjects('inimigo', 'inimigo', {});
        new Chefoes(this.physics.world, this, [], boss, this.jogador, grounds);

        if(localStorage.getItem('vidas') == this.jogador.getVidas()) {
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;

            var infoText = this.make.text({
                x: width / 2+30,
                y: height / 2-50,
                text: 'Parabéns! Você encontrou as 3 chaves mágicas, \n     use-as para libertar o 5º elemento!',
                style: {
                    font: '30px monospace',
                    fill: '#000000'
                }
            });
            infoText.setOrigin(0.5, 0.5);
            infoText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);

            this.tweens.add({
                targets: infoText,
                alpha: 0,
                duration: 5000,
            }, this);
        }
    }
    
    update() {
        this.jogador.move();
    }
}