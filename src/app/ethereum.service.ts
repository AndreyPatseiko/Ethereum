import {Injectable} from '@angular/core';
import Web3 from 'web3';

@Injectable()
export class EthereumService {
  web3: Web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  getData() {
    this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
    const contracts = this.web3.eth.accounts;
    contracts.map((el) => {
      this.web3.eth.getBalance(el, (err, bal) => {
        if (!err) console.log('bal el ' + el + ' =', this.web3.fromWei(bal, 'ether').toNumber());
      });
    })
    const fooContract = this.web3.eth.contract([{
      "constant": true,
      "inputs": [],
      "name": "getFoo",
      "outputs": [{"name": "", "type": "bytes32"}],
      "payable": false,
      "type": "function"
    }, {
      "constant": false,
      "inputs": [{"name": "_foo", "type": "bytes32"}],
      "name": "setFoo",
      "outputs": [],
      "payable": false,
      "type": "function"
    }]);
    const foo = fooContract.at('0xd3652abe7f6034b313c6c396e714f36cc372bb62');
  }
}
