import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { jwtAuthService } from 'src/app/services/jwt'

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-alpha',
  templateUrl: './alpha.component.html',
})
export class DashboardAlphaComponent implements OnInit {
  chartCardData = data.chartCardData
  chartCardGraphOptions: object
  paymentAccountsData = data.paymentAccountsData
  paymentCardsData = data.paymentCardsData
  paymentTransactionsData = data.paymentTransactionsData
  pricingItemData = data.pricingItemData
  referalsData = data.referalsData
  displayReferalsData = [...this.referalsData]
  sortNameReferals = null
  sortValueReferals = null
  constructor(
    private authService: jwtAuthService,
    private router: Router,
  ) {
    this.chartCardGraphOptions = {
      options: {
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0,
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0,
        },
        showArea: true,
        high: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        fullWidth: true,
        height: '110px',
        showPoint: false,
      },
      low: 20,
      type: 'Line',
    }
  }
  async ngOnInit() {
    let role = await (await this.authService.getUserModel()).UserRole
    if (role && (role == 'Parent' || role == 'Child')) {
      this.router.navigate(['/calendar'])
    } else if (role && (role == 'Lawyer')) {
      this.router.navigate(['/cases'])
    } else {
      this.router.navigate(['/calendar'])
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortNameReferals = sort.key
    this.sortValueReferals = sort.value
    this.search()
  }

  search(): void {
    if (this.sortNameReferals && this.sortValueReferals) {
      this.displayReferalsData = this.referalsData.sort((a, b) =>
        this.sortValueReferals === 'ascend'
          ? a[this.sortNameReferals] > b[this.sortNameReferals]
            ? 1
            : -1
          : b[this.sortNameReferals] > a[this.sortNameReferals]
          ? 1
          : -1,
      )
    } else {
      this.displayReferalsData = this.referalsData
    }
  }
}
