export class AttendanceType {
    ID?          : number;
    type?        : string;
    description? : string;
}

export class Attendance {
    ID?         : number;
    date?       : Date;
    employee?   : number;
    status?     : number;
}