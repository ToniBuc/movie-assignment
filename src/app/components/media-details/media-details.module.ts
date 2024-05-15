import { NgModule } from '@angular/core';
import { MediaDetailsComponent } from './media-details.component';
import { CommonModule } from '@angular/common';
import { TimeModule } from '../../pipes/time.module';

@NgModule({
    imports: [
        CommonModule,
        TimeModule
    ],
    exports: [MediaDetailsComponent],
    declarations: [MediaDetailsComponent],
    providers: [],
})
export class MediaDetailsModule { }
