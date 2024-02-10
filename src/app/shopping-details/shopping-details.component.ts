import {Component, Inject} from '@angular/core';
import {ShoppingItem} from "../shopping-table/shopping-item";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrl: './shopping-details.component.css'
})
export class ShoppingDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<ShoppingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingItem
  ) {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
