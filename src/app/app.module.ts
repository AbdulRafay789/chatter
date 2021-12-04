import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { HttpHelper } from './services/http.helper';
import { CoreModule } from './services/core.module';
import { ConfigurationProvider } from './services/configuration';
import { GeneralService } from './services/general.service';
// import { Chooser } from '@ionic-native/chooser/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

// @NgModule({
//   declarations: [AppComponent],
//   entryComponents: [],
//   imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, CoreModule],
//   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     HttpHelper,UserService,ConfigurationProvider,GeneralService],
//   bootstrap: [AppComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GeneralService,
    FileChooser,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
