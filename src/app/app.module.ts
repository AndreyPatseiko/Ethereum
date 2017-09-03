import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EthereumService} from  './ethereum.service';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EthereumService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
