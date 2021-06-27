import Block from "@/lib/Block";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export class BlockHelper extends Vue {
    getBlockById(id:string):Block {
        const blockList = this.$store.state.blockList as Block[];
        const block = blockList.find(i => i.id === id);
        if(block === undefined){
            const result = new Block();
            result.id = "-1";
            return result;
        } else {
            return block;
        }
    }
}

export default BlockHelper;