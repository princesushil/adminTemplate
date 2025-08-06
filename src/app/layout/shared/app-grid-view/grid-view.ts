import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.html',
  styleUrls: ['./grid-view.scss'],
  imports: [CommonModule, RouterModule,FormsModule],
  standalone: true
})
export class AppGridView implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Output() editRow = new EventEmitter<any>();

  pageSize = 10;
  currentPage = 0;
  pagedData: any[] = [];
  pageCount = 0;
  pageNumbers: number[] = [];
  searchTerm: string = '';
  filteredData: any[] = [];
  paginationGroupStart = 0;
  pagesPerGroup = 10;

  ngOnInit(): void {this.filteredData = this.data;this.updatePagination(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.currentPage = 0;
      this.paginationGroupStart = 0;
      this.updatePagination();
    }
  }

 updatePagination(): void {
  this.pageCount = Math.ceil(this.filteredData.length / this.pageSize);
  this.pageNumbers = Array.from({ length: this.pageCount }, (_, i) => i);
  this.pagedData = this.filteredData.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
}
  goToPage(index: number): void {
    this.currentPage = index;
    const group = Math.floor(index / this.pagesPerGroup);
    this.paginationGroupStart = group * this.pagesPerGroup;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.pageCount) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToNextGroup(): void {
    const nextStart = this.paginationGroupStart + this.pagesPerGroup;
    if (nextStart < this.pageCount) {
      this.paginationGroupStart = nextStart;
      this.goToPage(nextStart);
    }
  }

  goToPreviousGroup(): void {
    const prevStart = this.paginationGroupStart - this.pagesPerGroup;
    if (prevStart >= 0) {
      this.paginationGroupStart = prevStart;
      this.goToPage(prevStart);
    }
  }
  onSearchChange(): void {
    const lowerSearch = this.searchTerm.toLowerCase();
    this.filteredData = this.data.filter(item =>
      this.columns.some(col => (item[col.key] || '').toString().toLowerCase().includes(lowerSearch))
    );
    this.currentPage = 0;
    this.updatePagination();
  }
  onEdit(row: any): void {
    this.editRow.emit(row);
  }
}
