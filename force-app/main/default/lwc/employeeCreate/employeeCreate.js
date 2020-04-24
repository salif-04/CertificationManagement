import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EmployeeCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDefault();
        const evt = new ShowToastEvent({
            title: 'Employee Saved',
            message: 'The record has been saved successfully',
            variant: 'success'
        });
        this.dispatchEvent(evt);
        
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