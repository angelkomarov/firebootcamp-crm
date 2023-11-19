import { createSelector } from '@ngrx/store';
import * as fromCompanyReducer from '../reducers/company.reducer';
import * as fromIndex from '../reducers';

export const selectCompanyState = createSelector(fromIndex.selectCompanyFeatureState, (state) => state);

export const selectCompanies = createSelector(selectCompanyState, fromCompanyReducer.getCompaniesState);
export const selectCompaniesCount = createSelector(selectCompanyState, fromCompanyReducer.getCompaniesCountState);

