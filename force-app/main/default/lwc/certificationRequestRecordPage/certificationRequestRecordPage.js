import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getApprovalHistory from '@salesforce/apex/CertificationRequest.getApprovalHistory';

export default class CertificationRequestRecordPage extends LightningElement {
    @api recordId;
    approvalHistList;

    @wire(getApprovalHistory, {recordId: '$recordId'})
    approvalHistoryFetch({error, data}) {
        if(data) {
            this.approvalHistList = data;
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
}