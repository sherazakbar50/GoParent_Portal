import { Component, OnInit } from '@angular/core'
import { SettingsService } from 'src/app/services/settings/settings.service'

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {
  constructor(private settingService: SettingsService) {}

  async ngOnInit() {
    let isOtherCoParentExists = await this.settingService.IsOtherCoparentExists()
  }
}
