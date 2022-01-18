import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataSateEnum, ProductActionsTypes} from "../../../state/product.state";
import {Product} from "../../../model/product.model";
import {EventDriverService} from "../../../services/event-driver.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataSateEnum;

  constructor() { }

  ngOnInit(): void {
  }
}
