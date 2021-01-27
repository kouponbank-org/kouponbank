/* Setting ActionTypes to be used in 'reducer.tsx' */

export enum BusinessActionType {
    CreateBusiness = "CREATE_BUSINESS",
    CreateBusinessSuccess = "CREATE_BUSINESS_SUCCESS",
    CreateBusinessFail = "CREATE_BUSINESS_FAIL",
    GetBusiness = "GET_BUSINESS",
    GetBusinessSuccess = "GET_BUSINESS_SUCCESS",
    GetBusinessFail = "GET_BUSINESS_FAIL",
    GetBusinessList = "GET_BUSINESS_LIST",
    GetBusinessListSuccess = "GET_BUSINESS_LIST_SUCCESS",
    GetBusinessListFail = "GET_BUSINESS_LIST_FAIL",
    UpdateBusiness = "UPDATE_BUSINESS",
    UpdateBusinessSuccess = "UPDATE_BUSINESS_SUCCESS",
    UpdateBusinessFail = "UPDATE_BUSINESS_FAIL",
    GetBusinessesFromSearch = "GET_BUSINESS_FROM_SEARCH",
    GetBusinessesFromSearchSuccess = "GET_BUSINESS_FROM_SEARCH_SUCCESS",
    GetBusinessesFromSearchFail = "GET_BUSINESS_FROM_SEARCH_FAIL",
}
