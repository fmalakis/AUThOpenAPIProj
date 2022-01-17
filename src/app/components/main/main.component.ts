import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Department, ClassesService, StudiesProg } from 'src/app/services/classes-service/classes.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @ViewChild('stepper') stepper: MatStepper;

  arrayOfDepartments: Department[];
  arrayOfStudiesProg: StudiesProg[];
  userService: UserServiceService;
  classSservice: ClassesService;
  route: Router;

  searchString: string = "";
  selectedDepartment: Department;
  selectedStudyProg: StudiesProg;
  depFormGroup: FormGroup;
  studiesProgGroup: FormGroup;

  constructor(userService: UserServiceService, classesService: ClassesService, route: Router, private _formBuilder: FormBuilder) {
    this.userService = userService;
    this.classSservice = classesService;
    this.arrayOfDepartments = [];
    this.route = route;
  }

  ngOnInit() {
    this.classSservice.getAllFaculties().then((departments) => {
      this.arrayOfDepartments = departments;
    });

    this.depFormGroup = this._formBuilder.group({
      depCtrl: ['', Validators.required]
    });

    this.studiesProgGroup = this._formBuilder.group({
      studyCtrl: ['', Validators.required]
    });

  }

  navigateToPresentation() {
    this.route.navigate(['/department', this.selectedDepartment.id, this.selectedStudyProg.prID]).then(() => {
      this.classSservice.setCurrentDepartment(this.selectedDepartment);
    });
  }

  selectDepartment(dep: Department) {
    this.selectedDepartment = dep;
    this.stepper.next();
  }

  navigateToStudies() {
    this.classSservice.getDeptStudiesProg(this.selectedDepartment.id).then((studiesProgs) => {
      this.arrayOfStudiesProg = studiesProgs;
      this.stepper.next();
    })
  }

  check() {
    console.log(this.selectedDepartment);
  }
  

}
