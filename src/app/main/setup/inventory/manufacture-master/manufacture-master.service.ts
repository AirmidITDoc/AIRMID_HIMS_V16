import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ManufactureMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createManufactureForm();
        this.myformSearch = this.createSearchForm();
    }

    createManufactureForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ManufId: [""],
            ManufName: [""],
            ManufShortName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ManufNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createManufactureForm();
    }

    public getmanufactureMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_Manufacture_by_Name",
            param
        );
    }

    public insertManufactureMaster(param) {
        return this._httpClient.post("Inventory/ManufactureSave", param);
    }

    public updateManufactureMaster(param) {
        return this._httpClient.post("Inventory/ManufactureUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
