import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export class Student {
  name: string | undefined;
}

export interface IStudent {
  id: number | undefined;
  name: string | undefined;
}

export interface IClassroom {
  id: number | undefined;
  classroomName: string | undefined;
  instructorName: string | undefined;
}

export class Classroom {
  classroomName: string | undefined;
  instructorName: string | undefined;
}

export class AlbumService {
  constructor(private _http: HttpClient) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Student App';
  studentForm!: FormGroup;
  crForm!: FormGroup;
  students: IStudent[] = [];
  classrooms: IClassroom[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.crForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      instName: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.getStudentsObs();
    this.getClassroomsObs();
  }

  onSubmitStudentForm(form: FormGroup) {
    console.log('Valid?', this.studentForm.valid);
    console.log('Name', this.studentForm.value.name);

    if (this.studentForm.valid) {
      let a = new Student();
      a.name = this.studentForm.value.name;
      form.reset();
      //this.studentForm.value.trim();

      this.http.post<any>('http://localhost:9000/api/students', a)
      .subscribe({
        next: b => {
          this.students.push(b);
          console.log(b);
        },
        error: error => {
          console.log(error);
        }, 
        complete: () => {
          console.log("Student added");
        }
      })
    }
  }

    
  onSubmitCRForm(form: FormGroup) {
    console.log('Valid?', this.crForm.valid);
    console.log('Name', this.crForm.value.name);
    console.log('Instructor name', this.crForm.value.instName);

    if (this.crForm.valid) {
      let cr = new Classroom();
      cr.classroomName = this.crForm.value.name;
      cr.instructorName = this.crForm.value.instName;

      this.http.post<any>('http://localhost:9000/api/classrooms', cr)
      .subscribe({
        next: b => {
          console.log(b);
        },
        error: error => {
          console.log(error);
        }, 
        complete: () => {
          console.log("Classroom added");
        }
      })
    }
  }

  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>('http://localhost:9000/api/students');
  }

  getStudentsObs(): void {
    this.getStudents().subscribe(
      response => {
        this.students = response; 
        console.log(this.students);
      }
    ); 
  }

  getClassrooms(): Observable<IClassroom[]> {
    return this.http.get<IClassroom[]>('http://localhost:9000/api/classrooms');
  }

  getClassroomsObs(): void {
    this.getClassrooms().subscribe(
      response => {
        this.classrooms = response;
        console.log(this.classrooms);
      }
    ); 
  }

}
