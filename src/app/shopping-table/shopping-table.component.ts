import { Component } from '@angular/core';
import {ShoppingItem} from "./shopping-item";
import {ShoppingService} from "../service/shopping.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-shopping-table',
  templateUrl: './shopping-table.component.html',
  styleUrl: './shopping-table.component.css'
})
export class ShoppingTableComponent {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'category', 'description'];
  itemList !: ShoppingItem[];
  dataSource : any;

  constructor(private service:ShoppingService) {
    this.service.getShoppingList().subscribe(res => {
      this.itemList=res;
      this.dataSource=new MatTableDataSource<ShoppingItem>(this.itemList);
    });
  }
}
