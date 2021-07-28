
import Vue from 'vue';
import AddProjectDialog from "@/components/dialogs/AddProjectDialog.vue";
import store from "@/store"
export const openDialog = () => {
   
    const div = document.createElement("div");
    document.body.appendChild(div);
   

    const dialog = new Vue({
        store,
        render: h => h(AddProjectDialog, 
                      {props: {visible: true}, 
                      on: {
                          'update:visible': (newVisible:boolean) => {
                            if(newVisible === false) {
                                close();
                            }
                        }
                    }}
        ),
      });
    
    const close = () => {
        document.body.removeChild(dialog.$el);
        dialog.$destroy();
        div.remove();
    }
    dialog.$mount(div);
    
}