import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestingApiServer, ProductionApiServer} from '../../../config';
/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigurationProvider {
  currentServer: Server = Server.productionServer;

  constructor(public http: HttpClient) {
    console.log('Hello ConfigurationProvider Provider');
    this.currentServer = this.getFromLocal();
  }

  changeServer(server: Server) {

    this.currentServer = server;
    this.saveToLocal(server);
  }

  getServerUrl(){
    return this.currentServer === Server.testingServer ? TestingApiServer : ProductionApiServer;
  }

  saveToLocal(server: Server){
    localStorage.setItem('Server', server + '');
  }

  getFromLocal(): Server{
    const server = localStorage.getItem('Server');
    if(server != null && server !== ''){
      const parsedServer = parseInt(server, 10);
      if(!isNaN(parsedServer)){
        return parsedServer;
      }
    }
    this.saveToLocal(Server.productionServer);
    return Server.productionServer;
  }

  getServer(): Server{
    return this.currentServer;
  }

}

enum Server {
  testingServer = 1,
  productionServer = 2
}
