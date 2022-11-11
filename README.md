# StudentApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Run the app
Download the backend Interviews-frontend-dev. To enable CORS, add the following line in services/src/index.ts:
```
app.use(cors({
  origin: 'http://localhost:4200'
}));
```

Run the following commands from the “services” directory:

`npm install`

`npm run build`

`npm run start`

From inside the student-app workspace, run the following command:

`npm install`

`ng serve -o`

## Usage
Under “Create a new Student”, add student by entering their first- and lastname and press submit. The new student will be listed under “Students” at the bottom of the page.

Under “Create a new Classroom”, add a classroom by entering the classroom name and instructor name and press submit. The new classroom will be added at the bottom of the page.

Assign a student to a classroom by dragging and dropping their name from the students-list to the box under each classroom name. One student can be added to several classrooms, but can’t be assigned twice to a classroom. 
