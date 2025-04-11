<template>
    <el-container>
        <el-header class="info-item">
            <div class="info-item">
                <div>
                    <el-button @click="Save()" >
                        <span style="vertical-align: middle">保存</span>
                    </el-button>
                    <el-button  @click=clearTheData();>
                        <el-icon><Refresh /></el-icon>
                        <span style="vertical-align: middle"> 清空</span>
                    </el-button>
                </div>
            </div>
        </el-header>
        <el-main>
            <div class="center-flex">
                <div class="voucher-info">
                    <div class="info-item">
                        <div>
                            <label class="info_lable">凭证号：</label>
                            <el-input
                                v-model="form.凭证号"
                                style="width: 50px; height: 28px; text-align: center;"
                                placeholder="空"
                                size="small"
                            />
                        </div>
                    </div>

                    <div class="info-item">
                        <div>
                            <label class="info_lable">日期：</label>
                            <el-date-picker
                                v-model="form.制单日期"
                                type="date"
                                placeholder="制单日期"
                                style="width: 121px; height: 28px;"
                                size="small"
                            />
                        </div>
                        <div>
                            <label class="info_lable">会计期间：</label>
                            <el-date-picker
                                v-model="form.会计期间"
                                type="month"
                                placeholder="会计期间"
                                style="width: 101px; height: 28px;"
                                size="small"
                            />
                        </div>

                        <div>
                            <label class="info_lable">附件张数：</label>
                            <el-input-number
                                v-model="form.附件张数"
                                :min="0"
                                :max="99"
                                style="height: 28px; width: 90px;"
                                size="small"
                            />
                        </div>
                    </div>
                </div>

                <table id="voucherTable" class="voucher" >
                    <thead>
                    <tr >
                        <th style=" width: 35px;border: none;"></th>
                        <th style=" width: 50px">序号</th>
                        <th style=" width: 200px">摘要</th>
                        <th style=" width: 200px">会计科目</th>
                        <th style=" width: 200px">辅助科目</th>
                        <th style=" width: 220px">
                            <strong class="voucher_title">借方金额</strong>
                            <div class="voucher_unit">
                                <span>亿</span>
                                <span>千</span>
                                <span>百</span>
                                <span>十</span>
                                <span>万</span>
                                <span>千</span>
                                <span>百</span>
                                <span>十</span>
                                <span>元</span>
                                <span>角</span>
                                <span>分</span>
                            </div>
                        </th>
                        <th style=" width: 220px">
                            <strong class="voucher_title">贷方金额</strong>
                            <div class="voucher_unit">
                                <span>亿</span>
                                <span>千</span>
                                <span>百</span>
                                <span>十</span>
                                <span>万</span>
                                <span>千</span>
                                <span>百</span>
                                <span>十</span>
                                <span>元</span>
                                <span>角</span>
                                <span>分</span>
                            </div>
                        </th>
                        <th style=" width: 35px;border: none;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in extendedTableData"
                        :key="index"
                        class="voucher_item">


                        <td style=" border: none;vertical-align: middle;text-align: center">
                            <div class="icon-container ">
                                <img src="../../assets/增行.svg" @click="addRow(index)" alt="">
                            </div>
                        </td>


                        <td style=" text-align: center;" >
                            {{ index + 1 }}
                        </td>


                        <td  @click="toggleEdit(index,'summary')">
                            <el-input
                                v-if="isEditing[index]?.summary"
                                :ref="(el: HTMLInputElement) => inputRefs.summary[index] = el"
                                v-model="row.摘要"
                                @blur="hideInput(index,'summary')"
                                @keyup.enter="handleEnterKey('summary', index)"
                                style="height: 100%; width: 100%;"
                                maxlength="25"
                                show-word-limit
                                type="text"/>
                            <div v-else style="width: 190px; padding: 5px">
                                {{ row.摘要 }}
                            </div>
                        </td>


                        <td @click="toggleEdit(index,'subject')"
                            style="position: relative;">
                            <el-input
                                v-if="isEditing[index]?.subject"
                                :ref="(el: HTMLInputElement) => inputRefs.subject[index] = el"
                                v-model="row.科目名称  "
                                @blur="hideInput(index,'subject')"
                                @focus="handleFocus(index)"
                                @keyup.enter="handleEnterKey('subject', index)"
                                style="height: 100%; width: 100%;"/>
                            <div v-else style="width: 160px; padding: 5px">
                                {{  row.科目名称  }}
                            </div>
                            <div @click.stop
                                 style="position: absolute; top: 50%; transform: translateY(-50%); right: 10px;">
                                <el-icon class="icon-hover"
                                         @click="handleIconClick(index)" >
                                    <Search />
                                </el-icon>
                            </div>
                        </td>


                        <td @click="toggleEdit(index,'auxiliary')"
                            style="position: relative;">
                            <el-input
                                   v-if="isEditing[index]?.auxiliary"
                                   :ref="(el: HTMLInputElement) => inputRefs.auxiliary[index] = el"
                                   v-model="row.辅助项目"
                                   @blur="hideInput(index,'auxiliary')"
                                   @focus="handleFocus(index)"
                                   @keyup.enter="handleEnterKey('auxiliary', index)"
                                   style="height: 100%; width: 100%;"/>
                            <div v-else style="width: 160px; padding: 5px" >
                                {{ row.辅助项目 }}
                            </div>

                            <div @click.stop
                                 style="position: absolute; top: 50%; transform: translateY(-50%); right: 10px;">
                                <el-icon class="icon-hover"
                                         @click="handleSubClick(index)" >
                                    <Search />
                                </el-icon>
                            </div>
                        </td>



                        <td class="voucher_debite" @click="toggleEdit(index, 'debit')">
                            <el-input
                                v-if="isEditing[index]?.debit"
                                :ref="(el: HTMLInputElement) => inputRefs.debit[index] = el"
                                v-model="row.借方金额"
                                @blur="hideInput(index, 'debit')"
                                @input="validateAmount('debit', index)"
                                @keyup.enter="handleEnterKey('debit', index)"
                                type="number"
                                step="0.01"
                                style="height: 100%; width: 100%;"
                            />
                            <div v-else>
                                <span
                                    v-for="(item, n) in formatAndHideCell(row.借方金额)"
                                    :key="n"
                                    :style="{ visibility: item.visible ? 'visible' : 'hidden' }"
                                    :class="{ 'negative-number': item.isNegative }"
                                >
                                    {{ item.text }}
                                </span>
                            </div>
                        </td>




                        <td class="voucher_credit" @click="toggleEdit(index, 'credit')">
                            <el-input
                                v-if="isEditing[index]?.credit"
                                :ref="(el: HTMLInputElement) => inputRefs.credit[index] = el"
                                v-model="row.贷方金额"
                                @blur="hideInput(index, 'credit')"
                                @input="validateAmount('credit', index)"
                                @keyup.enter="handleEnterKey('credit', index)"
                                type="number"
                                step="0.01"
                                style="height: 100%; width: 100%;"
                            />
                            <div v-else>
                                <span
                                    v-for="(item, n) in formatAndHideCell(row.贷方金额)"
                                    :key="n"
                                    :style="{ visibility: item.visible ? 'visible' : 'hidden' }"
                                    :class="{ 'negative-number': item.isNegative }"
                                >
                                    {{ item.text }}
                                </span>
                            </div>
                        </td>


                        <td style="border: none;vertical-align: middle;text-align: center;" >
                            <div class="icon-container" >
                                <img src="../../assets/减行.svg" @click="removeRow(index)" alt="">
                            </div>
                        </td>
                    </tr>
                    </tbody>


                    <tfoot>
                    <tr>
                        <td style=" width: 35px;border: none;"></td>
                        <td class="voucher_total " colspan="4" >
                            <div>合计：</div>
                            <div>{{ totalInChinese }}</div>
                        </td>
                        <td class="voucher_debite" >
                            <div id="debitTotalSpans">
                                <span
                                    v-for="(item, n) in formatAndHideCell(debitTotal)"
                                    :key="n"
                                    :style="{ visibility: item.visible ? 'visible' : 'hidden' }"
                                    :class="{ 'negative-number': item.isNegative }">
                                    {{ item.text }}
                                </span>
                            </div>
                        </td>
                        <td class="voucher_credit">
                            <div id="creditTotalSpans">
                                <span
                                    v-for="(item, n) in formatAndHideCell(creditTotal)"
                                    :key="n"
                                    :style="{ visibility: item.visible ? 'visible' : 'hidden' }"
                                    :class="{ 'negative-number': item.isNegative }">
                                    {{ item.text }}
                                </span>
                            </div>
                        </td>
                        <td style=" width: 35px;border: none;"></td>
                    </tr>
                    </tfoot>
                </table>

                <div class="voucher-info">
                    <div class="info-item">
                        <el-icon><Connection /></el-icon>
                        <span>凭证来源：{{ form.凭证来源 }}</span>
                    </div>
                    <div class="info-item">
                        <el-icon><Edit /></el-icon>
                        <span>制证人：{{ form.制证人 }}</span>
                    </div>
                </div>


            </div>
        </el-main>
    </el-container>
    <el-dialog
        v-model="dialogTableVisible"
        width="750">
        <SelectTemplateDialog @update="handleUpdateProp"  />
    </el-dialog>
    <el-dialog
        v-model="dialogSubTableVisible"
        width="750">
        <SelectSubTemplateDialog @update="handleSubUpdateProp"  />
    </el-dialog>
