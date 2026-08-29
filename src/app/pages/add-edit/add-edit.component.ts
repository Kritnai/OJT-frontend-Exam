import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PatientService } from '../../services/patient.service';
import { patianStatusOption, genderOptions, diseaseOptions } from '../../models/options.model';

@Component({
  selector: 'app-add-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzDatePickerModule
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
})
export class AddEdit implements OnInit {
  patientForm!: FormGroup;
  patientId: string | null = null;
  isEditMode = false;
  patianStatusOption = patianStatusOption;
  genderOptions = genderOptions;
  diseaseOptions = diseaseOptions;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      idCard: [null, Validators.required],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      age: [null, Validators.required],
      phone: [null, Validators.required],
      status: [null, Validators.required],
      underlyingDiseases: [[]]
    });

    this.route.queryParamMap.subscribe(params => {
      this.patientId = params.get('id');
      if (this.patientId) {
        this.isEditMode = true;
        const patient = this.patientService.getPatientById(this.patientId);
        if (patient) {
          // Normalize underlyingDiseases to split any comma-separated values into individual array elements
          let normalizedDiseases: string[] = [];
          if (patient.underlyingDiseases) {
            patient.underlyingDiseases.forEach(d => {
              if (d && typeof d === 'string') {
                normalizedDiseases.push(...d.split(',').map(s => s.trim()));
              }
            });
          }
          // Parse dob string (DD-MM-YYYY) to Date object for the date picker
          let dobDate: Date | null = null;
          if (patient.dob) {
            const parts = patient.dob.split('-');
            if (parts.length === 3) {
              dobDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
            }
          }
          this.patientForm.patchValue({
            ...patient,
            dob: dobDate,
            underlyingDiseases: normalizedDiseases
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = { ...this.patientForm.value };

      // Convert Date object to DD-MM-YYYY string
      if (formValue.dob instanceof Date) {
        const d = formValue.dob;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        formValue.dob = `${day}-${month}-${year}`;
      }

      if (this.isEditMode && this.patientId) {
        this.patientService.updatePatient(this.patientId, formValue);
      } else {
        this.patientService.addPatient(formValue);
      }
      this.router.navigate(['/main']);
    } else {
      Object.values(this.patientForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
