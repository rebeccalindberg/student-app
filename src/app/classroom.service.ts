import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Classroom } from './classroom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>('http://localhost:9000/api/classrooms');
  }

  getStudentsInClassroom(classroomId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`/api/classrooms/${classroomId}/students`).pipe(
      tap(_ => console.log(`fetched students in classroom id=${classroomId}`)),
      catchError(this.handleError<Student[]>(`getStudentsInClassroom id=${classroomId}`))
    );;
  }

  addClassrom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>('http://localhost:9000/api/classrooms', classroom, this.httpOptions)
    .pipe(
      tap((newClassroom: Classroom) => console.log(`added classroom with id=${newClassroom.id}`)),
      catchError(this.handleError<Classroom>('addClassroom'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
