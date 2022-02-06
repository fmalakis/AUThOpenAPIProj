import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitInfo } from 'src/app/services/classes-service/classes.service';

@Component({
  selector: 'app-department-info-dialog',
  templateUrl: './department-info-dialog.component.html',
  styleUrls: ['./department-info-dialog.component.scss']
})
export class DepartmentInfoDialogComponent implements OnInit {

  unit: UnitInfo;

  constructor(@Inject(MAT_DIALOG_DATA) unitData: UnitInfo) { 
    this.unit = unitData;
  }

  ngOnInit(): void {
  }

}
