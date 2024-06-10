import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CountryMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createCountryForm();
        this.myformSearch = this.createSearchForm();
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CountryNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    createCountryForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CountryId: [""],
            CountryName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    initializeFormGroup() {
        this.createCountryForm();
    }

    public getCountryMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=M_Rtrv_CountryNameList_by_Name",
            param
        );
    }

    public countryMasterInsert(param) {
        return this._httpClient.post("PersonalDetails/CountrySave", param);
    }

    public countryMasterUpdate(param) {
        return this._httpClient.post("PersonalDetails/CountryUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
