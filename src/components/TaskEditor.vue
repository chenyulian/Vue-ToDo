<template>
<div class="task_editor" :class="isEditing===true?'isEditing':''">
    <div class="task_edit_container" :class="isEditing===true?'isEditing':''">
        <div class="content-container">
            <input type="text" v-model = "task_content" width="100%">
        </div>
        
        <div class="task_meta">
            <Icon name="calendar" class="icon-calendar" @click="visible = !visible" v-popover:date-popover />
            <Icon name="align-text-justify" class="icon-align-text-justify" v-popover:more-popover @click="moreVisible = !moreVisible" />
            
            <el-popover
                placement="bottom"
                trigger="manual"
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
                trigger="manual"
                ref="more-popover"
                v-model="moreVisible"
                >
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标签">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="重复规则">
                        <el-cascader
                        v-model="value"
                        :options="options"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-radio-group v-model="form.resource">
                        <el-radio label="1"></el-radio>
                        <el-radio label="2"></el-radio>
                        <el-radio label="3"></el-radio>
                        <el-radio label="4"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-popover>
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

    @Component
    export default class TaskEditor extends Vue{
        showIcons = false;
        task_content = "";
        dueDate = "";
        visible = false;
        moreVisible = false;
        isEditing = false;
        addButtonDisabled = true;
        value = [];
        form = {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        };
        repeatRule = [];
        options = [{
          value: 'day',
          label: '按天'        
        }, 
        {
          value: 'week',
          label: '按周',
          children: [{
            value: '1',
            label: '周一'
          }, {
            value: '2',
            label: '周二',
          }, {
            value: '3',
            label: '周三',
          },
          {
            value: '4',
            label: '周四',
          },
          {
            value: '5',
            label: '周五',
          },
          {
            value: '6',
            label: '周六',
          },
          {
            value: '7',
            label: '周日',
          }]
        }
        ];

        handleChange(value:string):void {
            console.log(`级联菜单选择了：`+value);
        }

        onSubmit():void {
            console.log('on submit');
        }

        xxx():void {
            console.log(this.$refs['more-popover']);
            // this.$refs['more-popover'] && this.$refs['more-popover'].doToggle?.();
        }
        zzz():void {
            console.log('zxfzf');
        }

        addTask():void {
            console.log('xxx')
        }

        get addButtonAvaliable():boolean {
            return this.task_content.length <= 0;
        }

    }
</script>

<style lang="scss" scoped>

.task_editor {
    // border: 1px solid red;
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
        align-items: center;
        min-height: 48px;
        // outline: 1px solid red;
        border-radius: 5px;
        // margin-top: 8px;
        padding: 0 18px;
        font-size: 14px;
    }
}

.content-container {
    display: block;
    font-size: 18px;
    height: 36px;
    width: 100%;
    & input {
       height: 100%;
       width: 100%;
       font-weight: 200;
    }
}

.input_icons {
    display: none;
    // visibility: hidden;
}

.add_button {
    margin-top: 8px;
    margin-left:18px;
    padding: 8px 10px;
}

.icon-align-text-justify,.icon-calendar {
    width: 18px;
    height: 18px;
}

</style>