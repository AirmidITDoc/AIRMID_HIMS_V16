import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class WardMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createWardForm();
        this.myformSearch = this.createSearchForm();
    }

    createWardForm(): UntypedFormGroup {
        return this._formBuilder.group({
            RoomId: [""],
            RoomName: [""],
            LocationId: [""],
            LocationName: [""],
            ClassId: [""],
            ClassName: [""],
            RoomType: ["1"],
            IsAvailable: ["1"],
            IsDeleted: ["false"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
        });
    }
    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            RoomNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    initializeFormGroup() {
        this.createWardForm();
    }

    public getwardMasterList(param) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_lvwWardDetails",
            param
        );
    }

    public getLocationMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveLocationMasterForCombo",
            {}
        );
    }

    public getClassMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveClassMasterForCombo",
            {}
        );
    }

    public wardMasterInsert(param) {
        return this._httpClient.post("DepartMentMaster/WardSave", param);
    }

    public wardMasterUpdate(param) {
        return this._httpClient.post("DepartMentMaster/WardUpdate", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
