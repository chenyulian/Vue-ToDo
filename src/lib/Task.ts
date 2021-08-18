export default class Task  {
    id: string; // 后端存储的时候生成
    content: string; // 内容
    status: number; // 状态，数字和后端约定好，请求和后端存储的时候均使用数字类型
    project_id: string;// 所属项目
    parent_id: string | null;
    create_time: Date; //创建时间，前端生成的时候创建
    due_date: string | null; // 期望完成日期，可以为空（如果是重复任务）
    finishTime: Date | null; // 完成时间
    tags: string[];
    priority: number; //优先级
    collapsed: number;
    user_id: string|null;

    constructor() {
       this.id = "";
       this.content = "";
       this.status = -1;
       this.project_id = "-1";
       this.create_time = new Date();
       this.due_date = null;
       this.parent_id = null;
       this.finishTime = null;
       this.tags = [];
       this.priority = 1;
       this.collapsed = 0;
       this.user_id = null;
    }
 }
 