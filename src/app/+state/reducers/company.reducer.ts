import { Action, createReducer, on } from '@ngrx/store';
import { Company } from '../../company/company';
import { loadCompaniesSuccess } from '../actions/company.actions';

export interface CompanyState {
  companies: Company[];
}

export const initialState: CompanyState = {
  companies: []
}


export const companyReducer = createReducer(initialState,
  on(loadCompaniesSuccess, (state, action) => {
    return {
      ...state,
      companies: action.payload
    };
  })
);

export function reducer(state: CompanyState | undefined, action: Action) {
  return companyReducer(state, action);
}

export const getCompaniesState = (state: CompanyState) => state.companies;
export const getCompaniesCountState = (state: CompanyState) => state.companies.length;