export const getUniqueArr = (array: any) => Array.from(new Set(array));

export const mergeArrs = (...arrs: any) => [].concat(...arrs);

export const getUniqueMerge = (...arrs: any) => getUniqueArr(mergeArrs(...arrs));
