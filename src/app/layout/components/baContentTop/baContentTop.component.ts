import { Component, OnInit } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { BaContentTopService } from '../../services/baContentTop/baContentTop.service';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop implements OnInit {

  activePageTitle: string = '';

  constructor(private _state: GlobalState,
    private translate: TranslateService,
    private baContentTopService: BaContentTopService
  ) {
    this.translate.use(localStorage.langKey);
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink && activeLink.title) {
        this.activePageTitle = activeLink.title;
        this.baContentTopService.setActivePageTitle(activeLink.title);
      }
    });
  }

  ngOnInit() {
    this.activePageTitle = this.baContentTopService.getActivePageTitle();
  }
}
