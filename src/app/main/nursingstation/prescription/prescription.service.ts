import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  mysearchform: UntypedFormGroup;
  
  constructor(
    public _httpClient:HttpClient,
    private _formBuilder: UntypedFormBuilder
  ) { 
    this.mysearchform= this.SearchFilterFrom();
  }

  SearchFilterFrom(): UntypedFormGroup{
    return this._formBuilder.group({
      startdate: [(new Date()).toISOString()],
      enddate: [(new Date()).toISOString()],
      PrescriptionStatus:['Pending'],
      RegNo:''
    })  
  }
  public getPrintPrecriptionlist(Param){
    return this._httpClient.post("Generic/GetByProc?procName=rptIPDPrecriptionPrint",Param)
  }

  public getPrecriptionlistmain(Param){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_PrescriptionListFromWard",Param)
  }

  public getPrecriptiondetlist(Param){
    return this._httpClient.post("Generic/GetByProc?procName=Rtrv_IP_Prescriptio_Det",Param)
  }


  public getItemlist(Param){//m_Rtrv_IPDrugName,Retrieve_ItemName_BalanceQty
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_ItemName_BalanceQty",Param)
  }

  
  public getPharmacyStoreList(){
    return this._httpClient.post("Generic/GetByProc?procName=m_rtrv_PharStoreList",{});
  }

  public getLoggedStoreList(Param){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StoreNameForLogedUser_Conditional",Param);
  }

  public getWardList(){
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveRoomMasterForCombo",{});
  }

  public getRegistrationList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_PatientRegistrationList", employee)
  }

  public getAdmittedpatientlist(employee){
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_PatientAdmittedListSearch ", employee)
  }
  public presciptionSave(employee) {
    return this._httpClient.post("InPatient/InsertIPPrescription", employee);
  }
   


  public getIpPrescriptionview(OP_IP_ID,PatientType){
    return this._httpClient.get("InPatient/view-IP_Prescription?OP_IP_ID=" + OP_IP_ID+"&PatientType="+PatientType);
  }
}
