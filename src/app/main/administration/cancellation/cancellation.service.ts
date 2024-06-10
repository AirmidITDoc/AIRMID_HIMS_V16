import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CancellationService {
  UserFormGroup:UntypedFormGroup;
  constructor(
    public _formBuilder:UntypedFormBuilder,
    public _httpClient:HttpClient
    ) 
    {this.UserFormGroup=this.createUserFormGroup() }

    createUserFormGroup(){
      return this._formBuilder.group({
        startdate: [(new Date()).toISOString()],
        enddate: [(new Date()).toISOString()],
        RegNo:'',
        FirstName:'',
        LastName:'',
        BillNo:'',
        Radio:['1']

      })
    }
}
