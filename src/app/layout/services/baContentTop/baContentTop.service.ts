import { Injectable } from '@angular/core';

@Injectable()
export class BaContentTopService {

    constructor() {
    }

    setActivePageTitle(title: string) {
        localStorage.setItem("activePageTitle", title);
    }

    getActivePageTitle() {
        return localStorage.getItem("activePageTitle");
    }
}
