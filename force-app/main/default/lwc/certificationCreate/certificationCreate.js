import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CertificationCreate extends NavigationMixin(LightningElement) {
    @api recordId;

    onSubmit = (event) => {
        event.preventDeafult();
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
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Certification__c',
                actionName: 'home'
            }
        });
    }
}