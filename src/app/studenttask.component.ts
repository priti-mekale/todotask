import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../modules/student';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-studenttask',
  templateUrl: './studenttask.component.html',
  styleUrls: ['./studenttask.component.scss']
})
export class StudenttaskComponent implements OnInit {

  uuid() {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
 
  studentArr: Array<Istudent> = [{
    fname: "Priti",
    lname: "Mekale",
    contact: "8857545678",
    email: "Priti1@gmail.com",
    stdId: this.uuid()
  }];

  isInEditMode: boolean = false;
  editId: string = "";

  @ViewChild('fname') fnameRef!: ElementRef;
  @ViewChild('lname') lnameRef!: ElementRef;
  @ViewChild('contact') contactRef!: ElementRef;
  @ViewChild('email') emailRef!: ElementRef;

  constructor(private _matSnackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onAddstd() {

    let newObj: Istudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      stdId: this.uuid()
    };

    this.studentArr.unshift(newObj);

    this.clearForm();

    this._matSnackBar.open(`New student added successfully ✨`, "Close", {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }

  onEdit(stdc: Istudent) {
    this.isInEditMode = true;
    let editId = stdc.stdId;
    localStorage.setItem("editId",editId)

    this.fnameRef.nativeElement.value = stdc.fname;
    this.lnameRef.nativeElement.value = stdc.lname;
    this.contactRef.nativeElement.value = stdc.contact;
    this.emailRef.nativeElement.value = stdc.email;
  }


onUpdate() {
  let update_id = localStorage.getItem("editId");
  localStorage.removeItem("editId");

  if (update_id) {
    // create updated object
    let updateObj: Istudent = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      stdId: update_id   // keep same ID
    };

    // find index and update
    let index = this.studentArr.findIndex(std => std.stdId === update_id);
  this.studentArr[index] = updateObj;
  
  }

  this.isInEditMode = false;
 

  this.clearForm();

  this._matSnackBar.open(`Student updated successfully ✨`, "Close", {
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'top'
  });
}

onRemove(stdId: string) {
  let getConfirm = confirm("Are you sure you want to remove this Student ?");
  if (getConfirm) {
    let index = this.studentArr.findIndex(std => std.stdId === stdId);
   
      this.studentArr.splice(index, 1);
    
    this._matSnackBar.open(` Student deleted successfully ✨`, "Close", {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }
}



  clearForm() {
    this.fnameRef.nativeElement.value = "";
    this.lnameRef.nativeElement.value = "";
    this.contactRef.nativeElement.value = "";
    this.emailRef.nativeElement.value = "";
  }

}
