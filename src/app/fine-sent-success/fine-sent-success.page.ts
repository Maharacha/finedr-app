import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fine-sent-success',
  templateUrl: './fine-sent-success.page.html',
  styleUrls: ['./fine-sent-success.page.scss'],
})
export class FineSentSuccessPage implements OnInit {

    constructor(
	private router: Router ) { }

    ngOnInit() {
    }

    async successOkButtonClick() {
	console.log("OK CLIKED");
	this.router.navigate(['/map']);
    }
}
