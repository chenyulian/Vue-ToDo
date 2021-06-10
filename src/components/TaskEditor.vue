<template>
<div class="task_editor" :class="isEditing===true?'isEditing':''">
    <div class="task_edit_container" :class="isEditing===true?'isEditing':''">
        <div class="content-container">
            <el-button v-if="selectedTagName!==''" type="primary" icon="el-icon-price-tag" size="mini">{{selectedTagName}}</el-button>
            <input type="text" v-model = "task_content" width="100%" placeholder="请输入任务内容，例如：慢跑半小时">
        </div>
        
        <div class="task_meta">
            <div class="task_meta_main">
                <el-button plain size="mini" v-popover:date-popover icon="el-icon-date">{{dueDateString}}</el-button>
                <el-tooltip class="item" effect="dark" content="选择一个项目" placement="bottom">
                    <el-button plain size="mini" v-popover:section-popover icon="el-icon-receiving">{{projectFullName}}</el-button>
                </el-tooltip>
                <el-popover
                    placement="bottom"
                    trigger="click"
                    ref="date-popover"
                    v-model="visible">
                    <el-date-picker
                        v-model="dueDate"
                        type="date"
                        @change="visible = !visible"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-popover>
                <el-popover
                    placement="bottom"
                    trigger="click"
                    ref="section-popover"
                    v-model="moreVisible"
                    >
                    <el-table
                        :data="tableData"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        default-expand-all
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                        @row-click="selectProject">
                        <el-table-column
                        prop="project"
                        label="项目"
                        sortable
                        width="180">
                        </el-table-column>
                    </el-table>
                </el-popover>
            </div>
           
           <div class="task_meta_quick_settings">
               <ul>
                   <li>
                       <el-tooltip class="item" effect="dark" content="选择标签" placement="bottom">
                        <i class="el-icon-collection-tag icon_tag" v-popover:tags-popover></i>
                       </el-tooltip>
                       <el-popover
                            placement="bottom"
                            title="标签"
                            width="200"
                            trigger="click"
                            ref="tags-popover"
                            >
                            <ul class="tags">
                                <li @click="selectTag">工作</li>
                                <li @click="selectTag">自我提升</li>
                                <li @click="selectTag">娱乐</li>
                            </ul>
                        </el-popover>
                    </li>
               </ul>
           </div>
        </div>
        
    </div>
    <div class="buttons_container">
        
        <el-button type="primary" size="medium" class="add_button" v-if="isEditing" @click="addTask" :disabled="addButtonAvaliable">
            <i class="el-icon-circle-plus"
            ></i>
            添加任务
        </el-button>

        <el-button type="text" size="medium" class="add_button" v-else
            @click="isEditing = !isEditing">
            <i class="el-icon-circle-plus"></i>
            添加任务
        </el-button>

        <el-button type="text" size="medium" class="cancel_button" v-if="isEditing"
            @click="isEditing = !isEditing">
            取消
        </el-button>
    </div>
</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import dayjs from 'dayjs'

    @Component
    export default class TaskEditor extends Vue{
        task_content = "";
        dueDate = new Date();
        visible = false;
        moreVisible = false;
        isEditing = false;
        addButtonDisabled = true;
        project = "收集箱";
        parentProject = "";
        selectedTagName = "";

        task = {
            content: "",
            dueDate: new Date(),

        }

        get projectFullName():string {
            return this.parentProject === ""?this.project:this.parentProject+" / "+this.project;
        }
        get dueDateString():string {            
            if(dayjs(this.dueDate).isSame(dayjs(new Date()),'day')){
                return "今天";
            }
            if(dayjs(this.dueDate).isSame(dayjs(new Date()).add(1,'day'),'day')){
                return "明天";
            }
            if(dayjs(this.dueDate).isSame(dayjs(new Date()).add(2,'day'),'day')){
                return "后天";
            }
            return dayjs(this.dueDate).format("MM-DD");
        }
        get addButtonAvaliable():boolean {
            return this.task_content.length <= 0;
        }

        tableData = [{
          id: 1,
          project: '健身',
          parentProject: '',
          children: [
              {
                  id: 2,
                  project: '跑步',
                  parentProject: '健身'
              },
               {
                  id: 3,
                  project: '游泳',
                  parentProject: '健身'
              },

          ]
        }, {
          id: 4,
          project: '画画',
          parentProject: '',
        }, {
          id: 5,
          project: '阅读',
          parentProject: '',
          children: [{
              id: 51,
              project: '钢铁是怎样炼成的',
              parentProject: '阅读',
            }, {
              id: 52,
              project: '战争与和平',
              parentProject: '阅读',
            },
            {
              id: 53,
              project: '活着',
              parentProject: '阅读',
            },
          ]
        }];

        addTask():void {
            console.log('add')
        }

        selectProject(row: { project: string; parentProject:string }):void {
            this.project = row.project;
            this.parentProject = row.parentProject;
            this.moreVisible = false;
        }
       
       selectTag(event:MouseEvent):void {
           const selectedTag = event.target as HTMLLIElement;
           this.selectedTagName = selectedTag.innerText;
       }

    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/common.scss';

.task_editor {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    margin-top: 8px;
    &.isEditing{
        border: 1px solid #DCDFE6;
        border-radius: 5px;
    }
}

.task_edit_container {
    display: none;
    &.isEditing{
        display: flex;
        flex-direction: column;
        min-height: 48px;
        border-radius: 5px;
        padding: 0 18px;
        font-size: 14px;
    }
}

.content-container {
    display: flex;
    font-size: 18px;
    height: 36px;
    width: 100%;
    & input {
       height: 100%;
       width: 100%;
       color: $color-font-main;
       font-size: 14px;
       border:none;
       &::placeholder {
           color: $color-font-occupation;
       }
    }
}

.add_button {
    margin-top: 4px;
    margin-left:18px;
    padding: 8px 10px;
}

.icon_tag,.icon_flag {
    color: $color-font-occupation;
    margin: 0;
    &:hover {
        cursor: pointer;
        color:#409EFF;
    }
    &:focus {
        color:#409EFF;
    }
}

.task_meta_quick_settings {
    margin-top: 2px;
}
.task_meta_quick_settings > ul  {
    // display: flex;
    &>li{
        font-size: 20px;
        padding: 0;
    }
}

.tags {
    &>li{
        // border: 1px solid red;
        line-height: 32px;
        text-align:center;
        &:hover{
            background:rgb(236,245,255);
            cursor: pointer;
        }
    }
}
</style>