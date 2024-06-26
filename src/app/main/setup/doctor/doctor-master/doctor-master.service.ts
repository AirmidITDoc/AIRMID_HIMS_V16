import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class DoctorMasterService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;

    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myform = this.createdDoctormasterForm();
        this.myformSearch = this.createSearchForm();
    }

    createdDoctormasterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DoctorId: [""],
            PrefixID: ["", Validators.required],
            PrefixName: [""],
            FirstName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
                ],
            ],
            MiddleName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
                ],
            ],
            LastName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
                ],
            ],
            DateofBirth: [{ value: new Date() }],
            Address: [""],
            City: ["", Validators.pattern("[a-zA-Z]+$")],
            Pin: ["", [Validators.minLength(6), Validators.maxLength(6)]],
            Phone: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[- +()]*[0-9][- +()0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(15),
                ],
            ],
            Mobile: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            GenderId: ["", Validators.required],
            GenderName: [""],
            Education: ["", Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")],
            IsConsultant: ['1'],
            IsRefDoc: ['1'],
            isActive: ['1'],
            DoctorTypeId: [""],
            DoctorType: [""],
            AgeYear: ["", Validators.pattern("[0-9]+")],
            AgeMonth: ["", Validators.pattern("[0-9]+")],
            AgeDay: ["", Validators.pattern("[0-9]+")],
            // PassportNo: [
            //     "",
            //     Validators.pattern(
            //         "^[A-PR-WYa-pr-wy][1-9]\\d" + "\\s?\\d{4}[1-9]$"
            //     ),
            // ],
            PassportNo: [""],
            ESINO: [""],
            RegNo: [""],
            RegDate: [{ value: new Date() }],
            MahRegNo: [""],
            MahRegDate: [{ value: new Date() }],
            RefDocHospitalName: [
                "",
                Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
            ],
            Departmentid: [""],
            DepartmentName: [""],
            AddedBy: [""],
            UpdatedBy: [""],
            AddedByName: [""],
        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            DoctorNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }

    initializeFormGroup() {
        this.createdDoctormasterForm();
    }

    public getDoctorMasterList(m_data) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_DoctorMaster_List_Dtls",
            m_data
        );
    }

    public deactivateTheStatus(m_data) {
        return this._httpClient.post(
            "Generic/ExecByQueryStatement?query=" + m_data,
            {}
        );
    }

    public getDepartmentCombobox() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveDepartmentMasterForCombo",
            {}
        );
    }

    public getGenderCombo(Id) {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_SexMasterForCombo_Conditional",
            { Id: Id }
        );
    }

    public getPrefixMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrievePrefixMasterForCombo",
            {}
        );
    }

    public getGenderMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveGenderMasterForCombo",
            {}
        );
    }

    public getDoctortypeMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveDoctorTypeMasterForCombo",
            {}
        );
    }

    public doctortMasterInsert(param) {
        return this._httpClient.post("DoctorMaster/DoctorSave", param);
    }

    public doctortMasterUpdate(param) {
        return this._httpClient.post("DoctorMaster/DoctorUpdate", param);
    }

    public assignDoctorDepartmentDet(param) {
        return this._httpClient.post("DoctorMaster/DoctorSave", param);
    }

    public deleteAssignSupplierToStore(param) {
        return this._httpClient.post("DoctorMaster/DoctorUpdate", param);
    }

    public getDocDeptwiseList(emp){
        return this._httpClient.post(
           "Generic/GetByProc?procName=Rtrv_M_DoctorDepartmentDet",
          emp
       );
   }


    populateForm(param) {
        this.myform.patchValue(param);
    }
}
