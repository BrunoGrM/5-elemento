export const DISTANCIAX = 540;
export const DISTANCIAY = 375;

export function geraElemento(jogo, xInicio, xFim, yInicio, yFim, imagem, frames, tamanhoX, tamanhoY) {
    for (let j = yInicio; j < yFim;) {
        for (let i = xInicio; i < xFim;) {
            let elemento = jogo.physics.add.sprite(posicionaElementoX(i), posicionaElementoY(j), imagem);
            elemento.setCollideWorldBounds(true).setImmovable(true);

            let chaveAleatoria = Math.floor((Math.random() * 54651898));
            
            jogo.anims.create({
                key: chaveAleatoria,
                frames: jogo.anims.generateFrameNumbers(imagem, { frames: frames }),
                frameRate: 2,
                repeat: -1
            });
            elemento.anims.play(chaveAleatoria, true);

            i = i+tamanhoX;
        }
        j = j+tamanhoY;
    }
}

export function mudarMapa(mapa, posicao, jogo, player, objeto) {
    if(mapa === 'MainScene') {
        window.location.reload();
    } else if (mapa === 'MapaVencedorScene') {
        jogo.anims.create({
            key: 'levantar',
            frames: jogo.anims.generateFrameNumbers('quintoElemento', { frames: [42, 43, 44, 24, 25, 26, 36, 37, 38, 15, 16, 17] }),
            frameRate: 10
        });
        
        objeto.anims.play('levantar', true);
        objeto.body.setVelocity(0);
        
        player.win = true;

        removerMusicas(jogo, 'musicaFinal');

        setTimeout(() => {
            jogo.scene.start(mapa, [`posicaoHeroi${posicao}`, player]);
        }, 2000);
    } else {
        jogo.scene.start(mapa, [`posicaoHeroi${posicao}`, player]);
    }
}

export function posicionaElementoX(x) {
    return screen.width/2+(x);
}

export function posicionaElementoY(y) {
    return screen.height/2+(y);
}

export function removerMusicas(jogo, chaveMusica) {
    jogo.sound.sounds.forEach(sound => {
        if(sound.key !== chaveMusica && sound.key !== 'flapWings') {
            jogo.sound.removeAll();
            jogo.sound.play(chaveMusica, {
                volume: 0.2,
                loop: true
            });
            return;
        }
    });
}