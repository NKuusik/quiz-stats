export class Entity {
    name: string;
    color: string;

    constructor(name: string) {
        this.name = name;
        this.color = this.assignColor(this.color); 
        if (this.constructor === Entity) {
            throw new Error("Abstract classes can't be instantiated.");
            }
        }

    assignColor(color) {
        if (color === undefined) {
          return '#' + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          return color;
        }
    }
}