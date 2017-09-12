import {Component, OnInit} from '@angular/core';
import {EthereumService} from  './ethereum.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import * as FileSaver from 'file-saver';
import Web3 from 'web3';
// import {Accounts} from 'web3-eth-accounts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [EthereumService]
})

export class AppComponent implements OnInit {
  info = [];
  connection = false;
  web3: Web3;

  constructor(private ethService: EthereumService, private _http: Http) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  ngOnInit() {
    console.log(this.web3)   
    this.getData();
  }

  getData() {
    if (this.web3.isConnected()) {
      this.info = [];
      this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
      const contracts = this.web3.eth.accounts;
      contracts.map((el) => {
        const bal = this.web3.eth.getBalance(el, '', this.cb());
        this.info.push({el: el, value: this.web3.fromWei(bal, 'ether').toNumber()});
      });
      console.log(this.info);
    } else {
      this.connection = true;
    }
  }
  
  createNewAccount(){    
    if(!this.connection){
      const id = this.web3.personal.newAccount();
      console.log('GENERATE NEW ACCOUNT -- id = ', id, ' length = ', id.length)   
      this.getData();
    }  
  }

  cb(data?) {    
  }

  // ===================================================
  // ===============  Save and load File  ==============

  saveFile() {
    const fileContent = {test: 'test message', testData: 'test data for blob file'};
    const blob = new Blob([JSON.stringify(fileContent, null, 2)], {type: 'application/json'});
    FileSaver.saveAs(blob, 'test-export.json');
  }

  getFileFromPc() {
    console.log('upload file')
    this._http.get('file://C:/Users/Olya/Downloads/test-export.json')
    // this._http.get('/assets/test-export.json')
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
}
