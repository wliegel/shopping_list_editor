import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingItem} from "../shopping-table/shopping-item";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private readonly server: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  getShoppingList(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.server);
  }

  deleteItem(element: ShoppingItem): Observable<any> {
    return this.http.delete<ShoppingItem>(this.server + "/" + element.id)
  }

  saveItem(element: ShoppingItem): Observable<ShoppingItem> {
    if (element.id != null && element.id > 0) {
      return this.updateItem(element);
    } else {
      return this.createItem(element);
    }
  }

  private updateItem(element: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>(this.server + "/" + element.id, element, httpOptions);
  }

  private createItem(element: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(this.server, element, httpOptions);
  }
}
