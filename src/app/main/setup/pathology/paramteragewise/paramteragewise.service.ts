import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ParamteragewiseService {
    myform: UntypedFormGroup;
    myformSearch: UntypedFormGroup;
    myIsNumericform:UntypedFormGroup;
    myIsDescriptiveform:UntypedFormGroup;
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.myformSearch = this.createSearchForm();
        this.myform = this.createParameterForm();
        this.myIsNumericform = this.createNumericForm();
        this.myIsDescriptiveform = this.createDescriptiveForm();
    }

    createParameterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ParameterID: [""],
            ParameterName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
                ],
            ],
            ParameterShortName: [
                "",
                [Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")],
            ],
            PrintParameterName: [
                "",
                [Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")],
            ],
            UnitId: [""],
            UnitName: [""],
            IsNumeric: [""],
            IsDeleted: ["true"],
            AddedBy: ["0"],
            UpdatedBy: ["0"],
            IsPrintDisSummary: ["false"],
            MethodName: ["", Validators.pattern("[a-zA-Z]+$")],
            ParaMultipleRange: [""],
            PathparaRangeId: [""],
            ParaId: [""],
            SexId: [""],
            IsDescriptive: [""],
            parameterValues: ["", [Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")]],
            IsDefaultValue: [""],

        });
    }

    createSearchForm(): UntypedFormGroup {
        return this._formBuilder.group({
            ParameterNameSearch: [""],
            IsDeletedSearch: ["2"],
        });
    }
    createNumericForm(){
        return this._formBuilder.group({
            SexID:[""],
            MinAge:[""],
            MaxAge: [""],
            MinValue: [""],
            Maxvalue: [""],
            AgeTypeId:[""],
        });  
    }
    createDescriptiveForm(): UntypedFormGroup {
        return this._formBuilder.group({
            Value:[""],
            DefaultValue: ["", [Validators.pattern("^[A-Za-z]*[a-zA-Z]*$")]],
        });
    }

    initializeFormGroup() {
        this.createParameterForm();
    }

    //parameter detail
    public getParameterMasterList(m_data) { 
        return this._httpClient.post("Generic/GetByProc?procName=Rtrv_PathParameterMaster_by_Name",
            m_data);
    }
     // Unit Master Combobox List
     public getUnitMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_UnitMasterForCombo",{});
    }
     // Gender Master Combobox List
     public getGenderMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=RetrieveGenderMasterForCombo",{}
        );
    }
    // AgeType Master Combobox List
    public getAgeTypeList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrieve_AgeTypeMasterForCombo",{}
        );
    }
   //Descriptive
    public getDescriptiveMasterList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Retrive_DescriptiveParameterMaster",
            { ParameterName: "%" }
           // Rtrv_PathParameterDescriptiveMaster_by_Name
        );
    }
    //Numeric
    public getNumericMasterList() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_PathParameterRangeWithAge",
            { ParameterName: "%" }
        );
    }

    public deactivateTheStatus(m_data) {
        return this._httpClient.post(
            "Generic/ExecByQueryStatement?query=" + m_data, {});
    }



   

    public insertParameterMasterAgeWise(param) { 
        return this._httpClient.post("PathologyMaster/ParameterAgeWiseMasterSave", param);
    }

    public updateParameterMasterAgeWise(param) {
        return this._httpClient.post("PathologyMaster/ParameterAgeWiseMasterUpdate", param);
    }


    public deleteAssignParameterToRange(param) {
        return this._httpClient.post("Pathology/ParameterUpdate", param);
    }

   

    public InsertParameterRangeMaster(param) {
        return this._httpClient.post("ParameterAgeWiseMasterSave", param);
    }

    public getParameterMasterCombo() {
        return this._httpClient.post(
            "Generic/GetByProc?procName=Rtrv_PathParameterList_by_Name",
            {}
        );
    }

    public deleteAssignParameterToDescriptive(param) {
        return this._httpClient.post("Pathology/ParameterUpdate", param);
    }

    public insertDescriptiveMaster(param) {
        return this._httpClient.post("Pathology/DescriptiveSave", param);
    }

    populateForm(param) {
        this.myform.patchValue(param);
    }
}
