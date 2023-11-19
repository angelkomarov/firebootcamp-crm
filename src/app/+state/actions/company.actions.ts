import { createAction } from '@ngrx/store';
import { Company } from '../../company/company';

export const loadCompanies = createAction('[Companies] Load companies');

export const loadCompaniesSuccess = createAction(
  '[Companies] Load companies success',
  (companies: Company[]) => ({ payload: companies })
);

export const addCompany = createAction(
  '[Companies] Add company',
  (company: Company) => ({ payload: company })
);

export const updateCompany = createAction(
  '[Companies] Update company',
  (company: Company) => ({ payload: company })
);

export const deleteCompany = createAction(
  '[Companies] Delete company',
  (company: Company) => ({ payload: company })
);
