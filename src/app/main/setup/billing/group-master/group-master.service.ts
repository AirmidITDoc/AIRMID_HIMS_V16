import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class GroupMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createGroupForm();
        this.myformSearch = this.createSearchForm();
    }

    createGroupForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GroupId: [""],
            GroupName: ["", Validators.required],
            PrintSeqNo: ["", Validators.pattern("[0-9]+")],
            Isconsolidated: ["false"],
            IsConsolidatedDR: ["false"],
            IsActive: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GroupNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createGroupForm();
    }

    public getGroupMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_GroupList_by_Name",
            param
        );
    }

    public groupMasterInsert(param) {
        return this._httpClient.post("Billing/GroupSave", param);
    }

    public groupMasterUpdate(param) {
        return this._httpClient.post("Billing/GroupUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
