import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-latoolbar',
  templateUrl: './latoolbar.component.html',
  styleUrls: ['./latoolbar.component.css']
})
export class LatoolbarComponent implements OnInit{

  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      busqueda: ['']
    });
  }
  aceptar(): void {
    this.router.navigate(['buscar']);
  }
  
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
