import {Routes} from '@angular/router';
import {HeroViewChildComponent} from './routes/view-child/hero-view-child.component';
import {HeroModelFormComponent} from './routes/model-form/hero-model-form.component';
import {HeroModelMixedComponent} from './routes/model-mixed/hero-model-mixed.component';


export const routes: Routes = [
  {
    path: 'viewChild',
    component: HeroViewChildComponent
  },
  {
    path: 'model-form',
    component: HeroModelFormComponent
  },
  {
    path: 'model-mixed',
    component: HeroModelMixedComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'viewChild'
  }
];
