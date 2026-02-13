import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  header: string;
  field?: string;
  format?: 'text' | 'currency' | 'date' | 'number';
  currencyCode?: string;
  locale?: string;
  digitsInfo?: string;
  value?: (row: any) => any;
  cellClass?: (row: any) => string;
}

@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginated-table.component.html',
  styleUrl: './paginated-table.component.css'
})
export class PaginatedTableComponent implements OnChanges, OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() rows: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize: number = 10;
  @Input() externalPage?: number;
  @Input() externalTotalPages?: number;
  @Output() close = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  page = signal<number>(0);
  private rowsSig = signal<any[]>([]);
  ngOnInit(): void {
    this.rowsSig.set(this.rows ?? []);
  }
  ngOnChanges(): void {
    this.rowsSig.set(this.rows ?? []);
  }
  totalPages = computed<number>(() => Math.max(1, Math.ceil((this.rowsSig()?.length ?? 0) / this.pageSize)));
  displayedRows = computed<any[]>(() => {
    const start = this.page() * this.pageSize;
    const all = this.rowsSig() ?? [];
    return all.slice(start, start + this.pageSize);
  });

  effectivePage(): number {
    return this.externalPage ?? this.page();
  }
  effectiveTotalPages(): number {
    return this.externalTotalPages ?? this.totalPages();
  }

  closeClick() {
    console.log(`this.displayedRows()===`, this.displayedRows());
    this.page.set(0);
    this.close.emit();
  }
  nextPageListaContasTotal() {
    const p = this.effectivePage();
    const tp = this.effectiveTotalPages();
    if (p < tp - 1) {
      if (this.externalPage !== undefined) {
        this.pageChange.emit(p + 1);
      } else {
        this.page.set(p + 1);
      }
    }
  }
  prevPage() {
    const p = this.effectivePage();
    if (p > 0) {
      if (this.externalPage !== undefined) {
        this.pageChange.emit(p - 1);
      } else {
        this.page.set(p - 1);
      }
    }
  }

  getValue(row: any, col: TableColumn): any {
    if (col.value) return col.value(row);
    if (!col.field) return '';
    if (col.field.includes('.')) {
      return col.field.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), row);
    }
    return row[col.field];
  }

  trackCol = (_: number, col: TableColumn) => col.header;
  trackRow = (index: number, row: any) => row?.id ?? row?.numero ?? index;
}
