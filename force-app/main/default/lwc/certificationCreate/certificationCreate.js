import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CertificationCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDefault();
        const evt = new ShowToastEvent({
            title: 'Certification Saved',
            message: 'The record has been saved successfully',
            variant: 'success'
        });
        this.dispatchEvent(evt);
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Certification__c',
                actionName: 'view'
            }
        });
    }

    cancelCraete = () => {
        window.history.back();
    }
}