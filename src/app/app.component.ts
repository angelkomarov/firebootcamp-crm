import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Observable, filter, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCompaniesCount } from './+state/selectors/company.selectors';
import { AppState } from './+state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked{
  title = 'Sydney 🐨';
  currentDate = new Date();


  companyCount$ = this.store$.select(selectCompaniesCount);    

  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private store$: Store<AppState>) {}

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();    
  }  


}
