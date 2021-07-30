import dayjs from 'dayjs';
import { colorList } from '@/constants/colorList';
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
    },

    getLight: (base: string):string => {
        return colorList.find(c => c.base === base)?.light || '#fff';
    },
    getDark: (base: string):string => {
        return colorList.find(c => c.base === base)?.dark || '#333';
    }
}