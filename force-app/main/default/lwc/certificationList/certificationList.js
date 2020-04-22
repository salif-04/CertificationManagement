import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchCertifications from '@salesforce/apex/Search.searchCertifications';

export default class CertificationList extends NavigationMixin(LightningElement) {
    searchTerm = '';
    certifications = [];
    icon = 'http://cdn.onlinewebfonts.com/svg/img_533229.png';

    @wire(searchCertifications, {searchTerm: '$searchTerm'})
    certificationFetch({error, data}) {
        if(data) {
            this.certifications = data;
        }
        if(error) {
            console.log('Error fetching data');
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
}