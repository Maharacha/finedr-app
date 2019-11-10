import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Fine } from '../fine/fine'

@Component({
  selector: 'app-fine',
  templateUrl: './fine.page.html',
  styleUrls: ['./fine.page.scss'],
})
export class FinePage implements OnInit {

  private fine: Fine;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fine = this.router.getCurrentNavigation().extras.state.fine;
      }
    });
  }

  ngOnInit() {
  }
}
