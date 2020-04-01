import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import { MdViewerComponent } from './md-viewer/md-viewer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {markedOptionsFactory} from './marked-options-factory';

@NgModule({
  declarations: [
    AppComponent,
    MdViewerComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
