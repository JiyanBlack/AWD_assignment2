module.exports = function calculateMark(arr1, arr2) {
    var mark = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] == arr2[i]) {
            if (arr1[i] == 0)
                mark += 2;
            else
                mark += 10;
        } else mark -= 1;

    }
    if (mark < 0) return 0;
    return mark;
}