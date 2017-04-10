import { MacroLine, MacroLineType } from './macro-line';

export interface Point {
    x: number;
    y: number;
}

let rowsteps = 122;
let rowPositionIncrement = 1;
let rowTimeIncrement = 500;
let rowRestTime = 35000;

export let clickTime = 20;

export class MacroElement {
    protected _time: number;
    
    public constructor(time: number) {
        this.time = time;
    }
    
    public get time() : number {
        return this._time;
    }
    
    public set time(v : number) {
        this._time = v;
    }
    
    public GetLines() : Array<MacroLine> {
        return new Array<MacroLine>();
    }

    public GetSafeTime() : number {
        return this.time;
    }    

    public ToMemu() : string {
        let retString : string = "";
        let macroLines = this.GetLines();
        for (let line of macroLines)
        {
            retString += line.ToMemu() + '\r\n';
        }
        return retString;
    }
}

class PositionElement extends MacroElement {
    private _x : number;
    private _y : number;
   
    public constructor(time: number, p: Point) {
        super(time);
        this._x = p.x;
        this._y = p.y;
    }

   public get x() : number {
        return this._x;
    }
   public get y() : number {
        return this._y;
    }    

}

class ClickElement extends PositionElement {

    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        lines.push(new MacroLine(this.time, MacroLineType.MousePress, this.x, this.y));
        lines.push(new MacroLine(this.time + clickTime, MacroLineType.MouseRelease));
        return lines;
    }
}

class EndElement extends MacroElement {
    
    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        lines.push(new MacroLine(this.time + clickTime, MacroLineType.MouseRelease));
        return lines;
    } 
}

class AbilityMenuElement extends PositionElement {

    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        lines.push(new MacroLine(this.time, MacroLineType.MousePress, this.x, this.y));
        lines.push(new MacroLine(this.time + 20000, MacroLineType.MouseHold, this.x, this.y));
        lines.push(new MacroLine(this.time + 40000, MacroLineType.MouseHold, this.x, this.y-40));
        lines.push(new MacroLine(this.time + 60000, MacroLineType.MouseHold, this.x, this.y-80));
        lines.push(new MacroLine(this.time + 80000, MacroLineType.MouseHold, this.x, this.y-120));
        lines.push(new MacroLine(this.time + 100000, MacroLineType.MouseHold, this.x, this.y-160));
        lines.push(new MacroLine(this.time + 105000, MacroLineType.MouseHRelease));
        return lines;
    }

    public GetSafeTime() : number {
        return this.time + 1000000;
    }    
}

class ItemMenuElement extends PositionElement {

    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        lines.push(new MacroLine(this.time, MacroLineType.MousePress, this.x, this.y-160));
        lines.push(new MacroLine(this.time + 20000, MacroLineType.MouseHold, this.x, this.y-160));
        lines.push(new MacroLine(this.time + 40000, MacroLineType.MouseHold, this.x, this.y-120));
        lines.push(new MacroLine(this.time + 60000, MacroLineType.MouseHold, this.x, this.y-80));
        lines.push(new MacroLine(this.time + 80000, MacroLineType.MouseHold, this.x, this.y-40));
        lines.push(new MacroLine(this.time + 100000, MacroLineType.MouseHold, this.x, this.y));
        lines.push(new MacroLine(this.time + 105000, MacroLineType.MouseHRelease));
        return lines;
    }
    public GetSafeTime() : number {
        return this.time + 1000000;
    }    
}

class RowDown extends MacroElement {
    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        let x : number = 1000;
        let y : number = 500;
        lines.push(new MacroLine(this.time, MacroLineType.MousePress, x, y));
        let temptime = this.time;
        let tempx = x;
        for(let ii = 0; ii < rowsteps; ii++) {
            temptime += rowTimeIncrement;
            tempx -= rowPositionIncrement;
            lines.push(new MacroLine(temptime, MacroLineType.MouseHold, tempx, y));
        }
        lines.push(new MacroLine(temptime + rowRestTime, MacroLineType.MouseHold,tempx, y));
        lines.push(new MacroLine(temptime + rowRestTime + 40, MacroLineType.MouseHRelease));
        return lines;   
    }
    public GetSafeTime() : number {
        return this.time + (rowsteps * rowTimeIncrement) + rowRestTime + 80;
    }     
}

class RowUp extends MacroElement {
    public GetLines() : Array<MacroLine> {
        let lines = new Array<MacroLine>();
        let x : number = 1000;
        let y : number = 500;
        lines.push(new MacroLine(this.time, MacroLineType.MousePress, x, y));
        let temptime = this.time;
        let tempx = x;
        for(let ii = 0; ii < rowsteps; ii++) {
            temptime += rowTimeIncrement;
            tempx += rowPositionIncrement;
            lines.push(new MacroLine(temptime, MacroLineType.MouseHold, tempx, y));
        }
        lines.push(new MacroLine(temptime + rowRestTime, MacroLineType.MouseHold,tempx, y));
        lines.push(new MacroLine(temptime + rowRestTime + 40, MacroLineType.MouseHRelease));
        return lines;   
    }
    public GetSafeTime() : number {
        return this.time + (rowsteps * rowTimeIncrement) + rowRestTime + 80;
    }     
}

export { ClickElement, AbilityMenuElement, ItemMenuElement, EndElement, RowDown, RowUp };