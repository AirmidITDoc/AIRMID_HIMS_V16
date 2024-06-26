import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { AppointmentSreviceService } from '../appointment-srevice.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdvanceDetailObj } from '../appointment.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-consultant-doctor',
  templateUrl: './edit-consultant-doctor.component.html',
  styleUrls: ['./edit-consultant-doctor.component.scss']
})
export class EditConsultantDoctorComponent implements OnInit {



  dateTimeObj: any;
  DoctorList: any = [];
  DepartmentList: any = [];
  DoctorId: any;

  AdmissionID: any;
  screenFromString = 'admission-form';
  PatientHeaderObj: AdvanceDetailObj;
  AdmittedDoc1: any;
  PatientName: any;
  searchFormGroup: UntypedFormGroup;
  VisitId: any;
  VisitDate: any;
  RegID: any = 0;

  //department filter
  public departmentFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredDepartment: ReplaySubject<any> = new ReplaySubject<any>(1);

  //doctorone filter
  public doctorFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredDoctor: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _onDestroy = new Subject<void>();

  constructor(

    public _OpAppointmentService: AppointmentSreviceService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditConsultantDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.searchFormGroup = this.createSearchForm();

    if (this.data) {
      console.log(this.data)
      this.PatientHeaderObj = this.data.registerObj;
      this.VisitId = this.PatientHeaderObj.VisitId;
      this.PatientName = this.PatientHeaderObj.PatientName;
      this.DoctorId = this.PatientHeaderObj.DoctorId;
      this.VisitDate = this.PatientHeaderObj.VistDateTime;
      this.RegID = this.PatientHeaderObj.RegId;
      console.log(this.PatientHeaderObj);
      debugger
      if (this.data.FormName == "Admission")
        this.RegID = this.PatientHeaderObj.RegId;
    }


    this.getDoctorList();
    this.getDepartmentList();

    this.doctorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDoctor();
      });

    this.departmentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDepartment();
      });

    setTimeout(function () {
      let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
      element.click();
    }, 1000);
  }


  createSearchForm() {
    return this.formBuilder.group({
      DoctorId: '',
      Departmentid: ''
    });
  }

  setDropdownObjs() {
    const toSelectDoc1 = this.DoctorList.find(c => c.DoctorID == this.DoctorId);
    this._OpAppointmentService.mySaveForm.get('DoctorID').setValue(toSelectDoc1);
    this._OpAppointmentService.mySaveForm.updateValueAndValidity();
  }

  getDoctorList() {
    this._OpAppointmentService.getDeptwiseDoctorMaster().subscribe(
      data => {
        this.DoctorList = data;
        console.log(data)

        this.filteredDoctor.next(this.DoctorList.slice());
      })
  }

  // doctorone filter code  
  private filterDoctor() {
    if (!this.DoctorList) {
      return;
    }
    // get the search keyword
    let search = this.doctorFilterCtrl.value;
    if (!search) {
      this.filteredDoctor.next(this.DoctorList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDoctor.next(
      this.DoctorList.filter(bank => bank.Doctorname.toLowerCase().indexOf(search) > -1)
    );
  }


  // department filter code
  private filterDepartment() {

    if (!this.DepartmentList) {
      return;
    }
    // get the search keyword
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.filteredDepartment.next(this.DepartmentList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredDepartment.next(
      this.DepartmentList.filter(bank => bank.departmentName.toLowerCase().indexOf(search) > -1)
    );
  }

  OnChangeDoctorList(departmentObj) {
    console.log("departmentObj", departmentObj)
    this._OpAppointmentService.getDoctorMasterCombo(departmentObj.Departmentid).subscribe(
      data => {
        this.DoctorList = data;
        console.log(this.DoctorList);
        this.filteredDoctor.next(this.DoctorList.slice());
      })
  }

  getDepartmentList() {
    this._OpAppointmentService.getDepartmentCombo().subscribe(data => {
      this.DepartmentList = data;
      this.filteredDepartment.next(this.DepartmentList.slice());
    });
  }


  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger
    this.DoctorId = this.searchFormGroup.get('DoctorId').value.DoctorId;
    let query = '';
    if (this.data.FormName == "Appointment") {
       query = "Update VisitDetails set ConsultantDocId= " + this.DoctorId + " where Visitid=" + this.VisitId + " ";
    }
    // if (this.data.FormName == "Admission") {
    //    query = "Update VisitDetails set ConsultantDocId= " + this.DoctorId + " where RegID=" + this.RegID + " ";
    // }
    console.log(query);
    this._OpAppointmentService.UpdateQueryByStatement(query).subscribe(response => {

      if (response) {
        Swal.fire('updated !', 'Consultant Doctor Data Updated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();
          }
        });
      } else {
        Swal.fire('Error !', 'Consultant Doctor  not Updated', 'error');
      }
    });
  }


  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }
}

