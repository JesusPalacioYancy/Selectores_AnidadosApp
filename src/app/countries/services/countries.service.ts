import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Region, SmallCountry } from '../interfaces/countries.interface';

@Injectable({ providedIn: 'root' })

export class CountriesService {

    private baseUrl: string = 'https://restcountries.com/v3.1'

    private _regions: Region[] = [ 
        Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania
    ];

    constructor(
        private http : HttpClient
    ) {}

    get regions(): Region[] {
        return [...this._regions];
    };

    getCountriesByReguion( region: Region ): Observable<SmallCountry[]> {
        if(!region) return of([]);
        const url: string = `${this.baseUrl}/region/${region}?fields=cc3,name,borders`

        return this.http.get<SmallCountry[]>(url)
    };


}