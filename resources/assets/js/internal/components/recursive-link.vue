<template>
    <div>
        <transition-group name="slide-fade">
            <li 
                v-if="navegation"
                v-for="(node, nodeKey) in navegation"
                v-bind:key="nodeKey"
            >
                <router-link 
                    v-bind:to="nextRoute(node)" 
                    v-bind:key="getRandom"
                >
                    <span >
                        {{node.slug}}
                    </span>
                </router-link>
            </li>
        </transition-group>
    </div>
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
            console.log("test");
        },
        computed:{
            getRandom:function(){
                return Math.random();
            },
            navegation:function(){
                var tempNavegation=[];
                var treIterator = this.subTree;
                while(typeof treIterator.parent!=="undefined"){
                    tempNavegation.push(treIterator);
                    treIterator=treIterator.parent;
                }
                console.log(treIterator.absoluteSegmentRoute);
                tempNavegation.push(treIterator);
                return tempNavegation.reverse();
            }
        },
        mounted() {
        },
        props:[
            "subTree",
        ],
        methods:{
            nextRoute:function(node){
                return node.container==='rol'?node.parent.absoluteSegmentRoute:node.absoluteSegmentRoute;
            }
        }
    }
</script>
