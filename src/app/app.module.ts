import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper'
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MainComponent } from './components/main/main.component';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './components/department/department.component';
import { ClassesTableComponent } from './components/classes-table/classes-table/classes-table.component';
import { SubjectDialogComponent } from './dialogs/subject-dialog/subject-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    MainComponent,
    DepartmentComponent,
    ClassesTableComponent,
    SubjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
