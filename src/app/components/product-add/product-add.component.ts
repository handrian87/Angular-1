import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {EventDriverService} from "../../services/event-driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup = new FormGroup({});
  // productFormGroup = new FormGroup({
  //   name: new FormControl("", Validators.required),
  //   price: new FormControl(0, Validators.required),
  //   quantity: new FormControl(0, Validators.required),
  //   selected: new FormControl(true, Validators.required),
  //   available: new FormControl(true, Validators.required)
  // });

  submitted: boolean = false;

  constructor(private fb: FormBuilder, private productsService : ProductsService,
              private eventDriverService : EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: new FormControl("", Validators.required),
      price: new FormControl(0, Validators.required),
      quantity: new FormControl(0, Validators.required),
      selected: new FormControl(true, Validators.required),
      available: new FormControl(true, Validators.required)
    })
  }
  get f(): {[key: string]: AbstractControl}{
    return this.productFormGroup.controls;
  }

  onSave() {
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;
    this.productsService.save(this.productFormGroup?.value)
      .subscribe(data => {
        this.eventDriverService.publishEvent({type: ProductActionsTypes.SAVE_PRODUCT})
        alert("Success saving product");
      })
  }
}
