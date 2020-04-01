import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MdViewerComponent} from './md-viewer/md-viewer.component';


const routes: Routes = [
  {path: ':docId', component: MdViewerComponent},
  {path: '', component: MdViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
