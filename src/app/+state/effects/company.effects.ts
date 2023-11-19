import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company/company.service';
import {
  addCompany,
  deleteCompany,
  loadCompanies,
  loadCompaniesSuccess,
  updateCompany,
} from '../actions/company.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { Company } from '../../company/company';
import { Router } from '@angular/router';

@Injectable()
export class CompanyEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private companyService: CompanyService
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies.type),
      exhaustMap(() =>
        this.companyService
          .getCompanies()
          .pipe(map((companies) => loadCompaniesSuccess(companies)))
      )
    )
  );

  addCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCompany.type),
      exhaustMap((action) =>
        this.companyService
          .addCompany((action as any).payload as Company)
          .pipe(tap(() => this.router.navigateByUrl('/company/list')))
      )
    ),
    {dispatch: false}
  );  

  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCompany.type),
      exhaustMap((action) =>
        this.companyService
          .updateCompany((action as any).payload as Company)
          .pipe(tap(() => this.router.navigateByUrl('/company/list')))
      )
    ),
    {dispatch: false}
  );  

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCompany.type),
      exhaustMap((action) =>
        this.companyService
          .deleteCompany((action as any).payload as Company)
          .pipe(map(() => loadCompanies()))
      )
    )
  );
}
