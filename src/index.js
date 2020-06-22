import Phaser from "phaser";
import { LobbyScene } from "./model/MapaLobby";
import { Fogo1Scene, Fogo2Scene, Fogo3Scene, Fogo4Scene, Fogo5Scene } from "./model/MapaFogo";
import { Agua1Scene, Agua2Scene, Agua3Scene, Agua4Scene, Agua5Scene } from "./model/MapaAgua";
import { Terra1Scene, Terra2Scene, Terra3Scene } from "./model/MapaTerra";
import { GameOverScene } from "./model/GameOver";
import { MapaFinalScene } from "./model/MapaFinal";
import { MapaVencedorScene } from "./model/MapaVencedor";

import Jogador from "./model/Jogador";

import { 
    DISTANCIAX,
    DISTANCIAY,
    posicionaElementoX, 
    posicionaElementoY,
    mudarMapa
}  from "./utils/Functions";

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.spritesheet("personagens", "./src/assets/Actor1.png", { frameWidth: 144, frameHeight: 144 });
        this.load.spritesheet("chave", "./src/assets/Flame.png", { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet("quintoElemento", "./src/assets/Actor2_6.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("player", "./src/assets/Heroes.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("playerLeftDeath", "./src/assets/heroisMortos.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("playerRightDeath", "./src/assets/heroisMortos-Invertido.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('monster', './src/assets/Monster.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('boss', './src/assets/boss.png', { frameWidth: 96, frameHeight: 96 });
        
        this.load.image("tilesLobby1", "./src/assets/World_A2.png");
        this.load.image("tilesLobby2", "./src/assets/World_B.png");
        this.load.tilemapTiledJSON("mapaLobby","./src/assets/MapaLobby.json");

        this.load.image("tilesFogo1", "./src/assets/assets-dungeon2.png");
        this.load.image("tilesFogo2", "./src/assets/Dungeon_B.png");
        this.load.image("tilesFogo3", "./src/assets/SF_Outside_B.png");
        this.load.tilemapTiledJSON("mapaFogo1","./src/assets/MapaFogo1.json");
        this.load.tilemapTiledJSON("mapaFogo2","./src/assets/MapaFogo2.json");
        this.load.tilemapTiledJSON("mapaFogo3","./src/assets/MapaFogo3.json");
        this.load.tilemapTiledJSON("mapaFogo4","./src/assets/MapaFogo4.json");
        this.load.tilemapTiledJSON("mapaFogo5","./src/assets/MapaFogo5.json");
        this.load.spritesheet("backgroundFogo", "./src/assets/World_A1.png", { frameWidth: 48, frameHeight: 48 });
        
        this.load.image("tilesAgua1", "./src/assets/World_A.png");
        this.load.image("tilesAgua2", "./src/assets/Dungeon_B.png");
        this.load.image("tilesAgua3", "./src/assets/SF_Inside_C.png");
        this.load.tilemapTiledJSON("mapaAgua1","./src/assets/MapaAgua1.json");
        this.load.tilemapTiledJSON("mapaAgua2","./src/assets/MapaAgua2.json");
        this.load.tilemapTiledJSON("mapaAgua3","./src/assets/MapaAgua3.json");
        this.load.tilemapTiledJSON("mapaAgua4","./src/assets/MapaAgua4.json");
        this.load.tilemapTiledJSON("mapaAgua5","./src/assets/MapaAgua5.json");
        this.load.spritesheet("backgroundAgua", "./src/assets/World_A1.png", { frameWidth: 24, frameHeight: 24 });
        
        this.load.image("tilesTerra1", "./src/assets/Dungeon_A4.png");
        this.load.image("tilesTerra2", "./src/assets/Inside_A2.png");
        this.load.image("tilesTerra3", "./src/assets/Inside_C.png");
        this.load.tilemapTiledJSON("mapaTerra1","./src/assets/MapaTerra1.json");
        this.load.tilemapTiledJSON("mapaTerra2","./src/assets/MapaTerra2.json");
        this.load.tilemapTiledJSON("mapaTerra3","./src/assets/MapaTerra3.json");

        this.load.image("tilesGameOver1", "./src/assets/Dungeon_C.png");
        this.load.image("gameOverImage", "./src/assets/gamerOver.png");
        this.load.image("gameStartImage", "./src/assets/GameStart.png");
        this.load.image("backgroundInicio", "./src/assets/backgroundInicio.png");
        this.load.tilemapTiledJSON("gameOver","./src/assets/GameOver.json");

        this.load.tilemapTiledJSON("mapaFinal","./src/assets/MapaFinal.json");
        
        this.load.audio('gameOverAudio', './src/assets/snd/TwinkStar.mp3');
        this.load.audio('mapaLobbyAudio', './src/assets/snd/MapaLobby.mp3');
        this.load.audio('mapaAguaAudio', './src/assets/snd/MapaAgua.mp3');
        this.load.audio('mapaFogoAudio', './src/assets/snd/MapaFogo.mp3');
        this.load.audio('mapaTerraAudio', './src/assets/snd/MapaTerra.mp3');
        this.load.audio('musicaFinal', './src/assets/snd/MusicaFinal.mp3');
        this.load.audio('introAudio', './src/assets/snd/intro.mp3');
        this.load.audio('salaPrincesa', './src/assets/snd/SalaPrincesa.mp3');

        this.load.audio('flapWings', './src/assets/snd/flapWings.mp3');
        this.load.audio('deathFemale', './src/assets/snd/deathFemale.mp3');
        this.load.audio('deathMale', './src/assets/snd/deathMale.mp3');
        this.load.audio('itemPickUp', './src/assets/snd/itemPickUp.mp3');

        this.load.image("ImagemFinal1", "./src/assets/ImagemFinal1.png");
        this.load.image("ImagemFinal2", "./src/assets/ImagemFinal2.png");
    }

    create() {
        localStorage.removeItem('vidas');
        
        this.add.image(posicionaElementoX(-DISTANCIAX+552), posicionaElementoY(-DISTANCIAY+312), 'gameStartImage');
        this.add.image(posicionaElementoX(-DISTANCIAX+552), posicionaElementoY(-DISTANCIAY+312), 'backgroundInicio');
        
        var posicaoPersonagem = 200;
        for(var i = 0; i < 4; i++) {
            let personagem = this.physics.add.sprite(posicionaElementoX(-DISTANCIAX+posicaoPersonagem), posicionaElementoY(-DISTANCIAY+500), 'personagens').setInteractive({useHandCursor: true});

            this.anims.create({
                key: `personagem${i+1}`,
                frames: this.anims.generateFrameNumbers('personagens', { frames: [i] }),
                frameRate: 10,
                repeat: -1
            });
            personagem.anims.play(`personagem${i+1}`, true);

            posicaoPersonagem = posicaoPersonagem+240;
        }

        this.sound.play('introAudio', {
            volume: 0.3,
            loop: true
        });
        
        this.input.on('gameobjectdown', this.escolherPersonagem, this);
    }

    escolherPersonagem(pointer, personagem) {
        let imagemPersonagem = {
            mover: { 
                left: {start: 12, end: 14 },
                up: { start: 36, end: 38 },
                down: { start: 0, end: 2 },
                right: { start: 24, end: 26 }
            },
            morrer: {
                right: { frames: [94, 95, 96] },
                left: { frames: [91, 92, 93] }
            },
            vida: { frames: [1] }
        };

        switch (personagem.x) {
            case 860:
                imagemPersonagem = {    
                    mover: { 
                        left: {start: 15, end: 17 },
                        up: { start: 39, end: 41 },
                        down: { start: 3, end: 5 },
                        right: { start: 27, end: 29 }
                    },
                    morrer: {
                        right: { frames: [85, 86, 87] },
                        left: { frames: [100, 101, 102] }
                    },
                    vida: { frames: [4] }
                };
                break;
            case 1100:
                imagemPersonagem = {
                    mover: { 
                        left: {start: 18, end: 20 },
                        up: { start: 42, end: 44 },
                        down: { start: 6, end: 8 },
                        right: { start: 30, end: 32 }
                    },
                    morrer: {
                        right: { frames: [196, 197, 198] },
                        left: { frames: [193, 194, 195] }
                    },
                    vida: { frames: [7] }
                };
                break;
            case 1340:
                imagemPersonagem = {
                    mover: { 
                        left: {start: 21, end: 23 },
                        up: { start: 45, end: 47 },
                        down: { start: 9, end: 11 },
                        right: { start: 33, end: 35 }
                    },
                    morrer: {
                        right: { frames: [187, 188, 189] },
                        left: { frames: [202, 203, 204] }
                    },
                    vida: { frames: [10] }
                };
                break;
            default:
                break;
        }

        const jogador = new Jogador(this, imagemPersonagem);
        mudarMapa('LobbyScene', '1', this, jogador);  
    }
}

const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    backgroundColor: '#392542',
    scene: [ MainScene, 
             LobbyScene,
             Fogo1Scene, Fogo2Scene, Fogo3Scene, Fogo4Scene, Fogo5Scene,
             Agua1Scene, Agua2Scene, Agua3Scene, Agua4Scene, Agua5Scene,
             Terra1Scene, Terra2Scene, Terra3Scene,
             GameOverScene,
             MapaFinalScene,
             MapaVencedorScene
            ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    }
};

new Phaser.Game(config);