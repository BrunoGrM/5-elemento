import Chefao from "./Chefao"

export default class Chefoes extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children, spriteArray, player, grounds){
        super(world, scene, children, {});
        this.scene = scene;
      
        this.createEnemies(scene, spriteArray, player, grounds);
    }

    createEnemies(scene, spriteArray, player, grounds) {
        spriteArray.forEach(sprite => {
            new Chefao(scene, sprite.x, sprite.y, player, grounds);
            sprite.destroy();
        })
    }
}