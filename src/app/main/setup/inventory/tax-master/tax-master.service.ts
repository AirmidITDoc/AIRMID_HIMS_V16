import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class TaxMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createTaxMasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createTaxMasterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            Id: [""],
            TaxNature: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TaxNatureSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createTaxMasterForm();
    }

    public gettaxMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_TaxNature_by_Name",
            param
        );
    }

    public insertTaxMaster(param) {
        return this._httpClient.post("Inventory/TaxSave", param);
    }

    public updateTaxMaster(param) {
        return this._httpClient.post("Inventory/TaxUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
