import {Routes} from '@angular/router';
import {HeroViewChildComponent} from './routes/view-child/hero-view-child.component';
import {HeroModelFormComponent} from './routes/model-form/hero-model-form.component';
import {HeroModelMixedComponent} from './routes/model-mixed/hero-model-mixed.component';
import {HeroModelParentContainerInjectionComponent} from './routes/container-injection/hero-model-parent-container-injection.component';
import {HeroModelCVAComponent} from './routes/cva/hero-model-c-v-a.component';


export const routes: Routes = [
  {
    path: 'container-injection',
    component: HeroModelParentContainerInjectionComponent
  },
  {
    path: 'cva',
    component: HeroModelCVAComponent
  },
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
    redirectTo: 'cva'
  }
];
