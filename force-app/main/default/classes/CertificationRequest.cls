public with sharing class CertificationRequest {
    public CertificationRequest() {

    }

    @AuraEnabled(cacheable=true)
    public static List<ProcessInstanceStep> getApprovalHistory(Id recordId) {
        return [select ActorId, Comments, CreatedDate, StepStatus from ProcessInstanceStep where ProcessInstanceId in (select Id from ProcessInstance where TargetObjectId = :recordId) order by CreatedDate desc];
    }
}