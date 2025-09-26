 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() { }
  public readonly notAcceptingZero:string='/^(?!0)\d+$/'
  public readonly dimension:string='/^[1-9]\d[*][1-9]\d[*][1-9]\d$/';
  public readonly containerNoPattern:string='[A-Z]{4}[0-9]{7}';
  public readonly emailPattern: string ='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  public readonly onlyNumberPattern: string='[0-9]+';
  public readonly onlyNumberAcceptDotPattern: string='[0-9.]+'
  public readonly webAddressPattern:string='^(http(s)?://)?[a-zA-Z0-9-.]+(\\.[a-zA-Z]{2,5})+(/[a-zA-Z0-9-._~:/?#[\\]@!$&\'()*+,;%=]*)?$';
  public readonly panNumberPattern: string='^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$';
  public readonly contactPattern: string ='[6-9]\\d{9}';
  public readonly gstPattern: string ='^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$';
  public readonly specialCharacterNotAllowed: string='[a-zA-Z0-9 ]*';
  public readonly onlyCharacterPattern: string='^[a-zA-Z ]*$';
  public readonly AcplCodePattern: string = '^(ACPL[0-9]{4}|ATRN[0-9]{2})$';
  public readonly alphanumericPatternWithoutSpace: string = "^[A-Za-z0-9]*$"
  public readonly addressPattern: string = "^(\\w*\\s*[\\.\\-\\,\\/\\.\\(\\)\\&]*)+"
  public readonly singleSpaceWithinWordsPattern: string = "^(\\w+\\s)*\\w+$";
  public readonly decimalPattern: string = '^\\d+(\\.\\d{1,2})?$';
  //public readonly addressPattern: string = "^(\\w*\\s*[\\.\\-\\,\\/\\.\\(\\)\\&\\@]*)+";
  public readonly alphanumericWithAmpersandCharacter: string ="^([a-zA-Z&\]+\\s)*[a-zA-Z&\]+$";
  public readonly AccountNumberPattern : string = "[0-9]{9,18}";
  public readonly IFSCCodePattern : string = "^[A-Z]{4}0[A-Z0-9]{6}$";
  public readonly PinCodePattern : string = "^[0-9]{6}(?:-[0-9]{4})?$";
  //public readonly VehicleNumberPattern : string = '^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$';
  public readonly alphanumericWithSlash: string ="^([a-zA-Z0-9/\]+\\s)*[a-zA-Z0-9/\]+$";
  public readonly singleSpacePattern : string = '^([a-zA-Z]+\\s)*[a-zA-Z]+$';
  public readonly alphanumericPatternWithSingleSpace: string='^([a-zA-Z0-9]+\\s)*[a-zA-Z0-9]+$';
  public readonly vehicleNumberPattern: string = '[A-Za-z]{2}[0-9]{1,2}[A-Za-z]{0,2}[0-9]{4}';
  public readonly LedgerPattern : string = '([a-zA-Z0-9/\/-]+\\s)*[a-zA-Z0-9/\/-]+$';
  public readonly SpecialCharcterNotAllowedExpectSomeCharacter: string ="^([a-zA-Z0-9&.()\]+\\s)*[a-zA-Z0-9&.()\]+$";
  public readonly SpecialCharcterNotAllowedExpectpointCharacter: string ="^([a-zA-Z0-9&.]+\\s)*[a-zA-Z0-9&.]+$";
  public readonly singleSpacePatternwithnumber : string = '^([a-zA-Z0-9]+\\s)*[a-zA-Z0-9]+$';
  public readonly singleSpacePatternwithSpecialCharacter : string ='^([a-zA-Z0-9!@#$%^&*+,()""./:;-]+\\s)*[a-zA-Z0-9!@#$%^&*+,()""./:;-]+$';                                                                
  public readonly zeroValueAndMaxLengthPattern: RegExp = /^\d{0,10}$/;
  public readonly tanNumberPattern: string='^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$';
  public readonly multiplecontactPattern: string = '[6-9]\\d{9}(,[6-9]\\d{9}){0,2}';
  public readonly SpecialCharcterAndNumberNotAllowedExpectSomeCharacter: string ="^([a-zA-Z&.()\]+\\s)*[a-zA-Z&.()\]+$";
  public readonly singleSpacePatternWithinWordAndNumber: string = '^([a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*)$'; //Laxman
  public readonly documentNoPattern: string = '^(?:[a-zA-Z]{1,2})?[0-9]*$'; //Laxman
  public readonly singleSpacePatternWithDot : string = '^([a-zA-Z.]+\\s)*[a-zA-Z.]+$';
  public readonly onlyCharacterAndStartSpacePattern: string = '^[a-zA-Z]+( [a-zA-Z]+)*$'; // aniket
  public readonly noSpecialCharsNoSpacePattern: string = "^[a-zA-Z0-9]+$";

 
}


