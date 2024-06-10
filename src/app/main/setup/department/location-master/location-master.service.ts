import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class LocationMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createLocationForm();
        this.myformSearch = this.createSearchForm();
    }

    createLocationForm(): UntypedFormGroup {
        return this._formBuilder.group({
            LocationId: [""],
            LocationName: [""],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            LocationNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createLocationForm();
    }

    public getLocationMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_LocationMaster",
            param
        );
    }

    public locationMasterInsert(param) {
        return this._httpClient.post("DepartMentMaster/LocationSave", param);
    }

    public locationMasterUpdate(param) {
        return this._httpClient.post("DepartMentMaster/LocationtUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
