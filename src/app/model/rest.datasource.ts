import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product.model';
export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {
  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string
  ) {}

  getData(): Observable<Product[]> {
    return this.sendRequest<Product[]>('GET', this.url);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>('POST', this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest<Product>(
      'PUT',
      `${this.url}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest<Product>('DELETE', `${this.url}/${id}`);
  }

  private sendRequest<T>(
    verb: string,
    url: string,
    body?: Product
  ): Observable<T> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Key', '<secret>');
    myHeaders = myHeaders.set('Application-Names', ['Products-Pro', 'Ahmed']);

    return this.http
      .request<T>(verb, url, {
        body,
        headers: myHeaders,
      })
      .pipe(
        catchError((error: Response) => {
          return throwError(
            `Network Error: ${error.statusText} (${error.status})`
          );
        })
      );
  }
}
