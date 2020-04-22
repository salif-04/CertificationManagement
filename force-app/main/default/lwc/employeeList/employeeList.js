import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
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
            console.log('Error fetching data');
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