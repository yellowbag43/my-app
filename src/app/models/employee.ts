export class Employee {
    ID?         : number;
    dob?        : Date;
    name?       : string;
    gender?     : number;
    type?       : number;
    typestr?    : string;
    title?      : string;
    mobile?     : string;
    email?      : string;
    address?    : string;
    area?       : string;
    state?      : string;
    zip?        : string;
    salary?     : number;
    pf?         : number;
    bankname?   : string;
    account?    : string;
    ifsccode?    : string;
    cashadvance?: number;
}

export class Employeetype {
    ID?         : number;
    type?       : string;
    description? : string;
}