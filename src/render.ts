import {Point2D} from "./types";

export function drawPoint2D(ctx: CanvasRenderingContext2D, [x, y]: Point2D, color: string): void {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawSegment2D(ctx: CanvasRenderingContext2D, [ax, ay]: Point2D, [bx, by]: Point2D, color: string, scale: number): void {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function drawImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, alpha: number): void {
    ctx.save();
    ctx.drawImage(image, 0, 0, width, height);
    ctx.globalAlpha = alpha;
    ctx.restore();
}