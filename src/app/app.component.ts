import { Component } from '@angular/core';
import { UserServiceService, User } from './services/user-service/user-service.service';
import { ClassesService, Department } from './services/classes-service/classes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  arrayOfDepartments: Department[];
  userService: UserServiceService;
  classSservice: ClassesService;

  constructor(userService: UserServiceService, classesService: ClassesService) {
    this.userService = userService;
    this.classSservice = classesService;
    this.arrayOfDepartments = [];
  }

  ngOnInit() {
    this.classSservice.getAllFaculties().then((departments) => {
      this.arrayOfDepartments = departments;
    });
  }

  title = 'AUThOpenAPIProj';

  uid: string = "";

  async getUser() {
    this.userService.getUserData(this.uid).then((user) => {
      console.log(user);
    });
  }

}
