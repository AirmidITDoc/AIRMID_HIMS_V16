import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable()
export class GenderMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createGenderForm();
        this.myformSearch = this.createSearchForm();
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GenderNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    createGenderForm(): UntypedFormGroup {
        return this._formBuilder.group({
            GenderId: [""],
            GenderName: [""],
            IsDeleted: [""],
        });
    }

    initializeFormGroup() {
        this.createGenderForm();
    }

    public getGenderMasterList(param) {
        return this._httpClient.post("Generic/GetByProc?procName=Rtrv_DB_GenderMaster",param
        );
    }

    public genderMasterInsert(Param) {
        return this._httpClient.post("PersonalDetails/GenderSave", Param);
    }

    public genderMasterUpdate(Param) {
        return this._httpClient.post("PersonalDetails/GenderUpdate", Param);
    }

    populateForm(Param) {
        this.myform.patchValue(Param);
    }
}
