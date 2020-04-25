import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchEmployee from '@salesforce/apex/Search.searchEmployee';
import getUserEntityAccess from '@salesforce/apex/UserAccess.getUserEntityAccess';

export default class EmployeeList extends NavigationMixin(LightningElement) {
    @track userPerms = {IsCreatable: false};

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

    @wire(getUserEntityAccess, {objectApiName: 'Employee__c'})
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

    navigateToNew = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Employee__c',
                actionName: 'new'
            }
        });
    }
}