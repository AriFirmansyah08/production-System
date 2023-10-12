import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { WeklyReportComponent } from './wekly-report/wekly-report.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import { DailyHistoryComponent } from './daily-history/daily-history.component';

const routes: Routes = [
  {
    path:'daily',
    component: DailyReportComponent,
  },
  {
    path:'wekly',
    component: WeklyReportComponent,
  },
  {
    path:'montly',
    component: MontlyReportComponent,
  },
  {
    path:'daily/history',
    component: DailyHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
