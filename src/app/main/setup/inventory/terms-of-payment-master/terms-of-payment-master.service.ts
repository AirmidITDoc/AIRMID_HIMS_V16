import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class TermsOfPaymentMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createtermsofpaymentForm();
        this.myformSearch = this.createSearchForm();
    }

    createtermsofpaymentForm(): UntypedFormGroup {
        return this._formBuilder.group({
            Id: [""],
            TermsOfPayment: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TermsOfPaymentSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createtermsofpaymentForm();
    }

    public getTermsofPaymentMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_TermsOfPaymentList_by_Name",
            param
        );
    }

    public insertTermsofPaymentMaster(param) {
        return this._httpClient.post("Inventory/TermsofPaymentSave", param);
    }

    public updateTermsofPaymentMaster(param) {
        return this._httpClient.post("Inventory/TermsofPaymentUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
