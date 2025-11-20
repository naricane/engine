type KeyCode = string;

interface Action {
    key: KeyCode;
    pressed: boolean;
    just_pressed: boolean;
    just_released: boolean;
}

export class Input {
    private actions: Map<string, Action> = new Map();

    constructor() {
        window.addEventListener('keydown', this.handle_key_down.bind(this));
        window.addEventListener('keyup', this.handle_key_up.bind(this));
    }

    private handle_key_down(event: KeyboardEvent) {
        const key = event.code;
        for (const [_, action] of this.actions.entries()) {
            if (action.key === key) {
                if (!action.pressed) {
                    action.just_pressed = true;
                }
                action.pressed = true;
            }
        }
    }

    private handle_key_up(event: KeyboardEvent) {
        const key = event.code;
        for (const [_, action] of this.actions.entries()) {
            if (action.key === key) {
                if (action.pressed) {
                    action.just_released = true;
                }
                action.pressed = false;
            }
        }
    }

    public add_action(name: string, key: KeyCode) {
        this.actions.set(name, { key: key, pressed: false, just_pressed: false, just_released: false });
    }

    public action_pressed(name: string): boolean {
        return this.actions.get(name)?.pressed ?? false;
    }

    public action_just_pressed(name: string): boolean {
        return this.actions.get(name)?.just_pressed ?? false;
    }

    public action_just_released(name: string): boolean {
        return this.actions.get(name)?.just_released ?? false;
    }

    public finish_frame(): void {
        for (const state of this.actions.values()) {
            state.just_pressed = false;
            state.just_released = false;
        }
    }

}
