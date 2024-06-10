import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DepartmentMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createDepartmentForm();
        this.myformSearch = this.createSearchForm();
    }

    createDepartmentForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DepartmentId: [""],
            DepartmentName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DepartmentNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createDepartmentForm();
    }

    public getDepartmentMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_DepartmentMaster",
            param
        );
    }

    public departmentMasterInsert(employee) {
        return this._httpClient.post(
            "DepartMentMaster/DepartmentSave",
            employee
        );
    }

    public departmentMasterUpdate(employee) {
        return this._httpClient.post(
            "DepartMentMaster/DepartmentUpdate",
            employee
        );
    }

    populateForm(employee) {
        this.myform.patchValue(employee);
    }
}
