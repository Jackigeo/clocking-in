export class Vector2D {
    constructor(public x:number, public y:number) {}

    add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
      }
    
    multiply(factor: number): Vector2D {
        return new Vector2D(this.x * factor, this.y * factor);
    }
}