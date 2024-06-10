import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SalesReturnBillSettlementService {

  userFormGroup: UntypedFormGroup;
 ItemSubform: UntypedFormGroup;

  constructor(
    public _httpClient: HttpClient,
    private _formBuilder: UntypedFormBuilder
  ) { 
    this.userFormGroup = this.CreateUseFrom();
    this.ItemSubform = this.getItemSubform(); 
  }

  CreateUseFrom() {
    return this._formBuilder.group({
      RegID: [''],
      Op_ip_id: ['1'],
      advanceAmt:[''],
      comment:['']
    });
  }

  getItemSubform() {
    return this._formBuilder.group({
      RegID:'',
      PatientName: '',
      DoctorName: '',
      extAddress: '',
      MobileNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10),]],
      PatientType: ['OP'], 
    });
  }
  
  public getAdmittedpatientlist(employee){
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_PatientAdmittedListSearch ", employee)
  }
  public getSalesList(Param){ 
    return this._httpClient.post("Generic/GetByProc?procName=m_Retrieve_PrescriptionListforSales",Param);
  }
  public getItemDetailList(Param){
    return this._httpClient.post("Generic/GetByProc?procName=Ret_PrescriptionDet",Param);
  }
  public getAdmittedPatientList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_PatientAdmittedListSearch", employee)
  }

  public getPatientVisitedListSearch(employee) {//m_Rtrv_PatientVisitedListSearch
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_PatientVisitedListSearch", employee)
  }
}
