import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question.model';
import icons from '../icons';
import { QuestionService } from '../question.services';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [QuestionService]
})
export class QuestionFormComponent implements OnInit {
  icons: Object[] = icons;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private authService: AuthService
   ){}

  getIconVersion(icon: any) {
    let version;
    if (icon.versions.font.includes('plain_wordmark')) {
      version = 'plain-wordmark';
    } else {
      version = icon.versions.font[0];
    }

    return version;
  }

  onSubmit(form: NgForm) {
    const q = new Question(
      form.value.title,
      form.value.description,
      new Date(),
      form.value.icon
     );
    this.questionService.addQuestion(q).subscribe(({ _id }) => this.router.navigate(['/questions', _id]),
        this.authService.handleError
      );

      form.resetForm();
  }

  ngOnInit(){
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
  }
}