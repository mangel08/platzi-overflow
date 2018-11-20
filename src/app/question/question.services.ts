import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment'
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

// Modelos
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';

@Injectable()
export class QuestionService {

  private questionsUrl: string;
 
  constructor(private http: Http) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  // Metodo HTTP para obtener el listado de las preguntas
  getQuestions(): Promise<void | Question[]> {
    return this.http.get(this.questionsUrl)
          .toPromise()
          .then((response) => {
            console.log(response);
            return response.json() as Question[];
          }) 
          .catch(this.handleError);
}

  // Metodo HTTP para obtener una pregunta mediante id
  getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id)
    console.log(url);
    return this.http.get(url)
          .toPromise()
          .then((response) => {
            console.log(response.json());
            return response.json() as Question
          })
          .catch(this.handleError);
  }

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = this.getToken();
    const url = this.questionsUrl + token;
    return this.http.post(url, body, { headers })
      .map((response: Response) => {
        console.log(response.json());
        response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addAnswer(answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const id = answer.question._id.toString();
    const url = urljoin(this.questionsUrl, id, 'answers');
    const token = this.getToken();

    return this.http.post(url + token, body, { headers })
      .map((response: Response) => {
        console.log(response.json());
        response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg)
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

}