import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  subtitles: any[] = [];
  PreviewSubtitle: any = { sub: []};
  currentSubtitle: any = {};
  currentSubtitle2: any = {};
  hiddenWords: any[] = [];
  respuestas: any[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSubtitles();
  }

  loadSubtitles() {
    this.http.get('assets/Blank Space.srt', { responseType: 'text' }).subscribe(data => {
      const lines = data.split('\n');
      let startTime = null;
      let endTime = null;
      let text = '';
      let words = [];
      let id = 0;
      let c = 0;

      for (let line of lines) {
        c++;
        if (line.includes('-->')) {
          const times = line.split(' --> ');
          startTime = this.timeToSeconds(times[0]);
          endTime = this.timeToSeconds(times[1]);
        } else if (!isNaN(Number(line.trim()))) {
          continue;
        } else if (line.trim() !== '') {
          text = line.trim();
          if (lines[c].trim() !== '') {
            text = text + ' ' + lines[c].trim();
          }
          words = text.split(' ');
          let sub: any[] = [];
          for (let word of words) {
            id++;
            let hidden: boolean = false;
            if (Math.floor(Math.random() * 100) < 25) {
              hidden = true;
              this.hiddenWords.push({ word, id });
            }
            const subWord = { word, hidden, id };
            sub.push(subWord);
          }

          this.subtitles.push({ startTime, endTime, sub });
          words = [];
        } else {
          text += line + ' ';
        }
      }
    });
    this.generateOptions();
  }

  generateOptions() {
    setTimeout(() => {
      this.respuestas.push(this.hiddenWords[0]);
      for(let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * 7);
        if (this.respuestas.includes(this.hiddenWords[randomIndex])){
          i--;
          continue
        }
        this.respuestas.push(this.hiddenWords[randomIndex]);
      }
      console.log(this.subtitles);
    }, 100);
  }

  updateSubtitles(event: any) {
    if(this.PreviewSubtitle.sub.length === 0) {
      this.PreviewSubtitle = this.subtitles[0];
      this.currentSubtitle = this.subtitles[0];
      this.currentSubtitle2 = this.subtitles[1];
      return
    }
    const currentTime = event.target.currentTime;
    let c = 0;

    for (let subtitle of this.subtitles) {
        c++;
        if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime && this.PreviewSubtitle != subtitle) {

            // Chequea si hay un elemento con hidden === true en el currentSubtitle
            if (this.currentSubtitle  && this.PreviewSubtitle.sub.some((item: any) => item.hidden === true)) {
                // Pausa el video
                event.target.pause();
                return;
            }

            this.PreviewSubtitle = this.currentSubtitle;
            this.currentSubtitle = subtitle;
            this.currentSubtitle2 = this.subtitles[c];
            return;
        }
    }
}


  timeToSeconds(time: any) {
    const parts = time.split(':');
    const hours = +parts[0];
    const minutes = +parts[1];
    const seconds = +parts[2].replace(',', '.');
    return hours * 3600 + minutes * 60 + seconds;
  }

  comparacionAleatoria() {
    return Math.random() - 0.5;
  }

  playVideoFromCurrentSubtitle(videoElement: HTMLVideoElement) {
    if (videoElement.paused) {
        videoElement.currentTime = this.currentSubtitle.startTime + 0.1;
        videoElement.play();
    }
}

  evaluarRespuesta(resp: any, index: number) {
    const videoElement = document.querySelector('video');
    
    if (!videoElement) {
        console.error('Video element not found');
        return;
    }
    if(resp.word.split(',')[0].toLowerCase() === this.hiddenWords[0].word.split(',')[0].toLowerCase()) {
      let wordHId = this.hiddenWords[0].id;
      let c = 0;
      this.hiddenWords.shift();
      this.respuestas.splice(index, 1);

      while (this.respuestas.includes(this.hiddenWords[c])){
        c++;
      }
      this.respuestas.push(this.hiddenWords[c]);

      for(let frase of this.subtitles) {
        for(let palabra of frase.sub) {
          if(wordHId === palabra.id) {
            palabra.hidden = false;
          }
        }
      }

      this.respuestas = [...this.respuestas].sort(this.comparacionAleatoria);
      // Llamar a la nueva función para reanudar el video en caso de estar pausado
      this.playVideoFromCurrentSubtitle(videoElement);
    }
  }
}
