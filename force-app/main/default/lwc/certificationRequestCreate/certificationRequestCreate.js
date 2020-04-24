import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CertificationRequestCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Certification_Request__c',
                actionName: 'view'
            }
        });
    }

    cancelCraete = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Certification_Request__c',
                actionName: 'home'
            }
        });
    }
}