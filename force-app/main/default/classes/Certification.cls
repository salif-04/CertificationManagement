public with sharing class Certification {
    public Certification() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getVouchers(Id recordId){
        return [select Name from Voucher__c where Certification__c = :recordId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getCertificationRequests(Id recordId){
        return [select Name from Certification_Request__c where Certification__c = :recordId];
    }
}
