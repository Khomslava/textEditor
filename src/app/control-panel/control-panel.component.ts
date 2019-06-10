import { ChangeDetectionStrategy, Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TextService } from '../text-service/text.service';

interface Button {
  id: string;
  mode: string;
  title: string;
  state: boolean;
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  buttonsData: Button[] = [
    { id: 'bold', mode: 'bold', title: 'B', state: false },
    { id: 'italic', mode: 'italic', title: 'I', state: false },
    { id: 'underline', mode: 'underline', title: 'U', state: false }
  ];

  constructor(private textService: TextService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._checkButtons();
  }

  formatText(mode: string, index: number) {
    document.execCommand(mode, false, null);
    this.buttonsData[index].state = document.queryCommandState(mode);
  }

  private _checkButtons() {
    this.textService.selectedWord.subscribe( selectedWord => {
        this.buttonsData.forEach(button => {
          button.state = document.queryCommandState(button.mode);
        });
        this.changeDetectorRef.markForCheck();
    });
  }

}
