import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from './student';
import { StudentClassroom } from './studentclassroom';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:9000/api/students');
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('http://localhost:9000/api/students', student, this.httpOptions)
    .pipe(
      tap((newStudent: Student) => console.log(`added student with id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  addStudentToCR(studentCR: StudentClassroom): Observable<StudentClassroom> {
    return this.http.post<StudentClassroom>('http://localhost:9000/api/assignstudent', studentCR, this.httpOptions)
    .pipe(
      tap((newStudentCR: StudentClassroom) => console.log(`added student ${newStudentCR.studentId} to classroom ${newStudentCR.classroomId}`)),
      catchError(this.handleError<StudentClassroom>('addStudent'))
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
