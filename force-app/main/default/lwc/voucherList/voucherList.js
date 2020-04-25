import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from'lightning/platformShowToastEvent';
import searchVouchers from '@salesforce/apex/Search.searchVouchers';
import getUserEntityAccess from '@salesforce/apex/UserAccess.getUserEntityAccess';

export default class VoucherList extends NavigationMixin(LightningElement) {
    @track userPerms = {IsCreatable: false};

    searchTerm = '';
    vouchers = [];
    icon = 'https://cdn4.iconfinder.com/data/icons/thefreeforty/30/thefreeforty_label-512.png';

    @wire(searchVouchers, {searchTerm: '$searchTerm'})
    certificationFetch({error, data}) {
        if(data) {
            this.vouchers = data;
        }
        if(error) {
            const evt = new ShowToastEvent({
                title: 'Error in Fetching Data',
                message: error.message,
                variant: 'error'
            });
            this.dispatchEvent(evt);
        }
    }

    @wire(getUserEntityAccess, {objectApiName: 'Voucher__c'})
    getPerms({error, data}) {
        if(data) {
            this.userPerms = data;
        }
        if (error) {
            const evt = new ShowToastEvent({
                title: 'Error Occured',
                message: 'Error Occured while fetching data',
                variant: 'error'
            });
            this.dispatchEvent(evt);
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

    navigateToNew = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Voucher__c',
                actionName: 'new'
            }
        });
    }
}