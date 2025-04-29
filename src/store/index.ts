import {createPinia, defineStore} from 'pinia'


const pinia = createPinia()

export default pinia

export const useVoucherStore = defineStore('voucherStore', {
    state: () => ({
        index: null as number | null,
        AccountCode: '' as string | null,
    }),
    actions: {
        setIndex(newIndex: number) {
            this.index = newIndex;
        },
        setAccountCode(newAccountCode: string | null) {
            this.AccountCode = newAccountCode;
        },
        resetData() {
            this.index = null;
            this.AccountCode = '';
        }
    }
});