export const extractFromObject = toExtract => {
    let result = [];
    if ( typeof toExtract === 'object' && toExtract !== null ) result = Object.values(toExtract).map(data => data);

    return result.map(data => {
        if ( typeof data === 'object' || Array.isArray(data) ) {
            return extractFromObject(data).flat();
        }

        return data;
    }).flat().filter(data => data !== undefined);
}