import { EventEmitter, Inject, Injectable, Output } from '@angular/core';

import TextesFR from '../ressources/textes-fr.json';
import TextesEN from '../ressources/textes-en.json';

import MessagesFR from '../ressources/messages-fr.json';
import MessagesEN from '../ressources/messages-en.json';

import LiensFR from '../ressources/liens-externes-fr.json';
import LiensEN from '../ressources/liens-externes-en.json';

import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TextesService {

  @Output() changementLangue = new EventEmitter();

  public langueCourante = '';

  public cles!: KeyedCollection<string>;
  public messages!: KeyedCollection<string>;
  public liens!: KeyedCollection<string>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.langueCourante = 'fr';
    this.initialiserDictionnaire();
  }

  public changerLangue(langue: string): void{
    this.document.documentElement.lang = langue;
    this.langueCourante = langue;
    this.initialiserDictionnaire();

    this.changementLangue.emit();
  }

  public obtenirChaineCulture(): string {
    console.log('Obtenir culture');
    if (this.langueCourante === 'fr'){
      return 'fr-CA';
    }else{
      return 'en-CA';
    }
  }

  public obtenirTexte(cle: string): string {
    return this.cles.Item(cle);
  }

  public obtenirMessage(cle: string): string {
    return this.messages.Item(cle);
  }
  public obtenirLien(cle: string): string {
    return this.liens.Item(cle);
  }

  public initialiserDictionnaire() {
    this.cles = new KeyedCollection<string>();
    this.messages = new KeyedCollection<string>();
    this.liens = new KeyedCollection<string>();

    if (this.langueCourante === 'fr'){
      TextesFR.textes.forEach(x => {
        this.cles.Add(x.cle, x.valeur);
      });
      MessagesFR.textes.forEach(x => {
        this.messages.Add(x.cle, x.valeur);
      });
      LiensFR.liens.forEach(x => {
        this.liens.Add(x.cle, x.valeur);
      });
    } else {
      TextesEN.textes.forEach(x => {
        this.cles.Add(x.cle, x.valeur);
    });
      MessagesEN.textes.forEach(x => {
        this.messages.Add(x.cle, x.valeur);
    });
      LiensEN.liens.forEach(x => {
        this.liens.Add(x.cle, x.valeur);
    });
    }
  }
}

export interface IKeyedCollection<T> {

  // Add(key: string, value: T);
  ContainsKey(key: string): boolean;
  Count(): number;
  Item(key: string): T;
  Keys(): string[];
  Remove(key: string): T;
  Values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private items: {[index: string]: T} = {};

  private count = 0;

  public ContainsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public Count(): number {
    return this.count;
  }

  public Add(key: string, value: T) {
    if (!this.items.hasOwnProperty(key)) {
    this.count++;
    }

    this.items[key] = value;
  }

  public Remove(key: string): T {
    const val = this.items[key];
    delete this.items[key];
    this.count--;
    return val;
  }

  public Item(key: string): T {
    return this.items[key];
  }

  public Keys(): string[] {
    const keySet: string[] = [];

    for (const prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }
    return keySet;
  }

  public Values(): T[] {
    const values: T[] = [];

    for (const prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }
    return values;
  }

}
