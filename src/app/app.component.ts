import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Student {
  name: string | undefined;
}

export class Classroom {
  name: string | undefined;
  instructorName: string | undefined;
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
  }

  onSubmitStudentForm(form: FormGroup) {
    console.log('Valid?', this.studentForm.valid);
    console.log('Name', this.studentForm.value.name);

    if (this.studentForm.valid) {
      let a = new Student();
      a.name = this.studentForm.value.name;

      this.http.post<any>('http://localhost:9000/api/students', a)
      .subscribe({
        next: b => {
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
      cr.name = this.crForm.value.name;
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
}
