import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class InstructionmasterService {
    myForm: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myForm = this.createInstructionForm();
        this.myformSearch = this.createSearchForm();
    }

    createInstructionForm(): UntypedFormGroup {
        return this._formBuilder.group({
            InstructionId: [""],
            InstructionName: [""],

            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            InstructionNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createInstructionForm();
    }

    public getInstructionMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_PrescriptionInstructionMaster",
            param
        );
    }

    public insertInstructionMaster(param) {
        return this._httpClient.post("Prescription/InstructionSave", param);
    }

    public updateInstructionMaster(param) {
        return this._httpClient.post("Prescription/InstructionUpdate", param);
    }

    populateForm(param) {
        this.myForm.patchValue(param);
    }
}
