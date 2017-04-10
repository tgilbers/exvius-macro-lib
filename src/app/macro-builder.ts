import { ClickElement, MacroElement, AbilityMenuElement, EndElement, ItemMenuElement, RowDown, RowUp, clickTime } from './macro-element';

import * as Pos from './positions';

import { Point } from './macro-element';
export { Point } from './macro-element';

export enum Column {
    Left, Right
}

export interface abilityLocation {
    row: number;
    column: Column;
    target: Point;
}

export interface ChainClick {
    player: number;
    time: number;
}

let abilityWait = 800000 ;

export class Macro {
    protected mb : MacroBuilder;
    public Build() : MacroBuilder {
        this.mb = new MacroBuilder;
        return this.mb;
    }
}

export class MacroBuilder {

    protected _macroElements : Array<MacroElement>;
    private _nextTime : number;

    protected Clear() {
        this._macroElements = new Array<MacroElement>();
        this.SetTime(0);
    }

    public constructor() {
        this.Clear();
    }

    public get macroElements() : Array<MacroElement> {
        return this._macroElements;
    }

    public SetTime(time : number) : MacroBuilder
    {
        this._nextTime = time;
        return this;
    }

    public GetTime() : number {
        return this._nextTime;
    }

    public Add(elem : MacroElement) : number {
        this.macroElements.push(elem);
        return elem.GetSafeTime();
    }

    public AddClick(position : Point, waitAfter : number=0) : MacroBuilder {
        let elem = new ClickElement(this._nextTime, position);
        this._nextTime = this.Add(elem);
        this.WaitMicroseconds(waitAfter);
        return this;
    }

    public AddMacro(macro : Macro) : MacroBuilder {
        let mb = macro.Build();
        for(let elem of mb.macroElements) {
            let temp = elem;
            temp.time += this._nextTime;
            this.Add(temp);
        }
        this._nextTime += mb.GetTime();
        return this;
    }

    public AddChain(chainClicks: Array<ChainClick>) : MacroBuilder {
        let maxTime = 0;
        for(let chainClick of chainClicks)
        {
            maxTime = Math.max(maxTime, chainClick.time);
            this.Add(new ClickElement(this._nextTime + chainClick.time, this.GetPlayerPosition(chainClick.player)));
        }
        this._nextTime += maxTime + (clickTime * 2);
        return this;
    }

    public AddAbility(player: number, abilityLocations : Array<abilityLocation>) : MacroBuilder {
        if(abilityLocations.length == 0) {
            console.error("No abilities passed");
            return this;
        }
        let playerPos = this.GetPlayerPosition(player);
        if(playerPos == Pos.no_player) {
            console.error("Invalid player passed");
            return this;
        }
        this._nextTime = this.Add(new AbilityMenuElement(this._nextTime, playerPos));
        let scrollPosition = 0;
        for (let abilityLoc of abilityLocations)
        {
            let newScrollPosition = Math.max(abilityLoc.row - 3, 0);
            if(newScrollPosition < scrollPosition)
            {
                for(let ii = 0; ii < (scrollPosition - newScrollPosition); ii++)
                {
                    this._nextTime = this.Add(new RowUp(this._nextTime));
                }
            }
            else if(newScrollPosition > scrollPosition)
            {
                for(let ii = 0; ii < (newScrollPosition - scrollPosition); ii++)
                {
                    this._nextTime = this.Add(new RowDown(this._nextTime));
                }            
            }
            scrollPosition = newScrollPosition;
            this.AddClick(this.GetAbilityPosition(abilityLoc.row, abilityLoc.column));
            this.WaitMicroseconds(abilityWait);
            if(abilityLoc.target != Pos.no_player)
            {
                this.AddClick(abilityLoc.target);                
                this.WaitMicroseconds(abilityWait);
            }
        }
        this.WaitMicroseconds(abilityWait);
        return this;
    }
  
    public ToMemu() : string {
        let retString : string = "";
        for (let elem of this.macroElements)
        {
            retString += elem.ToMemu();
        }
        return retString;       
    }

    public WaitSeconds(time : number) : MacroBuilder {
        this._nextTime = this._nextTime + (time * 1000 * 1000);
        return this;
    }
    public WaitMilliseconds(time : number) : MacroBuilder {
        this._nextTime = this._nextTime + (time * 1000);
        return this;
    }
    public WaitMicroseconds(time : number) : MacroBuilder {
        this._nextTime = this._nextTime + time;
        return this;
    }        
    public End() : MacroBuilder {
        this.Add(new EndElement(this._nextTime));
        return this;
    }

    private GetAbilityPosition(row: number, column: Column) : Point {
        let px, py : number;
        switch(row) {
            case 1: 
                px = Pos.r_1;
                break;
            case 2: 
                px = Pos.r_2;
                break;
            default: 
                px = Pos.r_3;
                break;
        }
        switch(column) {
            case Column.Left: 
                py = Pos.c_1;
                break;
            case Column.Right: 
                py = Pos.c_2;
                break;
        }

        return { x: px, y: py };
    }

    private GetPlayerPosition(player: number) : Point {
        switch(player) {
            case 1:
                return Pos.player_1;
                case 2:
                return Pos.player_2;
                case 3:
                return Pos.player_3;
                case 4:
                return Pos.player_4;
                case 5:
                return Pos.player_5;
                case 6:
                return Pos.player_6;
                default:
                return Pos.no_player;
        }
    }    
}

