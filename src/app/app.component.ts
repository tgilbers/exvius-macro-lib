import { Component, OnInit } from '@angular/core';
import  * as Macros from './sample-macros';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {

    let Macro = new Macros.Egg;
    this.title = Macro.Build().ToMemu();
  }
}
