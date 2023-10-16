import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { DailyReportService } from 'src/app/core/services/daily-report.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  searchTerm: string = ''; 
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  startIndex: number = 1; 
  endIndex: number = 5;
  totalRecords: number = 100; 
  page: number = 1;
  pageSize: number = 5; 

  //fungsi data yang real/ dan di tambahkan
  isConnected: boolean | undefined;
  abnormalData: any;
  DataById: any;
  id:any;
  filteredAbnormalData: any[] = [];
  totalPages: number = 0;

  constructor(public apiservice:ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public service: DailyReportService, ) {
  }

  ngOnInit(): void {
    this.getAllAbnormal()
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', active: true},
    ];

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdabnormal(id).subscribe((res: any) => {
        });
      }
    });
  }

    getAllAbnormal() {
    this.isConnected = true;
    this.apiservice.getAllabnormal().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.abnormalData = res.data
          this.filteredAbnormalData = this.abnormalData;
          this.totalRecords = this.filteredAbnormalData.length; // Total jumlah data Anda
          this.setPaginationData();
        } else {
          console.error(`${res.data.message}`);
          setTimeout(() => {
            this.isConnected = false;
          }, 1000);
        }
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
          this.isConnected = false;
        }, 1000);
      },
    });
  }

  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  getByIdAbnormal(id: any) {
    console.log('Id Yang Di tangkap', id);
    this.apiservice.getByIdabnormal(id).subscribe({
      next: (res: any) => {
        this.DataById = res;
        console.log(this.DataById)
        this.router.navigate(['abnormal/detail', id], { state: { data: this.DataById } });
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
        }, 1000);
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredAbnormalData = this.abnormalData;
      console.log('data', this.abnormalData);
      console.log('filter', this.filteredAbnormalData);
    } else {
      this.filteredAbnormalData = this.abnormalData.filter((data: { id_abnormal: string, date: string, problem: string, cause: string, ca_pa: string }) => {
        return (
          data.id_abnormal.toString().includes(this.searchTerm) ||
          data.date.toString().includes(this.searchTerm) ||
          data.problem.toString().includes(this.searchTerm) ||
          data.cause.toString().includes(this.searchTerm) ||
          data.ca_pa.toString().includes(this.searchTerm)
        );
      });
    }
  }
}
