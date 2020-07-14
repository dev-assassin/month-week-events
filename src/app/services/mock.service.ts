import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MockInterface} from "../interfaces/mock.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private _http: HttpClient) {
  }

  getMockData(): Observable<MockInterface> {
    return this._http.get<MockInterface>("http://localhost:3000/mock")
  }

}
