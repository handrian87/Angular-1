import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataSateEnum, ProductActionsTypes} from "../../../state/product.state";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataSateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    // Quand on fait un select Product, il faut transmettre un payload (ici c'est p: Product)
    this.productsEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: p});
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: p});
  }

  onUpdate(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: p});
  }

  onActionEvent($event: ActionEvent) {
    // Signification du code suivant: Quand product-list reçoit un évènement à partir
    // de product-item, il fait l'évènement vers le niveau supérieur: products.component
    this.productsEventEmitter.emit($event);
  }
}
