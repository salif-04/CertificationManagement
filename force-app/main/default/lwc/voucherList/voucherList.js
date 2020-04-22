import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchVouchers from '@salesforce/apex/Search.searchVouchers';

export default class VoucherList extends NavigationMixin(LightningElement) {
    searchTerm = '';
    vouchers = [];
    icon = 'https://cdn4.iconfinder.com/data/icons/thefreeforty/30/thefreeforty_label-512.png';

    @wire(searchVouchers, {searchTerm: '$searchTerm'})
    certificationFetch({error, data}) {
        if(data) {
            this.vouchers = data;
        }
        if(error) {
            console.log('Error fetching data');
        }
    }

    get noDataFound() {
        return this.vouchers.length == 0;
    }

    searchTermChange = (event) => {
        const searchTerm = event.target.value;
        this.searchTerm = searchTerm;
    }

    navigateToEmployee = (event) => {
        const id = event.target.dataset.id;
        
        if (id) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: id,
                    obejctApiName: 'Voucher__c',
                    actionName: 'view'
                }
            });
        }
    }
}