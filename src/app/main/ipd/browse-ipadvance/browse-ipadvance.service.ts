import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BrowseIPAdvanceService {

  myFilterform: UntypedFormGroup;

  constructor(public _httpClient:HttpClient,
        private _formBuilder: UntypedFormBuilder) { 
          this.myFilterform=this.filterForm_IpdAdvance();
        }

  filterForm_IpdAdvance(): UntypedFormGroup {
    return this._formBuilder.group({
      PBillNo: '',
      RegNo: '',
      FirstName: '',
      LastName: '',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],
    });
  }

  public getIpdAdvanceBrowseList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BrowseIPDAdvanceBill", employee)
  }  

  public getTemplate(query) {
    return this._httpClient.post("Generic/GetBySelectQuery?query="+query, {})
  }  

  public getAdvanceBrowsePrint(AdvanceDetailID) {
    return this._httpClient.post("Generic/GetByProc?procName=rptIPDAdvancePrint", AdvanceDetailID)
  }  

  public getIPAdvanceReceipt(AdvanceDetailID){
    return this._httpClient.get("InPatient/view-IP-AdvanceReceipt="+AdvanceDetailID);
  }

  public getViewAdvanceReceipt(AdvanceDetailID){
    // return this._httpClient.get("InPatient/view-IP-AdvanceReceipt?AdvanceDetailID=" + AdvanceDetailID);
    return this._httpClient.get("InPatient/view-IP-AdvanceReceipt?AdvanceDetailID=" + AdvanceDetailID);
  }
}
