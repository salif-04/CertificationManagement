import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCertificationRequests from '@salesforce/apex/Employee.getCertificationRequests';

export default class EmployeeRecordPage extends NavigationMixin(LightningElement) {
    @api recordId;
    certReqList;

    @wire(getCertificationRequests, {recordId: '$recordId'})
    employeeFetch({error, data}) {
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