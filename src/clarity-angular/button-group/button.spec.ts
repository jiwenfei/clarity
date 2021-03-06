/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {Component, DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ClarityModule} from "../clarity.module";
import {ButtonInGroupService} from "./providers/buttonInGroup.service";
import {Button} from "./button";

export default function(): void {
    describe("Buttons", () => {
        let fixture: ComponentFixture<any>;
        let buttons: Button[] = [];

        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [
                    ClarityModule.forRoot()
                ],
                declarations: [
                    TestButtonComponent
                ],
                providers: [
                    ButtonInGroupService
                ]
            });

            fixture = TestBed.createComponent(TestButtonComponent);
            fixture.detectChanges();
            let projection: DebugElement[] = fixture.debugElement.children;
            projection.forEach((debugElement) => {
                buttons.push(<Button>debugElement.componentInstance);
            });
        });

        afterEach(() => {
            fixture.destroy();
        });

        it("registers content projection", () => {
            expect(buttons.length).toBe(3);
        });

        it("supports the clrInMenu Input", () => {
            expect(buttons[0].inMenu).toBe(false);
            expect(buttons[1].inMenu).toBe(true);
            expect(buttons[2].inMenu).toBe(true);
        });

        it("supports the class Input", () => {
            expect(buttons[0].classNames).toBe("btn");
            expect(buttons[1].classNames).toBe("btn");
            expect(buttons[2].classNames).toBe("btn btn-primary");
        });

        it("registers the ButtonInGroupService if the parent is registered too", () => {
            expect(buttons[0].buttonInGroupService).not.toBeNull();
            expect(buttons[1].buttonInGroupService).not.toBeNull();
            expect(buttons[2].buttonInGroupService).not.toBeNull();
        });

        it("notifies when the clrInMenu input is updated with the help of the service", () => {
            let mockButton: Button;
            buttons.forEach((updatedButton) => {
                updatedButton.buttonInGroupService.changes.subscribe((button) => {
                    mockButton = button;
                });
            });

            buttons[0].inMenu = true;
            expect(mockButton.inMenu).toBe(true);

            buttons[0].inMenu = false;
            expect(mockButton.inMenu).toBe(false);

            buttons[1].inMenu = true;
            //Still expect false because the service method
            //shouldn't be called as the inMenu input was already true.
            //Its value did not change.
            expect(mockButton.inMenu).toBe(false);

            //Set to false because the input is true initially
            buttons[1].inMenu = false;
            expect(mockButton.inMenu).toBe(false);

            buttons[1].inMenu = true;
            expect(mockButton.inMenu).toBe(true);

            //First set to false because the input is true initially
            buttons[2].inMenu = false;
            expect(mockButton.inMenu).toBe(false);

            buttons[2].inMenu = true;
            expect(mockButton.inMenu).toBe(true);
        });
    });
};

@Component({
    template: `
        <clr-button>Test 1</clr-button>
        <clr-button [clrInMenu]="true">Test 2</clr-button>
        <clr-button [clrInMenu]="true" class="btn btn-primary">Test 3</clr-button>
    `
})
class TestButtonComponent {
}