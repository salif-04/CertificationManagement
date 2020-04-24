import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class VoucherCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Voucher__c',
                actionName: 'view'
            }
        });
    }

    cancelCraete = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Voucher__c',
                actionName: 'home'
            }
        });
    }
}