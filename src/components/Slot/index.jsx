export default {
    render() {
        // return this.$parent.$slots.default;

    },
    props: {
        name: {
            type: String,
        }
    },
    created() {
        console.log(this.$parent.$slots);
    }
}