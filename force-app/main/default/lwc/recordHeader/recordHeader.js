import { LightningElement, api, wire, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getUserEntityAccess from '@salesforce/apex/UserAccess.getUserEntityAccess';

export default class RecordHeader extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @track userPerms = {IsEditable: false, IsDeletable: false};

    @wire(getUserEntityAccess, {objectApiName: '$objectApiName'})
    getPerms({error, data}) {
        if(data) {
            this.userPerms = data;
        }
        if (error) {
            const evt = new ShowToastEvent({
                title: 'Error Occured',
                message: 'Error occured while fetching data',
                variant: 'error'
            });
            this.dispatchEvent(evt);

            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: this.objectApiName,
                    actionName: 'home'
                }
            });
        }
    }

    iconPack = {
        Certification__c: 'standard:article',
        Certification_Request__c: 'custom:custom16',
        Employee__c: 'custom:custom15',
        Voucher__c: 'custom:custom13'
    };

    get objectName() {
        let arr = this.objectApiName.split('_');
        arr.splice(arr.length - 2);
        return arr.join(' ');
    }

    get iconName() {
        return this.iconPack[this.objectApiName];
    }

    navigateToEdit = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: this.objectApiName,
                actionName: 'edit'
            }
        });
    }

    navigateToDelete = () => {
        deleteRecord(this.recordId).then(() => {
            const evt = new ShowToastEvent({
                title: 'Record Deleted',
                message: 'The record was deleted successfully',
                variant: 'success'
            });
            this.dispatchEvent(evt);

            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: this.objectApiName,
                    actionName: 'home'
                }
            });
        }).catch(() => {
            const evt = new ShowToastEvent({
                title: 'Error Occured',
                message: 'Error occured while deleting record',
                variant: 'error'
            });
            this.dispatchEvent(evt);
        });
    }
}