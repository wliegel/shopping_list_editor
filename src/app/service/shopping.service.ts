import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingItem} from "../shopping-table/shopping-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http:HttpClient) { }

  getShoppingList(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>("http://localhost:3000/items");
  }
}
