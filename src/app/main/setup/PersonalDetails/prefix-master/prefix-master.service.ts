import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class PrefixMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createPrefixForm();
        this.myformSearch = this.createSearchForm();
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            PrefixNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createPrefixForm(): UntypedFormGroup {
        return this._formBuilder.group({
            PrefixID: [""],
            PrefixName: [""],
            SexID: [" "],
            GenderName: [""],
            IsActive: ["true"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    initializeFormGroup() {
        this.createPrefixForm();
    }
    // get Perfix Master list
    public getPrefixMasterList(Param) {
        return this._httpClient.post("Generic/GetByProc?procName=Rtrv_DB_PrefixMaster_by_Name", Param);
    }

    // Gender Master Combobox List
    public getGenderMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveGenderMasterForCombo",
            {}
        );
    }

    // Insert Perfix Master
    public insertPrefixMaster(Param) {
        return this._httpClient.post("PersonalDetails/PrefixSave", Param);
    }

    // Update Perfix Master
    public updatePrefixMaster(Param) {
        return this._httpClient.post("PersonalDetails/PrefixUpdate", Param);
    }
    populateForm(param) {
        this.myform.patchValue(param);
    }
}
