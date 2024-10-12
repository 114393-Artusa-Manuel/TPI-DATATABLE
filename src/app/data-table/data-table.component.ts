import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ServicesService } from '../Apiservice/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" matSort>
        <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column}} </th>
          <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ServicesService) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.apiService.getData().subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          this.displayedColumns = Object.keys(data[0]);
          this.dataSource.data = data;
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
}