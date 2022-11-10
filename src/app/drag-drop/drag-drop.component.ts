import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';
import { Student } from '../student';
import { StudentClassroom } from '../studentclassroom';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})

export class DragDropComponent implements OnInit {
  @Input() studentInput: Student[] = [];
  @Input() classroomInput: Classroom[] = [];

  constructor(private classroomService: ClassroomService,
    private studentService: StudentService) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<Student[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("student id:");
      console.log(event.previousContainer.data[event.previousIndex].id);
      console.log(event.container.id);
      var studentId : number = event.previousContainer.data[event.previousIndex].id!;
      var crId : number = Number(event.container.id);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      var studentCR : StudentClassroom = {
        studentId: studentId,
        classroomId: crId
      }
      this.addStudentToClassrom(studentCR);
    }
  }


  addStudentToClassrom(studentClassroom: StudentClassroom): void {
    this.classroomService.addStudentToClassrom(studentClassroom).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  
  getConnectedList(): any[] {
    return this.classroomInput.map(x => `${x.id}`);
  }

}
