import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClassesService, Course } from 'src/app/services/classes-service/classes.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent implements OnInit {
  @Input() id: string;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sorter: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  courses: Course[] = [];
  sortedCourses: Course[];
  classService: ClassesService;
  canDisplayTable: boolean = false;
  dataSource = new MatTableDataSource<Course>([]);

  displayedColumns: string[] = ['courseCode', 'title', 'ects'];

  constructor(cs: ClassesService) {
      this.classService = cs;
   }

  ngOnInit() {
    this.classService.getCourses(this.id).then((data: Course[]) => {
      this.courses = data;
      this.dataSource.data = this.courses;
      this.dataSource.paginator = this.paginator;
      this.sorter.sort({disableClear: false, id: 'courseCode', start: 'asc'});
      console.log(this.courses);
      for (let i = 0; i < this.courses.length; i++) {
        this.classService.getSingleCourseInfo(this.courses[i].id).then((data) => {
          this.courses[i] = data;
          this.dataSource.data = this.courses;
          this.table.renderRows();
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

