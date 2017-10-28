<template>
    <div    class="progress"
            v-bind:title="computedTitle"
            v-bind:style="computedStyle"
    >
        <div
            class="progress-bar progress-bar-primary"
            role="progressbar"
            v-bind:aria-valuemin="computedMinVal"
            v-bind:aria-valuemax="computedMaxVal"
            v-bind:style="{width:computedBarValue+'%'}">
            {{computedValue}}%
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                timer:null,
                calculedBarValue:null,
            }
        },
        props:[
            "barFinalValue",
            "barFixedFinalValue",
            "barInitialValue",
            "barMaxVal",
            "barMinVal",
            "barStyle",
            "barTitle",
            "barAnimateLapse",
            "barAnimateFuntion",
            "barIncreaseValue",
        ],
        mounted:function(){
            this.calculedBarValue=this.computedInitialValue;
            this.numericAnimator(this,{
                target:"calculedBarValue",
                final :this.computedFixedFinalValue,
                increment:4
            });
        },
        computed:{
            computedFinalValue:function(){
                return typeof this.barFinalValue!=="undefined"?this.barFinalValue:100;
            },
            computedFixedFinalValue:function(){
                return typeof this.barFixedFinalValue!=="undefined"?this.barFixedFinalValue:this.computedFinalValue;
            },
            computedInitialValue:function(){
                return typeof this.barInitialValue!=="undefined"?this.barInitialValue:0;
            },
            computedMaxVal:function(){
                return typeof this.barMaxVal!=="undefined"?this.barMaxVal:100;
            },
            computedMinVal:function(){
                return typeof this.barMinVal!=="undefined"?this.barMinVal:0;
            },
            computedStyle:function(){
                return typeof this.barStyle!=="undefined"?this.barStyle:0;
            },
            computedTitle:function(){
                return typeof this.barTitle!=="undefined"?this.barTitle:0;
            },
            computedIncreaseValue:function(){
                return typeof this.barIncreaseValue!=="undefined"?this.barIncreaseValue:1;
            },
            computedValue:function(){
                return this.barFinalValue;
            },
            computedBarValue:function(){
                return this.calculedBarValue?this.calculedBarValue:this.computedInitialValue;
            },
            computedAnimateLapse:function(){
                return typeof this.barAnimateLapse!=="undefined"?this.barAnimateLapse:10;
            }
        },
        methods:{
        }
    }
</script>
