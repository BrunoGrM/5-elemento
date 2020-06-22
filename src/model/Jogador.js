import { 
    DISTANCIAX, 
    DISTANCIAY, 
    posicionaElementoX, 
    posicionaElementoY,
    mudarMapa
} from "../utils/Functions";

export default class Jogador extends Phaser.Physics.Arcade.Sprite{
    constructor(jogo, imagemPersonagem){
        super(jogo, imagemPersonagem);
        this.jogo = jogo;
        this.imagemPersonagem = imagemPersonagem;

        this.morto;
        this.vidas = 3;
        this.win = false;
        this.pause = false;
        this.gameOver = false;
        this.spritesVidas = [];
        this.chavesColetadas = 0;
        this.mapasChavesColetas = [];
    }

    getJogador() {
        return this.player;
    }

    getVidas() {
        return this.vidas;
    }

    posicionar(jogo, spawnPoint) {
        this.jogo = jogo;
        this.player = this.jogo.physics.add.sprite(posicionaElementoX(spawnPoint.x-DISTANCIAX), posicionaElementoY(spawnPoint.y-DISTANCIAY), "player");
        this.player.setCollideWorldBounds(true);
        if(!this.gameOver) {
            this.desenharVidas();
            this.desenharChaves();
        }
        
        this.jogo.anims.create({
            key: 'stop',
            frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.vida),
            frameRate: 2,
            repeat: -1
        });
        this.player.anims.play('stop', true);
        this.animar();

        this.veil = this.jogo.add.graphics({ x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.5);
        this.veil.fillRect(posicionaElementoX(-DISTANCIAX), posicionaElementoY(-DISTANCIAY), 1104, 624);
        this.veil.setDepth(-999999999);
        this.veil.setScrollFactor(0);
        
        this.text = this.jogo.add.text(posicionaElementoX(-DISTANCIAX+420), posicionaElementoY(-DISTANCIAY+270), 'Jogo Pausado', { fontSize: '50px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, sans-serif' });
        this.text.setDepth(-999999999);
        
        this.jogo.input.keyboard.on('keydown_ENTER', function() {
            this.pause = !this.pause;

            if(!this.pause) {
                this.veil.setDepth(-999999999);
                this.text.setDepth(-999999999);
                this.jogo.sound.sounds[0].resume();
            } else {
                this.jogo.sound.sounds[0].pause();
                this.player.body.setVelocity(0);
                this.player.anims.stop();
                this.veil.setDepth(999999999);
                this.text.setDepth(999999999);
            }
        }, this);
    }

    animar() {
        this.jogo.anims.create({
            key: 'left',
            frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.mover.left),
            frameRate: 10,
            repeat: -1
        });

