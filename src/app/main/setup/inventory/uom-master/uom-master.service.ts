import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class UomMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createUnitofmeasurementForm();
        this.myformSearch = this.createSearchForm();
    }

    createUnitofmeasurementForm(): UntypedFormGroup {
        return this._formBuilder.group({
            UnitofMeasurementId: [""],
            UnitofMeasurementName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            UnitofMeasurementSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createUnitofmeasurementForm();
    }

    public getUnitofmeasurementMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_UnitofMeasurment_by_Name",
            param
        );
    }

    public insertUnitofMeasurementMaster(param) {
        return this._httpClient.post("Inventory/UnitofMeasurementSave", param);
    }

    public updateUnitofMeasurementMaster(param) {
        return this._httpClient.post(
            "Inventory/UnitofMeasurementUpdate",
            param
        );
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
