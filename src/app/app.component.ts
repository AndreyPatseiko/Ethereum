import {Component, OnInit} from '@angular/core';
import {EthereumService} from  './ethereum.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import * as FileSaver from 'file-saver';
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
  elementType : 'url' | 'canvas' | 'img' = 'url';

  constructor(private ethService: EthereumService, private _http: Http) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // if (this.web3.isConnected()) {
    //   this.info = [];
    //   this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
    //   const contracts = this.web3.eth.accounts;
    //   contracts.map((el) => {
    //     const bal = this.web3.eth.getBalance(el, '', this.cb());
    //     this.info.push({el: el, value: this.web3.fromWei(bal, 'ether').toNumber()});
    //   });
    //   console.log(this.info);
    // } else {
    //   this.connection = true;
    // }
  }
  
  createNewAccount(){    
    if(!this.connection){
      // const id = this.web3.personal.newAccount();
      // console.log('GENERATE NEW ACCOUNT -- id = ', id, ' length = ', id.length)   
      this.getData();
    }  
  }

  cb(data?) {    
  }

  // ===================================================
  // ===============  Generate and save QR code  =======
  saveQr(element){
    // const base_image = new Image();
    // base_image.src = Base64String;
    // var canvas = document.getElementById('YourCanvas');
    // context = canvas.getContext('2d');
    // context.drawImage(base_image, 0,0);


    // x_canvas.toBlob(function(blob) {
    //   saveAs(blob, "screenshot.png");
    //   }, "image/png");

    // const content = element.elementRef.nativeElement.childNodes[0].currentSrc;
    console.log('element ', element)    
    // console.log('content ', content)    
    // const blob = new Blob(['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAHkklEQVR4Xu2d23LruA4Fk///6JyakqYqrhOKbHhBF0/vZ4gCgcYCSDve319fXz9fD/j385Nx8/v7+8/djtan9jSUdP2RPX1vt/0/Uc5krNlTwdoCLFhh0ARLsMJIbcsJlmAJFoiAMxYIVoepivUhipVKJIUsVcHdp7zUEE3jTOND40/tR/4MT4V0w9ShkT0NXLc99ZPGgcaZ7pf6Q+0Fa49YKjEq1nFrVrF24FLKQSs+9V66DvWTKrdgCdZbjNkKbYVvAdSuWN2zRWoGSkWR+kPjQ1tYtz+juNFTNm6FNHApR2kCBCt77yVYKaKKrZMWHi0YFWuSYFoBNAEpvroTSffV7U+qw9gKJwR2J1KwJq2BKoSKtUVMsG4KFp1pUlJPC4m+lx7vaaFS/+n6j2+FgnWsfFfFR7AmN++pxKhYJwWaSiu175Z6ur5gCdYLAypWrdXaCk8qJBXrpEDT1tZ9LKetjd5v0fU9FRYjJli1wFGgU62c5uvxrTBV2TTNNMF0/dS+BGtyAWsr3AJEgRYswVoSNcGahIn2bBXrwxVrqazeMOquSAr0G1t561HqJy28t5z79fB/7jvv9N4oNYukEiZYqUgWZywKBE1YeHvLy1E/VaxJaG2FW4AEa7kG1wwFS7DWSIFWgvXhYEEe2s1TrSEF7t38aU8AfMHjf4P0U0Gh4MK8t5sL1h5imsi72beTAl8gWIIFkVkzFyzBWiMFWgmWYEFk1sy/f666sl3zr2xFb+RHL6Lhoe+l65cDcvKDgjUJOE28YG0BFSzBatEywRIswSIRoC3JGYtEd26rYqlYc0oKFpddN9Cb68Le/nzkqvdSRXz8R1VX/X+FVyX4qvcKVkoaii0mNRulEtkdDgr6Y+xVrP3eZfBf+grWcXyGoAuWYP0unpgiCpZgnQoWJZe2jNRHJd3r0NMZjUNq/dutM1IswarNFoK1x02wtkDQQqJKOQLudkozOMTQ/d7uZ4zuloBU4u+2r3Z/VCwV6zdkqUJSsfao2gqzM2XsQ+gY6aGLyruB8qmfBAxbauqryYJVuw+jBUBPndQ+5Y+KNWmFNDH0s85UIqmf3QoqWIL1wlgKdMESLMEick8rj14A0nug7tZDYnNkS+MWG95TQzoNRGp2Sb03lYC7AUcLbPgbpPRUKFi1C1UKdDe4FGiq0HjGEizBWrmpF6yJlNBCoi2bKkdqffpeFeukU153q+peX7D2CNBKpUMorcjuxHevfxlYNJHdwykFhfp/VSJp3CgQNA7Un2HcRqfCyxxKfdEMfpgtWBSpySFGsM455dXStv7UVYWhYk1ydFVi1tE5trzKf8ESrBTDL+sIlmCdCxb9znv3sTwl6Xc7RdJ9pfzvfu+QB8HaQkNPwamE0Zv9qwqbyh3+Y4qrNpZKPPU/dW+UApH63/1eFWtScilwqQJRe8HaI5CqmFTiaWJULNoE99HCGcsZ6zc69NAQa4VXKQfdcKrFUIWjCl3Tg76nUv7j4V2wjhUulZg+dI5XTvkvWMUMUkWkBVl06+3HBKt4yqMt1VZYm0FVrGKNq1jHgRMswXqJwGNaIb0Honmms0uqFdIWSePw9H21KxYNqGDVZpq7FYxgUZKLhwZaYCpWMTGpCnt6AlIzTSqeqRavYhULI5UAwdojSRWCtgCaZ+rP3SpbsMKzBQWoG9C7KVAqPt1xG/7aTPe3G54SIMGqZUqwanFr/8py0a23H0uNBIJVTEVqhqPrFN1dfkywJqFKBchWuMzki6GKVYubrbB4aMM/vFbMT9tj9FsGVJlSikhb4VPeO1Qs+hukbYQUFxas48B1Ay1YRUl/inJQJU7dbwmWYC31BFpIgiVYgrUUgd3IGeumM9boIx2S3DNsUx/W0tkiBS6dgeh+U/bUz6G9YG2h6U4MTVjKn1Rh0NPl8PtYZ6gQeQcNNFlbsObREqx5jP60oODS05OKVUxM92M08dQfur5gTQ4NzljOWCtFGGuFqYpccfq3TWrYTL2XniJT703FPxVPug7+YwoaOGpPN0DXp7OOYG0RoHkRrJ0cKvV3UxRaMNR/wSpKmGBNhnH4fxypWCrWUimqWEth+n8jFetixaIJoMMvrgwq0dCezi5Frk9/jM5Y1EHcCgXr+JREE3CVvWDtkU/djFNFVLFq6KtYE3AFS7BeIpBSOMESLMECDDhjFWcsEOND05Tydc92FBTqDz20feyMJVjhe6nBNc1wVKA/Y0TJveoeS7AE6yUC3RJNgbMV1u7tbIUT0gRLsKgYLdkLlmAtXTcs0fRAo+4RghbYx7ZCevx+IEunzqaCVfyIRrCOIyBYgrU0EtBrI8ESLMH6S3xTQ6gz1hZdqjSpC208vHfPIimwaICu2hf1k8ZntH73OoLVTdS+fvdMQxVasCYzUyph3Xyl/OwGIgWoitVNlIr1GmFKbio/tCJTSpDyn840zljdkZ9Udvfppnt7qQKghUdBp4Iy8udjf9GPBogmgILY7Q9dn4JO9ytYk4ilEkATT0Gn66f2NfTzU394jQaaJpJWcLc/dH3BKl430EALFi2VY3tboa0wS9S/hzBb4aTy4F+n0OsDmtXuUyH1Z2T/P6gvECimMDyhAAAAAElFTkSuQmCC'], {type: 'image/png'});
    // FileSaver.saveAs(blob, 'rq-code.png');
  }


  // ===============  Generate and save QR code  =======
  // ===================================================
  
  
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
