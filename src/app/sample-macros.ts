import * as Pos from './positions';
import { MacroBuilder, Column } from './macro-builder';

export class Test {
    public Build() : MacroBuilder {
        let mb = new MacroBuilder();
        let nextTime = 1000000;
        mb.SetTime(nextTime);

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

export class Egg {
    public Build() : MacroBuilder {

        let mb = new MacroBuilder();
  
        let nextTime : number = 1000000;       
        mb.SetTime(nextTime); 
        mb.AddClick(Pos.quest_1, 2000000)
          .AddClick(Pos.b_next, 2000000)
          .AddClick(Pos.quest_3, 2000000)

        mb.AddClick(Pos.b_depart, 12000000)

        //battle one: xon and xiao
        mb.AddAbility(3, [{ row: 6, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_3, 200000);

        mb.AddAbility(4, [{ row: 9, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_4, 200000);

        mb.Wait(10000000);

        // battle two: xon and xiao
        mb.AddAbility(3, [{ row: 6, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_3, 200000);

        mb.AddAbility(4, [{ row: 9, column: Column.Right, target: Pos.no_player }])        
          .AddClick(Pos.player_4, 200000);

        mb.Wait(15000000);

        // battle 3: 
        mb.AddAbility(5, [{ row: 8, column: Column.Right, target: Pos.player_5 }]) 
          .AddClick(Pos.player_5, 200000);
        mb.AddAbility(3, [{ row: 6, column: Column.Right, target: Pos.no_player }])
          .AddClick(Pos.player_3, 200000);

        mb.AddAbility(1, [{ row: 7, column: Column.Left, target: Pos.no_player }]); 
        mb.AddAbility(2, [{ row: 6, column: Column.Left, target: Pos.no_player }]); 
        mb.AddChain([
            { player: 1, time: 0 },
            { player: 2, time: 100000 },           
        ]);

        mb.Wait(25000000)
          .AddClick(Pos.b_next, 1000000)
          .AddClick(Pos.b_next, 1000000)
          .AddClick(Pos.b_next, 1000000)
          .AddClick(Pos.b_next, 5000000)
          .AddClick(Pos.b_next)
          .Wait(5000000)
          .End()

        return mb;

    }
}
