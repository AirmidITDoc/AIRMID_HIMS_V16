import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CategorymasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createCategorymasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createCategorymasterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CategoryId: [""],
            CategoryName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CategoryNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createCategorymasterForm();
    }

    public getCategoryMasterList(param) {
        return this._httpClient.post( "Generic/GetByProc?procName=Rtrv_PathCategoryList_by_Name",param);
    }

    public insertPathologyCategoryMaster(param) {
        return this._httpClient.post("PathologyMaster/PathologyCategoryMasterSave", param);
    }

    public updatePathologyCategoryMaster(param) {
        return this._httpClient.post("PathologyMaster/PathologyCategoryMasterUpdate",param);
    }
    public deactivateTheStatus(m_data) {
        return this._httpClient.post("Generic/ExecByQueryStatement?query=" + m_data,{});
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
