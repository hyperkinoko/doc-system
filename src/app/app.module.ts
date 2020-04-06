import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import { MdViewerComponent } from './md-viewer/md-viewer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {markedOptionsFactory} from './marked-options-factory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { IndexMenuComponent } from './index-menu/index-menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {environment} from '../environments/environment';
import {DOCS_BASE_PATH} from '../../configure';

@NgModule({
  declarations: [
    AppComponent,
    MdViewerComponent,
    IndexMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule
  ],
  providers: [
    {provide: DOCS_BASE_PATH, useValue: environment.docsBasePath}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
