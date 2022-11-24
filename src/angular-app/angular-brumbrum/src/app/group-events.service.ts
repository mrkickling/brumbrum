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

  getEvent(id: number, groupCode: string): Observable<GroupEvent> {
    const url = `${this.eventsUrl}/${id}/${groupCode}`;
    return this.http.get<GroupEvent>(url).pipe(
      catchError(this.handleError<GroupEvent>(`getEvent id=${id}`))
    );
  }

  deleteEvent(id: number, groupCode: string): Observable<GroupEvent> {
    const url = `${this.eventsUrl}/${id}/${groupCode}`;
    return this.http.delete<GroupEvent>(url).pipe(
      catchError(this.handleError<GroupEvent>(`deleteEvent id=${id}`))
    );
  }


  addEvent(code: string, event: object): Observable<GroupEvent> {
    const url = `${this.eventsUrl}/${code}`;
    return this.http.post<GroupEvent>(url, event).pipe(
      catchError(this.handleError<GroupEvent>(`addEvent code=${code}`))
    );
  }

  updateEvent(code: string, event: any): Observable<any> {
    const url = `${this.eventsUrl}/${event.id}/${code}`;
    console.log(url)
    return this.http.put(url, event, this.httpOptions).pipe(
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
