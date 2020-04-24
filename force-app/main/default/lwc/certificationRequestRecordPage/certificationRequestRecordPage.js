import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getApprovalHistory from '@salesforce/apex/CertificationRequest.getApprovalHistory';
// import getUserNames from '@salesforce/apex/CertificationRequest.getUserNames';

export default class CertificationRequestRecordPage extends LightningElement {
    @api recordId;
    approvalHistList;
    @track actorIdList = [];

    @wire(getApprovalHistory, {recordId: '$recordId'})
    approvalHistoryFetch({error, data}) {
        if(data) {
            this.approvalHistList = data;
            data.forEach((element) => {
                actorIdList.push(element.ActorId);
            });
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

    // @wire(getUserNames, {ActorIds: actorIdList}) actorMap;
}