import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService, Course, UnitInfo } from 'src/app/services/classes-service/classes.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  private classService: ClassesService;
  route: ActivatedRoute;
  schoolId: string = "";
  progId: string = "";
  unit: UnitInfo | any;
  canDisplayTables: boolean = false;

  constructor(classService: ClassesService, route: ActivatedRoute) { 
    this.classService = classService;
    this.route = route;
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.schoolId = params['dId'];
      this.progId = params['progId'];
      this.classService.getUnitInfo(this.schoolId).then((unit) => {
        this.unit = unit;
        setTimeout(() => {
          this.canDisplayTables = true;
        }, 500);
      });
    });
    
  }

}
