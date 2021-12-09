import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Links } from '../links';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http: HttpClient;
  apiLink: string = Links.api;

  constructor(http: HttpClient) { 
    this.http = http;
  }


  async getUserData(id: string) {

    let currentUser: User;

    this.http.get<User>(this.apiLink + "/open/getPersonInfo/" + id).subscribe((user) => {
        currentUser = user;
        console.log(currentUser);
    });

    return new Promise<User>((resolve, reject) => {
      if (currentUser != undefined || null)
        resolve(currentUser);
      else
        reject("Failed to get user");
    }).catch((err) => console.log(err));

  }


}

export class User {
  firstName: string;
  lastName: string;
  middleName?: string;
  firstEn: string;
  lastEn: string;
  middleEn: string;
  gender: string;
  status: string;
  titleId: string;
  dept: string;
  deptCode: string;
  labels: {
    title: string,
    status: true
  }

  constructor(firstName: string, lastName: string, middleName: string, firstEn: string, lastEn: string, middleEn: string,
              gender: string, status: string, titleId: string, dept: string, deptCode: string, labels: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.firstEn = firstEn;
    this.lastEn = lastEn;
    this.middleEn = middleEn;
    this.gender = gender;
    this.status = status;
    this.titleId = titleId;
    this.dept = dept;
    this.deptCode = deptCode;
    this.labels = labels;
  }
}
