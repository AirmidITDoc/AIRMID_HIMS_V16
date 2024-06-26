import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DrugmasterService } from "./drugmaster.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-drugmaster",
    templateUrl: "./drugmaster.component.html",
    styleUrls: ["./drugmaster.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DrugmasterComponent implements OnInit {
    DrugMasterList: any;
    GenericmbList: any = [];
    ClassmbList: any = [];
    msg: any;
    sIsLoading: string = '';
    isLoading = true;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    //class filter
    public classFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredClass: ReplaySubject<any> = new ReplaySubject<any>(1);

    //generic filter
    public genericFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredGeneric: ReplaySubject<any> = new ReplaySubject<any>(1);

    private _onDestroy = new Subject<void>();

    displayedColumns: string[] = [
        "DrugId",
        "DrugName",
        "GenericName",
        "ClassName",
        // "AddedByName",
        "IsDeleted",
        "action",
    ];

    DSDrugMasterList = new MatTableDataSource<DrugMaster>();

    constructor(public _drugService: DrugmasterService,
        public toastr : ToastrService,) {}

    ngOnInit(): void {
        this.getDrugMasterList();
        this.getGenericNameCombobox();
        this.getClassNameCombobox();

        this.classFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterClass();
            });

        this.genericFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterGeneric();
            });
    }
    onSearch() {
        this.getDrugMasterList();
    }

    onSearchClear() {
        this._drugService.myformSearch.reset({
            DrugNameSearch: "",
            IsDeletedSearch: "2",
        });
        this.getDrugMasterList();
    }
    private filterClass() {
        if (!this.ClassmbList) {
            return;
        }
        // get the search keyword
        let search = this.classFilterCtrl.value;
        if (!search) {
            this.filteredClass.next(this.ClassmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredClass.next(
            this.ClassmbList.filter(
                (bank) => bank.ClassName.toLowerCase().indexOf(search) > -1
            )
        );
    }

    private filterGeneric() {
        // debugger;
        if (!this.GenericmbList) {
            return;
        }
        // get the search keyword
        let search = this.genericFilterCtrl.value;
        if (!search) {
            this.filteredGeneric.next(this.GenericmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter
        this.filteredGeneric.next(
            this.GenericmbList.filter(
                (bank) => bank.GenericName.toLowerCase().indexOf(search) > -1
            )
        );
    }
    getDrugMasterList() {
        this.sIsLoading = 'loading-data';
        var param = {
            DrugName:this._drugService.myformSearch.get("DrugNameSearch")
                    .value.trim() + "%" || "%",
        };
        this._drugService.getDrugMasterList(param).subscribe((Menu) => {
            this.DSDrugMasterList.data = Menu as DrugMaster[];
            this.DSDrugMasterList.sort = this.sort;
            this.DSDrugMasterList.paginator = this.paginator;
            this.sIsLoading = '';
            console.log(this.DSDrugMasterList);
        },
        error => {
          this.sIsLoading = '';
        });
    }

    getGenericNameCombobox() {
        this._drugService.getGenericMasterCombo().subscribe((data) => {
            this.GenericmbList = data;
            this.filteredGeneric.next(this.GenericmbList.slice());
        });
    }
    getClassNameCombobox() {
        this._drugService.getClassMasterCombo().subscribe((data) => {
            this.ClassmbList = data;
            this.filteredClass.next(this.ClassmbList.slice());
            console.log(this.ClassmbList);
        });
    }
    onClear() {
        this._drugService.myform.reset({ IsDeleted: "false" });
        this._drugService.initializeFormGroup();
    }

    onSubmit() {
        if (this._drugService.myform.valid) {
            if (!this._drugService.myform.get("DrugId").value) {
                var m_data = {
                    insertDrugMaster: {
                        drugName: this._drugService.myform
                            .get("DrugName")
                            .value.trim(),
                        genericId:
                            this._drugService.myform.get("GenericId").value
                                .GenericId,
                        classId:
                            this._drugService.myform.get("ClassId").value
                                .ClassId,
                        isActive: Boolean(
                            JSON.parse(
                                this._drugService.myform.get("IsDeleted").value
                            )
                        ),
                        // addedBy: 1,
                    },
                };

                this._drugService.insertDrugMaster(m_data).subscribe((data) => {
                    this.msg = data;
                    console.log(this.msg);
                    if (data) {
                        this.toastr.success('Record Saved Successfully.', 'Saved !', {
                            toastClass: 'tostr-tost custom-toast-success',
                          });
                        this.getDrugMasterList();
                        // Swal.fire(
                        //     "Saved !",
                        //     "Record saved Successfully !",
                        //     "success"
                        // ).then((result) => {
                        //     if (result.isConfirmed) {
                        //         this.getDrugMasterList();
                        //     }
                        // });
                    } else {
                        this.toastr.error('Drug Master Data not saved !, Please check API error..', 'Error !', {
                            toastClass: 'tostr-tost custom-toast-error',
                          });
                        }
                    this.getDrugMasterList();
                },error => {
                    this.toastr.error('Drug Class Data not saved !, Please check API error..', 'Error !', {
                     toastClass: 'tostr-tost custom-toast-error',
                   });
                 });
            } else {
                var m_dataUpdate = {
                    updateDrugMaster: {
                        drugId: this._drugService.myform.get("DrugId").value,
                        drugName:
                            this._drugService.myform.get("DrugName").value,
                        genericId:
                            this._drugService.myform.get("GenericId").value
                                .GenericId,
                        classId:
                            this._drugService.myform.get("ClassId").value
                                .ClassId,
                        isActive: Boolean(
                            JSON.parse(
                                this._drugService.myform.get("IsDeleted").value
                            )
                        ),
                        //  updatedBy: 1,
                    },
                };
                this._drugService
                    .updateDrugMaster(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            this.toastr.success('Record updated Successfully.', 'updated !', {
                                toastClass: 'tostr-tost custom-toast-success',
                              });
                            this.getDrugMasterList();
                            // Swal.fire(
                            //     "Updated !",
                            //     "Record updated Successfully !",
                            //     "success"
                            // ).then((result) => {
                            //     if (result.isConfirmed) {
                            //         this.getDrugMasterList();
                            //     }
                            // });
                        } else {
                            this.toastr.error('Drug Master Data not updated !, Please check API error..', 'Error !', {
                                toastClass: 'tostr-tost custom-toast-error',
                              });
                        }
                        this.getDrugMasterList();
                    },error => {
                        this.toastr.error('Drug Class Data not updated !, Please check API error..', 'Error !', {
                         toastClass: 'tostr-tost custom-toast-error',
                       });
                     });
            }
            this.onClear();
        }
    }
    onEdit(row) {
        var m_data = {
            DrugId: row.DrugId,
            DrugName: row.DrugName.trim(),
            GenericId: row.GenericId,
            ClassId: row.ClassId,
            IsDeleted: JSON.stringify(row.IsActive),
            UpdatedBy: row.UpdatedBy,
        };
        this._drugService.populateForm(m_data);
    }
}
export class DrugMaster {
    DrugId: number;
    DrugName: string;
    GenericId: number;
    ClassId: string;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param DrugMaster
     */
    constructor(DrugMaster) {
        {
            this.DrugId = DrugMaster.DrugId || "";
            this.DrugName = DrugMaster.DrugName || "";
            this.GenericId = DrugMaster.GenericId || "";
            this.ClassId = DrugMaster.ClassId || "";
            this.IsDeleted = DrugMaster.IsDeleted || "false";
            this.AddedBy = DrugMaster.AddedBy || "";
            this.UpdatedBy = DrugMaster.UpdatedBy || "";
            this.AddedByName = DrugMaster.AddedByName || "";
        }
    }
}
