import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class CategoryMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createCategoryForm();
        this.myformSearch = this.createSearchForm();
    }

    createCategoryForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CategoryId: [""],
            CategoryName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            CategoryNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createCategoryForm();
    }

    public getCategoryMasterList(emp) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_Radiology_CategoryMaster_by_Name",emp);
    }
    public deactivateTheStatus(m_data) {
        return this._httpClient.post("Generic/ExecByQueryStatement?query=" + m_data,{});
    }

    public insertCategoryMaster(employee) { 
        return this._httpClient.post("RadiologyMaster/CategorySave", employee);
    }

    public updateCategoryMaster(employee) {
        return this._httpClient.post("RadiologyMaster/CategoryUpdate", employee);
    }

    populateForm(employee) {
        this.myform.patchValue(employee);
    }
}
