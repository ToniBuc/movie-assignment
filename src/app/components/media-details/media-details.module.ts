import { NgModule } from '@angular/core';
import { MediaDetailsComponent } from './media-details.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [MediaDetailsComponent],
    declarations: [MediaDetailsComponent],
    providers: [],
})
export class MediaDetailsModule { }
