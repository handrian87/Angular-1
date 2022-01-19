import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataSateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event-driver.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  // La déclaration de variable suivante de type DataStateEnum permet
  // d'utiliser cette variable dans le fichier app.component.html.
  readonly DataStateEnum = DataSateEnum;
  constructor(private productsService:  ProductsService, private router:Router,
              private evetDriverService: EventDriverService) { }

  ngOnInit(): void {
    this.evetDriverService.sourceEventSubject.subscribe((actionEvent: ActionEvent) => {
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data=> ({dataState: DataSateEnum.LOADED,data: data})),
      startWith({dataState: DataSateEnum.LOADING}),
      catchError(err=>of({dataState: DataSateEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=> ({dataState: DataSateEnum.LOADED, data: data})),
      startWith({dataState: DataSateEnum.LOADING}),
      catchError(err=>of({dataState: DataSateEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=> ({dataState: DataSateEnum.LOADED, data: data})),
      startWith({dataState: DataSateEnum.LOADING}),
      catchError(err=>of({dataState: DataSateEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  // value va représenter les données entrées dans le formulaire.
  onSearch(value: any) {
    // value.keyword : keyword étant le name donné à l'input dans la form.
    // Donc récupération de la valeur du champ saisie dans le formulaire.
    this.products$ = this.productsService.getSearchProducts(value.keyword).pipe(
      map(data=> ({dataState: DataSateEnum.LOADED, data: data})),
      startWith({dataState: DataSateEnum.LOADING}),
      catchError(err=>of({dataState: DataSateEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onSelect(p: Product) {
    this.productsService.selectProduct(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
    let v = confirm(`Etes-vous sûr de vouloir supprimer le produit ${p.name}?`)
    if(v ==true )
      this.productsService.deleteProduct(p)
        .subscribe(data=>{
          // Afficher la liste des produits restants après la suppression
          this.onGetAllProducts();
        })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct")
  }

  onUpdate(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event: ActionEvent) {
    // ici le payload = produit.
      switch($event.type) {
        case ProductActionsTypes.GET_ALL_PRODUCTS:
          this.onGetAllProducts();
          break;
        case ProductActionsTypes.GET_SELECTED_PRODUCTS:
          this.onGetSelectedProducts();
          break;
        case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
          this.onGetAvailableProducts();
          break;
        case ProductActionsTypes.NEW_PRODUCT:
          this.onNewProduct();
          break;
        case ProductActionsTypes.SEARCH_PRODUCTS:
          this.onSearch($event.payload);
          break;
        case ProductActionsTypes.SELECT_PRODUCT:
          this.onSelect($event.payload);
          break;
        case ProductActionsTypes.DELETE_PRODUCT:
          this.onDelete($event.payload);
          break;
        case ProductActionsTypes.EDIT_PRODUCT:
          this.onUpdate($event.payload);
          break;

      }
  }
}
