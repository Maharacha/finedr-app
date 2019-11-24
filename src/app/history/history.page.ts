import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { HttpService } from '../http.service';
import { LoginService } from '../login.service';

import { Fine } from '../fine/fine'

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    public fines: Array<Fine> = [];
    private icons = [
        'car'
      ];

    constructor(
        private router: Router,
        private http: HTTP,
        private httpService: HttpService,
        private loginService: LoginService
    ) {
        this.getFinesFromApi(this.updateFinesList.bind(this));
    }

    ngOnInit() {
    }

    getFinesFromApi(callback: Function) {
        let token = this.loginService.token;
        let serverAddress = this.httpService.serverAddress;
        this.http.get(serverAddress + '/getfinetipsuser/', {}, {
            Authorization: 'Token ' + token
        })
        .then(request => {
            console.log(request.status);
            console.log(request.data); // data received by server
            console.log(request.headers);

            let jsonObj = JSON.parse(request.data);
            callback(jsonObj);
        })
        .catch(error => {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);		
        });
    }

    updateFinesList(jsonObj) {
		for (let fine of jsonObj) {
            let dateAndTimeSplitted = fine['pub_date'].split("T")
            let date = dateAndTimeSplitted[0]
            let time = dateAndTimeSplitted[1].split(".")[0]
            let fineJson = Fine.fromJson(fine)
            this.fines.push(
                Fine.fromJson(fine)
            )
        }
    }

    navigateToFine(fine) {
        let navigationExtras: NavigationExtras = {
            state: {
              fine: fine
            }
          };
          this.router.navigate(['/fine'], navigationExtras);
    }
}
