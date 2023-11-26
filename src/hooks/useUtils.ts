export const useResolveSearchParams = () => {
    // 获取查询字符串

    const queryString = window.location.search;

    // 去除开头的?
    const queryStringWithoutQuestionMark = queryString.slice(1);

    // 分割参数
    const queryParams = queryStringWithoutQuestionMark.split('&');

    // 创建参数对象
    const params: any = {};
    for (let i = 0; i < queryParams.length; i++) {
        const keyValue = queryParams[i].split('=');
        const paramName = decodeURIComponent(keyValue[0]);
        const paramValue = decodeURIComponent(keyValue[1]);
        params[paramName] = paramValue;
    }
    return params
}