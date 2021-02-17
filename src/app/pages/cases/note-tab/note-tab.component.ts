import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-tab',
  templateUrl: './note-tab.component.html',
  styleUrls: ['./note-tab.component.scss']
})
export class NoteTabComponent implements OnInit {
  isVisible:boolean = false;
  FoldermodalTitle: string = 'Add note';
  count:number=6;
  constructor() { }

  ngOnInit(): void {
  }


  AddNote() {
    this.isVisible = true
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }
  async AddNoteSuccess($event) {
    this.isVisible = false
  }

}
