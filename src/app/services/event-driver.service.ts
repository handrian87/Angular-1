import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ActionEvent} from "../state/product.state";

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {
  // Comme on va publier des évènements de type ActionEvent dans le Subject,
  // on va mettre ActionEvent dans '<>' dans Subject
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();

  // Création d'un Observable:
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  // Création d'une méthode pour publier un évènement:
  // À chaque qu'on appelle cette méthode, on va publier un évènement vers le sujet
  // qui est sourceEventSubject. Après tous les composants qui vont un Subscribe
  // à l'observable : sourceEventSubjectObservable vont recevoir l'évènement.
  publishEvent(event: ActionEvent){
    this.sourceEventSubject.next(event);
  }
}
