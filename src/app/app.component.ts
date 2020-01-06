import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Represents a Person model.
 * */
type Person = {
  firstname: string
  lastname: string
  age: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
  title = 'rxjs-angular';

  people$: Observable<Person[]>

  legalAgePeople$: Observable<Person[]>

  ngOnInit(): void {

    const people: Person[] = [
      { firstname: 'jon', lastname: 'snow', age: 21 },
      { firstname: 'arya', lastname: 'stark', age: 14 },
      { firstname: 'tyrion', lastname: 'lannister', age: 32 }
    ];


    // from source array.
    const people$ = of(people);


    // single subscription.
    people$.subscribe(person => {

      console.log(person);
    });

    // map - transforming values inside observable.
    this.people$ = people$.pipe(
      map(people => {
        return people.map(person => {

          const personPrime: Person = {
            firstname: person.firstname.toUpperCase(),
            lastname: person.lastname.toUpperCase(),
            age: person.age
          };

          return personPrime;

        })
      })
    );

    this.legalAgePeople$ = people$.pipe(
      map(people => people.filter(person => person.age > 18))
    );


  }

}


