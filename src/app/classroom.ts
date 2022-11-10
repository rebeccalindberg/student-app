import { Student } from "./student";

export interface Classroom {
    id?: number;
    classroomName: string | undefined;
    instructorName: string | undefined;
    students?: Student[];
  }