export enum SubjectCategory {
    资产 = "资产",
    负债 = "负债",
    权益 = "权益",
    成本 = "成本",
    损益 = "损益"
}

export enum BalanceDirection {
    借 = "借",
    贷 = "贷"
}

export enum AuxiliaryItem {
    无 = '无',
    客户 = '客户',
    供应商 = '供应商',
    员工 = '员工',
}

//会计科目
export type SubjectItem = {
    id: string;
    科目编码: string;
    科目类别: SubjectCategory;
    科目名称: string;
    辅助类别: AuxiliaryItem;
    余额方向: BalanceDirection;
    启用状态: boolean;
    children?: SubjectItem[];
};
//辅助科目
export type AccountingItem = {
    id: string;
    辅助类别: AuxiliaryItem;
    辅助项目名称: string;

};

export type VoucherColumns = {
    id: string | null;
    序号: number | null;
    摘要: string | null;
    科目编码: string | null;
    科目名称: string | null;
    辅助项目: string | null;
    借方金额: number | null;
    贷方金额: number | null;
};

export type VoucherForm = {
    id: string | null;
    凭证号: number | null,
    制单日期: string | null,
    会计期间: string | null,
    附件张数: number | null,
    凭证来源: string | null,
    制证人: string | null,
    分录:VoucherColumns[]
};

export const mockSubjectData: SubjectItem[] = [
    {
        id: '1',
        科目编码: '1001',
        科目类别: SubjectCategory.资产,
        科目名称: '库存现金',
        辅助类别: AuxiliaryItem.客户,
        余额方向: BalanceDirection.借,
        启用状态: true,
        children: []
    },
    {
        id: '2',
        科目编码: '1002',
        科目类别: SubjectCategory.资产,
        科目名称: '银行存款',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.借,
        启用状态: true,
        children: []
    },
    {
        id: '3',
        科目编码: '2221',
        科目类别: SubjectCategory.负债 ,
        科目名称: '应交税费',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.借,
        启用状态: true,
        children: [
            {
                id: '4',
                科目编码: '2221001',
                科目类别: SubjectCategory.负债,
                科目名称: '应交税费-应交增值税',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.贷,
                启用状态: true,
                children: [
                    {
                        id: '5',
                        科目编码: '2221001001',
                        科目类别: SubjectCategory.负债 ,
                        科目名称: '应交税费-应交增值税-进项税额',
                        辅助类别: AuxiliaryItem.无,
                        余额方向: BalanceDirection.借,
                        启用状态: true,
                        children: []
                    },
                    {
                        id: '6',
                        科目编码: '2221001002',
                        科目类别: SubjectCategory.负债 ,
                        科目名称: '应交税费-应交增值税-销项税额',
                        辅助类别: AuxiliaryItem.无,
                        余额方向: BalanceDirection.贷,
                        启用状态: true,
                        children: []
                    }
                ]
            },
            {
                id: '7',
                科目编码: '2221002',
                科目类别: SubjectCategory.负债 ,
                科目名称: '应交税费-未交增值税',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.贷,
                启用状态: false,
                children: []
            }
        ]
    },
    {
        id: '8',
        科目编码: '3001',
        科目类别: SubjectCategory.权益,
        科目名称: '实收资本',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.贷,
        启用状态: true,
        children: []
    },
    {
        id: '9',
        科目编码: '4001',
        科目类别: SubjectCategory.成本,
        科目名称: '生产成本',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.借,
        启用状态: true,
        children: []
    },
    {
        id: '10',
        科目编码: '5001',
        科目类别: SubjectCategory.损益,
        科目名称: '主营业务收入',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.贷,
        启用状态: true,
        children: []
    },
    {
        id: '11',
        科目编码: '5601',
        科目类别: SubjectCategory.损益,
        科目名称: '销售费用',
        辅助类别: AuxiliaryItem.无,
        余额方向: BalanceDirection.借,
        启用状态: true,
        children: [
            {
                id: '12',
                科目编码: '560101',
                科目类别: SubjectCategory.损益,
                科目名称: '广告费用',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.借,
                启用状态: true,
                children: []
            },
            {
                id: '13',
                科目编码: '560102',
                科目类别: SubjectCategory.损益,
                科目名称: '销售人员工资',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.借,
                启用状态: true,
                children: []
            },
            {
                id: '14',
                科目编码: '560103',
                科目类别: SubjectCategory.损益,
                科目名称: '差旅费用',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.借,
                启用状态: true,
                children: []
            },
            {
                id: '15',
                科目编码: '560104',
                科目类别: SubjectCategory.损益,
                科目名称: '促销费用',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.借,
                启用状态: true,
                children: []
            },
            {
                id: '16',
                科目编码: '560105',
                科目类别: SubjectCategory.损益,
                科目名称: '运输费用',
                辅助类别: AuxiliaryItem.无,
                余额方向: BalanceDirection.借,
                启用状态: true,
                children: []
            }
        ]
    }

];

export const mockAccountingData: AccountingItem[] = [
    {
        id: '1',
        辅助类别: AuxiliaryItem.客户,
        辅助项目名称: '客户A',

    },
    {
        id: '2',
        辅助类别: AuxiliaryItem.员工,
        辅助项目名称: '员工B',

    },
    {
        id: '3',
        辅助类别: AuxiliaryItem.供应商,
        辅助项目名称: '供应商A',
    },
];

export const mockVoucherForm: VoucherForm = {
    id: "1",
    凭证号: 1,
    制单日期: "2025-04-07",
    会计期间: "2025-02",
    附件张数: 0,
    凭证来源: "自制",
    制证人:" 管理员",
    分录: [
        {
            id: "1",
            序号: 1,
            摘要: "采购商品",
            科目编码: "1001",
            科目名称: "库存现金",
            辅助项目: "",
            借方金额: 5000.00,
            贷方金额: null
        },
        {
            id: "2",
            序号: 2,
            摘要: "销售收入",
            科目编码: "2001",
            科目名称: "应收账款",
            辅助项目: "",
            借方金额: null,
            贷方金额: 5000.10
        },
        {
            id: "3",
            序号: 3,
            摘要: "办公费用",
            科目编码: "3001",
            科目名称: "管理费用",
            辅助项目: "",
            借方金额: 200.00,
            贷方金额: null
        },
        {
            id: "4",
            序号: 4,
            摘要: "办公费用",
            科目编码: "3001",
            科目名称: "管理费用",
            辅助项目: "",
            借方金额: null,
            贷方金额: 200.00
        }
    ]
};

