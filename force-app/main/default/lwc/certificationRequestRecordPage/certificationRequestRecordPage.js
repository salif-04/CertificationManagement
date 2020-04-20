import { LightningElement, api, wire, track } from 'lwc';
import getApprovalHistory from '@salesforce/apex/CertificationRequest.getApprovalHistory';
import getUserNames from '@salesforce/apex/CertificationRequest.getUserNames';

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
            alert(error);
        }
    }

    @wire(getUserNames, {ActorIds: actorIdList}) actorMap;
}