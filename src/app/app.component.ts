import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableComponent } from './data-table/data-table.component';
import { ServicesService } from './Apiservice/services.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    DataTableComponent
  ],
  providers: [ServicesService],
  template: `
    <h1>Mi Aplicación con DataTable</h1>
    <app-data-table></app-data-table>
  `
})
export class AppComponent { }