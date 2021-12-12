import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClassesService, Course } from 'src/app/services/classes-service/classes.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit {
  @Input() id: string;
  @ViewChild(MatTable) table: MatTable<any>;

  courses: Course[] = [];
  classService: ClassesService;

  displayedColumns: string[] = ['courseCode', 'title', 'ects'];

  constructor(cs: ClassesService) {
      this.classService = cs;
   }

  ngOnInit() {
    this.classService.getCourses(this.id).then((data: any) => {
      data.forEach((course: any) => {
        this.classService.getSingleCourseInfo(course.courseId).then((data) => {
          this.courses.push(data);
          console.log(this.courses);
          this.table.renderRows();
        });
      });
    })
    
   
  }

}
