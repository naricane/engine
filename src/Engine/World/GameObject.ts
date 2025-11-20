import { Input, Vec2 } from "@/Engine";

export abstract class GameObject {
    ready(): void { }
    update(_input: Input): void { }
    fixed_update(): void { }
}

class Transform {
    public position: Vec2 = new Vec2();
}

export class GameObject2D extends GameObject {
    public transform: Transform = new Transform();
}

export abstract class VisualGameObject extends GameObject2D {
    abstract draw(ctx: CanvasRenderingContext2D): void;
}

export class Sprite2D extends VisualGameObject {
    texture = new Image();

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.texture, this.transform.position.x, this.transform.position.y);
    }
}
