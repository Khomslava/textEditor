import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SynonymsService {

  synonyms = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) { }

  getSynonyms(word: string): Observable<any> {
    return this.http.get(`https://api.datamuse.com/words?rel_syn=${word}&max=10`)
      .pipe(
        tap( res => {
          if (res && res.length) {
            this.synonyms.next(res);
          }
        }));
  }

}
