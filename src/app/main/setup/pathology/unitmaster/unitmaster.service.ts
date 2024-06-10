import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class UnitmasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createUnitmasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createUnitmasterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            UnitId: [""],
            UnitName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            UnitNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createUnitmasterForm();
    }

    public getUnitMasterList(param) {
        return this._httpClient.post("Generic/GetByProc?procName=Rtrv_PathUnitMasterList_by_Name", param );
    }

    public insertUnitMaster(param) {
        return this._httpClient.post("PathologyMaster/UnitSave", param);
    }

    public updateUnitMaster(param) {
        return this._httpClient.post("PathologyMaster/UnitUpdate", param);
    }
    public deactivateTheStatus(m_data) {
        return this._httpClient.post("Generic/ExecByQueryStatement?query=" + m_data,{});
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
