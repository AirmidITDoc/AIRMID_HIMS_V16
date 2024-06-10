import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class TariffMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createTariffForm();
        this.myformSearch = this.createSearchForm();
    }

    createTariffForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TariffId: [""],
            TariffName: [""],
            IsDeleted: ["false"],
            // AddedBy: ["0"],
            // UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TariffNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createTariffForm();
    }

    public getTariffMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_tariffNameList_by_Name",
            param
        );
    }

    public tariffMasterInsert(param) {
        return this._httpClient.post("Billing/TeriffSave", param);
    }

    public tariffMasterUpdate(param) {
        return this._httpClient.post("Billing/TariffUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
