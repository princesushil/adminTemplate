import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineMasterService } from '../services/machine-master-service';
import { MachineMasterModel } from '../models/machine-master-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-machine-master',
  templateUrl: './machine-master.html',
  styleUrl: './machine-master.scss',
  standalone: false,
})
export class MachineMaster implements OnInit {
  machineForm!: FormGroup;
  machines: MachineMasterModel[] = [];
  machineMasterModel: MachineMasterModel = new MachineMasterModel();
  isEditMode: boolean = false;
  showList: boolean = false;
  isSubmitted = false;

  // dropdown
  windingTypes = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  constructor(
    private fb: FormBuilder,
    private machineService: MachineMasterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      id: [0],
      brandName: ['', [Validators.required,Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      hpKw: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      slot: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      rpm: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      pitch: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      gauge: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      alterGauge: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      turn: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      coilMeasurement: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      windingType: [null, Validators.required],
      connectionType: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/)]],
      statorLobby: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      coilGroupWeight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      totalWireWeight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      phaseSize: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/)]],
      amperes: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      windingDate: [new Date().toISOString().substring(0, 10), Validators.required],
      gpDc: ['', [Validators.required, Validators.pattern(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/)]],
      isActive: [true],
    });
  }

  toggleList() {
    this.showList = !this.showList;
    if (this.showList) this.loadMachines();
  }

  loadMachines() {
    this.machineService.getAllMachines().subscribe({
      next: (data) => (this.machines = data),
      error: (err) => console.error('Error loading machines:', err),
    });
  }

  onSubmit() {
    // debugger
    this.isSubmitted = true;
    if (this.machineForm.valid) {
      this.machineMasterModel = { ...this.machineForm.value };
      //update
      if (this.isEditMode) {
        this.machineService.updateMachine(this.machineMasterModel).subscribe({
          next: () => {
            this.toastr.success('Machine updated successfully!', 'Success');
            this.resetForm();
            this.loadMachines();
          },
          error: (err) => this.toastr.error('Failed to update machine', 'Error'),
        });
      }
      //add
      else {
        console.log("this.machineMasterModel", this.machineMasterModel);
        this.machineService.addMachine(this.machineMasterModel).subscribe({
          next: () => {
            this.toastr.success('Machine added successfully!', 'Success');
            this.resetForm();
            this.loadMachines();
          },
          error: (err) => {
            debugger
            console.error(err);
            this.toastr.error(err.error?.message || 'Failed to save machine. Please try again.', 'Error');
          }

          // error: (err) => this.toastr.error('Failed to save machine', 'Error'),
        });
      }
    } else {
      this.machineForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.machineForm.reset({
      id: 0,
      brandName: '',
      hpKw: 0,
      slot: 0,
      rpm: 0,
      pitch: '',
      gauge: '',
      alterGauge: '',
      turn: 0,
      coilMeasurement: 0,
      windingType: 0,
      connectionType: '',
      statorLobbby: '',
      coilGroupWeight: '',
      totalWireWeight: '',
      phaseSize: '',
      amperes: 0,
      windingDate: new Date().toISOString().substring(0, 10),
      gpDc: '',
      isActive: true,
    });
    this.isEditMode = false;
    this.isSubmitted = false;
  }

  onEdit(machine: MachineMasterModel) {
    this.machineForm.patchValue({
      ...machine,
      windingDate: machine.windingDate
        ? new Date(machine.windingDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
    });
    this.isEditMode = true;
  }

  getWindingTypeName(id: number): string {
    const map: any = { 1: '1', 2: '2', 3: '3' };
    return map[id] || '';
  }

}
