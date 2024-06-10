import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CompanyTypeMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createcompanytypeForm();
        this.myformSearch = this.createSearchForm();
    }

    createcompanytypeForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CompanyTypeId: [""],
            TypeName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TypeNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createcompanytypeForm();
    }

    public getCompanytypeMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=M_Rtrv_CompanyMaster",
            param
        );
    }

    public companyTypeMasterInsert(param) {
        return this._httpClient.post("Billing/CompanyTypeMasterSave", param);
    }

    public companyTypeMasterUpdate(param) {
        return this._httpClient.post("Billing/CompanyTypeMasterUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
