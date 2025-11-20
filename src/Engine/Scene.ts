import { Input, VisualGameObject, World } from ".";

export abstract class Scene {
    protected world: World = new World();

    public update(input: Input): void {
        for (let obj of this.world.game_objects) {
            obj.update(input);
        }
    }

    public fixed_update(): void {
        for (let obj of this.world.game_objects) {
            obj.fixed_update();
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (let obj of this.world.game_objects) {
            if (obj instanceof VisualGameObject) {
                obj.draw(ctx);
            }
        }
    }
}
