export default {
    render() {

    },
    created() {
        console.log(this.$slots.default.data);
    },
}