</template>

<script setup lang="ts">

import {computed, nextTick, onMounted, ref,} from "vue";
import SelectSubTemplateDialog from "./ancillarySubjects.vue";
import SelectTemplateDialog from './subject.vue';
import {useVoucherStore} from '../../store';
import {mockVoucherForm, type VoucherColumns, type VoucherForm} from "../../enums/subject.type.ts";


const voucherStore = useVoucherStore();
const dialogTableVisible = ref(false)
const dialogSubTableVisible =ref(false)
//初始数据结构
const form = ref<VoucherForm>({
    id: null,
    凭证号: null,
    制单日期: null,
    会计期间: null,
    附件张数: null,
    凭证来源: null,
    制证人:  null,
    分录: [
        {
            id:null,
            序号: null,
            摘要: null,
            科目编码: null,
            科目名称: null,
            辅助项目: null,
            借方金额: null,
            贷方金额: null,
        }
    ]
});
//编辑状态
const isEditing = ref<Record<number, Record<string, boolean>>>({});
// 存储每列的输入框引用
const inputRefs = ref<Record<string, (HTMLInputElement | null)[]>>({
    debit: [],
    credit: [] ,
    auxiliary:[] ,
    subject:[],
    summary:[],
});






//保持4行
const extendedTableData = computed(() => {

    const dataLength = form.value.分录.length;
    if (dataLength < 4) {
        for (let i = dataLength; i < 4; i++) {
            addRow(i - 1);
        }
    }
    return form.value.分录;
});
// 添加新行
const addRow = (index: number) => {
    const newRow : VoucherColumns = {
        id:null,
        序号: index + 2,
        摘要: null,
        科目编码: null,
        科目名称: null,
        辅助项目:null,
        借方金额: null,
        贷方金额: null,
    };
    form.value.分录.splice(index + 1, 0, newRow);
    form.value.分录.forEach((row, idx) => {
        row.序号 = idx + 1;
    });
};
// 删除行
const removeRow = (index: number) => {
    form.value.分录.splice(index, 1);
};
// 切换编辑状态
const toggleEdit = (index: number, column: string) => {
    if (!isEditing.value[index]) {
        isEditing.value[index] = {};
    }
    isEditing.value[index][column] = true;
    nextTick(() => {
        const inputElement = inputRefs.value[column][index]; // 获取对应列的输入框
        if (inputElement) {
            inputElement.focus();
        }
    });
};
// 隐藏输入框并保存数据
const hideInput = (index: number, column: string) => {
    isEditing.value[index][column] = false;
};

