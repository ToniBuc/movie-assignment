import { NgModule } from '@angular/core';
import { OptionsComponent } from './options.component';
import { OptionsService } from './options.service';

@NgModule({
    imports: [],
    exports: [OptionsComponent],
    declarations: [OptionsComponent,],
    providers: [OptionsService],
})
export class OptionsModule { }
