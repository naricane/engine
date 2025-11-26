WIP game engine inspired by Godot

Current features:
- Sprite component
- Input mapping
- Scene creation
- Simple GameObjects

Example: creating a walking scene.

```
import { Input, Scene, Sprite2D, Vec2 } from "@/Engine";

class Player extends Sprite2D {
    direction: Vec2 = new Vec2();
    speed = 5;

    ready() {
        this.texture.src = "assets/test.png";
    }

    update(input: Input) {
        this.direction = new Vec2();

        if (input.action_pressed("Up")) {
            this.direction.y = -1;
        }
        if (input.action_pressed("Down")) {
            this.direction.y = 1;
        }
        if (input.action_pressed("Left")) {
            this.direction.x = -1;
        }
        if (input.action_pressed("Right")) {
            this.direction.x = 1;
        }

    }

    fixed_update() {
        this.transform.position.x += this.direction.x * this.speed;
        this.transform.position.y += this.direction.y * this.speed;
    }
}

export class MainScene extends Scene {
    constructor() {
        super();

        this.world.add_child(new Player());
    }
}
```

And don't forget to register your key bindings:

```
window.addEventListener("DOMContentLoaded", () => {
    let app = new App(new MainScene());
    app.input.add_action("Up", "KeyW");
    app.input.add_action("Down", "KeyS");
    app.input.add_action("Left", "KeyA");
    app.input.add_action("Right", "KeyD");

    app.run();
});
```
