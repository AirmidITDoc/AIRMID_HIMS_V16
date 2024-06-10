import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class MaritalstatusMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createMaritalForm();
        this.myformSearch = this.createSearchForm();
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            MaritalStatusNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createMaritalForm(): UntypedFormGroup {
        return this._formBuilder.group({
            MaritalStatusId: [""],
            MaritalStatusName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    initializeFormGroup() {
        this.createMaritalForm();
    }

    public getmaritalstatusMasterList(e) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_MaritalStatusNameNameList",
            e
        );
    }

    public insertMaritalStatusMaster(param) {
        return this._httpClient.post(
            "PersonalDetails/MaritalStatusSave",
            param
        );
    }

    public updateMaritalStatusMaster(param) {
        return this._httpClient.post(
            "PersonalDetails/MaritalStatusUpdate",
            param
        );
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
