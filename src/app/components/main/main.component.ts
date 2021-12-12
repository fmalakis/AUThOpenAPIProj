import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department, ClassesService } from 'src/app/services/classes-service/classes.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  arrayOfDepartments: Department[];
  userService: UserServiceService;
  classSservice: ClassesService;
  route: Router;

  searchString: string = "";

  constructor(userService: UserServiceService, classesService: ClassesService, route: Router) {
    this.userService = userService;
    this.classSservice = classesService;
    this.arrayOfDepartments = [];
    this.route = route;
  }

  ngOnInit() {
    this.classSservice.getAllFaculties().then((departments) => {
      this.arrayOfDepartments = departments;
    });
  }

  navigateToDepartment(dep: Department) {
    this.route.navigate(['/department', dep.id]).then(() => {
      this.classSservice.setCurrentDepartment(dep);
    });
  }


  

}
