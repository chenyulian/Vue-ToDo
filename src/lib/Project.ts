export default class Project{
    id:string;
    name:string;
    color:string;
    status:number;
    collapsed:number;

    constructor() {
        this.id = "";
        this.name = "";
        this.color = "#b8b8b8";
        this.status = 1;
        this.collapsed = 0;
    }
}