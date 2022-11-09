import { Component, OnInit } from '@angular/core';
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
  classrooms: Classroom[] = [];
  listOfStudents : string[][] = [ ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
  ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'],
  ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
  ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']
  ]


  //studentClassroom: List<Student>;
  constructor(private classroomService: ClassroomService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.getClassrooms();
  }

  // Input parameter Classroom
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        
      );
    }
  }

  getClassrooms(): void {
    this.classroomService.getClassrooms().subscribe(
      response => {
        this.classrooms = response;
        console.log(this.classrooms);
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
