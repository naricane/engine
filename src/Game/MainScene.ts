import { Scene, Sprite2D, Vec2 } from "@/Engine";

class Ball extends Sprite2D {
    velocity: Vec2 = new Vec2();

    ready() {
        this.texture.src = "assets/test.png";

        this.velocity.x = 10;
        this.velocity.y = 10;
    }

    fixed_update() {
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;

        if (this.transform.position.x > 1280 - 100 || this.transform.position.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.transform.position.y > 720 - 100 || this.transform.position.y < 0) {
            this.velocity.y *= -1;
        }
    }
}

export class MainScene extends Scene {
    constructor() {
        super();

        this.world.add_child(new Ball());
    }
}
