import { ServiesService } from './services.service';
import { Services } from './services.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  providers: [ServiesService]
})
export class ListServicesComponent implements OnInit {

  services: Services[];


  constructor(private serService: ServiesService) {}

  ngOnInit(): void {
    this.services = this.serService['_services'];
  }

}
