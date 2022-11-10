import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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
    console.log('Valid?', this.studentForm.valid);
    console.log('Name', this.studentForm.value.name);

    if (this.studentForm.valid) {
      var thisStudent: Student = {
        name: this.studentForm.value.name
      };

      this.studentService.addStudent(thisStudent)
      .subscribe(student => {
        this.students.push(student);
        this.submitStResponse = "Student " + student.name + " added";
        this.submitSt = true;
      })

      this.studentForm.reset();
    }
  }

    
  onSubmitCRForm() {
    console.log('Valid?', this.crForm.valid);
    console.log('Name', this.crForm.value.name);
    console.log('Instructor name', this.crForm.value.instName);

    if (this.crForm.valid) {
      var cr: Classroom = {
        classroomName : this.crForm.value.name,
        instructorName : this.crForm.value.instName
      };

      this.classroomService.addClassrom(cr)
      .subscribe(classroom => {
        this.classrooms.push(classroom);
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
        console.log(this.students);
      }
    ); 
  }

  getClassrooms(): void {
    this.classroomService.getClassrooms().subscribe(
      response => {
        this.classrooms = response;
        console.log(this.classrooms);
      }
    ); 
  }
  
}
