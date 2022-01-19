import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute} from "@angular/router";
import {EventDriverService} from "../../services/event-driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  productId : number;
  submitted: boolean = false;
  editProductFormGroup = new FormGroup({});
  constructor(private activatedRoute: ActivatedRoute,
              private editProductService : ProductsService,
              private fb : FormBuilder,
              private eventDriverService : EventDriverService) {
    // Le code suivant permet de récupérer le "id" du produi sélectionné:
    this.productId = activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    // Chargement du produit:
    this.editProductService.getIdProduct(this.productId)
      .subscribe(product=>{
        this.editProductFormGroup = this.fb.group({
          id:[product.id],
          name:[product.name, Validators.required],
          price:[product.price, Validators.required],
          quantity:[product.quantity, Validators.required],
          selected:[product.selected, Validators.required],
          available:[product.available, Validators.required]
        })
      })
  }

  onEdit() {
    this.editProductService.updateProduct(this.editProductFormGroup?.value)
      .subscribe(data => {
        this.eventDriverService.publishEvent({type: ProductActionsTypes.PRODUCT_UPDATED});
        alert("Produit updated");
      });
  }

}