const handleEnterKey = (type: string, index: number) => {


    if(index===extendedTableData.value.length-1){
        addRow(index);
    }

    // 获取当前行的摘要
    const currentSummary = extendedTableData.value[index].摘要

    // 获取下一行的摘要
    const nextIndex = index + 1;
    const nextSummaryInput = extendedTableData.value[nextIndex].摘要

    // 获取当前行的借方和贷方金额
    const debitValue =  extendedTableData.value[index].借方金额
    const creditValue = extendedTableData.value[index].贷方金额


    // 获取下一行的借方和贷方输入框
    const nextDebitInput =  extendedTableData.value[nextIndex].借方金额
    const nextCreditInput = extendedTableData.value[nextIndex].贷方金额

    if (type === 'summary') {
        hideInput(index, 'summary');
        toggleEdit(index, 'subject');
    } else if (type === 'subject') {
        hideInput(index, 'subject');
        toggleEdit(index, 'auxiliary');
    } else if (type === 'auxiliary') {
        hideInput(index, 'auxiliary');
        toggleEdit(index, 'debit');
    } else if (type === 'debit') {
        if (debitValue) {
            hideInput(index, 'debit');

            // 如果下一行的借方或贷方已有值，则不填入差值
            if (nextDebitInput  || nextCreditInput ) {
                toggleEdit(nextIndex, 'summary');
            }
            // 借方合计大于贷方合计，将差值填入下一行的贷方
            else if (debitTotal.value > creditTotal.value) {
                toggleEdit(nextIndex, 'summary');
                extendedTableData.value[nextIndex].贷方金额 = Math.round((debitTotal.value - creditTotal.value) * 100) / 100
            }
            // 贷方合计大于借方合计，将差值填入下一行的借方
            else if (debitTotal.value < creditTotal.value ) {
                toggleEdit(nextIndex, 'summary');
                extendedTableData.value[nextIndex].借方金额 = Math.round((creditTotal.value-debitTotal.value) * 100) / 100
            } else {
                toggleEdit(nextIndex, 'summary');
            }
            // 如果下一行摘要没有值，则复制本行的摘要
            if (!nextSummaryInput) {
                extendedTableData.value[nextIndex].摘要=currentSummary
            }
        } else {
            toggleEdit(index, 'credit');
        }
    } else if (type === 'credit') {
        if (creditValue) {
            hideInput(index, 'credit');
            // 如果下一行的借方或贷方已有值，则不填入差值
            if (nextDebitInput  || nextCreditInput ) {
                toggleEdit(nextIndex, 'summary');
            }
            // 借方合计大于贷方合计，将差值填入下一行的贷方
            else if (debitTotal.value > creditTotal.value ) {
                toggleEdit(nextIndex, 'summary');
                extendedTableData.value[nextIndex].贷方金额 = Math.round((debitTotal.value - creditTotal.value) * 100) / 100
            }
            // 贷方合计大于借方合计，将差值填入下一行的借方
            else if (debitTotal.value < creditTotal.value ) {
                toggleEdit(nextIndex, 'summary');
                extendedTableData.value[nextIndex].借方金额 = Math.round((creditTotal.value-debitTotal.value) * 100) / 100
            }
            // 差值为0，不填入
            else {
                toggleEdit(nextIndex, 'summary');
            }

            // 如果下一行摘要没有值，则复制本行的摘要
            if (!nextSummaryInput) {
                extendedTableData.value[nextIndex].摘要=currentSummary
            }
        } else {
            toggleEdit(index, 'debit');
        }
    }
};






