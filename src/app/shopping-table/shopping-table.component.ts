import { Component } from '@angular/core';
import {ShoppingItem} from "./shopping-item";


const ELEMENT_DATA: ShoppingItem[] = [
  {id: 1, category: "REWE", name: "Kartoffeln", description: "1kg", active: true},
  {id: 2, category: "REWE", name: "Äpfel", description: "3 Stück", active: true},
  {id: 3, category: "REWE", name: "Birnen", description: "vergleiche mit Äpfel", active: false},
];

@Component({
  selector: 'app-shopping-table',
  templateUrl: './shopping-table.component.html',
  styleUrl: './shopping-table.component.css'
})
export class ShoppingTableComponent {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'category', 'description'];
  dataSource = ELEMENT_DATA;

}
