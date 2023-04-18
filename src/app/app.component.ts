import { Component, OnInit } from '@angular/core';
import { UtilService } from './services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'portal';
  userLogado = true;

  constructor(private utilService: UtilService, private router: Router) { 
    this.userLogado = utilService.getStatusUser();

    if(this.userLogado == false){
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void {

  }


}


