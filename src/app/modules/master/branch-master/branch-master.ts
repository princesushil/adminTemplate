

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GridViewConfig } from '../../../models/GridViewConfig.model';
import { CommonService } from '../../../services/common-service';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage-service';
import { AppGridView } from '../../../layout/shared/app-grid-view/grid-view';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchMasterService } from '../services/branch-master-service';
import { SpinnerService } from '../../../services/spinner-service';
@Component({
  selector: 'app-branch-master',
  templateUrl: './branch-master.html',
  styleUrls: ['./branch-master.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None

})
export class BranchMaster implements OnInit {
  @ViewChild('appGridView') gridView!: AppGridView;
  branchForm!: FormGroup;
  isSubmitted = false
  showViewList: boolean = false;
  ngUnsubscribe = new Subject();
  rowId: any;
  isForUpdate: boolean;
  constructor(private fb: FormBuilder, private spinner: SpinnerService, private _branchMasterService: BranchMasterService, private _localStorageService: LocalStorageService, private _commonService: CommonService, private toastr: ToastrService) { }
  states = [
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },

  ];
  branchColumns = [
    {
      "fieldName": "Role",
      "fieldProperty": "role",
      "columnWidth": "150",
      "requestUrl": "https://etranscargo.in/master/api/userRoleAssignMaster/paging",
      "rowsPerPage": 10,
      "documentType": "userRoleAssignMaster",
      "requestType": "Master"
    },
    {
      "fieldName": "EmployeeCode",
      "fieldProperty": "employeeCode",
      "columnWidth": "150",
      "requestUrl": "https://etranscargo.in/master/api/userRoleAssignMaster/paging",
      "rowsPerPage": 10,
      "documentType": "userRoleAssignMaster",
      "requestType": "Master"
    },
    {
      "fieldName": "User Name",
      "fieldProperty": "userName",
      "columnWidth": "150",
      "requestUrl": "https://etranscargo.in/master/api/userRoleAssignMaster/paging",
      "rowsPerPage": 10,
      "documentType": "userRoleAssignMaster",
      "requestType": "Master"
    },
    {
      "fieldName": "Status",
      "fieldProperty": "isActive",
      "columnWidth": "150",
      "requestUrl": "https://etranscargo.in/master/api/userRoleAssignMaster/paging",
      "rowsPerPage": 10,
      "documentType": "userRoleAssignMaster",
      "requestType": "Master"
    },
    {
      "fieldName": "Created By",
      "fieldProperty": "createdBy",
      "columnWidth": "150",
      "requestUrl": "https://etranscargo.in/master/api/userRoleAssignMaster/paging",
      "rowsPerPage": 10,
      "documentType": "userRoleAssignMaster",
      "requestType": "Master"
    }

  ];

  branchData = [
    {
      "role": "BRANCH ACCOUNT USER",
      "employeeCode": "ACPL1119",
      "userName": "MARUTI ANANDRAO CHAVAN",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41210,
      "createdBy": "AVADOOT NIVRUTTI NIKAM",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "VOUCHER ENTRY UPDATE",
      "employeeCode": "ACPL700",
      "userName": "AKSHAY PRAKASH NIKAM",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41205,
      "createdBy": "PRIYA PRAMOD BHOSALE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "OPERATION USER",
      "employeeCode": "ACPL4800",
      "userName": "AKSHAY ARUN PATIL",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41204,
      "createdBy": "AVADOOT NIVRUTTI NIKAM",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "HUB INCHARGE",
      "employeeCode": "ACPL4800",
      "userName": "AKSHAY ARUN PATIL",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41203,
      "createdBy": "AVADOOT NIVRUTTI NIKAM",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "DCS SUMMARY",
      "employeeCode": "ACPL2563",
      "userName": "PRIYANKA BHAVIN BAMANE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41202,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "OPERATION USER",
      "employeeCode": "ACPL5198",
      "userName": "SHUBHAM   MALODE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41200,
      "createdBy": "SHIVENDRAJEET AJIT SORTE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "BRANCH ACCOUNT USER",
      "employeeCode": "ACPLF25505",
      "userName": "SAGAR BABAN SHIVTHARE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41199,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "BOOKING USER",
      "employeeCode": "ATRN586",
      "userName": "ANAND P LAD",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41198,
      "createdBy": "Baneshwar Shivaji Nikam",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "VOUCHERCASEFORCONTRAVOUCHER",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41197,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "Case For OtherPurchase",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41196,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },

    {
      "role": "BOOKING USER",
      "employeeCode": "ATRN586",
      "userName": "ANAND P LAD",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41198,
      "createdBy": "Baneshwar Shivaji Nikam",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "VOUCHERCASEFORCONTRAVOUCHER",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41197,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "Case For OtherPurchase",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41196,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },

    {
      "role": "BOOKING USER",
      "employeeCode": "ATRN586",
      "userName": "ANAND P LAD",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41198,
      "createdBy": "Baneshwar Shivaji Nikam",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "VOUCHERCASEFORCONTRAVOUCHER",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41197,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    },
    {
      "role": "Case For OtherPurchase",
      "employeeCode": "ATRN718",
      "userName": "TEJAS  BHOSALE",
      "isActive": "Active",
      "roleId": 0,
      "userId": 0,
      "totalRecords": 17969,
      "id": 41196,
      "createdBy": "AVINASH BALASAHEB NALAWADE",
      "createdOn": "06/08/2025",
      "modifiedBy": null,
      "modifiedOn": "0001-01-01T00:00:00",
      "isObsolete": false
    }
  ]
  public gridViewConfig: GridViewConfig = new GridViewConfig();

  loadData = async (params: any) => {
    return {
      data: this.branchData,
      total: this.branchData.length
    };
  };

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      state: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      date: [],
      isChecked: [],
      isPdf: [],
      isActive: ['active']
    });
  }
  onActionClick(rowData: any) {
    this.rowId = rowData.id;
    this._branchMasterService
      .getBranchById(this.rowId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((Response: any) => {
        const branchIdNumber: number = parseInt(Response.branchId, 10);
        this.isForUpdate = true;

      });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  handleEdit(row: any) {
    console.log('Edit row:', row);
  }
  onDeleteBranch(branch: any) {
    this.branchData = this.branchData.filter(item => item !== branch);
  }
  toggleViewList() {
    this.showViewList = !this.showViewList;
    if (this.showViewList) {
      this.spinner.show();
      this.getColumnConfigByType()
    }
  }

  getColumnConfigByType() {
    this._commonService.getOperationColumnConfigByType('VendorMaster').pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.gridViewConfig.requestUrl = response[0].requestUrl;
      this.gridViewConfig.rowsPerPage = response[0].rowsPerPage;
      this.gridViewConfig.documentType = response[0].documentType;
      this.gridViewConfig.requestType = response[0].requestType;
      this.gridViewConfig.columnConfig = response;
      this.gridViewConfig.loginBranchId = +(this._localStorageService.getLoggedInBranch() ?? "0");
      this.gridView?.bindDataGrid();
      this.spinner.hide()
    });
  }

  onSubmit(): void {
    this.isSubmitted = true
    this.toastr.success('Data saved successfully!', 'Success');
    if (this.branchForm.valid) {
      const formData = this.branchForm.value;
      console.log('Form Submitted:', formData);
      // TODO: Send data to API or service
    } else {
      this.branchForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.branchForm.reset();
    this.toastr.error('Error while processing request!', 'Error');
  }
  handleRowClick(event: any) {

  }
}
