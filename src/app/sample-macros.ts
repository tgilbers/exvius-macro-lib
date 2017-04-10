import * as Pos from './positions';
import { MacroBuilder, Macro, Column } from './macro-builder';

export class Test extends Macro {
    public Build() : MacroBuilder {
        super.Build();
        let mb = this.mb;
        mb.SetTime(1000000);

        // sample for:
        // Player 4 
        // - dual cast on row 9,Right
        // - select no-target spell row 5,Right twice
        mb.AddAbility(4, [
            { row: 9, column: Column.Right, target: Pos.no_player },
            { row: 5, column: Column.Right, target: Pos.no_player },
            { row: 5, column: Column.Right, target: Pos.no_player },
            ]);
        // Player 5 
        // - dual cast on row 9,Right
        // - select no-target spell row 5,Right twice
        mb.AddAbility(5, [
            { row: 9, column: Column.Right, target: Pos.no_player },
            { row: 5, column: Column.Right, target: Pos.no_player },
            { row: 5, column: Column.Right, target: Pos.no_player },
            ]);     
        // Player 1, no-target spell row 7,Left
        mb.AddAbility(1, [{ row: 7, column: Column.Left, target: Pos.no_player }]); 
        // Player 2, no-target spell row 6,Left
        mb.AddAbility(2, [{ row: 6, column: Column.Left, target: Pos.no_player }]);                  

        mb.AddChain([
            { player: 4, time: 0 },
            { player: 5, time: 200000 },
            { player: 1, time: 4700000 },
            { player: 2, time: 4800000 },
        ]);

        return mb;
    }
}

export class EggBasicTurn extends Macro {
    public Build() : MacroBuilder {
        super.Build();

        this.mb.AddAbility(3, [{ row: 6, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_3).WaitMilliseconds(200);

        this.mb.AddAbility(4, [{ row: 9, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_4).WaitMilliseconds(200);

        return this.mb;
    }
}

export class Egg extends Macro {
    public Build() : MacroBuilder {
        super.Build();
        let mb = this.mb;

        mb.SetTime(1000000); 
        mb.AddClick(Pos.quest_1).WaitSeconds(2)
          .AddClick(Pos.b_next).WaitSeconds(2)
          .AddClick(Pos.quest_3).WaitSeconds(2)
          .AddClick(Pos.b_depart).WaitSeconds(12);

        //battle one: xon and xiao
        mb.AddMacro(new EggBasicTurn());
        mb.WaitSeconds(10);

        //battle two: xon and xiao
        mb.AddMacro(new EggBasicTurn());
        mb.WaitSeconds(15);

        // battle 3: 
        mb.AddAbility(5, [{ row: 8, column: Column.Right, target: Pos.player_5 }]) 
          .AddClick(Pos.player_5).WaitMilliseconds(200);
        mb.AddAbility(3, [{ row: 6, column: Column.Right, target: Pos.no_player }])
          .AddClick(Pos.player_3).WaitMilliseconds(200);

        mb.AddAbility(1, [{ row: 7, column: Column.Left, target: Pos.no_player }]); 
        mb.AddAbility(2, [{ row: 6, column: Column.Left, target: Pos.no_player }]); 
        mb.AddChain([
            { player: 1, time: 0 },
            { player: 2, time: 100000 },           
        ]);

        mb.WaitSeconds(25)
          .AddClick(Pos.b_next).WaitSeconds(1)
          .AddClick(Pos.b_next).WaitSeconds(1)
          .AddClick(Pos.b_next).WaitSeconds(1)
          .AddClick(Pos.b_next).WaitSeconds(5)
          .AddClick(Pos.b_next).WaitSeconds(5)
          .End();

        return mb;
    }
}
