import {FablerUserAdapter} from "./fabler-user-adapter.js";

export class TestingFablerUserAdapter implements FablerUserAdapter {

  constructor(private commands?:string[], public isTandy:boolean = false) {
    if (!this.commands || this.commands.length===0) {
      this.commands = ['CMD 1','CMD 2','CMD 3','CMD 4','CMD 5'];
    }
  }

  public async print(text:string,scripting:boolean):Promise<void> {
    console.log(text,"ascii");
  };

  public async read(maxlen:number):Promise<string> {
    let idx:number = 0;
    return (idx < this.commands.length) ? this.commands[idx++] : null;
  };

  public async save(buffer: Uint8Array):Promise<boolean> {
    console.log('Save is not implemented');
    console.log('Received : ',buffer);
    return false;
  };

  public async restore():Promise<Uint8Array> {
    console.log('Restore is not implemented');
    return null;
  }

  public async restarted():Promise<any> {
    console.log('Restarted is not implemented');
    return null;
  }

  public async highlight(fixpitch: boolean):Promise<any> {
    console.log('Highlight is not implemented (Fixpitch was '+fixpitch+')');
    return null;
  }

  public async screen(window:number):Promise<any> {
    console.log('Screen is not implemented (window was '+window+')');
    return null;
  }

  public async split(height:number):Promise<any> {
    console.log('Split is not implemented (height was '+height+')');
    return null;
  }

  public async updateStatusLine(text:string,v18:number,v17:number):Promise<any> {
    console.log(`UpdateStatusLine is not implemented (text was ${text} : v18: ${v18} v17: ${v17}`);
    return null;
  }
}
