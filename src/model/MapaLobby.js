import { 
    DISTANCIAX,
    DISTANCIAY,
    geraElemento,
    posicionaElementoX, 
    posicionaElementoY
}  from "../utils/Functions";

export class LobbyScene extends Phaser.Scene {

    constructor() {
        super('LobbyScene');
    }

    preload() {
        this.sound.removeAll();

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 165, height / 2 - 80, 320, 50);
        
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 30,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var objetivoText = this.make.text({
            x: width / 2,
            y: height / 2 - 130,
            text: 'Encontre as 3 chaves mágicas para libertar o 5º elemento!',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        objetivoText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.setDepth(500);
            progressBar.fillRect(width / 2 - 165, height / 2 - 80, 320 * value, 50);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            objetivoText.destroy();
        });

        this.load.image('logo', './src/assets/logo.png');
        for (var i = 0; i < 80; i++) {
            this.load.image('logo'+i, './src/assets/logo.png');
        }
    }

    create(data) {
        this.jogador = data[1];

        geraElemento(this, -526, 444, -360, 245, 'backgroundAgua', [321, 325, 329], 24, 24);
        geraElemento(this, 444, 560, -351, 273, 'backgroundFogo', [63, 79, 95], 48, 48);
        const map = this.make.tilemap({key: "mapaLobby"});

        const tileset1 = map.addTilesetImage('World_A2', 'tilesLobby1');
        const tileset2 = map.addTilesetImage('assets-dungeon2', 'tilesFogo1');
        const tileset3 = map.addTilesetImage('World_B', 'tilesLobby2');
        const tileset4 = map.addTilesetImage('SF_Inside_C', 'tilesAgua3');
        
        const ground1 = map.createStaticLayer("ground1", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground2 = map.createStaticLayer("ground2", tileset1, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground3 = map.createStaticLayer("ground3", [tileset1, tileset2, tileset3], posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const ground4 = map.createStaticLayer("ground4", tileset4, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true}).setDepth(10);

        const portais1 = map.createStaticLayer("portais1", tileset4, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais2 = map.createStaticLayer("portais2", tileset4, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});
        const portais3 = map.createStaticLayer("portais3", tileset4, posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY)).setCollisionByProperty({"collider" : true});

        const spawnPoint = map.findObject(
            'heroi1',
            objects => objects.name === data[0]
        );
        this.jogador.posicionar(this, spawnPoint)

        const colisoes = [
            {
                funcao: false,
                grounds: [ground1, ground2, ground3, ground4],
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais1,
                cena: 'Terra1Scene',
                posicao: '1',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais2,
                cena: 'Fogo1Scene',
                posicao: '1',
                jogador: data[1]
            },
            {
                funcao: true,
                objeto: portais3,
                cena: 'Agua1Scene',
                posicao: '1',
                jogador: data[1]
            }
        ];
        this.jogador.colisao(colisoes);

        this.sound.play('mapaLobbyAudio', {
            volume: 0.3,
            loop: true
        });
    }
    
    update() {
        this.jogador.move();
    }
}