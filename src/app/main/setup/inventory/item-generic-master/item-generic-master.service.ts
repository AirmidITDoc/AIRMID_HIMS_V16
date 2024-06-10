import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ItemGenericMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createItemgenericForm();
        this.myformSearch = this.createSearchForm();
    }

    createItemgenericForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ItemGenericNameId: [""],
            ItemGenericName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ItemGenericNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createItemgenericForm();
    }

    public getitemgenericMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_Item_Generic_ByName",
            param
        );
    }

    public insertItemGenericMaster(param) {
        return this._httpClient.post("Inventory/ItemGenericSave", param);
    }

    public updateItemGenericMaster(param) {
        return this._httpClient.post("Inventory/ItemGenericUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
