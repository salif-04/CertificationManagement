import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchEmployee from '@salesforce/apex/Search.searchEmployee';

export default class EmployeeList extends NavigationMixin(LightningElement) {
    searchTerm = '';
    employees = [];
    icon = 'https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/105-User-512.png';

    @wire(searchEmployee, {searchTerm: '$searchTerm'})
    employeeFetch({error, data}) {
        if(data) {
            this.employees = data;
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

    get noDataFound() {
        return this.employees.length == 0;
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
                    obejctApiName: 'Employee__c',
                    actionName: 'view'
                }
            });
        }
    }
}