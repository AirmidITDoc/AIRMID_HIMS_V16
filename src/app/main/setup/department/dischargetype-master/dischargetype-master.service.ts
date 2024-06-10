import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DischargetypeMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createDischargetypeForm();
        this.myformSearch = this.createSearchForm();
    }

    createDischargetypeForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DischargeTypeId: [""],
            DischargeTypeName: [""],
            IsDeleted: ["true"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            AddedByName: [""],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DischargeTypeNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createDischargetypeForm();
    }

    //get dischargetype Master list
    public getdischargetypeMasterList(m_data) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=M_Rtrv_DischargeTypeMaster",
            m_data
        );
    }

    // Deactive the status
    public deactivateTheStatus(m_data) {
        return this._httpClient.post(
            "Generic/ExecByQueryStatement?query=" + m_data,
            {}
        );
    }

    public dischargeTypeMasterInsert(param) {
        return this._httpClient.post(
            "DepartMentMaster/DischargeTypeMasterSave",
            param
        );
    }

    public dischargeTypeMasterUpdate(param) {
        return this._httpClient.post(
            "DepartMentMaster/DischargeTypeMasterUpdate",
            param
        );
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
