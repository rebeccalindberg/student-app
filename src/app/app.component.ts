import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Student {
  name: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Student App';
  studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]]
    })
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
}
