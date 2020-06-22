import Inimigo from "./Inimigo"

export default class Inimigos extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children, spriteArray, player, grounds, animate = true, animacoesInimigo){
        super(world, scene, children, {});
        this.scene = scene;
        
        this.createEnemies(scene, spriteArray, player, grounds, animate, animacoesInimigo);
    }

    createEnemies(scene, spriteArray, player, grounds, animate, animacoesInimigo) {
        spriteArray.forEach(sprite => {
            new Inimigo(scene, sprite.x, sprite.y, player, grounds, animate, animacoesInimigo);
            sprite.destroy();
        })
    }
}