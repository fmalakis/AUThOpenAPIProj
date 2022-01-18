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

    return new Promise<Department[]>((resolve, reject) => {

      let faculties: Department[] = [];
      const res = this.http.get<any>(`${Links.api}getUnits/school`);

      if (!res) {
        reject("error");
      }

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

  async getCourses(dep: string, progId: string) {
    return new Promise<Course[]>((resolve, reject) => {

      let courses: Course[] = [];

      const all = this.http.get<any>(`${Links.api}getStudiesProgCourses/${progId}`);
          all.subscribe((data) => {
            const c = data.courses;
            c.forEach((el: any) => {
              courses.push(new Course(el.coursecode, el.courseId));
            });
            // data.courses.forEach(async (course: any) => {
            //   const classRes = this.http.get<any>(`${Links.api}getCourseInfo/${course.courseId}`);
            //   classRes.subscribe((data: any) => {
            //     const singleCourse = data.course;
            //     Courses.push(new Course(singleCourse.coursecode, singleCourse.AltKey, singleCourse.title, singleCourse.titleEN, singleCourse.ects, singleCourse.classID));
            //   });
            // });
            resolve(courses);
          });
        });
    }

  getSingleCourseInfo(id: string) {

    return new Promise<Course>((resolve, reject) => {
      const res = this.http.get<any>(`${Links.api}getCourseInfo/${id}`);
      res.subscribe((data => {
        const newCourse = new Course(data.course.coursecode, data.course.classID, data.course.AltKey, data.course.title, data.course.titleEN, data.course.ects);
        // console.log(newCourse);
        resolve(newCourse);
      }));
    })
    
  }

  getDeptStudiesProg(id: string) {

    return new Promise<StudiesProg[]>((resolve, reject) => {
      const res = this.http.get<any>(`${Links.api}getDeptStudiesProg/${id}`);

      let studiesProgs: StudiesProg[] = [];

      res.subscribe((data) => {

        console.log(data);

        const studiesProgArr = data.studiesprogs;
        for(const studiesProgId in studiesProgArr) {
          studiesProgs.push(new StudiesProg(studiesProgArr[studiesProgId]['prDepId'], studiesProgArr[studiesProgId]['prID'], studiesProgArr[studiesProgId]['prname']));
        }

        resolve(studiesProgs);

      });

    });

  }

  getExtraInfoForClass(classId: string) {

    return new Promise<SubjectInfo>((resolve, reject) => {

      const res = this.http.get<any>(`${Links.api}getClassInfo/${classId}`);

      res.subscribe((data) => {

        console.log(data);

        const courseTypes: string[] = [];
        for(const i in data.class.qa_data.course_information_form_data.type_of_the_course) {
          courseTypes.push(data.class.qa_data.course_information_form_data.type_of_the_course[i]);
        }

        const digitalContent: any = [];
        const digital_course_content = data.class.qa_data.course_information_form_data.digital_course_content;
        for(const ele in digital_course_content) {
          let label = digital_course_content[ele].label.replace(":", "");
          let url = digital_course_content[ele].url;
          if (!url.includes("http"))
            url = "http://" + url;
          digitalContent.push({label: label, url: url})
        }

        const subj = new SubjectInfo(data.class.qa_data.general_data.course_info.course_period,
                                     data.class.qa_data.general_data.course_info.teacher_in_charge,
                                     data.class.qa_data.general_data.class_info.academic_year,
                                     data.class.qa_data.general_data.class_info.instructors.split(", "),
                                     courseTypes,
                                     digitalContent)

        resolve(subj);
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

export class Course {
  constructor(public courseCode: string,
              public id: string,
              public altKey?: string,
              public title?: string,
              public titleEn?: string,
              public ects?: string
              ) {};
}

export class StudiesProg {
  constructor(public prDepId: string,
              public prID: string,
              public prname: string) {}
}

export class SubjectInfo {
  constructor(public coursePeriod: string,
              public teacherInCharge: string,
              public academicYear: string,
              public instructors: string[],
              public courseType: string[],
              public digitalCourseContent: [
                { label: string,
                   url: string 
                }],
              public learningOutComes?: string,
              public courseContent?: string
              ) {}
}
