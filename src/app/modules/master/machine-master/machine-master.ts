import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineMasterService } from '../services/machine-master-service';
import { MachineMasterModel } from '../models/machine-master-model';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../../services/validators.service.ts';
import { AuthService } from '../../../cores/services/authService';

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
    private toastr: ToastrService,
    private _validationService: ValidatorsService,
    private _authService: AuthService


  ) { }

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      id: [0],
      brandName: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      hpKw: [, [Validators.required, Validators.pattern(this._validationService.onlyNumberPattern)]],
      slot: [, [Validators.required, Validators.pattern(this._validationService.onlyNumberPattern)]],
      rpm: [, [Validators.required, Validators.pattern(this._validationService.onlyNumberPattern)]],
      pitch: ['', [Validators.required, Validators.pattern(this._validationService.alphanumericPatternWithSingleSpace)]],
      gauge: ['', [Validators.required, Validators.pattern(this._validationService.alphanumericPatternWithSingleSpace)]],
      alterGauge: ['', [Validators.required, Validators.pattern(this._validationService.alphanumericPatternWithSingleSpace)]],
      turn: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      coilMeasurement: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      windingType: [null, Validators.required],
      connectionType: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      statorLobby: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      coilGroupWeight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      totalWireWeight: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      phaseSize: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
      amperes: [, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      windingDate: [new Date().toISOString().substring(0, 10), Validators.required],
      gpDc: ['', [Validators.required, Validators.pattern(this._validationService.singleSpacePatternWithinWordAndNumber)]],
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
      this.machineMasterModel = new MachineMasterModel();

      this.machineMasterModel.id = this.machineForm.value.id || 0;
      this.machineMasterModel.brandName = this.machineForm.value.brandName || '';
      this.machineMasterModel.hpKw = this.machineForm.value.hpKw ?? null;
      this.machineMasterModel.slot = this.machineForm.value.slot ?? null;
      this.machineMasterModel.rpm = this.machineForm.value.rpm ?? null;
      this.machineMasterModel.pitch = this.machineForm.value.pitch || '';
      this.machineMasterModel.gauge = this.machineForm.value.gauge || '';
      this.machineMasterModel.alterGauge = this.machineForm.value.alterGauge || '';
      this.machineMasterModel.turn = this.machineForm.value.turn ?? null;
      this.machineMasterModel.coilMeasurement = this.machineForm.value.coilMeasurement || '';
      this.machineMasterModel.windingType = this.machineForm.value.windingType || 0;
      this.machineMasterModel.connectionType = this.machineForm.value.connectionType || '';
      this.machineMasterModel.statorLobby = this.machineForm.value.statorLobby || '';
      this.machineMasterModel.coilGroupWeight = this.machineForm.value.coilGroupWeight ?? null;
      this.machineMasterModel.totalWireWeight = this.machineForm.value.totalWireWeight ?? null;
      this.machineMasterModel.phaseSize = this.machineForm.value.phaseSize || '';
      this.machineMasterModel.amperes = this.machineForm.value.amperes ?? null;
      this.machineMasterModel.windingDate = this.machineForm.value.windingDate || '';
      this.machineMasterModel.gpDc = this.machineForm.value.gpDc || '';
      this.machineMasterModel.createdBy = this._authService.currentUser.Id;
      this.machineMasterModel.createdOn = new Date();
      this.machineMasterModel.modifiedBy = '';
      this.machineMasterModel.modifiedOn = undefined;
      this.machineMasterModel.isActive = this.machineForm.value.isActive ?? true;

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
      windingType: null,
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
      id: machine.id || 0,
      brandName: machine.brandName || '',
      hpKw: machine.hpKw ?? null,
      slot: machine.slot ?? null,
      rpm: machine.rpm ?? null,
      pitch: machine.pitch || '',
      gauge: machine.gauge || '',
      alterGauge: machine.alterGauge || '',
      turn: machine.turn ?? null,
      coilMeasurement: machine.coilMeasurement || '',
      windingType: machine.windingType || 0,
      connectionType: machine.connectionType || '',
      statorLobby: machine.statorLobby || '',
      coilGroupWeight: machine.coilGroupWeight ?? null,
      totalWireWeight: machine.totalWireWeight ?? null,
      phaseSize: machine.phaseSize || '',
      amperes: machine.amperes ?? null,
      windingDate: machine.windingDate
        ? new Date(machine.windingDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      gpDc: machine.gpDc || '',
      createdBy: machine.createdBy || '',
      createdOn: machine.createdOn || null,
      modifiedBy: machine.modifiedBy || '',
      modifiedOn: machine.modifiedOn || null,
      isActive: machine.isActive ?? true,
    });
    this.isEditMode = true;
  }

  getWindingTypeName(id: number): string {
    const map: any = { 1: '1', 2: '2', 3: '3' };
    return map[id] || '';
  }

}
