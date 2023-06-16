import { Component, Input } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-lectura-texto',
  templateUrl: './lectura-texto.component.html',
  styleUrls: ['./lectura-texto.component.css']
})
export class LecturaTextoComponent {
  @Input() translatedText!: string[][];
  @Input() textToTranslate!: string[][];

  translation = '';
  translationID = [-1, -1, -1];
  tooltipPosition = { x: 0, y: 0 };

  traduccion: boolean = false;

  constructor(private translateService: TranslateService) { }

  onMouseOver(palabra: string, i: number, j:number, z:number, event: MouseEvent) {
    this.translateService.getTranslateByWord(palabra).subscribe(response => {
      if (response.data.d_lemma != null) {
        this.translation = response.data.d_lemma.trans.translation;
      } else {
        this.translation = response.data.ms_translate_form;
      }
      this.tooltipPosition = {
        x: event.clientX - 20,
        y: event.clientY - 80
      };
      this.translationID = [i, j, z];
    })
  }

  onMouseOut() {
    this.translation = '';
    this.translationID = [-1, -1, -1];
  }

}
