/* Setting ActionTypes to be used in 'main-reducer.tsx' */

export enum UserActionType {
    CreateNewUserAction = "CREATE_NEW_USER_ACTION",
    CreateNewUserSuccessAction = "CREATE_NEW_USER_SUCCESS_ACTION",
    CreateNewUserFailAction = "CREATE_NEW_USER_FAIL_ACTION",
    LoginUserAction = "LOGIN_USER_ACTION",
    LoginUserSucessAction = "LOGIN_USER_SUCCESS_ACTION",
    LoginUserFailAction = "LOGIN_USER_FAIL_ACTION",
    UpdateUserDetailAction = "UPDATE_USER_DETAIL_ACTION",
    UpdateUserDetailSuccessAction = "UPDATE_USER_DETAIL_SUCCESS_ACTION",
    UpdateUserDetailFailAction = "UPDATE_USER_DETAIL_FAIL_ACTION",
}
