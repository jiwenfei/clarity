/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {Selection} from "./providers/selection";

@Component({
    selector: "clr-dg-action-bar",
    template: `
        <ng-content *ngIf="selection.current && selection.current.length > 0"></ng-content>
    `,
    host: {
        "[class.datagrid-action-bar]": "true"
    }
})
export class DatagridActionBar {

    constructor(public selection: Selection) {}

}