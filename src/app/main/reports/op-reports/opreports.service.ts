import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OPReportsService {
  userForm:UntypedFormGroup;
  constructor( public _formBuilder:UntypedFormBuilder,
    public _httpClient:HttpClient) {this.userForm=this.createUserFormGroup()}

    createUserFormGroup(){
      return this._formBuilder.group({
        startdate: [(new Date()).toISOString()],
        enddate: [(new Date()).toISOString()],
        UserId:'',
        DoctorId:'',
        
        VisitId:'',
       PaymentId:'',
        RefundId:'',
        DoctorID:'',
        ServiceId:'',
        GroupId:''
        // Radio:['1']

      })
    }
  public getDataByQuery(emp) {
        return this._httpClient.post("Generic/GetByProc?procName=m_rtrv_ReportList",emp)
  }

  public getUserdetailList(data){
    return this._httpClient.post("Generic/GetByProc?procName=m_Rtrv_loginManagerUserForCombo",data)
  }

  public getDoctorList(){
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveConsultantDoctorMasterForCombo",{})
  }
 
  public getOpPaymentview(PaymentId){
    return this._httpClient.get("OutPatient/view-OP-PaymentReceipt?PaymentId=" + PaymentId);
  }
  public getAppointmentListReport(FromDate,ToDate){
    return this._httpClient.get("OPReport/view-AppointmentListReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getRegisteredPatientCasepaaperView(VisitId){
  
    return this._httpClient.get("OutPatient/view-PatientAppointment?VisitId=" + VisitId);
  }

  public getDocwisevisitsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DoctorWiseVisitCountSummary?FromDate="+FromDate+"&ToDate="+ToDate);
  }
  

  public getRegistrationlistReport(FromDate,ToDate){
    return this._httpClient.get("OPReport/view-RegistrationReport?FromDate="+FromDate+"&ToDate="+ToDate);
  }
  
  public getDoctorwisevisitView(FromDate,ToDate){
    return this._httpClient.get("OPReport/view-DoctorWiseVisitReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getRefDoctorwisevisitView(FromDate,ToDate){
    return this._httpClient.get("OPReport/view-RefDoctorWiseReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getdepartmentwisecountsummView(FromDate,ToDate){
    return this._httpClient.get("OPReport/view-OPDeptwisecountsummaryReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDocwisevisitCountsummaryView(FromDate,ToDate,DoctorID){
    return this._httpClient.get("CommanReport/view-DoctorWisePatientCountReport?FromDate=" + FromDate+"&ToDate="+ToDate+"&DoctorID="+DoctorID);
  }
  
  public getAppointmentlistwithserviceavailedView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-AppoinmentListWithServiseAvailed?FromDate=" + FromDate+"&ToDate="+ToDate);
  }

  
  public getCrossConsultationreportView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-CrossConsultationReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }


  public getDocwisenopdcollsummarytView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DoctorWiseOpdCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }

  public getDeptwiseopdcollsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentWiseOpdCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
 public getDocwisenewoldpatientView(FromDate,ToDate){
return this._httpClient.get("OPReport/view-DoctorWiseNewAndOldPatientReport?FromDate=" + FromDate+"&ToDate="+ToDate);
 }

  // OPD MIS 
  
  public getdaywiseopdcountdetailReport(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DayWiseOpdCountDetails?FromDate=" + FromDate+"&ToDate="+ToDate);
  }


  public getdaywiseopdcountsummaryReport(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DayWiseOpdCountSummry?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDeptwiseopdcountView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentWiseOpdCountSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDeptwiseopdcountsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentWiseOpdCountSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDeptservicegroupcollsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }


  //common
  public getdocwisepatinetcountReport(FromDate,ToDate,DosctorID){
  
    return this._httpClient.get("CommanReport/view-DoctorWisePatientCountReport?FromDate=" + FromDate+"&ToDate="+ToDate+"&DosctorID"+DosctorID);
  }

  
  public getRefdocwisepatientcountReport(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-ReferenceDoctorWisePatientCountReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
 



  public getConcessionreportView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-ConcessionReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getCommonDailycollectionView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDailycollectionView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getDailycollsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-DailyCollectionSummaryReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getgroupwisecollView(FromDate,ToDate,GroupId){
  
    return this._httpClient.get("CommanReport/view-GroupwisecollectionReport?FromDate=" + FromDate+"&ToDate="+ToDate+"&GroupId="+GroupId);
  }
  
  public getgroupwisescollummaryView(FromDate,ToDate,GroupId){
  
    return this._httpClient.get("CommanReport/view-GroupwisecollsummaryReport?FromDate=" + FromDate+"&ToDate="+ToDate,+"&GroupId="+GroupId);
  }
  
  public getgroupwiserevenusummaryView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getCreditreportView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-CreditReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  
  public getPatientledgerView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  
  public getservicewisereportwithoutbillView(FromDate,ToDate,ServiceId){
  
    return this._httpClient.get("CommanReport/view-ServicewisepatientamtReport?FromDate=" + FromDate+"&ToDate="+ToDate+"&ServiceId"+ServiceId);
  }
  
  public getServicewisereportwithbillView(ServiceId,FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-ServicewisereportwithhbillReport?ServiceId="+ServiceId+"&FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getServicewisereportView(FromDate,ToDate,ServiceId){
  
    return this._httpClient.get("CommanReport/view-ServicewisepatientamtReport?FromDate=" + FromDate+"&ToDate="+ToDate+"&ServiceId="+ServiceId);
  }

  public getBillsummarywithtcsView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }

  public getRefbypatientView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-RefByPatientList?FromDate=" + FromDate+"&ToDate="+ToDate);
  }

 
  public getCanclechargesView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-CancleChargeslistReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getDocDeptwisemonthcollectionView(FromDate,ToDate){
  
    return this._httpClient.get("OPReport/view-DepartmentServiceGroupWiseCollectionSummary?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getIpcompanywisebillView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-IPCompanyWiseBillReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getCompanywisecreditbillView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-IPCompanyWiseCreditReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getIdischargebillgenependingView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-IPDischargeBillGenerationPendingReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getIpbillgenepaymentdueView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-IPBillGenerationPaymentDueReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getBillgenefor2lakhamtView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-BillsummaryfortwolakhamtReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getCollectionsummaryView(FromDate,ToDate){
  
    return this._httpClient.get("CommanReport/view-CollectionSummaryReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }
  public getBillgeneforopdipdView(FromDate,ToDate){
  
    return this._httpClient.get("IPReport/view-OPIPBILLSummaryReport?FromDate=" + FromDate+"&ToDate="+ToDate);
  }

  
  }