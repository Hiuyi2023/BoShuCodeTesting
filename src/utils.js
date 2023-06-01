export const convertToColumnData = (data, rowCount, columnCount) => {
    const length = data.length;
    const result = new Array(length);
    let index = 0;
    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            const position = j * columnCount + i;
            if (position < length) {
                result[position] = data[index++];
            }
        }
    }
    return result;
};