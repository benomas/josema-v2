<template>
    <section class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ul class="breadcrumb">  
                        <transition name="slide-fade">
                        <li><router-link v-bind:to="'/'" v-bind:key="getRandom">INICIO</router-link></li>
                        </transition>
                        <transition name="slide-fade">
                        <li v-if="isCurrentRoute('help')"><router-link v-bind:to="'/ayuda'">Ayuda</router-link></li>
                        </transition>
                        <transition name="slide-fade">
                        <li v-if="params.level"><router-link v-bind:to="levelRoute" v-bind:key="getRandom">{{params.level}}</router-link></li>
                        </transition>
                        <transition name="slide-fade">
                        <li v-if="params.module"><router-link v-bind:to="levelRoute" v-bind:key="getRandom">{{params.module}}</router-link></li>
                        </transition>
                        <transition name="slide-fade">
                        <li v-if="params.theme"><router-link v-bind:to="themeRoute" v-bind:key="getRandom">{{params.theme}}</router-link></li>
                        </transition>
                        <transition name="slide-fade">
                        <li v-if="params.activity"><router-link v-bind:to="activityRoute" v-bind:key="getRandom">{{params.activity}}</router-link></li>
                        </transition>
                    </ul>
                </div>
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
        beforeDestroy(){
        },
        computed:{
            params:function(){
                return this.$root.$route.params;
            },
            tree:function(){
                if(typeof this.$root.$data.tree==="undefined")
                    return null;
                return this.$root.$data.tree;
            },
            levelRoute:function(){
                return '/nivel/'+this.params.level+'/';
            },
            moduleRoute:function(){
                return this.levelRoute+'modulo/'+this.params.module+'/';
            },
            themeRoute:function(){
                if(!this.tree)
                    return "/";
                var activities = this.tree[this.params.level]["children"][this.params.module]["children"][this.params.theme]["activities"];
                var firstActivity = activities[Object.keys(activities)[0]];
                return this.moduleRoute+'tema/'+this.params.theme+'/'+'actividad/'+firstActivity.activity_type.slug+'/'+Object.keys(activities)[0]+'/';
            },
            activityRoute:function(){
                if(!this.tree)
                    return "/";
                var activityInstance =this.tree[this.params.level]["children"][this.params.module]["children"][this.params.theme]["activities"][this.params.activity];
                return typeof activityInstance!=="undefined"?this.moduleRoute+'tema/'+this.params.theme+'/'+'actividad/'+activityInstance.activity_type.slug+'/'+this.params.activity:"";
            },
            getRandom:function(){
                return Math.random();
            },
        },
        mounted() {
        },
        props:[
        ],
        methods:{
            isCurrentRoute:function(currentName){
                return this.$root.$route.name===currentName;
            }
        }
    }
</script>
