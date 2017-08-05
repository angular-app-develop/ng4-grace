import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../layout';
import { MAIN_MENU } from './menu';

@Component({
  selector: 'pages',
  templateUrl: './pages.html'
})
export class Pages {

  constructor(private _menuService: BaMenuService,) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>MAIN_MENU);
  }
}
