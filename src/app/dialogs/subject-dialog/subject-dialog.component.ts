import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassesService, Course, SubjectInfo } from 'src/app/services/classes-service/classes.service';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {

  subject: Course;
  subjectInfo: SubjectInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public subjectData: Course, public classService: ClassesService) { 
    this.subject = subjectData;
  }

  ngOnInit(): void {
    this.fetchAndDisplayInfo();
  }

  fetchAndDisplayInfo() {
    this.classService.getExtraInfoForClass(this.subject.id).then((data) => {
      console.log(data);
      this.subjectInfo = data;
    });
  }

}
