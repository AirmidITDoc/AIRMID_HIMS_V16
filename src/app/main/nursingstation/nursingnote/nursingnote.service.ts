import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NursingnoteService {
  myform: UntypedFormGroup;
  constructor(public _httpClient: HttpClient,
    public _formBuilder: UntypedFormBuilder) {
      this.myform = this.createtemplateForm();
     }

     
  createtemplateForm(): UntypedFormGroup {
    return this._formBuilder.group({
      Note: [''], 
      Description:['']
    });
  }


  public DoctorNoteInsert(employee) {
    return this._httpClient.post("InPatient/DoctorNoteInsert", employee)
  }
  public getDoctorCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo", {})
  }
}
