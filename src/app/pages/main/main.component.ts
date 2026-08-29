import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LucideLogOut } from '@lucide/angular';


@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzGridModule,
    NzCardModule,
    NzPaginationModule,
    LucideLogOut
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  searchForm!: FormGroup;
  displayData: Patient[] = [];
  filteredPatients: Patient[] = [];
  totalRecords = 0;
  currentUser: User | null = null;
  allPatients: Patient[] = [];

  pageIndex = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.searchForm = this.fb.group({
      name: [''],
      idCard: [''],
      gender: ['ทั้งหมด'],
      phone: [''],
      dob: [null],
      status: ['ทั้งหมด']
    });

    this.patientService.patients$.subscribe(data => {
      this.allPatients = data;
      this.applyFilter();
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.pageIndex = 1;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filter = this.searchForm.value;
    const nameFilter = (filter.name || '').trim().toLowerCase();
    const idCardFilter = (filter.idCard || '').trim();
    const genderFilter = filter.gender;
    const phoneFilter = (filter.phone || '').trim();
    const dobFilter = filter.dob;
    const statusFilter = filter.status;

    let filtered = [...this.allPatients];

    if (nameFilter) {
      filtered = filtered.filter(p => 
        (p.firstName || '').toLowerCase().includes(nameFilter) ||
        (p.lastName || '').toLowerCase().includes(nameFilter)
      );
    }

    if (idCardFilter) {
      filtered = filtered.filter(p => (p.idCard || '').includes(idCardFilter));
    }

    if (genderFilter && genderFilter !== 'ทั้งหมด') {
      filtered = filtered.filter(p => p.gender === genderFilter);
    }

    if (phoneFilter) {
      filtered = filtered.filter(p => (p.phone || '').includes(phoneFilter));
    }

    if (dobFilter) {
      const dateObj = new Date(dobFilter);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const formattedDob = `${day}-${month}-${year}`;
      filtered = filtered.filter(p => p.dob === formattedDob);
    }

    if (statusFilter && statusFilter !== 'ทั้งหมด') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    this.filteredPatients = filtered;
    this.totalRecords = filtered.length;
    this.updatePagedData();
  }

  updatePagedData(): void {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize) || 1;
    if (this.pageIndex > this.totalPages) {
      this.pageIndex = 1;
    }
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.filteredPatients.slice(startIndex, endIndex);
  }

  onPageIndexChange(page: number): void {
    this.pageIndex = page;
    this.updatePagedData();
  }

  deletePatient(id: string): void {
    if (confirm('คุณต้องการลบข้อมูลผู้ป่วยรายนี้หรือไม่?')) {
      this.patientService.deletePatient(id);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
