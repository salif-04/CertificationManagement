public with sharing class UserAccess {
    public UserAccess() {

    }

    @AuraEnabled(cacheable=true)
    public static UserEntityAccess getUserEntityAccess(String objectApiName) {
        Id uid = UserInfo.getUserId();
        UserEntityAccess acc = [select EntityDefinitionId, IsCreatable, IsDeletable, IsEditable, IsReadable, UserId FROM UserEntityAccess WHERE UserId = :uid and EntityDefinitionId = :objectApiName limit 1];
		return acc;
    }
}
