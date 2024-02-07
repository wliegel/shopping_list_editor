import {Component, ViewChild} from '@angular/core';
import {ShoppingItem} from "./shopping-item";
import {ShoppingService} from "../service/shopping.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private service:ShoppingService) {
    this.service.getShoppingList().subscribe(res => {
      this.itemList=res;
      this.dataSource=new MatTableDataSource<ShoppingItem>(this.itemList);
      this.dataSource.paginator=this.paginator;
    });
  }
}
