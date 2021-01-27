/* Setting ActionTypes to be used in 'main-reducer.tsx' */

export enum OwnerActionType {
    CreateNewOwnerAction = "CREATE_NEW_OWNER_ACTION",
    CreateNewOwnerSuccessAction = "CREATE_NEW_OWNER_SUCCESS_ACTION",
    CreateNewOwnerFailAction = "CREATE_NEW_OWNER_FAIL_ACTION",
    LoginOwnerAction = "LOGIN_OWNER_ACTION",
    LoginOwnerSucessAction = "LOGIN_OWNER_SUCCESS_ACTION",
    LoginOwnerFailAction = "LOGIN_OWNER_FAIL_ACTION",
    UpdateOwnerDetailAction = "UPDATE_OWNER_DETAIL_ACTION",
    UpdateOwnerDetailSuccessAction = "UPDATE_OWNER_DETAIL_SUCCESS_ACTION",
    UpdateOwnerDetailFailAction = "UPDATE_OWNER_DETAIL_FAIL_ACTION",
}
