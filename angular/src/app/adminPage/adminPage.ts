import {
  Component,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';


@Component({
  selector: 'adminPage',
  templateUrl: './adminPage.html',
  styleUrls: ['./adminPage.css']
})
export class AdminPage {
  constructor(private el: ElementRef, private ref: ChangeDetectorRef) {

  }
}
