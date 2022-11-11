import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './student';
import { Classroom } from './classroom';
import { ClassroomService } from './classroom.service';
import { StudentService } from './student.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Student App';
  studentForm!: FormGroup;
  crForm!: FormGroup;
  students: Student[] = [];
  classrooms: Classroom[] = [];
  submitCRResponse: string | undefined;
  submitCR: boolean = false;
  submitStResponse: string | undefined;
  submitSt: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private classroomService: ClassroomService,
    private studentService: StudentService
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

    this.getStudents();
    this.getClassrooms();
  }

  onSubmitStudentForm() {

    if (this.studentForm.valid) {
      var thisStudent: Student = {
        name: this.studentForm.value.name
      };

      this.studentService.addStudent(thisStudent)
      .subscribe(student => {
        thisStudent.id = student.id;
        this.students.push(thisStudent);
        this.submitStResponse = "Student " + student.name + " added";
        this.submitSt = true;
      })

      this.studentForm.reset();
    }
  }

    
  onSubmitCRForm() {
    if (this.crForm.valid) {
      var cr: Classroom = {
        classroomName : this.crForm.value.name,
        instructorName : this.crForm.value.instName
      };

      this.classroomService.addClassrom(cr)
      .subscribe(classroom => {
        cr.id = classroom.id;
        var emptyStudents : Student[] = [];
        cr.students = emptyStudents;
        this.classrooms.push(cr);
        this.submitCRResponse = "Classroom " + classroom.classroomName + " added";
        this.submitCR = true;
      })
      this.crForm.reset();
    }
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      response => {
        this.students = response;
      }
    ); 
  }

  getClassrooms(): void {
    this.classroomService.getClassrooms().subscribe(
      response => {
        for (const d of (response as Classroom[])) {
          this.studentService.getStudentsInClassroom(d.id!).subscribe(
            responseStudents => {
              d.students = responseStudents;
            }
          ); 
        }
        this.classrooms = response;
      }
    ); 
  }

  getStudentsInClassroom(classroomId: number): void {
    this.studentService.getStudentsInClassroom(classroomId).subscribe(
      response => {
        console.log(response);
      }
    ); 
  }
}
