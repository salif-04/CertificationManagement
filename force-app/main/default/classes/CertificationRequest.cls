public with sharing class CertificationRequest {
    public CertificationRequest() {

    }

    @AuraEnabled(cacheable=true)
    public static List<ProcessInstanceStep> getApprovalHistory(Id recordId) {
        return [select ActorId, Comments, CreatedDate, StepStatus from ProcessInstanceStep where ProcessInstanceId in (select Id from ProcessInstance where TargetObjectId = :recordId) order by CreatedDate desc];
    }

    // @AuraEnabled(cacheable=true)
    // public static Map<Id, String> getUserNames(Id[] ActorIds) {
        
    //     Map<Id, String> actorList = new Map<Id, String>();
    //     for(Id current: ActorIds) {
    //         User userDetail = [select FirstName, LastName from User where Id = :current];
    //         actorList.add(current, userDetail.FirstName + " " + userDetail.LastName);
    //     }

    //     return actorList;
    // }
}