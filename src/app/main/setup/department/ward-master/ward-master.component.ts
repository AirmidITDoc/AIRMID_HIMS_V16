import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { WardMasterService } from "./ward-master.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-ward-master",
    templateUrl: "./ward-master.component.html",
    styleUrls: ["./ward-master.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class WardMasterComponent implements OnInit {
    WardMasterList: any;
    LocationcmbList: any = [];
    ClasscmbList: any = [];
    msg: any;

    displayedColumns: string[] = [
        "RoomId",
        "RoomName",
        "LocationName",
        "ClassName",

        "IsAvailable",
        "IsDeleted",
        "action",
    ];

    DSWardMasterList = new MatTableDataSource<WardMaster>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    //Class filter
    public classFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredClass: ReplaySubject<any> = new ReplaySubject<any>(1);

    //location filter
    public locationFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredLocation: ReplaySubject<any> = new ReplaySubject<any>(1);

    private _onDestroy = new Subject<void>();

    constructor(public _wardService: WardMasterService,
        public toastr : ToastrService,) {}

    ngOnInit(): void {
        this.getwardMasterList();
        this.getLocationNameCombobox();
        this.getClassNameCombobox();

        this.locationFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterLocation();
            });

        this.classFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterClass();
            });
    }
    onSearch() {
        this.getwardMasterList();
    }

    onSearchClear() {
        this._wardService.myformSearch.reset({
            RoomNameSearch: "",
            IsDeletedSearch: "2",
        });
        this.getwardMasterList();
    }
    private filterLocation() {
        // debugger;
        if (!this.LocationcmbList) {
            return;
        }
        // get the search keyword
        let search = this.locationFilterCtrl.value;
        if (!search) {
            this.filteredLocation.next(this.LocationcmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter
        this.filteredLocation.next(
            this.LocationcmbList.filter(
                (bank) => bank.LocationName.toLowerCase().indexOf(search) > -1
            )
        );
    }

    private filterClass() {
        // debugger;
        if (!this.ClasscmbList) {
            return;
        }
        // get the search keyword
        let search = this.classFilterCtrl.value;
        if (!search) {
            this.filteredClass.next(this.ClasscmbList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter
        this.filteredClass.next(
            this.ClasscmbList.filter(
                (bank) => bank.ClassName.toLowerCase().indexOf(search) > -1
            )
        );
    }

    getwardMasterList() {
        var param = {
            RoomName:this._wardService.myformSearch.get("RoomNameSearch")
                    .value.trim() + "%" || "%",
        };
        this._wardService.getwardMasterList(param).subscribe((Menu) => {
            this.DSWardMasterList.data = Menu as WardMaster[];
            this.DSWardMasterList.sort = this.sort;
            this.DSWardMasterList.paginator = this.paginator;
        });
    }

    getLocationNameCombobox() {
        this._wardService.getLocationMasterCombo().subscribe((data) => {
            this.LocationcmbList = data;
            this.filteredLocation.next(this.LocationcmbList.slice());
            this._wardService.myform
                .get("LocationId")
                .setValue(this.LocationcmbList[0]);
        });
    }

    getClassNameCombobox() {
        this._wardService.getClassMasterCombo().subscribe((data) => {
            this.ClasscmbList = data;
            this.filteredClass.next(this.ClasscmbList.slice());
            this._wardService.myform
                .get("ClassId")
                .setValue(this.ClasscmbList[0]);
        });
    }

    onClear() {
        this._wardService.myform.reset({ IsDeleted: "false" });
        this._wardService.initializeFormGroup();
    }

    onSubmit() {
        if (this._wardService.myform.valid) {
            if (!this._wardService.myform.get("RoomId").value) {
                var m_data = {
                    wardMasterInsert: {
                        roomName_1: this._wardService.myform
                            .get("RoomName")
                            .value.trim(),
                        roomType_2: "1",
                        locationId_3:
                            this._wardService.myform.get("LocationId").value
                                .LocationId,
                        isAvailible_4: Boolean(
                            JSON.parse(
                                this._wardService.myform.get("IsAvailable")
                                    .value
                            )
                        ),
                        //  addedBy: 1,
                        isActive_5: 0,
                        classId:
                            this._wardService.myform.get("ClassId").value
                                .ClassId,
                    },
                };

                this._wardService.wardMasterInsert(m_data).subscribe((data) => {
                    this.msg = data;
                    if (data) {
                        this.toastr.success('Record Saved Successfully.', 'Saved !', {
                            toastClass: 'tostr-tost custom-toast-success',
                          });
                          this.getwardMasterList();
                        // Swal.fire(
                        //     "Saved !",
                        //     "Record saved Successfully !",
                        //     "success"
                        // ).then((result) => {
                        //     if (result.isConfirmed) {
                        //         this.getwardMasterList();
                        //     }
                        // });
                    } else {
                        this.toastr.error('Ward Data not saved !, Please check API error..', 'Error !', {
                            toastClass: 'tostr-tost custom-toast-error',
                          });
                    }
                    this.getwardMasterList();
                },error => {
                    this.toastr.error('Ward Data not saved !, Please check API error..', 'Error !', {
                     toastClass: 'tostr-tost custom-toast-error',
                   });
                 });
            } else {
                var m_dataUpdate = {
                    wardMasterUpdate: {
                        roomId_1: this._wardService.myform.get("RoomId").value,
                        roomName_2: this._wardService.myform
                            .get("RoomName")
                            .value.trim(),
                        roomType_3: "1",
                        locationId_4:
                            this._wardService.myform.get("LocationId").value
                                .LocationId,
                        //    isAvailable: 1,
                        isActive_5: 0,
                        //  updatedBy: 1,
                        classID:
                            this._wardService.myform.get("ClassId").value
                                .ClassId,
                    },
                };
                this._wardService
                    .wardMasterUpdate(m_dataUpdate)
                    .subscribe((data) => {
                        this.msg = data;
                        if (data) {
                            this.toastr.success('Record updated Successfully.', 'updated !', {
                                toastClass: 'tostr-tost custom-toast-success',
                              });
                              this.getwardMasterList();
                            // Swal.fire(
                            //     "Updated !",
                            //     "Record updated Successfully !",
                            //     "success"
                            // ).then((result) => {
                            //     if (result.isConfirmed) {
                            //         this.getwardMasterList();
                            //     }
                            // });
                        } else {
                            this.toastr.error('Ward Master Data not Updated !, Please check API error..', 'Updated !', {
                                toastClass: 'tostr-tost custom-toast-error',
                              });
                        }
                        this.getwardMasterList();
                    },error => {
                        this.toastr.error('Ward Data not Updated !, Please check API error..', 'Error !', {
                         toastClass: 'tostr-tost custom-toast-error',
                       });
                     });
            }
            this.onClear();
        }
    }

    onEdit(row) {
        var m_data = {
            RoomId: row.RoomId,
            RoomName: row.RoomName,
            LocationId: row.LocationId,
            IsAvailable: JSON.stringify(row.IsAvailible),
            ClassId: row.ClassID,
            IsDeleted: JSON.stringify(row.IsActive),
            UpdatedBy: row.UpdatedBy,
        };
        this._wardService.populateForm(m_data);
    }
}
export class WardMaster {
    RoomId: number;
    RoomName: string;
    LocationId: number;
    IsAvailable: boolean;
    IsDeleted: boolean;
    AddedBy: number;
    UpdatedBy: number;
    ClassId: number;
    AddedByName: string;

    /**
     * Constructor
     *
     * @param WardMaster
     */
    constructor(WardMaster) {
        {
            this.RoomId = WardMaster.RoomId || "";
            this.RoomName = WardMaster.RoomName || "";
            this.LocationId = WardMaster.LocationId || "";
            this.IsAvailable = WardMaster.IsAvailable || "false";
            this.IsDeleted = WardMaster.IsDeleted || "false";
            this.AddedBy = WardMaster.AddedBy || "";
            this.UpdatedBy = WardMaster.UpdatedBy || "";
            this.ClassId = WardMaster.ClassId || "";
        }
    }
}
