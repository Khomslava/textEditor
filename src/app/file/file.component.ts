import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextService } from '../text-service/text.service';
import { SynonymsService } from './../synonyms-service/synonyms.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text$: Promise<string>;

  @ViewChild('textField') textField: ElementRef;

  constructor(private textService: TextService,
              private synonymsService: SynonymsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  dbClickOnText() {
    const selectedWord = window.getSelection().toString();
    if (selectedWord) {
      this.getSynonyms(selectedWord);
      this._focus();
      this.textService.selectedWord.next(selectedWord);
    }
  }

  getSynonyms(word: string) {
    this.synonymsService.getSynonyms(word).subscribe(synonyms => {
      this.changeDetectorRef.markForCheck();
    });
  }

  private _focus() {
    this.textField.nativeElement.focus();
  }

}
