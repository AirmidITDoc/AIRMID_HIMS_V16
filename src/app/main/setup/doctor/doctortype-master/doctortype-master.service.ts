import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DoctortypeMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createDoctortypeForm();
        this.myformSearch = this.createSearchForm();
    }

    createDoctortypeForm(): UntypedFormGroup {
        return this._formBuilder.group({
            Id: [""],
            DoctorType: [""],
            isActive: ['1'],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DoctorTypeSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createDoctortypeForm();
    }

    public getDoctortypeMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_DoctorTypeMaster",param
           
        );
    }

    public doctortTypeMasterInsert(param) {
        return this._httpClient.post("DoctorMaster/DoctorTypeSave", param);
    }

    public doctorTypeMasterUpdate(param) {
        return this._httpClient.post("DoctorMaster/DoctorTypeUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
