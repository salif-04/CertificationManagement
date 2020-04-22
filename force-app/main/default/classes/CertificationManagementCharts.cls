public with sharing class CertificationManagementCharts {
    public CertificationManagementCharts() {

    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getChartCertificationRequest(){
        
        Certification_Request__c[] lst = [select Certification__c from Certification_Request__c];
        Map<Id, Integer> certReqMap = new Map<Id, Integer>();
        Map<String, Integer> certMap = new Map<String, Integer>();

        for(Certification_Request__c current: lst) {
            if(certReqMap.containsKey(current.Certification__c)) {
                certReqMap.put(current.Certification__c, certReqMap.get(current.Certification__c)+1);
            } else {
                certReqMap.put(current.Certification__c, 1);
            }
        }
        Set<Id> certReqMapKeys = certReqMap.keySet();
        
        for(Id current: certReqMapKeys) {
			Certification__c[] certDetail = [select Cert_Name__c from Certification__c where Id=:current];
            certMap.put(certDetail[0].Cert_Name__c, certReqMap.get(current));
        }

        return certMap;
    }
}
