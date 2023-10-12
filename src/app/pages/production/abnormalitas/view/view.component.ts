import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;
  isConnected: boolean | undefined;
  abnormalData: any;
  DataById: any;
  id:any;


  constructor(public apiservice:ApiService,
    private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.getAllAbnormal()
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', active: true},
    ];

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdabnormal(id).subscribe((res: any) => {
          // Proses data yang diterima dari API
        });
      }
    });
  }

  /**
  * Open modal
  * @param content modal content
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
    getAllAbnormal() {
    this.isConnected = true;
    this.apiservice.getAllabnormal().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.abnormalData = res.data
          console.log(this.abnormalData);
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
          // Tangani kesalahan jika perlu
        }, 1000);
      }
    });
  }
}
