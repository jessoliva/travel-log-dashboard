module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },

    fix_case: (word) => {
        if (!word) {
            return;
        }
        var sentence = word.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ");
    },

    ifCond: (v1, v2, options) => {
        if (v1 || v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
};
