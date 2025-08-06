
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-branch-master',
  templateUrl: './branch-master.html',
  styleUrls: ['./branch-master.scss'],
  standalone: false,
    encapsulation: ViewEncapsulation.None

})
export class BranchMaster implements OnInit {
  branchForm!: FormGroup;
  isSubmitted = false
  showViewList: boolean = false;
  constructor(private fb: FormBuilder,private spinner:NgxSpinnerService, private toastr: ToastrService) { }
  states = [
    { label: 'Maharashtra', value: 'MH' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Karnataka', value: 'KA' },
  ];
  branchColumns = [
    { key: 'branchName', label: 'Branch Name' },
    { key: 'branchCode', label: 'Branch Code' },
    { key: 'state', label: 'State' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phvone' },
    { key: 'branchName', label: 'Branch Name' },
    { key: 'branchCode', label: 'Branch Code' },
    { key: 'state', label: 'State' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'branchName', label: 'Branch Name' },
    { key: 'branchCode', label: 'Branch Code' },
    { key: 'state', label: 'State' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' }

  ];

  branchData = [
    {
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    },{
      branchName: 'Main Branch',
      branchCode: 'MB001',
      state: 'Maharashtra',
      email: 'main@example.com',
      phone: '9876543210'
    },
    {
      branchName: 'Sub Branch',
      branchCode: 'SB002',
      state: 'Gujarat',
      email: 'sub@example.com',
      phone: '8765432109'
    },
    {
      branchName: 'North Branch',
      branchCode: 'NB003',
      state: 'Delhi',
      email: 'north@example.com',
      phone: '9123456789'
    },
    {
      branchName: 'East Branch',
      branchCode: 'EB004',
      state: 'West Bengal',
      email: 'east@example.com',
      phone: '9234567890'
    },
    {
      branchName: 'South Branch',
      branchCode: 'SB005',
      state: 'Tamil Nadu',
      email: 'south@example.com',
      phone: '9345678901'
    },
    {
      branchName: 'West Branch',
      branchCode: 'WB006',
      state: 'Rajasthan',
      email: 'west@example.com',
      phone: '9456789012'
    },
    {
      branchName: 'Central Branch',
      branchCode: 'CB007',
      state: 'Madhya Pradesh',
      email: 'central@example.com',
      phone: '9567890123'
    },
    {
      branchName: 'Coastal Branch',
      branchCode: 'CO008',
      state: 'Goa',
      email: 'coastal@example.com',
      phone: '9678901234'
    },
    {
      branchName: 'Hill Branch',
      branchCode: 'HB009',
      state: 'Himachal Pradesh',
      email: 'hill@example.com',
      phone: '9789012345'
    },
    {
      branchName: 'Plains Branch',
      branchCode: 'PB010',
      state: 'Uttar Pradesh',
      email: 'plains@example.com',
      phone: '9890123456'
    },
    {
      branchName: 'Desert Branch',
      branchCode: 'DB011',
      state: 'Rajasthan',
      email: 'desert@example.com',
      phone: '9012345678'
    },
    {
      branchName: 'Tech Branch',
      branchCode: 'TB012',
      state: 'Karnataka',
      email: 'tech@example.com',
      phone: '9123456780'
    },
    {
      branchName: 'Eco Branch',
      branchCode: 'EB013',
      state: 'Kerala',
      email: 'eco@example.com',
      phone: '9234567891'
    },
    {
      branchName: 'Urban Branch',
      branchCode: 'UB014',
      state: 'Telangana',
      email: 'urban@example.com',
      phone: '9345678902'
    },
    {
      branchName: 'Rural Branch',
      branchCode: 'RB015',
      state: 'Bihar',
      email: 'rural@example.com',
      phone: '9456789013'
    }
  ];


  ngOnInit(): void { 
    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      state: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }
  onEditBranch(branch: any) {
    // Populate form for editing
    this.branchForm.patchValue(branch);
  }
  handleEdit(row: any) {
    console.log('Edit row:', row);
    // Open a modal, navigate to edit form, or patch form data
  }
  onDeleteBranch(branch: any) {
    // Delete logic here
    this.branchData = this.branchData.filter(item => item !== branch);
  }
  toggleViewList() {
    this.spinner.show()
    this.showViewList = !this.showViewList;
 setTimeout(() => {
     this.spinner.hide()
 }, 2000);
  }


  onSubmit(): void {
    this.isSubmitted = true
    this.toastr.success('Data saved successfully!', 'Success');
    if (this.branchForm.valid) {
      const formData = this.branchForm.value;
      console.log('Form Submitted:', formData);
      // TODO: Send data to API or service
    } else {
      this.branchForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.branchForm.reset();
    this.toastr.error('Error while processing request!', 'Error');
  }
}
