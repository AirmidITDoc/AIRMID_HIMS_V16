import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class PatienttypeMasterService {
    myForm: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myForm = this.createPatientTypeForm();
        this.myformSearch = this.createSearchForm();
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            PatientTypeSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createPatientTypeForm(): UntypedFormGroup {
        return this._formBuilder.group({
            PatientTypeId: [""],
            PatientType: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    initializeFormGroup() {
        this.createPatientTypeForm();
    }

    public getPatientTypeMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_PatientTypeMaster",
            param
        );
    }

    public patientTypeMasterInsert(param) {
        return this._httpClient.post("PersonalDetails/PatientTypeSave", param);
    }

    public patientTypeMasterUpdate(param) {
        return this._httpClient.post(
            "PersonalDetails/PatientTypeUpdate",
            param
        );
    }

    populateForm(param) {
        this.myForm.patchValue(param);
    }
}
