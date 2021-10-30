import { HttpClient } from '@angular/common/http';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class RestDataSource {
  constructor(private http: HttpClient, @Inject(REST_URL) private url: string) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
