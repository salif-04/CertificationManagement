import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
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
            alert(error);
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