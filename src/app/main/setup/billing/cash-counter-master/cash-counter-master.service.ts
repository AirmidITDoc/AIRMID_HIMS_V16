import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CashCounterMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createcashcounterForm();
        this.myformSearch = this.createSearchForm();
    }

    createcashcounterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CashCounterId: [""],
            CashCounterName: [""],
            Prefix: [""],
            BillNo: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CashCounterNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createcashcounterForm();
    }

    public getCashcounterMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_CashCounterNameList_by_Name",
            param
        );
    }

    public cashCounterMasterInsert(param) {
        return this._httpClient.post("Billing/CashCounterSave", param);
    }

    public cashCounterMasterUpdate(param) {
        return this._httpClient.post("Billing/CashCounterUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