        this.jogo.anims.create({
            key: 'up',
            frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.mover.up),
            frameRate: 10,
            repeat: -1
        });

        this.jogo.anims.create({
            key: 'down',
            frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.mover.down),
            frameRate: 10,
            repeat: -1
        });

        this.jogo.anims.create({
            key: 'right',
            frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.mover.right),
            frameRate: 10,
            repeat: -1
        });
    }

    colisao(colisoes) {
        colisoes.forEach(colisao => {
            if(colisao.funcao) {
                this.jogo.physics.add.collider(this.player, colisao.objeto, () => mudarMapa(colisao.cena, colisao.posicao, this.jogo, colisao.jogador, colisao.objeto), null, this.jogo);
            } else {
                colisao.grounds.forEach(ground => this.jogo.physics.add.collider(this.player, ground));
            }
        });
    }

    coletarChave(scene) {
        scene.sound.play('itemPickUp', {volume: 0.3});
        setTimeout(() => {
            scene.sound.removeByKey('itemPickUp');
        }, 600);
        this.chavesColetadas++;
        this.mapasChavesColetas.push(scene.scene.key);
        this.countChaves.setText(this.chavesColetadas);
        if(this.chavesColetadas === 3) {
            mudarMapa('MapaFinalScene', '1', scene, this);
        }
    }

    desenharChaves() {
        this.countChaves = this.jogo.make.text({
            x: posicionaElementoX(-DISTANCIAX+1030),
            y: posicionaElementoY(-DISTANCIAY+15),
            text: this.chavesColetadas,
            style: {
                font: '30px monospace',
                fill: '#ffffff'
            }
        });
        this.countChaves.setDepth(9999999);
        let novaVida = this.jogo.physics.add.sprite(posicionaElementoX(-DISTANCIAX+1070), posicionaElementoY(-DISTANCIAY+30), 'chave').setDepth(100);
        this.jogo.anims.create({
            key: 'chaveColetada',
            frames: this.jogo.anims.generateFrameNumbers('chave', { frames: [54] }),
            frameRate: 2,
            repeat: -1
        });
        novaVida.anims.play('chaveColetada', true);    
    }

    desenharVidas() {
        var posicaoVida = 30;
        for(var i = 0; i < this.vidas; i++) {
            let novaVida = this.jogo.physics.add.sprite(posicionaElementoX(-DISTANCIAX+posicaoVida), posicionaElementoY(-DISTANCIAY+30), 'player').setDepth(100);
            this.spritesVidas.push(novaVida);

            this.jogo.anims.create({
                key: `vida${i+1}`,
                frames: this.jogo.anims.generateFrameNumbers('player', this.imagemPersonagem.vida),
                frameRate: 2,
                repeat: -1
            });
            novaVida.anims.play(`vida${i+1}`, true);    

            posicaoVida = posicaoVida+50;
        }
    }

    morrer(scene) {
        if(this.ultimaPosicao === 'right') {
            this.morto = this.jogo.physics.add.sprite(this.getJogador().x, this.getJogador().y+20, 'playerRightDeath');
            this.jogo.anims.create({
                key: 'morteDireita',
                frames: this.jogo.anims.generateFrameNumbers('playerRightDeath', this.imagemPersonagem.morrer.right),
                frameRate: 10,
                repeat: -1
            });
            this.morto.anims.play('morteDireita', true);
        } else {
            this.morto = this.jogo.physics.add.sprite(this.getJogador().x, this.getJogador().y+20, 'playerLeftDeath');
            this.jogo.anims.create({
                key: 'morteEsquerda',
                frames: this.jogo.anims.generateFrameNumbers('playerLeftDeath', this.imagemPersonagem.morrer.left),
                frameRate: 10,
                repeat: -1
            });
            this.morto.anims.play('morteEsquerda', true);
        }

        this.player.destroy();

        this.vidas--;
        const vidaPerdida = this.spritesVidas[this.vidas];
        vidaPerdida.destroy();

        let sexoJogador = this.imagemPersonagem.vida.frames[0];
        if(sexoJogador === 4 || sexoJogador === 10) {
            scene.sound.play('deathFemale', {volume: 0.3});
        } else {
            scene.sound.play('deathMale', {volume: 0.3});
        }

        setTimeout(() => {
            this.morto.destroy();
            scene.scene.restart();  

            if(sexoJogador === 4 || sexoJogador === 10) {
                scene.sound.removeByKey('deathFemale');
            } else {
                scene.sound.removeByKey('deathMale');
            }

            if(this.vidas === 0) {
                mudarMapa('GameOverScene', '1', scene, this);
            }
        }, 600);
    }

    move() {
        if((this.getVidas() === 0 && !this.gameOver) || this.pause) {
            return;
        } 

        if(this.win) {
            this.player.anims.stop();
            this.ultimaPosicao = 'stop';
        } else {
            if(this.player.body) {
                this.player.body.setVelocity(0);
                var cursors = this.jogo.input.keyboard.createCursorKeys();
            
                if(cursors.left.isDown) {
                    this.player.setVelocityX(-160);
                    this.player.anims.play('left', true);
                    this.ultimaPosicao = 'left';
                }
                else if(cursors.right.isDown) {
                    this.player.setVelocityX(160);
                    this.player.anims.play('right', true);
                    this.ultimaPosicao = 'right';
                }
                else if(cursors.up.isDown) {
                    this.player.setVelocityY(-160);
                    this.player.anims.play('up', true);
                    this.ultimaPosicao = 'up';
                }
                else if(cursors.down.isDown) {
                    this.player.setVelocityY(160);
                    this.player.anims.play('down', true);
                    this.ultimaPosicao = 'down';
                }
                else{
                    this.player.anims.stop();
                    this.ultimaPosicao = 'stop';
                }
            }
        }
    }
}