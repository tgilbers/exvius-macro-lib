export class MacroLine {
    time: number;
    lineType: MacroLineType;
    x: number;
    y: number;

    public constructor(time: number, lineType: MacroLineType, x: number=0, y:number=0)
    {
        this.time = time;
        this.lineType = lineType;
        this.x = x;
        this.y = y;
    }

    public ToMemu() : string {
        switch(this.lineType)
        {
            case MacroLineType.MousePress:
                return this.time + "--VINPUT--MULTI:1:0:" + this.x + ":" + this.y;
            case MacroLineType.MouseRelease:
                return this.time + "--VINPUT--MULTI:1:1:0:720";
            case MacroLineType.MouseHold:
                return this.time + "--VINPUT--MULTI:1:2:" + this.x + ":" + this.y;
            case MacroLineType.MouseHRelease:
                return this.time + "--VINPUT--MULTI:1:1:-1:720";
            case MacroLineType.MouseMove:
                return this.time + "--VINPUT--MOUSE:" + this.x + ":" + this.y;
        }
    }
}

export enum MacroLineType {
    MousePress = 0,
    MouseRelease = 1,
    MouseHold = 2,
    MouseHRelease,
    MouseMove
}

