import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'img[src]',
    host: {
        '[src]': 'checkPath(src)',
        '(error)': 'onError()'
    }
})
export class DefaultImageDirective { 
    @Input() src: string;
    public defaultImg: string = '/assets/default-placeholder.png';
    public onError() {
        return this.defaultImg;
    }
    public checkPath(src) {
        return src ? src : this.defaultImg;
    }
}