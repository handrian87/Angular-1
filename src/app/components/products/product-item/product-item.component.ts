import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  // Pour recevoir le produit de product-list.component:
  @Input() product?: Product;
  @Output() itemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.itemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
  }

  onDelete(product: Product) {
    this.itemEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT,payload: product});
  }

  onUpdate(product: Product) {
    this.itemEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});
  }
}
