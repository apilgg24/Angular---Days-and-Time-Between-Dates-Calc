import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-calculator',
  templateUrl: './date-calculator.component.html',
  styleUrls: ['./date-calculator.component.css']
})
export class DateCalculatorComponent {
  calculatorForm: FormGroup;
  result: any = null;

  constructor(private fb: FormBuilder) {
    this.calculatorForm = this.fb.group({
      startDate: ['', Validators.required],
      startTime: ['00:00'],
      endDate: ['', Validators.required],
      endTime: ['00:00']
    });
  }

  calculateDifference() {
    const start = new Date(`${this.calculatorForm.value.startDate}T${this.calculatorForm.value.startTime}`);
    const end = new Date(`${this.calculatorForm.value.endDate}T${this.calculatorForm.value.endTime}`);
    
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    this.result = {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      totalHours: Math.floor(diffMs / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diffMs / (1000 * 60))
    };
  }

  resetForm() {
    this.calculatorForm.reset({
      startTime: '00:00',
      endTime: '00:00'
    });
    this.result = null;
  }
} 