import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCertificationRequests from '@salesforce/apex/Voucher.getCertificationRequests';

export default class VoucherRecordComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    certReqList;
    
    @wire(getCertificationRequests, {recordId: '$recordId'})
    certifiactionFetch({error, data}) {
        if(data) {
            this.certReqList = data;
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

    navigateToCertReq = (event) => {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: 'Certification_Request__c',
                actionName: 'view'
            }
        });
    }
    
}