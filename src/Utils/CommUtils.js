/**
 * 통신 관련 util 입니다.
 * @author 감자
 */

const HOST_URL = "https://mw467ftc5f.execute-api.ap-northeast-2.amazonaws.com/";

/**
 * 유저 카운팅 갯수를 가져오는 api url 입니다.
 */
const COUNT_API_URL = HOST_URL + 'getPickerUserClickingCount';

export {
    HOST_URL,
    COUNT_API_URL
};