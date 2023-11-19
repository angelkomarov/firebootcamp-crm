import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { CompanyEffects } from './effects/company.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
      StoreModule.forRoot(reducers,
        {
          runtimeChecks: {
            strictActionImmutability: false,
            strictStateImmutability: false
          }
  
        }
        ),
      //!environment.production ? StoreDevtoolsModule.instrument({maxAge: 10}) : [],
      EffectsModule.forRoot([CompanyEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    declarations: [],
    providers: []
  })
  export class AppStateModule { }
  