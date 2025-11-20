import { Scene } from "./Scene";
import { Input } from "./Input";

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private main_loop: any;

    private scene: Scene;

    public delta: number = 0;

    private readonly tps: number = 60;
    private readonly time_per_tick: number = 1 / this.tps;
    private last_tick_time: number = new Date().getTime() / 1000;
    private lag_time: number = 0;
    private ticks: number = 0;

    public input: Input = new Input();

    public constructor(main_scene: Scene) {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;

        this.canvas.width = 1280;
        this.canvas.height = 720;

        this.scene = main_scene;
    }

    private update(): void {
        let new_tick_time = new Date().getTime() / 1000;
        this.delta = new_tick_time - this.last_tick_time;
        this.last_tick_time = new_tick_time;
        this.lag_time += this.delta;

        this.scene.update(this.input);
        this.input.finish_frame();

        while (this.lag_time >= this.time_per_tick) {
            this.scene.fixed_update();
            this.lag_time -= this.time_per_tick;
            this.ticks++;
        }

    }

    private draw(ctx: CanvasRenderingContext2D): void {
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let step = this.lag_time / this.time_per_tick;
        this.scene.draw(ctx);

        window.requestAnimationFrame(this.main_loop);
    }

    public run(): void {
        this.main_loop = () => {
            this.update();
            this.draw(this.ctx);
        }

        window.requestAnimationFrame(this.main_loop);
    }
}
