import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EthereumService} from  './ethereum.service';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    QRCodeModule,
  ],
  providers: [EthereumService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
