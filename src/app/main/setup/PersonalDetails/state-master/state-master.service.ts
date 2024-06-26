import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class StateMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createStateForm();
        this.myformSearch = this.createSearchForm();
    }

    createStateForm(): UntypedFormGroup {
        return this._formBuilder.group({
            StateId: [""],
            StateName: [""],
            CountryId: [""],
            CountryName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            StateNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createStateForm();
    }

    public getstateMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_StateNameList_by_Name",
            param
        );
    }

    public getCountryMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_CountryMasterForCombo",
            {}
        );
    }

    public stateMasterInsert(param) {
        return this._httpClient.post("PersonalDetails/StateSave", param);
    }

    public stateMasterUpdate(param) {
        return this._httpClient.post("PersonalDetails/StateUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
