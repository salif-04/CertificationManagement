import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchCertifications from '@salesforce/apex/Search.searchCertifications';
import getUserEntityAccess from '@salesforce/apex/UserAccess.getUserEntityAccess';

export default class CertificationList extends NavigationMixin(LightningElement) {
    @track userPerms = {IsCreatable: false};

    searchTerm = '';
    certifications = [];
    icon = 'http://cdn.onlinewebfonts.com/svg/img_533229.png';

    @wire(searchCertifications, {searchTerm: '$searchTerm'})
    certificationFetch({error, data}) {
        if(data) {
            this.certifications = data;
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

    @wire(getUserEntityAccess, {objectApiName: 'Certification__c'})
    getPerms({error, data}) {
        if(data) {
            this.userPerms = data;
        }
        if (error) {
            const evt = new ShowToastEvent({
                title: 'Error Occured',
                message: 'Error Occured while fetching data',
                variant: 'error'
            });
            this.dispatchEvent(evt);
        }
    }

    get noDataFound() {
        return this.certifications.length == 0;
    }

    searchTermChange = (event) => {
        const searchTerm = event.target.value;
        this.searchTerm = searchTerm;
    }

    navigateToEmployee = (event) => {
        const id = event.target.dataset.id;
        
        if (id) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: id,
                    obejctApiName: 'Certification__c',
                    actionName: 'view'
                }
            });
        }
    }

    navigateToNew = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Certification__c',
                actionName: 'new'
            }
        });
    }
}