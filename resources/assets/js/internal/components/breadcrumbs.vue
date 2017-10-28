<template>
    <section >
        <div class="row">
            <div class="col-md-12">
                <ul class="breadcrumb">  
                        <vue-recursive-link
                            v-if="subTree"
                            v-bind:sub-tree="subTree"
                        >    
                        </vue-recursive-link>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data:function(){
            return {
                showSpinner:false,
                ready:false
            }
        },
        updated() {
        },
        created() {

        },
        computed:{
            getRandom:function(){
                return Math.random();
            },
            subTree:function(){
                return this.$root.$data.subTree;
            },
        },
        mounted(){
        },
        methods:{
        }
    }
</script>
