import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class AreaMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createAreaForm();
        this.myformSearch = this.createSearchForm();
    }

    createAreaForm(): UntypedFormGroup {
        return this._formBuilder.group({
            AreaId: [""],
            AreaName: [""],
            CityId: [""],
            CityName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            AreaNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createAreaForm();
    }

    public getAreaMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=M_Rtrv_AreaName",
            param
        );
    }

    // City Master Combobox List
    public getCityMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveCityMasterForCombo",
            {}
        );
    }

    public areaMasterInsert(param) {
        return this._httpClient.post("PersonalDetails/AreaSave", param);
    }

    public areaMasterUpdate(param) {
        return this._httpClient.post("PersonalDetails/AreaUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