//借方合计
const debitTotal = computed(() => {
    return extendedTableData.value.reduce((sum, row) => {
        const currentAmount = Number(row.借方金额) || 0;
        return sum + currentAmount;
    }, 0);
});
//贷方合计
const creditTotal = computed(() => {
    return extendedTableData.value.reduce((sum, row) => {
        const currentAmount = Number(row.贷方金额) || 0;
        return sum + currentAmount;
    }, 0);
});
//汉字合计
const totalInChinese = computed(() => {
    const units = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'];
    const numArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

    const convertToChinese = (num: number): string => {
        let str = '';
        let isNegative = false;

        // 处理负数情况
        if (num < 0) {
            isNegative = true;
            num = Math.abs(num);
        }

        // 保留两位小数
        let numStr = num.toFixed(2); // 保证保留两位小数，格式化为字符串

        // 分离整数部分和小数部分
        let [integerPart, decimalPartStr] = numStr.split('.');

        // 如果是 0，直接返回
        if (parseFloat(integerPart) === 0 && parseFloat(decimalPartStr) === 0) {
            return '零元整';
        }

        // 处理整数部分
        if (parseFloat(integerPart) !== 0) {
            for (let i = 0; i < integerPart.length; i++) {
                const n = integerPart[integerPart.length - 1 - i];
                str = numArr[parseInt(n)] + units[i] + str;
            }
        }

        // 处理小数部分
        if (decimalPartStr) {
            const jiao = numArr[parseInt(decimalPartStr[0])];
            const fen = numArr[parseInt(decimalPartStr[1])];

            if (decimalPartStr === '00') {
                str += '整';
            } else if (decimalPartStr[1] === '0') {
                str += jiao + '角';
            } else if (decimalPartStr[0] === '0') {
                str += fen + '分';
            } else {
                str += jiao + '角' + fen + '分';
            }
        } else {
            str += '整';
        }

        // 对重复的零进行处理
        str = str.replace(/零[拾佰仟]/g, '零')
            .replace(/零+/g, '零')
            .replace(/零([万亿])/g, '$1')
            .replace(/亿万/, '亿')
            .replace(/零元/, '元')
            .replace(/元零?/g, '元')
            .replace(/零点/g, '点')
            .replace(/零$/, '');

        // 加上负号
        if (isNegative) {
            str = '负' + str;
        }

        return str;
    };

    // 如果借方合计和贷方合计相等，则返回转换后的汉字
    if (debitTotal.value === creditTotal.value) {
        return convertToChinese(debitTotal.value);
    }
    return '';
});
//借贷方输入框和合计的数字的格式化处理
const formatAndHideCell = (value: number | null ) => {
    if (value === null) {
        return [{ text: null, visible: false, isNegative: false }];
    }
    let strValue = value != null ? value.toString() : '';

    if (!strValue || isNaN(parseFloat(strValue))) {
        return Array(11).fill({ visible: false, text: '', isNegative: false });
    }

    const num = parseFloat(strValue);
    const isNegative = num < 0;
    strValue = Math.abs(num).toFixed(2);
    const parts = strValue.split('.');
    const intPart = parts[0] || '0';
    const decPart = parts[1] || '00';

    const formattedValue = (intPart + decPart).padStart(11, '0').split('');

    for (let i = 0; i < formattedValue.length - 2; i++) {
        if (formattedValue[i] === '0') {
            formattedValue[i] = '';
        } else {
            break;
        }
    }
    return formattedValue.map((char) => ({
        visible: char !== '',
        text: char,
        isNegative: isNegative
    }));
};
//输入框输入的限制条件
const validateAmount = (type: string, index: number) => {
    // 清空另一个字段（借方和贷方金额互斥）
    if (type === 'debit') {
        extendedTableData.value[index]['贷方金额'] = null;
    } else {
        extendedTableData.value[index]['借方金额'] = null;
    }
    let value = extendedTableData.value[index][type === 'debit' ? '借方金额' : '贷方金额'];

    value = parseFloat(value?.toString() || 'NaN');

    // 限制小数点后最多两位
    value = parseFloat(value.toFixed(2));


    const MAX_VALUE = 999999999;
    const MIN_VALUE = -999999999;
    if (value > MAX_VALUE) {
        value = MAX_VALUE;
    }
    if (value < MIN_VALUE) {
        value = MIN_VALUE;
    }


    // 更新字段值
    extendedTableData.value[index][type === 'debit' ? '借方金额' : '贷方金额']  = value;
};









