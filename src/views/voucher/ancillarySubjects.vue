<template>
    <el-container>
        <el-header style="display: flex; align-items: center; justify-content: left;">
            <el-input
                v-model="filterText"
                style="width: 200px"
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
                v-loading="loading"
            >
                <el-table-column prop="辅助类别" label="辅助类别" width="200" header-align="center" align="center" />
                <el-table-column prop="辅助项目名称" label="辅助项目名称" header-align="center" align="center" /></el-table>
        </el-main>
    </el-container>
</template>


<script setup lang="ts">
import { computed, ref } from "vue";
import {
    type AccountingItem,
    AuxiliaryItem,
    mockSubjectData,
    type SubjectItem
} from '../../enums/subject.type.ts';
import { mockAccountingData } from '../../enums/subject.type.ts';
import {useVoucherStore} from "../../store";



const emit = defineEmits<{
    update: [newName: string]
}>();


const tableData = ref<AccountingItem[]>(mockAccountingData);
const filterText = ref('');
const loading = ref(false);
const voucherStore = useVoucherStore();

const handleEdit = (row: { 辅助项目名称: string }): void => {
    const newName = row.辅助项目名称;
    emit('update', newName);
};


// 递归查找科目编码对应的科目类别
function findAuxiliaryItem(科目编码: string, subjectList: SubjectItem[]): AuxiliaryItem | null {
    for (const item of subjectList) {
        if (item.科目编码 === 科目编码) {
            return item.辅助类别;
        }
        // 如果当前项有子项，递归查找
        if (item.children && item.children.length > 0) {
            const result = findAuxiliaryItem(科目编码, item.children);
            if (result) {
                return result;
            }
        }
    }
    return null; // 如果没有找到返回 null
}




// 根据会计科目加载辅助科目
const filteredData = computed(() => {
    let data = tableData.value;

    if (voucherStore.AccountCode!== null) {
        const category =findAuxiliaryItem(voucherStore.AccountCode, mockSubjectData);
        data = data.filter(item => item['辅助类别'] === category);
    }else{
        return [];
    }
    if (filterText.value) {
        const searchTerm = filterText.value.toLowerCase();
        data = data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm)
            )
        );
    }

    return data;
});

</script>



<style scoped>

</style>
