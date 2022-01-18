import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";
import {EventDriverService} from "../../../services/event-driver.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  // Pour recevoir le produit de product-list.component:
  @Input() product?: Product;
  //@Output() itemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor(private eventDrivenService : EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    //this.itemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
  }

  onDelete(product: Product) {
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.DELETE_PRODUCT,payload: product});
  }

  onUpdate(product: Product) {
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});
  }
}
