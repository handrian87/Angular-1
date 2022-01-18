import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";
import {EventDriverService} from "../../../services/event-driver.service";

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {
  //@Output() eventNavEmitter : EventEmitter<ActionEvent> = new EventEmitter <ActionEvent>();
  constructor(private eventDrivenService : EventDriverService) { }

  onGetAllProducts() {
    // On a mis payload "Null" car on n'a pas de paramètres à envoyer.
    // this.eventNavEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS, payload: null}); OU
    // this.eventNavEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_ALL_PRODUCTS});
  }
  onGetSelectedProducts() {
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm:any) {
    // Comme cette méthode a un paramètre, on doit mettre le 2ème argument de emit : paylod.
    // dataForm contiendra un champ qui s'appelle keyword dans lequel se trouve la valeur saisie
    // de <input ngModel name="keyword"> dans product-nav-bar.component.html.
    this.eventDrivenService.publishEvent({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
  }

  ngOnInit(): void {
  }




}
