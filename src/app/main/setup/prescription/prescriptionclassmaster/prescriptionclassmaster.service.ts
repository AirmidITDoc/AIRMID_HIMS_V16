import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class PrescriptionclassmasterService {
    myForm: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myForm = this.createPrescriptionclassForm();
        this.myformSearch = this.createSearchForm();
    }

    createPrescriptionclassForm(): UntypedFormGroup {
        return this._formBuilder.group({
            TemplateId: [""],
            TemplateName: [""],
            TemplateDesc: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
          TemplateNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createPrescriptionclassForm();
    }

    public getPrescriptionclassMasterList(Param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_M_Prescription_TemplateMaster_By_Name",Param
        );
    }

    public prescriptionTemplateMasterInsert(param) {
        return this._httpClient.post(
            "Prescription/PrescriptionTemplateMasterSave",
            param
        );
    }

    public prescriptionTemplateMasterUpdate(param) {
        return this._httpClient.post(
            "Prescription/PrescriptionTemplateMasterUpdate",
            param
        );
    }

    populateForm(param) {
        this.myForm.patchValue(param);
    }
}
