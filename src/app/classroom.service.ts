import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Classroom } from './classroom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Student } from './student';
import { StudentClassroom } from './studentclassroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>('http://localhost:9000/api/classrooms').pipe(
      tap(_ => console.log(`fetched all classrooms`)),
      catchError(this.handleError<Classroom[]>(`getClassrooms`))
    );
  }


  addClassrom(classroom: Classroom): Observable<any> {
    return this.http.post<Classroom>('http://localhost:9000/api/classrooms', classroom, this.httpOptions)
    .pipe(
      tap((newClassroom: any) => console.log(`added classroom with id=${newClassroom.id}`)),
      catchError(this.handleError<any>('addClassroom'))
    );
  }

  addStudentToClassrom(studentClassroom: StudentClassroom): Observable<any> {
    return this.http.post<StudentClassroom>('http://localhost:9000/api/assignstudent', studentClassroom, this.httpOptions)
    .pipe(
      tap((studentClassroom: any) => console.log(`added student to classroom`)),
      catchError(this.handleError<any>('addStudentToClassroom'))
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
