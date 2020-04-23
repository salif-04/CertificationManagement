import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class EmployeeCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDeafult();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Employee__c',
                actionName: 'view'
            }
        });
    }

    cancelCraete = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Employee__c',
                actionName: 'home'
            }
        });
    }
}