const handleFocus = (index: number) => {
    voucherStore.setIndex(index);
    voucherStore.setAccountCode(extendedTableData.value[index].科目编码);
};


const handleIconClick = (index: number) => {
    voucherStore.setIndex(index);
    dialogTableVisible.value = true;
};

// 填入科目
const handleUpdateProp = (newName:  string ,newCode:string) => {
    if (voucherStore.index !== null) {
        extendedTableData.value[voucherStore.index].科目名称 = newName;
        extendedTableData.value[voucherStore.index].科目编码 = newCode;
        extendedTableData.value[voucherStore.index].辅助项目 = null;
        dialogTableVisible.value = false;
    }
};
const handleSubClick = (index: number) => {
    voucherStore.setIndex(index);
    voucherStore.setAccountCode(extendedTableData.value[index].科目编码);
    dialogSubTableVisible.value = true;
};
const handleSubUpdateProp = (newName: string) => {
    if (voucherStore.index !== null) {
        extendedTableData.value[voucherStore.index].辅助项目 = newName;
        dialogSubTableVisible.value = false;
    }

};


const Save = () => {
    console.log(form.value)
}
//清空数据
const clearTheData = () => {
    form.value = {
        id: null,
        凭证号: null,
        制单日期: null,
        会计期间: null,
        附件张数: null,
        凭证来源: null,
        制证人: null,
        分录: [
            {
                id: null,
                序号: null,
                摘要: null,
                科目编码: null,
                科目名称: null,
                辅助项目: null,
                借方金额: null,
                贷方金额: null,
            }
        ]
    };
};


