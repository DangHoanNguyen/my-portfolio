
const home = new Vue({
    el: "#outer",
    data: {
        cur: 0,
        bio: [],
        projects: [],
    },
    methods: {
        viewProfile: function() {
            this.cur = 0;
        },
        viewPortfolio: function() {
            this.cur = 1;
        },

    }
});