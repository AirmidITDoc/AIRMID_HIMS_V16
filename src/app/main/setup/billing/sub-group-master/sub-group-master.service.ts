import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class SubGroupMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createSubgroupForm();
        this.myformSearch = this.createSearchForm();
    }

    createSubgroupForm(): UntypedFormGroup {
        return this._formBuilder.group({
            SubGroupId: [""],
            SubGroupName: [""],
            GroupId: [""],
            GroupName: [""],
            IsDeleted: ["false"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            SubGroupNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createSubgroupForm();
    }

    public getSubgroupMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_SubGroupList_by_Name",
            param
        );
    }

    // Group Master Combobox List
    public getGroupMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveGroupMasterForCombo",
            {}
        );
    }

    public subGroupMasterInsert(param) {
        return this._httpClient.post("Billing/SubGroupSave", param);
    }

    public subGroupMasterUpdate(param) {
        return this._httpClient.post("Billing/SubGroupUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
