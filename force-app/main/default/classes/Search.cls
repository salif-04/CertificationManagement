public with sharing class Search {
    public Search() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Employee__c> searchEmployee(String searchTerm) {
        searchTerm = searchTerm.trim();
        
        if (searchTerm == '') {
            return [select Name, Email_ID__c, Emp_Name__c, Primary_Skill__c from Employee__c order by CreatedDate desc nulls last limit 8];
        } else {
            searchTerm = '%' + searchTerm + '%';
            return [select Name, Email_ID__c, Emp_Name__c, Primary_Skill__c from Employee__c where Name LIKE :searchTerm or Emp_Name__c LIKE :searchTerm or Email_ID__c LIKE :searchTerm order by CreatedDate desc nulls last limit 8];
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> searchCertifications(String searchTerm) {
        searchTerm = searchTerm.trim();
        
        if (searchTerm == '') {
            return [select Name, Cert_Name__c from Certification__c order by CreatedDate desc nulls last limit 6];
        } else {
            searchTerm = '%' + searchTerm + '%';
            return [select Name, Cert_Name__c from Certification__c where Name LIKE :searchTerm or Cert_Name__c LIKE :searchTerm order by CreatedDate desc nulls last limit 6];
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> searchVouchers(String searchTerm) {
        searchTerm = searchTerm.trim();
        
        if (searchTerm == '') {
            return [select Name, Validity__c from Voucher__c where Active__c = 'Yes' order by CreatedDate desc nulls last limit 6];
        } else {
            searchTerm = '%' + searchTerm + '%';
            return [select Name, Validity__c from Voucher__c where Name LIKE :searchTerm and Active__c = 'Yes' order by CreatedDate desc nulls last limit 6];
        }
    }
}
