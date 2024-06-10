import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class GenericmasterService {
    myForm: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myForm = this.createGenericForm();
        this.myformSearch = this.createSearchForm();
    }

    createGenericForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GenericId: [""],
            GenericName: [""],

            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GenericNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createGenericForm();
    }

    public getGenericMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_GenericMaster",
            param
        );
    }

    public insertGenericMaster(param) {
        return this._httpClient.post("Prescription/GenericSave", param);
    }

    public updateGenericMaster(param) {
        return this._httpClient.post("Prescription/GenericUpdate", param);
    }

    populateForm(param) {
        this.myForm.patchValue(param);
    }
}
