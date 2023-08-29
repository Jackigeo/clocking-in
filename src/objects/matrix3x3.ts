import { Vector2D } from "./vector2d";

export class Matrix3x3 {
  
    data: number[][];

    constructor(data?: number[][]) {
        this.data = data || [ 
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
        ];
    }
    
    multiply(vector: Vector2D): Vector2D {
      return new Vector2D(
        this.data[0][0] * vector.x + this.data[0][1] * vector.y,
        this.data[1][0] * vector.x + this.data[1][1] * vector.y
      );
    }
  
    translate(vector: Vector2D): Matrix3x3 {
      return new Matrix3x3([
        [1, 0, vector.x],
        [0, 1, vector.y],
        [0, 0, 1]  
      ]);
    }
  
    rotate(angle: number): Matrix3x3 {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
  
      return new Matrix3x3([
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
      ]);
    }
  
    scale(vector:Vector2D): Matrix3x3 {
      // Scaling matrix
      return new Matrix3x3([
        [vector.x, 0, 0],
        [0, vector.y, 0],
        [0, 0, 1]
      ]);
    }
  }
