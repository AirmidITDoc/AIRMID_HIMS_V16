import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DosemasterService {
    myForm: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myForm = this.createDoseForm();
        this.myformSearch = this.createSearchForm();
    }

    createDoseForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DoseId: [""],
            DoseName: [""],
            DoseNameInEnglish: [""],

            DoseQtyPerDay: [""],

            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DoseNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createDoseForm();
    }

    public getDoseMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_DoseMaster",
            param
        );
    }

    public insertDoseMaster(param) {
        return this._httpClient.post("Prescription/DoseSave", param);
    }

    public updateDoseMaster(param) {
        return this._httpClient.post("Prescription/DoseUpdate", param);
    }

    populateForm(param) {
        this.myForm.patchValue(param);
    }
}
