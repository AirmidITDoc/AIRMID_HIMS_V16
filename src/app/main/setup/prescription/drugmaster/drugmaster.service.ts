import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DrugmasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createDrugForm();
        this.myformSearch = this.createSearchForm();
    }

    createDrugForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DrugId: [""],
            DrugName: [""],
            GenericId: [""],
            GenericName: [""],
            ClassId: [""],
            ClassName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DrugNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createDrugForm();
    }

    public getDrugMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=M_RetrieveDrugList",
            param
        );
    }

    // Generic Master Combobox List
    public getGenericMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveGenericMasterForCombo",
            {}
        );
    }

    // Class Master Combobox List
    public getClassMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveClassMasterForCombo",
            {}
        );
    }

    public insertDrugMaster(param) {
        return this._httpClient.post("Prescription/DrugSave", param);
    }

    public updateDrugMaster(param) {
        return this._httpClient.post("Prescription/DrugUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
