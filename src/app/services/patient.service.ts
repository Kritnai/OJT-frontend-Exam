import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly STORAGE_KEY = 'patients_data_v2';

  // Default mock data based on the designs
  private defaultPatients: Patient[] = [
    { id: '1', firstName: 'สุนีย์', lastName: 'วงศ์สวัสดิ์', idCard: '9876543210987', gender: 'หญิง', dob: '01-10-1999', age: '32', phone: '0898765432', underlyingDiseases: ['ความดันสูง'], status: 'หาย' },
    { id: '2', firstName: 'อนุชา', lastName: 'ศิริ', idCard: '5555555555555', gender: 'ชาย', dob: '18-11-1990', age: '58', phone: '0811111111', underlyingDiseases: ['หัวใจ', 'เบาหวาน'], status: 'รักษาอยู่' },
    { id: '3', firstName: 'วิภา', lastName: 'รักไทย', idCard: '1112223334445', gender: 'หญิง', dob: '15-05-1985', age: '39', phone: '0822222222', underlyingDiseases: ['ไมเกรน'], status: 'รักษาอยู่' },
    { id: '4', firstName: 'ประเสริฐ', lastName: 'มั่นคง', idCard: '5554443332221', gender: 'ชาย', dob: '10-12-1970', age: '53', phone: '0833333333', underlyingDiseases: ['เกาต์'], status: 'ยกเลิกการรักษา' },
    { id: '5', firstName: 'กานดา', lastName: 'สุขใจ', idCard: '9998887776665', gender: 'หญิง', dob: '20-02-1995', age: '29', phone: '0844444444', underlyingDiseases: ['ภูมิแพ้', 'หอบหืด'], status: 'รักษาอยู่' },
    { id: '6', firstName: 'ธนพล', lastName: 'เจริญ', idCard: '1231231231234', gender: 'ชาย', dob: '05-06-1980', age: '44', phone: '0855555555', underlyingDiseases: ['กระเพาะอาหาร'], status: 'หาย' },
    { id: '7', firstName: 'มานี', lastName: 'มีตา', idCard: '3213213214321', gender: 'หญิง', dob: '12-12-1988', age: '35', phone: '0866666666', underlyingDiseases: ['ไทรอยด์', 'เบาหวาน', 'หัวใจ'], status: 'รักษาอยู่' },
    { id: '8', firstName: 'ปิติ', lastName: 'พอใจ', idCard: '7777777777777', gender: 'ชาย', dob: '01-01-1960', age: '64', phone: '0877777777', underlyingDiseases: ['ความดันโลหิตสูง'], status: 'รักษาอยู่' },
    { id: '9', firstName: 'สมยศ', lastName: 'ใจดี', idCard: '1472583690123', gender: 'ชาย', dob: '22-03-1975', age: '51', phone: '0891234567', underlyingDiseases: ['เบาหวาน'], status: 'หาย' },
    { id: '10', firstName: 'อารียา', lastName: 'ศรีสุข', idCard: '9638527410987', gender: 'หญิง', dob: '14-08-1992', age: '34', phone: '0887654321', underlyingDiseases: ['ภูมิแพ้'], status: 'รักษาอยู่' },
    { id: '11', firstName: 'จงรัก', lastName: 'ภักดี', idCard: '1234567890123', gender: 'ชาย', dob: '09-09-1981', age: '44', phone: '0812345678', underlyingDiseases: ['ความดันสูง'], status: 'หาย' },
    { id: '12', firstName: 'นงนุช', lastName: 'แก้วตา', idCard: '2345678901234', gender: 'หญิง', dob: '11-11-1989', age: '36', phone: '0823456789', underlyingDiseases: ['ไทรอยด์'], status: 'รักษาอยู่' },
    { id: '13', firstName: 'วิชัย', lastName: 'เลิศล้ำ', idCard: '3456789012345', gender: 'ชาย', dob: '25-12-1965', age: '60', phone: '0834567890', underlyingDiseases: ['หัวใจ'], status: 'ยกเลิกการรักษา' },
    { id: '14', firstName: 'สุชาดา', lastName: 'พูนผล', idCard: '4567890123456', gender: 'หญิง', dob: '03-04-1998', age: '28', phone: '0845678901', underlyingDiseases: ['ไมเกรน'], status: 'หาย' },
    { id: '15', firstName: 'เกียรติ', lastName: 'ศักดิ์ศรี', idCard: '5678901234567', gender: 'ชาย', dob: '17-07-1977', age: '49', phone: '0856789012', underlyingDiseases: ['เบาหวาน'], status: 'รักษาอยู่' },
    { id: '16', firstName: 'ดาริกา', lastName: 'รัตนา', idCard: '6789012345678', gender: 'หญิง', dob: '29-10-1994', age: '31', phone: '0867890123', underlyingDiseases: ['กระเพาะอาหาร'], status: 'รักษาอยู่' },
    { id: '17', firstName: 'ทรงพล', lastName: 'เดชา', idCard: '7890123456789', gender: 'ชาย', dob: '15-01-1972', age: '54', phone: '0878901234', underlyingDiseases: ['เกาต์'], status: 'ยกเลิกการรักษา' },
    { id: '18', firstName: 'พรเพ็ญ', lastName: 'มณีวงษ์', idCard: '8901234567890', gender: 'หญิง', dob: '08-08-1987', age: '39', phone: '0889012345', underlyingDiseases: ['หอบหืด'], status: 'หาย' },
    { id: '19', firstName: 'ชัยยศ', lastName: 'บุญมี', idCard: '9012345678901', gender: 'ชาย', dob: '20-05-1968', age: '58', phone: '0890123456', underlyingDiseases: ['ไขมันในเลือดสูง'], status: 'รักษาอยู่' },
    { id: '20', firstName: 'ลัดดา', lastName: 'ทองคำ', idCard: '0123456789012', gender: 'หญิง', dob: '02-02-1983', age: '43', phone: '0801234567', underlyingDiseases: ['ความดันสูง'], status: 'รักษาอยู่' },
    { id: '21', firstName: 'มานพ', lastName: 'รุ่งเรือง', idCard: '1357924680135', gender: 'ชาย', dob: '30-06-1979', age: '47', phone: '0813579246', underlyingDiseases: ['เบาหวาน'], status: 'หาย' },
    { id: '22', firstName: 'ยุพา', lastName: 'แสงสว่าง', idCard: '2468013579246', gender: 'หญิง', dob: '12-09-1991', age: '34', phone: '0824680135', underlyingDiseases: ['ภูมิแพ้'], status: 'รักษาอยู่' },
    { id: '23', firstName: 'สมคิด', lastName: 'ขยันยิ่ง', idCard: '3579135791357', gender: 'ชาย', dob: '25-10-1963', age: '62', phone: '0835791357', underlyingDiseases: ['หัวใจ'], status: 'รักษาอยู่' },
    { id: '24', firstName: 'อรัญ', lastName: 'ป่าไม้', idCard: '4680246802468', gender: 'ชาย', dob: '14-02-1985', age: '41', phone: '0846802468', underlyingDiseases: ['ไมเกรน'], status: 'ยกเลิกการรักษา' },
    { id: '25', firstName: 'พิศมัย', lastName: 'ใจดี', idCard: '5791357913579', gender: 'หญิง', dob: '19-11-1973', age: '52', phone: '0857913579', underlyingDiseases: ['กระเพาะอาหาร'], status: 'หาย' },
    { id: '26', firstName: 'อัครเดช', lastName: 'สิงห์โต', idCard: '6802468024680', gender: 'ชาย', dob: '05-12-1996', age: '29', phone: '0868024680', underlyingDiseases: ['ภูมิแพ้'], status: 'รักษาอยู่' },
    { id: '27', firstName: 'เรณู', lastName: 'ดอกไม้', idCard: '7913579135791', gender: 'หญิง', dob: '22-07-1984', age: '42', phone: '0879135791', underlyingDiseases: ['ความดันสูง', 'ไขมันในเลือดสูง'], status: 'รักษาอยู่' },
    { id: '28', firstName: 'บรรจง', lastName: 'สร้างสรรค์', idCard: '8024680246802', gender: 'ชาย', dob: '10-10-1958', age: '67', phone: '0880246802', underlyingDiseases: ['ความดันโลหิตสูง'], status: 'รักษาอยู่' },
    { id: '29', firstName: 'ขวัญใจ', lastName: 'คนเดิม', idCard: '9135791357913', gender: 'หญิง', dob: '01-01-1993', age: '33', phone: '0891357913', underlyingDiseases: ['หอบหืด'], status: 'หาย' },
    { id: '30', firstName: 'สกล', lastName: 'นคร', idCard: '0246802468024', gender: 'ชาย', dob: '18-04-1971', age: '55', phone: '0802468024', underlyingDiseases: ['เกาต์'], status: 'รักษาอยู่' },
    { id: '31', firstName: 'ดนัย', lastName: 'สุวรรณ', idCard: '1122334455667', gender: 'ชาย', dob: '27-02-1980', age: '46', phone: '0811223344', underlyingDiseases: ['เบาหวาน'], status: 'หาย' },
    { id: '32', firstName: 'เบญจมาศ', lastName: 'กลิ่นหอม', idCard: '2233445566778', gender: 'หญิง', dob: '15-06-1997', age: '29', phone: '0822334455', underlyingDiseases: ['ภูมิแพ้'], status: 'รักษาอยู่' },
    { id: '33', firstName: 'ยงยุทธ', lastName: 'ครองยศ', idCard: '3344556677889', gender: 'ชาย', dob: '09-12-1967', age: '58', phone: '0833445566', underlyingDiseases: ['ความดันสูง'], status: 'รักษาอยู่' },
    { id: '34', firstName: 'รัชนี', lastName: 'ปรีชา', idCard: '4455667788990', gender: 'หญิง', dob: '23-03-1986', age: '40', phone: '0844556677', underlyingDiseases: ['ไทรอยด์'], status: 'ยกเลิกการรักษา' },
    { id: '35', firstName: 'ชลิต', lastName: 'วัฒนา', idCard: '5566778899001', gender: 'ชาย', dob: '30-05-1974', age: '52', phone: '0855667788', underlyingDiseases: ['หัวใจ'], status: 'หาย' },
    { id: '36', firstName: 'นภาพร', lastName: 'สกาย', idCard: '6677889900112', gender: 'หญิง', dob: '12-10-1990', age: '35', phone: '0866778899', underlyingDiseases: ['ไมเกรน'], status: 'รักษาอยู่' }
  ];

  private patientsSubject = new BehaviorSubject<Patient[]>(this.loadPatientsFromStorage());
  patients$ = this.patientsSubject.asObservable();

  constructor() { }

  private loadPatientsFromStorage(): Patient[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Error parsing patient data from local storage', e);
      }
    }
    // Return mock data if empty
    return [...this.defaultPatients];
  }

  private savePatientsToStorage(patients: Patient[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(patients));
    this.patientsSubject.next(patients);
  }

  getPatients(): Patient[] {
    return this.patientsSubject.getValue();
  }

  getPatientById(id: string): Patient | undefined {
    return this.getPatients().find(p => p.id === id);
  }

  addPatient(patient: Omit<Patient, 'id'>): void {
    const patients = this.getPatients();
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString()
    };
    patients.push(newPatient);
    this.savePatientsToStorage(patients);
  }

  updatePatient(id: string, updatedData: Partial<Patient>): void {
    const patients = this.getPatients();
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updatedData };
      this.savePatientsToStorage(patients);
    }
  }

  deletePatient(id: string): void {
    const patients = this.getPatients().filter(p => p.id !== id);
    this.savePatientsToStorage(patients);
  }
}
