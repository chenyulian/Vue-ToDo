// type Task = {
//    id: string, // 后端存储的时候生成
//    content: string, // 内容
//    status: number, // 状态，数字和后端约定好，请求和后端存储的时候均使用数字类型
//    project: string,// 所属项目
//    block: string | null, // 所属块，一个项目可以有多个模块
//    createTime: Date, //创建时间，前端生成的时候创建
//    dueDate: string | null, // 期望完成日期，可以为空（如果是重复任务）
//    dueTime: string | null, // 期望完成时间，具体到几分几秒
//    finishTime: Date | null, // 完成时间
//    // isRepeat: boolean,
//    // repeatRule: string | null,
//    tags: string[],
//    // priority: number //优先级
// }

import Task from "./lib/Task";

type RootState = {
   todayTaskList: Task[]
}