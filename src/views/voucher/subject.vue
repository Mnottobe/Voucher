<template>
    <el-container>
        <el-header style="display: flex; align-items: center; justify-content: left;">
            <div class="flex flex-col items-start gap-4">
                <el-segmented v-model="value" :options="options" size="default" />
            </div>

            <el-input
                v-model="filterText"
                style="width: 150px ;margin-left: 40px"
                placeholder="全文检索"
            />
        </el-header>
        <el-main style="padding: 0;margin-left: 20px;margin-right: 20px;margin-bottom: 40px">
            <el-table
                :data="filteredData"
                border
                @row-dblclick="handleEdit"
                :header-cell-style="{ backgroundColor: 'rgb(243, 243, 243)'}"
                height="35vh"
                table-layout="fixed"
                row-key="id"
                default-expand-all
            >
                <el-table-column prop="科目编码" width="200" label="科目编码"  header-align="center" align="left">
                    <template #default="scope">
                        <span>{{ scope.row.科目编码 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="科目名称" label="科目名称"  header-align="center" align="left" >
                    <template #default="scope">
                        <span>{{ scope.row.科目名称 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="科目类别" label="科目类别" width="90" header-align="center" align="center" ></el-table-column>
                <el-table-column prop="余额方向" label="余额方向" width="90" header-align="center" align="center" ></el-table-column>
                <el-table-column prop="辅助类别" label="辅助项目" width="120" header-align="center" align="center" ></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>


<script setup lang="ts">
import { computed,  ref } from 'vue';
import  type  { SubjectItem } from '../../enums/subject.type.ts';
import { mockSubjectData } from '../../enums/subject.type.ts';



const emit = defineEmits<{
    update: [newName: string, newCode: string]  // 添加 newCode 参数
}>();
const tableData = ref<SubjectItem[]>(mockSubjectData);
const filterText = ref('');
const value = ref('全部');
const checked = ref(true);
const options = ['全部', '资产', '负债', '权益', '成本', '损益'];





// 选中
const handleEdit = (row: { 科目名称: string, 科目编码: string  }): void => {
    const newName = row.科目名称;
    const newCode = row.科目编码;
    emit('update', newName, newCode);
};

// 全文检索和科目过滤
const filteredData = computed(() => {
    let data = tableData.value;
    if (filterText.value) {
        const searchTerm = filterText.value.toLowerCase();
        data = data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm)
            )
        );
    }
    if (checked.value) {
        data = data.filter(item => item["启用状态"]);
    }
    if (value.value !== "全部") {
        data = data.filter(item => item["科目类别"] === value.value);
    }
    return data;
});



</script>

<style scoped>

</style>
