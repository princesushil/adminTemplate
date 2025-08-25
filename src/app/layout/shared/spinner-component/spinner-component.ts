import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from '../../../services/spinner-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [NgxSpinnerModule,AsyncPipe],
  templateUrl: './spinner-component.html',
  styleUrl: './spinner-component.scss'
})
export class SpinnerComponent {
  isLoading$;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading$ = this.spinnerService.isLoading$;
  }
}
