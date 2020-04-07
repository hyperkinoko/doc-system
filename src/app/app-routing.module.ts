import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MdViewerComponent} from './md-viewer/md-viewer.component';
import {PrivacypolicyComponent} from './privacypolicy/privacypolicy.component';


const routes: Routes = [
  {path: 'privacy', component: PrivacypolicyComponent},
  {path: ':path', component: MdViewerComponent},
  {path: '', component: MdViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
