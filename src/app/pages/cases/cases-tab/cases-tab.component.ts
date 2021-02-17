import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cases-tab',
  templateUrl: './cases-tab.component.html',
  styleUrls: ['./cases-tab.component.scss']
})
export class CasesTabComponent implements OnInit {
  caseId: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.caseId = +params['caseId'] || 0;
    });
  }

}
