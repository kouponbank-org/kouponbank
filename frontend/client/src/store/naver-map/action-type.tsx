/* Setting ActionTypes to be used in 'reducer.tsx' */

export enum NaverMapActionType {
    NaverMapBoundChange = "NAVER_MAP_BOUND_CHANGE",
    NaverMapBoundChangeSuccess = "NAVER_MAP_BOUND_CHANGE_SUCCESS",
    NaverMapBoundChangeFail = "NAVER_MAP_BOUND_CHANGE_FAIL",
    GetAllBusinessWithinNaverMapBounds = "GET_ALL_BUSINESS_WITHIN_NAVER_MAP_BOUNDS",
    GetAllBusinessWithinNaverMapBoundsSuccess = "GET_ALL_BUSINESS_WITHIN_NAVER_MAP_BOUNDS_SUCCESS",
    GetAllBusinessWithinNaverMapBoundsFail = "GET_ALL_BUSINESS_WITHIN_NAVER_MAP_BOUNDS_FAIL",
}
