import { Injectable } from '@angular/core';
import { Group } from './group';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl = 'api/group';  // URL to web api
  constructor(
    private http: HttpClient) { }

  getGroup(code: string): Observable<Group> {
    const url = `${this.groupUrl}/${code}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleError<Group>(`getGroup id=${code}`))
    );
  }

  getFinances(code: string): Observable<any> {
    const url = `${this.groupUrl}/${code}/finances`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getFinances id=${code}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Could not perform ${operation}`);
      return of(result as T);
    }
  }

}
