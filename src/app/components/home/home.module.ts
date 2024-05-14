import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { OptionsModule } from '../options/options.module';
import { ListModule } from '../list/list.module';

@NgModule({
    imports: [
        CommonModule,
        OptionsModule,
        ListModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
