public with sharing class Voucher {
    public Voucher() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getCertificationRequests(Id recordId){
        return [select Name, Employee__c from Certification_Request__c where Voucher__c = :recordId];
    }
}