export class ReponseBase<T> {

    valeur!: T;
    estUnSucces!: boolean;
    evenements: Evenement[] = [];

    constructor() {
    }

}


export class Evenement {
    type!: string;
    code!: string;
    description!: string;

    constructor() {
    }
}