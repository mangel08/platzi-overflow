import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { SignupScreenComponent } from './auth/signup/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

/* Declaramos las rutas
   path: nombre de la ruta
   component: El componente a mostrar
*/
const APP_ROUTES: Routes = [
  { path: '', component: QuestionListComponent }, /* Ruta Home*/
  { path: 'signin', component: SigninScreenComponent }, /* Ruta Signin*/
  { path: 'signup', component: SignupScreenComponent }, /* Ruta Signup*/
  { path: 'questions', children: QUESTION_ROUTES } /* Rutas de Questions*/
]; 

export const Routing = RouterModule.forRoot(APP_ROUTES);
