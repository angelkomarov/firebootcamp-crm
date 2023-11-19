import {
    ActionReducerMap,
    createFeatureSelector
  } from '@ngrx/store';

import * as fromCompanyReducer from './company.reducer';

export interface AppState {
    companies: fromCompanyReducer.CompanyState;
}

export const reducers: ActionReducerMap<AppState> = {
    companies: fromCompanyReducer.reducer
};

export const selectCompanyFeatureState = createFeatureSelector<fromCompanyReducer.CompanyState>('companies');
