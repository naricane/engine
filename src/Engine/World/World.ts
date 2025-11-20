import { GameObject } from "./GameObject";

export class World {
    public game_objects: Array<GameObject> = new Array();

    public add_child(game_object: GameObject): void {
        game_object.ready();
        this.game_objects.push(game_object);
    }
}
