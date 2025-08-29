import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridViewConfig, GridViewResult } from '../../../models/GridViewConfig.model';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../services/local-storage-service';
import { AuthService } from '../../../cores/services/authService';
import { GridViewService } from '../../../services/grid-view-service';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { CommonService } from '../../../services/common-service';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  templateUrl: './grid-view.html',
  styleUrls: ['./grid-view.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule 
  ],
})
export class AppGridView implements OnInit {
  constructor(private _changeDetectorRef: ChangeDetectorRef,private _commonService:CommonService, private spinner: NgxSpinnerService, private _gridViewService: GridViewService, private _authService: AuthService, private _localStorageService: LocalStorageService) { }
  @Input() data: any[] = [];
  @Input('config')
  public gridViewConfig!: GridViewConfig;
  @Output()
  public editClickEvent: EventEmitter<GridViewResult> = new EventEmitter<GridViewResult>();
  public printDocumentClickEvent: EventEmitter<GridViewResult> = new EventEmitter<GridViewResult>();
  @Output()
  searchTerm: string = '';
  filteredData: any[] = [];
  pagedData: any[] = [];
  private lastScrollLeft = 0;
  pageSize = 10;
  currentPage = 0;
  pageCount = 0;
  pageNumbers: number[] = [];

  paginationGroupStart = 0;
  pagesPerGroup = 10;
  tableOffset: number = 0;
  serverSidePaginationCallBack(offset:number) {
    this.tableOffset = offset;
    this.gridViewConfig.pageNumber = offset+1
     this.currentPage =offset
    this.bindDataGrid()
  }
  private storeScrollPosition() {
    const bodyEl = document.querySelector('.datatable-body') as HTMLElement;
    if (bodyEl && this.gridViewConfig.gridViewData?.length > 0) {
      this.lastScrollLeft = bodyEl.scrollLeft;
    }
  }
  private restoreScrollPosition() {
    const bodyEl = document.querySelector('.datatable-body') as HTMLElement;
    if (bodyEl && this.lastScrollLeft != null && this.gridViewConfig.gridViewData?.length > 0) {
      bodyEl.scrollLeft = this.lastScrollLeft;
    }
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filteredData = [...this.data];
      this.currentPage = 0;
      this.paginationGroupStart = 0;
    }
  }
  
  public bindDataGrid(pageNumber: number=1) { 
    this.spinner.show()
    this.getGridData().then((response: HttpResponse<any[]>) => {
      if (response && response.body?.length > 0) {
        this.spinner.hide(); 
        this.gridViewConfig.gridViewData = response.body;
        this.gridViewConfig.totalRecordCount = response.body[0].totalRecords;
        this.updatePagination()
        this._changeDetectorRef.detectChanges(); 

      }
      else {
        this.gridViewConfig.gridViewData = [];
        this.gridViewConfig.totalRecordCount = 0;
      }
      this._changeDetectorRef.detectChanges();
      this.restoreScrollPosition(); // Restore after render
      this.spinner.hide();
    });
  }
  onSearchChange(event, fieldName) {
    this.storeScrollPosition();
    if (!this.gridViewConfig.searchProperties || typeof this.gridViewConfig.searchProperties !== 'object' || Array.isArray(this.gridViewConfig.searchProperties)) {
      this.gridViewConfig.searchProperties = {};
    }
    this.gridViewConfig.searchProperties[fieldName] = event.target.value;

    this.bindDataGrid(1);
    setTimeout(() => {
      this.restoreScrollPosition();
    });
  }
  getGridData() {
    this.gridViewConfig.financialYear = this._localStorageService.getFinancialYear();
    this.gridViewConfig.createdBy = this._authService?.currentUser?.employeeCode ?? "";
    return this._gridViewService.getGridData(this.gridViewConfig).toPromise();
  }


  onSort(data: any) {
    if (data.sorts != null && data.sorts != undefined && data.sorts.length > 0) {
      this.gridViewConfig.sortDirection = data.sorts[0].dir;
      this.gridViewConfig.sortProperty = data.sorts[0].prop;
      this.gridViewConfig.pageNumber = 1;
      this.tableOffset = 0;
      this.bindDataGrid();
    }
  }

  onFilterting() {
    if (this.gridViewConfig.searchText == "") {
      this.gridViewConfig.searchText = "";
      this.gridViewConfig.pageNumber = 1;
      this.tableOffset = 0;
      this.bindDataGrid();
    }
  }
  
  gridViewEditEvent(rowData: GridViewResult, $event) {
    $event.target.closest('datatable-body-cell')?.blur();
    this.editClickEvent.emit(rowData);
  }
   printDocument(rowData: GridViewResult) {
    this.printDocumentClickEvent.emit(rowData);
  }
    getFieldPropertyMapping() {
    return this.gridViewConfig.columnConfig.reduce((acc, cur) => ({ ...acc, [cur.fieldProperty]: cur.fieldName }), {});
  }
    exportToExcel() {
    this.spinner.show();
    this.gridViewConfig.rowsPerPage = this.gridViewConfig.gridViewData[0].totalRecords;
    this.gridViewConfig.pageNumber = 1;
    this.getGridData().then((response: HttpResponse<any[]>) => { 

      var rowData = [];
      for (let index = 0; index < response.body.length; index++) { 
        let row = {};
        row = this.getFieldPropertyMapping();
        for (let jIndex = 0; jIndex < this.gridViewConfig.columnConfig.length; jIndex++) {
          let column = this.gridViewConfig.columnConfig[jIndex].fieldProperty
          row[column] = response.body[index][column] == undefined || response.body[index][column] == null ? "" : response.body[index][column];
        }
        rowData.push(row);
      }
      //console.log(rowData);

      var reportModel = <any>{};
      reportModel.reportColumns = this.getFieldPropertyMapping();
      reportModel.ReportData = rowData;

      this._gridViewService.generateExcel(reportModel, this.gridViewConfig.requestType).subscribe((response: Blob) => {
        this._commonService.exportToExcel(response, this.gridViewConfig.documentType);
        this.spinner.hide();
        this.gridViewConfig.pageNumber = 1;
        this.gridViewConfig.rowsPerPage = this.gridViewConfig.columnConfig[0].rowsPerPage;
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        this.gridViewConfig.pageNumber = 1;
        this.gridViewConfig.rowsPerPage = this.gridViewConfig.gridViewData[0].rowsPerPage;
      });
    });
  }
  
  updatePagination(): void {
    this.pageSize = this.gridViewConfig.rowsPerPage || 10;
    this.pageCount = Math.ceil(this.gridViewConfig.totalRecordCount/ this.pageSize);
    this.pageNumbers = Array.from({ length: this.pageCount }, (_, i) => i);
    this.pagedData = this.gridViewConfig.gridViewData.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
   
  }

  goToPage(index: number): void {
    this.currentPage = index;
    const group = Math.floor(index / this.pagesPerGroup);
    this.paginationGroupStart = group * this.pagesPerGroup;
   this.bindDataGrid(index)
  } 
goToPreviousGroup(): void {
  const prevStart = this.paginationGroupStart - this.pagesPerGroup;
  if (prevStart >= 0) {
    this.paginationGroupStart = prevStart;
    this.goToPage(prevStart);
  }
} 
  goToNextGroup(): void {
    const nextStart = this.paginationGroupStart + this.pagesPerGroup;
    if (nextStart < this.pageCount) {
      this.paginationGroupStart = nextStart;
      this.goToPage(nextStart);
    }
  } 

  
}