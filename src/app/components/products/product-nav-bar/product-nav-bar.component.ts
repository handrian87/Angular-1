import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {
  @Output() eventNavEmitter : EventEmitter<ActionEvent> = new EventEmitter <ActionEvent>();
  constructor() { }

  onGetAllProducts() {
    // On a mis payload "Null" car on n'a pas de paramètres à envoyer.
    // this.eventNavEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS, payload: null}); OU
    this.eventNavEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
  }
  onGetSelectedProducts() {
    this.eventNavEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.eventNavEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    this.eventNavEmitter.emit({type: ProductActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm:any) {
    // Comme cette méthode a un paramètre, on doit mettre le 2ème argument de emit : paylod.
    // dataForm contiendra un champ qui s'appelle keyword dans lequel se trouve la valeur saisie
    // de <input ngModel name="keyword"> dans product-nav-bar.component.html.
    this.eventNavEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
  }

  ngOnInit(): void {
  }




}
