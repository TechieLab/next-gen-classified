import { BaseEntity } from './baseEntity';

export class Theme {
    Name: string;
    Type: string;
    PrimaryColor: string;
    SecondaryColor: string;
    TernaryColor: string;

    constructor() {
        this.Name = '';
        this.Type = '';
        this.PrimaryColor = '#fff';
        this.SecondaryColor = '#000';
        this.TernaryColor = '#ccc';
    }
}