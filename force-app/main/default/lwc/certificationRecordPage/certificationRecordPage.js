import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getVouchers from '@salesforce/apex/Certification.getVouchers';
import getCertificationRequests from '@salesforce/apex/Certification.getCertificationRequests';

export default class CertificationRecordPage extends NavigationMixin(LightningElement) {
    @api recordId;
    voucherList;
    certReqList;

    @wire(getVouchers, {recordId: '$recordId'})
    voucherFetch({error, data}) {
        if(data) {
            this.voucherList = data;
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

    @wire(getCertificationRequests, {recordId: '$recordId'})
    certReqFetch({error, data}) {
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

    navigateToVoucher = (event) => {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: 'Voucher__c',
                actionName: 'view'
            }
        });
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