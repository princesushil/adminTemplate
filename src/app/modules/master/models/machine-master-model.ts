export class MachineMasterModel {
  id: number = 0;
  brandName: string = '';
  hpKw: number = null;
  slot: number = null;
  rpm: number = null ;
  pitch: string = '';
  gauge: string = '';
  alterGauge: string = '';
  turn: number = null;
  coilMeasurement: string = '';
  windingType: number = 0;
  connectionType: string = '';
  statorLobby: string = '';
  coilGroupWeight:  number | null = null; 
  totalWireWeight:  number | null = null; 
  phaseSize: string = ''; 
  amperes:  any=null;
  windingDate: string='';
  gpDc: string = '';
  createdBy: string = '';
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  isActive: boolean = true;
}