onMounted(() => {
    form.value=mockVoucherForm
})




</script>

<style scoped>
li {
    list-style: none;
}


.header >div {
    margin-right: 2rem;
    display: flex;
    justify-content: center;

}

.voucher {
    border-collapse: collapse;
    td {
        color: rgba(48, 46, 46, 0.8);
        font-weight: 700;
        font-size: 14px;
        height:  50px;
        border:1px solid #ccc;
        word-wrap: break-word;
        white-space: normal;
        margin: 0;
        padding: 0;

    }
    th {
        height:  10px;
        color: rgba(48, 46, 46, 0.8);
        font-size: 15px;
        text-align: center;
        font-weight: bold;
        border: 1px solid #ccc;
    }

}

.voucher_title {
    display: block;
    height: 25px;
    font-size: 14px;
    font-weight: 900;
    line-height: 25px;
}


.voucher_credit,
.voucher_debite,
.voucher_unit {
    width: 220px;
    text-align: center;
    background-image: url(../../assets/money_column.svg);
    background-repeat: repeat-y;
    background-position: center;
    span {
        display: inline-block;
        width: 20px;
        height: 100%;
    }
}
.voucher_unit {
    height: 25px;
    line-height: 25px;
    font-weight: 700;
    border-top: 1px solid #dadada;
}

.voucher_unit span {
    font-size: 13px;
    font-weight: 800;
}

.voucher_credit span,
.voucher_debite span {
    font-size: 15px;
    font-weight: 900;
}


.voucher_summary>div{
    margin-left:10px
}

.voucher_subject div:nth-child(2) {
    text-align: left;
    margin-left: 10px;
    width: 200px;
}

.voucher_subject div:last-child {
    position: absolute;
    left:20.5rem;
    width: 50px;
    top: 50%;
    transform: translateY(-50%);
}


.voucher_total {
    position: relative;
    letter-spacing: 1px;

}
.voucher_total div:first-child {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
}
.voucher_total div:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}





.voucher_item .voucher_action:last-child {
    padding-left: 10px;
}

.icon-container {
    display: none;
    cursor: pointer;
}
#voucherTable tbody tr:hover .icon-container {
    display: inline-block;
}
.negative-number {
    color: red;
}
.icon-hover {
    font-size: 20px;
    transition: transform 0.3s ease, color 0.3s ease;
    cursor: pointer;
}

.icon-hover:hover {
    transform: scale(1.1);
    color: #409EFF;
}
.voucher-info {
    width: 1105px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 5px;
}
.info_lable{
    font-size: 14px;
    color:#3c8dbc;
}
.info_lable_group{
    font-size: 14px;
    color:#3c8dbc;
}
.center-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}

:deep(.el-input__wrapper) {

    border-radius: 1px;
}
</style>
