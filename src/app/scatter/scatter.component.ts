import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/services/app-service.service';
import {
  GraphsServiceService,
  Record,
} from 'src/services/graphs-service.service';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css'],
})
export class ScatterComponent implements OnInit {
  constructor(
    private service: GraphsServiceService,
    private appService: AppServiceService
  ) {}

  ngOnInit(): void {
    this.attributes = ['tecu', 's4', 'sigmaphi'];
  }

  isMeridian: boolean = false;
  hidden: boolean = true;
  selectedAttribute: string;
  azimuthStart: string;
  azimuthEnd: string;
  elevationStart: string;
  elevationEnd: string;
  dateRange: Date;
  timeStart: Date;
  timeEnd: Date;
  records: Record[];
  option: any;
  data_pairs: { [key: string]: any[][] };
  attributes: string[];

  formSubmit() {
    this.dateRange[0].setHours(this.timeStart.getHours(), 0, 0);
    this.dateRange[1].setHours(this.timeEnd.getHours(), 0, 0);

    const start = this.dateRange[0];
    const end = this.dateRange[1];

    if (this.azimuthStart == undefined) {
      this.azimuthStart = '0';
    }
    if (this.azimuthEnd == undefined) {
      this.azimuthEnd = '360';
    }
    if (this.elevationStart == undefined) {
      this.elevationStart = '0';
    }
    if (this.elevationEnd == undefined) {
      this.elevationEnd = '90';
    }

    this.service
      .getScatter(
        this.selectedAttribute,
        this.azimuthStart,
        this.azimuthEnd,
        this.elevationStart,
        this.elevationEnd,
        start,
        end
      )
      .subscribe((records) => {
        this.records = records;
        this.hidden = false;
        this.showScatter(this.records, start, end, this.selectedAttribute);
      });
  }

  editData(records: Record[], attribute: string) {
    records.sort(function (a, b) {
      return +new Date(a.timeStart) - +new Date(b.timeStart);
    });

    this.records = records;

    this.data_pairs = {
      ran: [],
      rep: [],
      fsi: [],
      chu: [],
      cor: [],
      fsm: [],
      arv: [],
      rab: [],
      gil: [],
      mcm: [],
      gri: [],
      edm: [],
      gjo: [],
      sac: [],
      arc: [],
      scintillation: [],
    };

    this.records.forEach((rec) => {
      if (rec.scintillation) {
        this.data_pairs['scintillation'].push([rec.timeStart, rec[attribute]]);
      } else {
        this.data_pairs[rec.station].push([rec.timeStart, rec[attribute]]);
      }
    });
  }

  download() {
    this.appService.downloadFile(
      this.records,
      this.selectedAttribute,
      'jsontocsv'
    );
  }

  showScatter(records: Record[], start: Date, end: Date, attribute: string) {
    this.editData(records, attribute);
    const title: string =
      'CHAIN- Ionosphere monitoring system, ' +
      [start.getFullYear(), start.getMonth() + 1, start.getDate()].join('-') +
      ' - ' +
      [end.getFullYear(), end.getMonth() + 1, end.getDate()].join('-');

    this.option = {
      title: {
        left: 'center',
        text: title,
      },
      legend: {
        right: '10%',
        top: '10%',
        data: [
          'ran',
          'rep',
          'fsi',
          'chu',
          'cor',
          'fsm',
          'arv',
          'rab',
          'gil',
          'mcm',
          'gri',
          'edm',
          'gjo',
          'sac',
          'arc',
          'scintillation',
        ],
      },
      tooltip: {},
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: function (value) {
            let label;
            value = new Date(value);
            label = [
              value.getFullYear(),
              value.getMonth() + 1,
              value.getDate(),
            ].join('-');
            return label;
          },
        },
        name: 'Time(UTC)',
        nameLocation: 'middle',
        nameGap: 30,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        name: attribute,
        nameLocation: 'middle',
        nameGap: 30,
      },
      series: [
        {
          name: 'ran',
          data: this.data_pairs['ran'],
          type: 'scatter',
          itemStyle: {
            color: 'pink',
          },
        },
        {
          name: 'rep',
          data: this.data_pairs['rep'],
          type: 'scatter',
          itemStyle: {
            color: 'black',
          },
        },
        {
          name: 'fsi',
          data: this.data_pairs['fsi'],
          type: 'scatter',
          itemStyle: {
            color: 'yellow',
          },
        },
        {
          name: 'chu',
          data: this.data_pairs['chu'],
          type: 'scatter',
          itemStyle: {
            color: 'brown',
          },
        },
        {
          name: 'cor',
          data: this.data_pairs['cor'],
          type: 'scatter',
          itemStyle: {
            color: 'grey',
          },
        },
        {
          name: 'fsm',
          data: this.data_pairs['fsm'],
          type: 'scatter',
          itemStyle: {
            color: 'blue',
          },
        },
        {
          name: 'arv',
          data: this.data_pairs['arv'],
          type: 'scatter',
          itemStyle: {
            color: 'orange',
          },
        },
        {
          name: 'rab',
          data: this.data_pairs['rab'],
          type: 'scatter',
          itemStyle: {
            color: 'cyan',
          },
        },
        {
          name: 'gil',
          data: this.data_pairs['gil'],
          type: 'scatter',
          itemStyle: {
            color: 'green',
          },
        },
        {
          name: 'mcm',
          data: this.data_pairs['mcm'],
          type: 'scatter',
          itemStyle: {
            color: 'indigo',
          },
        },
        {
          name: 'gri',
          data: this.data_pairs['gri'],
          type: 'scatter',
          itemStyle: {
            color: 'purple',
          },
        },
        {
          name: 'edm',
          data: this.data_pairs['edm'],
          type: 'scatter',
          itemStyle: {
            color: 'teal',
          },
        },
        {
          name: 'gjo',
          data: this.data_pairs['mcm'],
          type: 'scatter',
          itemStyle: {
            color: 'lime',
          },
        },
        {
          name: 'sac',
          data: this.data_pairs['sac'],
          type: 'scatter',
          itemStyle: {
            color: 'red',
          },
        },
        {
          name: 'arc',
          data: this.data_pairs['arc'],
          type: 'scatter',
          itemStyle: {
            color: 'blue grey',
          },
        },
        {
          name: 'scintillation',
          data: this.data_pairs['scintillation'],
          type: 'scatter',
          symbol: 'triangle',
          itemStyle: {
            color: 'red',
          },
        },
      ],
    };
  }
}
