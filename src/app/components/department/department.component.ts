import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DepartmentInfoDialogComponent } from 'src/app/dialogs/department-info-dialog/department-info-dialog.component';
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

  constructor(classService: ClassesService, route: ActivatedRoute, private dialog: MatDialog) { 
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

  openUnitInfoDialog() {
    this.dialog.open(DepartmentInfoDialogComponent, {
      data: this.unit
    });
  }

}
