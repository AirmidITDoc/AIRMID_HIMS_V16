import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class BankMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createBankForm();
        this.myformSearch = this.createSearchForm();
    }

    createBankForm(): UntypedFormGroup {
        return this._formBuilder.group({
            BankId: [""],
            BankName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            BankNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createBankForm();
    }

    public getBankMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_BankNameList_by_Name",
            param
        );
    }

    public bankMasterInsert(param) {
        return this._httpClient.post("Billing/BankMasterSave", param);
    }

    public bankMasterUpdate(param) {
        return this._httpClient.post("Billing/BankUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
