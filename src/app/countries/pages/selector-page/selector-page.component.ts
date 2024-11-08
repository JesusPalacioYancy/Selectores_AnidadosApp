import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/countries.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',

})
export class SelectorPageComponent implements OnInit, OnDestroy{

  public myForm: FormGroup = this.fb.group({
    reguion: ['', Validators.required],
    contry:  ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService : CountriesService
  ){}
  
  ngOnInit(): void {
    this.onReguionsChanged();
  };

  get regions(): Region[] {
    return this.countriesService.regions;
  };

  onReguionsChanged(): void {
    this.myForm.get('reguion')!.valueChanges
      .pipe(
        switchMap((region) => this.countriesService.getCountriesByReguion(region))
      )
      .subscribe( region => {
        console.log(region);
      });
  };

  ngOnDestroy(): void {
    this.onReguionsChanged();
  };



}
