import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AppState } from '../../+state/reducers';
import { Store } from '@ngrx/store';
import { addCompany, updateCompany } from '../../+state/actions/company.actions';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements OnInit {
  companyId: number = 0;
  isNewCompany: boolean = false;
  companyForm!: UntypedFormGroup;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.companyId = +this.activateRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  buildForm(): void {
    this.companyForm = this.formBuilder.group({
      // longer way
      // name: this.formBuilder.control(''),
      // phone: this.formBuilder.control(''),
      // email: this.formBuilder.control('')
      name: ['', [Validators.required]],
      checkPhone: [false],
      phone: [{ value: '', disabled: true }],
      email: [''],
    });

    this.companyForm.get('checkPhone')?.valueChanges.subscribe((checked) => {
      const phoneControl = this.companyForm.get('phone');
      if (checked) {
        phoneControl?.addValidators([Validators.required]);
        phoneControl?.enable();
      } else {
        phoneControl?.clearValidators();
        phoneControl?.disable();
      }
      phoneControl?.updateValueAndValidity();
    });

    this.companyForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((value) => console.log('form changed', value));
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId).subscribe((company) => {
      this.companyForm.patchValue({
        ...company,
        checkPhone: !!company.phone,
      });
    });
  }

  saveCompany() {
    const { valid, value } = this.companyForm;
    // const valid = this.companyForm.valid;
    // const value = this.companyForm.value;
    if (valid) {
      if (this.isNewCompany) {
        this.store$.dispatch(addCompany(value));
      } else {
        const updatedCompany = {
          id: this.companyId,
          ...value,
          // name: value.name,
          // email: value.email,
          // phone: value.phone,
        };
        this.store$.dispatch(updateCompany(updatedCompany));
        // this.companyService
        //   .updateCompany(updatedCompany)
        //   .subscribe((_) => this.router.navigateByUrl('/company/list'));
      }
    }
  }
}
