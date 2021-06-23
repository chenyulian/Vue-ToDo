export default class Block {
    id: string;
    name: string;
    status: number;
    project_id: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.status = 1;
        this.project_id = "-1";
    }
}