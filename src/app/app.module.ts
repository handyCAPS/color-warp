import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorBlockComponent } from './color-block/color-block.component';
import { VariablesComponent } from './variables/variables.component';
import { HexToHslPipe } from './pipes/hex-to-hsl.pipe';

@NgModule({
  declarations: [AppComponent, ColorBlockComponent, VariablesComponent, HexToHslPipe],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
