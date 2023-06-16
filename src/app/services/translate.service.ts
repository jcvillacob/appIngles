import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  
  constructor(private http: HttpClient) { }


  translate(q: string[]): Observable<any> {
    const url = "https://lb.dioco.io/dt_translate_nllb";
    const body = { sourceLangCode_flores: "eng_Latn", targetLangCode_flores: "spa_Latn", textArray: q };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(url, body, { headers });
  }

  getTranslateByWord(palabra: string): Observable<any> {
    const url = `https://lb.dioco.io/base_cached_getHoverDict_5?form=${palabra}&lemma=&sl=en&tl=es`;
    return this.http.get<any>(`${url}`);
  }
}