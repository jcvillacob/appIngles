import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lectura: boolean = false;
  textToTranslate: string[][] = []
  translatedText: string[][] = []

  onTranslateText(textToTranslate: string[][]) {
    this.textToTranslate = textToTranslate;
  }

  onTranslatedText(translatedText: string[][]) {
    this.translatedText = translatedText;
    if (this.translatedText[0][0]) {
      this.lectura = true;
    }
    
  }
}