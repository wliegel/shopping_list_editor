import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingItem} from "../shopping-table/shopping-item";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) {
  }

  getShoppingList(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>("http://localhost:3000/items");
  }

  deleteItem(element: ShoppingItem): Observable<ShoppingItem> {
    return this.http.delete<ShoppingItem>("http://localhost:3000/items/" + element.id)
  }

  saveItem(element: ShoppingItem): Observable<ShoppingItem> {
    if (element.id != null && element.id > 0) {
      return this.updateItem(element);
    } else {
      return this.createItem(element);
    }
  }

  private updateItem(element: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>("http://localhost:3000/items/" + element.id, element, httpOptions);
  }

  private createItem(element: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>("http://localhost:3000/items/", element, httpOptions);
  }
}
