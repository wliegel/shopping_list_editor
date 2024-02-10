import {Component, ViewChild} from '@angular/core';
import {ShoppingItem} from "./shopping-item";
import {ShoppingService} from "../service/shopping.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ShoppingDetailsComponent} from "../shopping-details/shopping-details.component";

@Component({
  selector: 'app-shopping-table',
  templateUrl: './shopping-table.component.html',
  styleUrl: './shopping-table.component.css'
})
export class ShoppingTableComponent {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'category', 'description', 'action'];
  itemList !: ShoppingItem[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild('filter') filter: any;

  constructor(private service: ShoppingService, private detailsDialog: MatDialog) {
    this.getShoppingList();
  }

  getShoppingList() {
    this.service.getShoppingList().subscribe(result => {
      this.itemList = result;
      this.dataSource = new MatTableDataSource<ShoppingItem>(this.itemList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterList($event: KeyboardEvent) {
    this.dataSource.filter = ($event.target as HTMLInputElement).value;
  }

  clearFilter() {
    this.filter.nativeElement.value = '';
    this.dataSource.filter = '';
  }

  removeItem(element: ShoppingItem) {
    console.log("delete item with id: " + element.id);
    this.service.deleteItem(element).subscribe({
      next: () => {
        console.log("delete successful");
        this.getShoppingList();
      },
      error: error => {
        console.log("Delete failed", error);
      }
    });
  }

  private saveItem(element: ShoppingItem) {
    this.service.saveItem(element).subscribe({
      next: result => {
        console.log(`Save successful: ${result.name}, ${result.category}, ${result.description}`);
        this.getShoppingList();
      },
      error: error => {
        console.log("Save failed", error);
      }
    });
  }

  openEditDialog(formData: any) {
    const dialogRef = this.detailsDialog.open(ShoppingDetailsComponent, {
      width: '550px',
      data: formData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.saveItem(result);
      }
    })
  }

  toggleActive(element: ShoppingItem) {
    element.active = !element.active;
    this.saveItem(element);
  }
}
