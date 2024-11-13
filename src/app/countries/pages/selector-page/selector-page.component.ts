import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/countries.interface';
import { filter, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',

})
export class SelectorPageComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();

  public myForm: FormGroup = this.fb.group({
    reguion: ['', Validators.required],
    country:  ['', Validators.required],
    border : ['', Validators.required],
  });

  public countriesByReguion: SmallCountry[] = [];
  public bordersByCountries: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService : CountriesService
  ){};
  
  ngOnInit(): void {
    this.onReguionsChanged();
    this.onBordersChanged();
  };

  get regions(): Region[] {
    return this.countriesService.regions;
  };

  onReguionsChanged(): void {
    this.myForm.get('reguion')!.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.myForm.get('country')!.setValue('')),
        switchMap((region) => this.countriesService.getCountriesByReguion(region))
      )
      .subscribe( region => {
        this.countriesByReguion = region.sort((a, b) => a.name.localeCompare(b.name));
        // this.countriesByReguion = region
      });
  };


  onBordersChanged(): void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) => this.countriesService.getCountriesByAlphaCode(alphaCode)),
        switchMap((country) => this.countriesService.getCountriesByCode(country.borders))
      )
      .subscribe( country => {
        this.bordersByCountries = country.sort((a, b) => a.name.localeCompare(b.name));
        // this.bordersByCountries = country;
      });
  };


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };


};
