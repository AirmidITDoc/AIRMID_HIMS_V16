import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class BedMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createBedForm();
        this.myformSearch = this.createSearchForm();
    }

    createBedForm(): UntypedFormGroup {
        return this._formBuilder.group({
            BedId: [""],
            BedName: [""],
            RoomId: [""],
            RoomName: [""],
            IsAvailable: ["1"],
            IsActive: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            BedNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createBedForm();
    }

    public getbedMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_BedMasterList_1",
            param
        );
    }

    public getWardMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_RoomMasterForCombo",
            {}
        );
    }

    public bedMasterInsert(param) {
        return this._httpClient.post("DepartMentMaster/BedSave", param);
    }

    public bedMasterUpdate(param) {
        return this._httpClient.post("DepartMentMaster/BedUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
