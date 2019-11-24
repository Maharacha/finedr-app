import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpService } from '../http.service';
import { LoginService } from '../login.service';
import { Fine } from '../fine/fine'

@Component({
  selector: 'app-fine',
  templateUrl: './fine.page.html',
  styleUrls: ['./fine.page.scss'],
})
export class FinePage implements OnInit {

  private fine: Fine;
  public base64Image;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HTTP,
    private httpService: HttpService,
    private loginService: LoginService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fine = this.router.getCurrentNavigation().extras.state.fine;
        this.getFineImageFromApi();
      }
    });
  }

  ngOnInit() {
  }

  getFineImageFromApi() {
    let token = this.loginService.token;
    this.http.get(this.fine.image_url, {}, {
        Authorization: 'Token ' + token        
    })
    .then(request => {
        console.log(request.status);
        console.log(request.data); // data received by server
        console.log(request.headers);
        this.base64Image = request.data;
    })
    .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);		
    });
  }
}
