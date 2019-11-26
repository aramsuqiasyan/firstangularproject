import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(private el: ElementRef) {
    }

    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('click') onClick() {
        this.isOpen = !this.isOpen;
        this.el.nativeElement.isOpen;

    }
}
