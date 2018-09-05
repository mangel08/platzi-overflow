import { NgModule } from '@angular/core';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule
} from '@angular/material';



const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
