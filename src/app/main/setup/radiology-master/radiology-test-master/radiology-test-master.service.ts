import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RadiologyTestMasterService {
  myform: UntypedFormGroup;
  myformSearch: UntypedFormGroup;
  AddParameterFrom:UntypedFormGroup;

  constructor(private _httpClient: HttpClient,private _formBuilder: UntypedFormBuilder) {
    this.myform=this.createRadiologytestForm();
    this.myformSearch = this.createSearchForm();
    this.AddParameterFrom =this.createAddparaFrom();
  }

  createRadiologytestForm(): UntypedFormGroup {
    return this._formBuilder.group({
      TestId: [''],
      TestName: [''],
      PrintTestName: [''],
      CategoryId:[''],
      //TemplateName:[''],
      ServiceId:[''],
      IsDeleted: ['true'],
     
    });
  }
  createSearchForm(): UntypedFormGroup {
    return this._formBuilder.group({
      TestNameSearch: [""],
      IsDeletedSearch: ["2"],
    });
}
createAddparaFrom(): UntypedFormGroup {
  return this._formBuilder.group({
    TestId:[''],
    TemplateName: [""]
  });
}

  initializeFormGroup() {
    this.createRadiologytestForm();
    this.createSearchForm();
  }
  // get Test Master list
  public getRadiologyList(param) { 
    return this._httpClient.post( "Generic/GetByProc?procName=Retrieve_RadiologyTestList",
        param
    );
}
  

  // Category Master Combobox List
  public getCategoryMasterCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RadiologyCategoryMasterForCombo", {})
  }

  public insertRadiologyTestMaster(employee) { 
    return this._httpClient.post("RadiologyMaster/RadiologyTestMasterSave", employee);
  }
  
  // Service Master Combobox List
  public getServiceMasterCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RathTestListForCombo", {})
  }
    
  // TemplateMaster Combobox List dropdown
  public gettemplateMasterCombo() {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RadiologyTemplateMasterForComboMaster", {})
  }
    
  // TemplateMaster Combobox List
  public gettemplateMasterComboList(param) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_RadiologyTemplateMasterForComboMasterList", param)
  }
  public updateRadiologyTestMaster(employee) {
    return this._httpClient.post("RadiologyMaster/RadiologyTestMasterUpdate", employee);
  }

  populateForm(employee) {
    this.myform.patchValue(employee);
  }
}
