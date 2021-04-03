import { ElementRef } from "@angular/core";

declare var M;

export class MaterialService {
  static toast(message: string){
    M.toast({html: message})
  }

  static initializeFloatingBtn(ref: ElementRef){
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs(){
    M.updateTextFields();
  }
}
