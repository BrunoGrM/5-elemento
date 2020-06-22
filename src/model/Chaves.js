import Chave from "./Chave"

export default class Chaves extends Phaser.Physics.Arcade.Group{
    constructor(scene, spriteArray, player){
        super(scene, spriteArray, player);
        this.scene = scene;
      
        this.createChaves(scene, spriteArray, player);
    }

    createChaves(scene, spriteArray, player) {
        spriteArray.forEach(sprite => {
            new Chave(scene, sprite.x, sprite.y, player);
            sprite.destroy();
        })
    }
}