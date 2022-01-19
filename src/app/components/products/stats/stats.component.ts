import { Component, OnInit } from '@angular/core';
import {EventDriverService} from "../../../services/event-driver.service";
import {ActionEvent} from "../../../state/product.state";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  counter:number = 0;

  constructor(private eventDrivenService : EventDriverService) { }

  ngOnInit(): void {
    // On va faire un Subscribe
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent) => {
      // À chaque fois qu'il y a un évènement qui arrive, on va incrémenter le counter
      ++this.counter;
    })
  }

}
