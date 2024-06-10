import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ConcessionReasonMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createConcessionreasonForm();
        this.myformSearch = this.createSearchForm();
    }

    createConcessionreasonForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ConcessionId: [""],
            ConcessionReasonName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ConcessionReasonNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createConcessionreasonForm();
    }

    public getConcessionreasonMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_ConcessionReasonNameList_by_Name",
            param
        );
    }

    public consessionReasonMasterInsert(param) {
        return this._httpClient.post("Billing/ConsessionReasonSave", param);
    }

    public consessionReasonMasterUpdate(param) {
        return this._httpClient.post("Billing/ConsessionReasonUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
