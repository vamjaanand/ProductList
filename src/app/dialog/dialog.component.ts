import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   productForm !: FormGroup;
  constructor(private formBuilder : FormBuilder , private api : ApiService , private dialogRef :MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      ProductName : ['',Validators.required],
      ProductCategory : ['',Validators.required],
      ProductQuantity : ['',Validators.required],
      ProductPrice : ['',Validators.required],
      ManufactureDate :['',Validators.required],
      ExpieryDate : ['',Validators.required],
      LotofNumber: ['',Validators.required]
    })
  }
  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
      })
    }
  }

}

