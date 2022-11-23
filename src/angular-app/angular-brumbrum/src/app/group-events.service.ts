import { Injectable } from '@angular/core';
import { GroupEvent } from './group-event';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupEventService {
  private eventsUrl = 'api/events';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient) { }

  getEvents(): Observable<GroupEvent[]> {
    return this.http.get<GroupEvent[]>(this.eventsUrl)
      .pipe(
        catchError(this.handleError<GroupEvent[]>('getEvents', []))
      );
  }
  getEvent(id: number): Observable<GroupEvent> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<GroupEvent>(url).pipe(
      catchError(this.handleError<GroupEvent>(`getEvent id=${id}`))
    );
  }

  updateEvent(event: GroupEvent): Observable<any> {
    return this.http.put(this.eventsUrl, event, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
