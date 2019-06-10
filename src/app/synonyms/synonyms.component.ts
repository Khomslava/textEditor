import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { SynonymsService } from './../synonyms-service/synonyms.service';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SynonymsComponent implements OnInit {

  synonyms: any[];
  constructor(private synonymsService: SynonymsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._getSynonyms();
  }

  private _getSynonyms() {
    this.synonymsService.synonyms.subscribe(synonyms => {
      this.synonyms = synonyms;
      this.changeDetectorRef.markForCheck();
    });
  }

}
