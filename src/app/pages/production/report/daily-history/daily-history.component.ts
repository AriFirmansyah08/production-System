import { Component, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { dataattribute, existingList, FuzzyList, paginationlist } from 'src/app/core/helpers/data-daily';
import { DecimalPipe } from '@angular/common';
import { DailyReportService } from 'src/app/core/services/daily-report.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DailyReportModel } from 'src/app/core/models/daily-reports';
import { NgDailySortableHeader, listSortEvent } from '../daily-report/daily-report-sortable.directive'



@Component({
  selector: 'app-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
  providers: [DailyReportService, DecimalPipe]
})

export class DailyHistoryComponent {
  breadCrumbItems!: Array<{}>;

  submitted = false;
  masterSelected!: boolean;
  ListJsDatas: any;
  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;

  // Table data
  datatabel!: Observable<DailyReportModel[]>;
  total: Observable<number>;
  @ViewChildren(NgDailySortableHeader) headers!: QueryList<NgDailySortableHeader>;
  isConnected: boolean | undefined;
  historyData: any;
  constructor(private modalService: NgbModal, public service: DailyReportService, private formBuilder: UntypedFormBuilder, public apiservice:ApiService) {
    this.datatabel = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Production' },
      { label: 'Report' },
      { label: 'Daily' },
      { label: 'History', active: true }
    ];


    this.datatabel.subscribe(x => {
      this.ListJsDatas = Object.assign([], x);
    });

    this.attributedata = dataattribute
    this.existingData = existingList
    this.fuzzyData = FuzzyList
    this.paginationDatas = paginationlist
    this.totalRecords = this.paginationDatas.length
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
    this.getAllHistory()
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
  }

  /**
  * Open modal
  * @param content modal content
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: listSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.listsortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  
  //real
  getAllHistory() {
    this.isConnected = true;
    this.apiservice.getAllHistory().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.historyData = res.data
          console.log(this.historyData);
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

}


