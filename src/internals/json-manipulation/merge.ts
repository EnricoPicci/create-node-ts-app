export function mergeJson(json1: any, json2: any) {
    const mergedJson = { ...json1, ...json2 };
    return mergedJson;
}
