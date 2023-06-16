import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-ingreso-texto',
  templateUrl: './ingreso-texto.component.html',
  styleUrls: ['./ingreso-texto.component.css']
})
export class IngresoTextoComponent {
  inputText: string = '';
  textToTranslate: string[][] = [];
  translatedText: string[][] = [];

  @Output() translatedTextEvent = new EventEmitter<string[][]>();
  @Output() textToTranslateEvent = new EventEmitter<string[][]>();

  constructor(private translateService: TranslateService) { }

  async translate() {
    const paragraphs = this.inputText.split('\n\n');
    const sentences = paragraphs.map(paragraph => paragraph.split('.'));
    const cleanedSentences = sentences.map(sentence => sentence.filter(text => text.trim() !== ''));
    this.textToTranslate = cleanedSentences;
    if(!this.textToTranslate[0][0]){
      return
    }

    for (let i = 0; i < this.textToTranslate.length; i++) {
      const response = await this.translateService.translate(this.textToTranslate[i]).toPromise();
      this.translatedText.push(response.data.translationArray);
    }
    // Emitir el evento al componente padre
    this.textToTranslateEvent.emit(this.textToTranslate);
    this.translatedTextEvent.emit(this.translatedText);
  }
}