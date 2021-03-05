import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import parseISO from 'date-fns/fp/parseISO';

@Component({
  selector: 'app-go-calendar',
  templateUrl: './go-calendar.component.html',
  styleUrls: ['./go-calendar.component.scss']
})
export class GoCalendarComponent implements OnInit {

  @Input() dates?;
  @Input() obj?;
  id: any;
  selectedDate: any;

  constructor() { }

  ngOnInit(): void {
    this.id = this.obj.Id;
    this.selectedDate = this.obj.StartDate;
  }

  ngAfterViewChecked() {
    this.init();
  }


  init() {
    if (this.dates && this.dates.length > 0) {
      this.dates.map(x => {
        if (x.ParentType == 0) {
          let dateArr = this.getDateArray(x.DateRange[0], x.DateRange[1])
          this.setCalendarColors(dateArr, '#28B4CC')
        }
        if (x.ParentType == 1) {
          let dateArr = this.getDateArray(x.DateRange[0], x.DateRange[1])
          this.setCalendarColors(dateArr, '#FF1881')
        }
      })
    }
  }


  // date array
  getDateArray(start, end) {
    let _start = typeof start == 'object' ? start : parseISO(start)
    let _end = typeof end == 'object' ? start : parseISO(end)
    var
      arr = new Array(),
      dt = new Date(_start);

    while (dt <= _end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  setCalendarColors(dateArr: any[], color: string) {
    let test = document.getElementById(this.id)
    let allTds = test.querySelectorAll("td");
    if (allTds) {
      allTds.forEach((elm, i) => {
        let tdTtitle = new Date(elm.getAttribute('title'))
        tdTtitle.setHours(0, 0, 0, 0);
        let some = dateArr.find((item: Date) => this.isExists(item, tdTtitle));
          if (some) {
            elm.firstElementChild.firstElementChild.setAttribute('style', `background:${color}; color: #fff`);
          } else {
          }
      });
    }
  }

  isExists(item: Date, value: Date): boolean {
    return item.getDate() == value.getDate() && item.getMonth() == value.getMonth() && item.getFullYear() == value.getFullYear();
    
  }

  onValueChange(change): void {
    // this.init();
  }
}
