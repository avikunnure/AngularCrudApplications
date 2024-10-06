import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  Modal: Modal | undefined;
  title = 'CrudApplications';
  @ViewChild('myModal') myModal: ElementRef<any> | undefined;
  StudentModel: Student = new Student();
  StudentList: Student[] = [];
  ngAfterViewInit(): void {
    if (this.myModal != null) {
      this.Modal = new Modal(this.myModal.nativeElement, {});
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    var isPresents = localStorage.getItem('students');
    if (isPresents != null) {
      this.StudentList = JSON.parse(isPresents);
    }
  }
  openModal() {
    this.Modal?.show();
  }

  closeModal() {
    this.Modal?.hide();
  }

  saveChanges() {
    debugger;
    let exist: Student[] = [];
    var isPresents = localStorage.getItem('students');
    if (isPresents != null) {
      exist = JSON.parse(isPresents);
    }
    if (this.StudentModel.id == 0) {
      let counts = exist.length || 0;
      this.StudentModel.id = counts + 1;
      exist.push(this.StudentModel);
    } else {
      for (let index = 0; index < exist.length; index++) {
        if (exist[index].id === this.StudentModel.id) {
          exist[index] = this.StudentModel;
        }
      }
    }

    localStorage.setItem('students', JSON.stringify(exist));
    this.StudentModel.clearValues();
    this.loadData();
    this.closeModal();
    alert('Data saved successfully');
  }

  editdata(item: Student) {
    this.StudentModel.id = item.id;
    this.StudentModel.name = item.name;
    this.StudentModel.mobileno = item.mobileno;
    this.StudentModel.email = item.email;
    this.StudentModel.city = item.city;
    this.StudentModel.state = item.state;
    this.StudentModel.pincode = item.pincode;
    this.StudentModel.address = item.address;
    this.openModal();
  }

  deletedata(deletedata: Student) {
    let rs= confirm('Are you sure to delete?');
    if (rs != null) {
      var index = this.StudentList.findIndex(x=>x.id==deletedata.id);
      this.StudentList.splice(index,1);
      localStorage.setItem('students', JSON.stringify(this.StudentList));
    }
    this.loadData();
  }
}

export class Student {
  id: number;
  name: string;
  mobileno: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileno = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
  clearValues() {
    this.id = 0;
    this.name = '';
    this.mobileno = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
