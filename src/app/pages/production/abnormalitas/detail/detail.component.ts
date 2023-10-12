import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';






@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isConnected: boolean | undefined;
  imageUrl = `${environment.API_URL}${environment.getImage}`;

  constructor(
    public apiservice: ApiService,
    private route: ActivatedRoute,
  ) {}

  id: number | undefined;
  data: any;
  

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Create Invoice', active: true },
    ];
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdabnormal(id).subscribe((res: any) => {
          // Proses data yang diterima dari API
        });
      }
    });

    this.route.params.subscribe(params => {
      console.log(params);
      
      const id = params['id'];
      this.apiservice.getByIdabnormal(id).subscribe((response: any) => {
        // Pastikan Anda memeriksa apakah 'id_abnormal' ada dalam respons
        console.log(response);
        this.data = response.data[0]
      }, error => {
        console.error('Error:', error);
      });
    });
  }
  
  // ekport(){
  //   const pdf = new jsPDF()
  // }
}

