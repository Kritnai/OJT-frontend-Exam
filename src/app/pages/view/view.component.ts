import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class View implements OnInit {
  patientId: string | null = null;

  patient: {
    id: string,
    fullName: string,
    idCard: string,
    gender: string,
    dob: string,
    age: string | number,
    phone: string,
    underlyingDisease: string,
    status: string,
  } | null = null;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.patientId = params.get('id');
      if (this.patientId) {

        const patientInfo: Patient | undefined = this.patientService.getPatientById(this.patientId);
        if (patientInfo) {
          this.patient = {
            id: patientInfo.id,
            fullName: patientInfo.firstName + " " + patientInfo.lastName,
            idCard: patientInfo.idCard,
            gender: patientInfo.gender,
            dob: patientInfo.dob,
            age: patientInfo.age,
            phone: patientInfo.phone,
            underlyingDisease: patientInfo.underlyingDiseases.join(', '),
            status: patientInfo.status,
          }
        }
      }
    });
  }

}
