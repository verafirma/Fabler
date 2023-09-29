import { FablerUserAdapter } from '../core/fabler-user-adapter.js';
import { BrowserFablerUserAdapterOptions } from './browser-fabler-user-adapter-options.js';

export class BrowserFablerUserAdapter implements FablerUserAdapter {
  private history: string[] = [];
  private currentEntry: string = null;

  constructor(public opts: BrowserFablerUserAdapterOptions) {
    if (!opts?.inputId?.trim().length || !opts?.statusLineId?.trim().length || !opts.textId?.trim().length) {
      throw new Error('Invalid opts : ' + JSON.stringify(opts));
    }
    if (!document.getElementById(opts.inputId)) {
      throw new Error('No such inputId: ' + opts.inputId);
    }
    if (!document.getElementById(opts.statusLineId)) {
      throw new Error('No such statusLineId: ' + opts.statusLineId);
    }
    if (!document.getElementById(opts.textId)) {
      throw new Error('No such textId: ' + opts.textId);
    }

    const el: HTMLInputElement = document.getElementById(opts.inputId) as HTMLInputElement;
    el.addEventListener('keyup', (evt) => {
      if (evt.key === 'Enter') {
        this.currentEntry = el.value;
        el.value = '';
      } else {
        console.log('x');
      }
    });
  }

  private addTextToOutput(text: string): void {
    const el: HTMLTextAreaElement = document.getElementById(this.opts.textId) as HTMLTextAreaElement;
    el.value += text;
    el.scrollTop = el.scrollHeight;
  }

  public async print(text: string, scripting: boolean): Promise<void> {
    this.addTextToOutput(text);
  }

  public wait(timeoutMS: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve(null);
      }, timeoutMS);
    });
  }

  public async read(maxlen: number): Promise<string> {
    while (!this.currentEntry) {
      await this.wait(200);
    }
    const tmp: string = this.currentEntry;
    this.currentEntry = null;
    this.addTextToOutput(tmp + '\n');
    return tmp;
  }

  public async save(buffer: Uint8Array): Promise<boolean> {
    const encoded: string = new TextDecoder().decode(buffer);
    alert('Save: ' + encoded);
    return true;
  }

  public async restore(): Promise<Uint8Array> {
    const data: string = window.prompt('Data?');
    const decoded: Uint8Array = data?.length ? new TextEncoder().encode(data) : null;
    return decoded;
  }

  public async restarted(): Promise<any> {
    console.log('Restarted.');
  }

  public async highlight(fixpitch: boolean): Promise<any> {
    //console.log('Highlight is not implemented (Fixpitch was '+fixpitch+')');
  }

  public async screen(window: number): Promise<any> {
    //console.log('Screen is not implemented (window was '+window+')');
  }

  public async split(height: number): Promise<any> {
    //console.log('Split is not implemented (height was '+height+')');
  }

  public async updateStatusLine(text: string, v18: number, v17: number): Promise<any> {
    const el: HTMLElement = document.getElementById(this.opts.statusLineId);
    el.innerHTML = text;
  }
}
