import dayjs from 'dayjs';
export default {
    formatDate: (date:Date):string => {
        if(date === null) {
            return "日程安排";
        }         
        if(dayjs(date).isSame(dayjs(new Date()),'day')){
            return "今天";
        }
        if(dayjs(date).isSame(dayjs(new Date()).add(1,'day'),'day')){
            return "明天";
        }
        if(dayjs(date).isSame(dayjs(new Date()).add(2,'day'),'day')){
            return "后天";
        }
        return dayjs(date).format("MM-DD");
    }
}