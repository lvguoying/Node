public static int ConvertToNumber(string romanNumber) {
    var number = 0;
    var length = romanNumber.Length;
    var digits = new Dictionary < string,
        int > () {
            {
                "I",
                1
            }, {
                "V",
                5
            }, {
                "X",
                10
            }, {
                "L",
                50
            }, {
                "C",
                100
            }, {
                "D",
                500
            }, {
                "M",
                1000
            }
        };

    for (int i = 0; i < length - 1; i++) {
        //前面 n-1 位数字通过左右比较决定正负 & 第 n 位数字必然为正
        if ((digits[romanNumber[i].ToString()] >= digits[romanNumber[i + 1].ToString()]) || i + 1 >= length) {
            number += digits[romanNumber[i].ToString()];
        } else {
            number -= digits[romanNumber[i].ToString()];
        }
    }
    return number;
}