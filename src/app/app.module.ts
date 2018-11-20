import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Angular
import { MaterialModule } from './material.module';

// Routing
import { Routing } from './app.routing';

// Components
import { AnswerFormComponent } from './answer/answer-form.component';
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { SignupScreenComponent } from './auth/signup/signup-screen.component';
import { QuestionDetailComponent } from './question/detail/question-detail.component';
import { QuestionListComponent } from './question/list/question-list.component';
import { QuestionFormComponent } from './question/form/question-form.component';
import { AuthService } from './auth/auth.service';

// Plugins and libraries
import { MomentModule } from 'angular2-moment';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    SignupScreenComponent,
    QuestionListComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule
  ],
  providers: [AuthService], //Se agrega el servicio Auth para que todos los componentes de la applicacion puedan acceder a el
  bootstrap: [AppComponent]
})
export class AppModule { }
