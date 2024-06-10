import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ItemClassMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createItemclassForm();
        this.myformSearch = this.createSearchForm();
    }

    createItemclassForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ItemClassId: [""],
            ItemClassName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ItemClassNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createItemclassForm();
    }

    public getitemclassMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_ItemClassMaster_by_Name",
            param
        );
    }

    public insertItemClassMaster(param) {
        return this._httpClient.post("Inventory/ItemClassSave", param);
    }

    public updateItemClassMaster(param) {
        return this._httpClient.post("Inventory/ItemClassUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
