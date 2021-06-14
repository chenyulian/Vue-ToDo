import Block from "./Block";

export default class Project{
    id:string;
    name:string;
    color:string;
    status:number;
    blocks: Block[];

    constructor() {
        this.id = "";
        this.name = "";
        this.color = "#b8b8b8";
        this.status = 1;
        this.blocks = [];
    }
}