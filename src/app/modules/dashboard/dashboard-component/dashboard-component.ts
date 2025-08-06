import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexNonAxisChartSeries,
  NgApexchartsModule
} from 'ng-apexcharts';
import { DashboardCard } from '../../../models/dashboard.model';
import { BranchMaster } from '../../master/branch-master/branch-master';
export type ChartOptionsLine = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, NgApexchartsModule,],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
   
})
export class DashboardComponent {

  pieChart: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
    title: ApexTitleSubtitle;
  };
  lineChart: ChartOptionsLine;
  cards: DashboardCard[] = [
    {
      title: 'Total Customers',
      value: '1,250',
      description: 'Compared to last month',
      gradientClass: 'gradient-blue'
    },
    {
      title: 'Total Orders',
      value: '320',
      description: 'Up 15% this week',
      gradientClass: 'gradient-green'
    },
    {
      title: 'Total Revenue',
      value: '₹1,20,500',
      description: 'Revenue this quarter',
      gradientClass: 'gradient-orange'
    },
    {
      title: 'New Users',
      value: '890',
      description: 'Joined this month',
      gradientClass: 'gradient-purple'
    },
    {
      title: 'Support Tickets',
      value: '45',
      description: 'Pending issues',
      gradientClass: 'gradient-red'
    } 
  ];
  summaryCards = [
    { label: 'Customers', value: '1,250' },
    { label: 'Products', value: '320' },
    { label: 'Orders Today', value: '95' },
    { label: 'Total Sales', value: '₹1,20,500' }
  ];
  constructor() {
    this.lineChart = {
      series: [
        {
          name: "Orders",
          data: [10, 41, 35, 51, 49, 62, 69]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Order Trend Over Time",
        align: "left"
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      }
    };

    this.pieChart = {
      chart: {
        type: 'pie'
      },
      series: [120, 90, 70, 40],
      labels: ['Online', 'Retail', 'Wholesale', 'Direct'],
      title: {
        text: 'Order Distribution',
        align: 'left'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
}
