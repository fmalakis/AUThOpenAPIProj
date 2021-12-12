import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Links } from '../links';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  http: HttpClient;
  currentDepartment: Department | any;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  async getAllFaculties() {

    return new Promise<Department[]>((resolve) => {

      let faculties: Department[] = [];
      const res = this.http.get<any>(`${Links.api}getUnits/school`);

      res.subscribe((data) => {
        for (const depId in data.units) {
          faculties.push(new Department(depId, 
                                        data.units[depId]["name"],
                                        data.units[depId]["nameEn"],
                                        data.units[depId]["adminUnitIdFormatted"],
                                        data.units[depId]["parentDomain"]));
        }

        resolve(faculties);

      });


    });

  }

  async getUnitInfo(schoolId: string) {

    return new Promise<UnitInfo>((resolve, reject) => {
      const res = this.http.get<any>(`${Links.api}getUnitInfo/${schoolId}`);

      res.subscribe((data) => {

        let tels = data.unit.secretaryTels.replace("2310", "");
        let secTels = tels.split(",");
        const sec = secTels.map((element: string) => "2310" + element);

        console.log(sec);

        const resDep = new UnitInfo(schoolId, data.unit.name, data.unit.nameEn, data.unit.mail,
                                    data.unit.url, sec);

        resolve(resDep);
      });

    });

  }

  getCurrentDepartment() {
    if (this.currentDepartment)
      return this.currentDepartment;
    return null;
  }

  setCurrentDepartment(dep: Department) {
    this.currentDepartment = dep;
  }

}

export class Department {
  constructor(public id: string,
              public name: string, 
              public nameEn: string, 
              public adminUnitIdFormatted: string, 
              public parentDomain: string) {}
}

export class UnitInfo {
  constructor(public domain: string,
              public name: string,
              public nameEn: string,
              public mail:string,
              public url: string,
              public secretaryTels: string[]) {};
}
