import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EthereumService} from './ethereum.service';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {QRCodeModule} from 'angular2-qrcode';
import {MatDialogModule, MatButtonModule} from '@angular/material';
import {ModalComponent} from './modal/modal.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    QRCodeModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [EthereumService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
