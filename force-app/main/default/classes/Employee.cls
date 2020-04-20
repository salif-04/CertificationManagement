public with sharing class Employee {
    public Employee() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getCertificationRequests(Id recordId) {
        return [select Name from Certification_Request__c where Employee__c = :recordId];
    }
}
