import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClassesService, Course } from 'src/app/services/classes-service/classes.service';
import { MatTable } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit {
  @Input() id: string;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sorter: MatSort;

  courses: Course[] = [];
  sortedCourses: Course[];
  classService: ClassesService;
  canDisplayTable: boolean = false;

  displayedColumns: string[] = ['courseCode', 'title', 'ects'];

  constructor(cs: ClassesService) {
      this.classService = cs;
   }

  ngOnInit() {
    this.classService.getCourses(this.id).then((data: any) => {
      data.forEach((course: any) => {
        this.classService.getSingleCourseInfo(course.courseId).then((data) => {
          this.courses.push(data);
          this.table.renderRows();
        });
      });
      // le epic way to make up for the fact I cant get all course info with one API call
      setTimeout(() => {
        this.canDisplayTable = true;
        this.sorter.sort({disableClear: false, id: 'courseCode', start: 'asc'});
      }, 500);
    });
  }

  sortData(sort: Sort) {
    const data = this.courses.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCourses = data;
      return;
    }

    this.courses = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'courseCode':
          return compare(a.courseCode, b.courseCode, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'ects':
          return compare(a.ects, b.ects, isAsc);
        default:
          return 0;
      }
    });
    this.table.renderRows();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

