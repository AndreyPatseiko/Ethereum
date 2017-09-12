import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EthereumService} from  './ethereum.service';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [EthereumService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
