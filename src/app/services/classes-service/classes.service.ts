import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Links } from '../links';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  async getAllFaculties() {

    return new Promise<Department[]>((resolve) => {

      let faculties: Department[] = [];
      const res = this.http.get<any>(Links.api + "getUnits/school");

      res.subscribe((data) => {
        for (const depId in data.units) {
          faculties.push(new Department(depId, 
                                        data.units[depId]["name"],
                                        data.units[depId]["nameEn"],
                                        data.units[depId]["adminUnitIdFormatted"],
                                        data.units[depId]["parentDomain"]));
        }

        resolve(faculties);

      })

    });
    
    
    // this.http.get<any>(Links.api + "getUnits/school").subscribe((data) => {

    //   let faculties: Department[] = [];

    //   for (const depId in data.units) {
    //     faculties.push(new Department(depId, 
    //                                   data.units[depId]["name"],
    //                                   data.units[depId]["nameEn"],
    //                                   data.units[depId]["adminUnitIdFormatted"],
    //                                   data.units[depId]["parentDomain"]));
    //   }
      
    //   return new Promise<Department[]>((resolve, reject) => {
    //     console.log("lol")
    //     if (faculties) {
    //       resolve(faculties);
    //     } else {
    //       reject("Error");
    //     }
    //   });
  
    // });

    // return this.http.get<Department[]>(Links.api + "getUnits/school");

  }

}

export class Department {
  constructor(public id: string,
              public name: string, 
              public nameEn: string, 
              public adminUnitIdFormatted: string, 
              public parentDomain: string) {}
}
