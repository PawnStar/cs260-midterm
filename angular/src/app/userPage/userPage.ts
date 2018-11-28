import {
  Component,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';


@Component({
  selector: 'userPage',
  templateUrl: './userPage.html',
  styleUrls: ['./userPage.css']
})
export class UserPage {
  constructor(private el: ElementRef, private ref: ChangeDetectorRef) {

  }
}
