<!-- <template>
    <div class="mt-5 border-b pb-4 border-gray-300">
        <div class="flex justify-between wrapper mb-5">
            <div class="flex items-center">
                <span class="font-[700] text-[18px]">{{ label }}</span>
                <icon icon="ep:arrow-right-bold" color="black" width="15" />
            </div>
            <icon icon="ri:more-2-fill" color="black" width="15" @click.native="drawerSongVisible = !drawerSongVisible" />
        </div>
        <div class="scroll-wrapper overflow-hidden" ref="scrollsong">
            <div class="scroll-content flex w-[200vw]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from '@better-scroll/core';
    let bs = null;
    export default{
        name:'songView',
        mounted() {
            bs = new BScroll(this.$refs.wrapper, {
            scrollY: false,
            scrollX: true,
            });
        },
        updated() {
            bs.refresh();
        },
        props:{
            label:{
                required:true,
                type:String,
            }
        }
    }
</script> -->