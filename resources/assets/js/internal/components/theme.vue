<template>
    <div 
        class="container"
        v-bind:class="[customAnscestor('module').level.level_slug+'-'+customAnscestor('module').sublevel_slug]"
    >
        <div class="row mt-lg">
            <div class="col-xs-12">
                <div class="col-xs-12 col-sm-3">
                    <center>
                        <img v-bind:src="customAnscestor('module').icon"
                             class="img-responsive sublevel-logo" alt=""
                             v-bind:title="getPorcent(customAnscestor('module'))+'%'"/>
                    </center>
                </div>
                <div class="progress-container col-xs-12 col-sm-9">
                    <span  class="title-container uppercase-text">
                        <h4 class="mb-none hidden-xs" style="color: #00abc5" >{{subTree.level.singular_name}}</h4>
                        <h3 class="mb-none" >{{subTree.name}}</h3>
                    </span>
                    <span class="summary-container">
                        <h4 class="mb-none">
                            <label class="theme-completed-text">Completado</label>
                            <span style="font-size: 24px; color:#00abc5" >{{subTree.cAct}}</span>
                            <span style="font-size: 24px" >/{{subTree.tAct}}</span>
                        </h4>
                    </span>
                </div>  
            </div>
            <div class="col-xs-12 col-sm-3 pb-xlg ">
                <div>
                    <div class="pt-xlg">
                        <ul class="actividades">
                            <li
                                v-if="subTree.activities"
                                v-for="(activity, activityKey) in subTree.activities"
                                v-bind:class="[activity.completed?'completed':'', routeParams.activity && routeParams.activity===activityKey?'current-activity':'']"
                                v-bind:title="activityKey">
                                <a v-if="!checkStrictOrderActivity(subTree.activities,activity)" v-on:click="validationAccessDenied(activityKey)">
                                    <img v-bind:src="activity.activity_type.icon"/>
                                    <label>{{activity.activity_type.singular_name}}</label>
                                </a>
                                <router-link v-if="checkStrictOrderActivity(subTree.activities,activity)" v-bind:to="currentRoute+'actividad/'+activity.activity_type.slug+'/'+activityKey+'/'">
                                    <img v-bind:src="activity.activity_type.icon"/>
                                    <label>{{activity.activity_type.singular_name}}</label>
                                </router-link>
                                <i v-bind:class="[activity.completed?'completed':'', routeParams.activity && routeParams.activity===activityKey?'current-activity':'']" class="fa fa-check-circle" aria-hidden="true"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-9 pb-xlg">
                <transition name="bounce">
                <router-view 
                    class="actividad-contenedor"
                    v-bind:theme="subTree" 
                    v-bind:tree="tree" 
                    v-bind:key="'a' + $route.params.activity"
                >
                </router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import vueAppContainer from './container.vue';
    export default {
        extends: vueAppContainer,
        data:function(){
            return {
                currentRoute:"/nivel/"+this.$root.$route.params.level+"/modulo/"+this.$root.$route.params.module+"/tema/"+this.$root.$route.params.theme+"/"
            }
        },
        mounted () {
            if(typeof this.subTree!=="undefined" && this.subTree.activities && typeof this.routeParams.activity==="undefined"){
                var firstActivity = this.subTree.activities[Object.keys(this.subTree.activities)[0]];
                this.$router.push({ path: this.currentRoute+'actividad/'+firstActivity.activity_type.slug+'/'+Object.keys(this.subTree.activities)[0]+'/',key:this.getRandom()});
            }
        },
        created:function() {
            if(typeof this.routeParams.module!== "undefined" && !this.checkStrictOrder(this.$root.$data.tree[this.routeParams.level].children[this.routeParams.module].children,this.$root.$data.tree[this.routeParams.level].children[this.routeParams.module].children[this.routeParams.theme])){
                this.$router.push({ path: '/',key:this.getRandom()});
            }
            this.routePass===true;
        },
        updated:function() {
            if(this.routePass)
                return true;
            if( typeof this.routeParams==="undefined" || 
                typeof this.routeParams.level==="undefined" ||
                typeof this.$root.$data.tree==="undefined" || 
                typeof this.$root.$data.tree[this.routeParams.level]==="undefined"
            )
            return false;

            if(typeof this.routeParams.module!== "undefined" && !this.checkStrictOrder(this.$root.$data.tree[this.routeParams.level].children[this.routeParams.module].children,this.$root.$data.tree[this.routeParams.level].children[this.routeParams.module].children[this.routeParams.theme])){
                this.$router.push({ path: '/',key:this.getRandom()});
            }
            this.routePass===true;
        },
        methods:{
            checkStrictOrderActivity:function(activities,activity){
                if(!activity.strict_order)
                    return true;
                if(activity.created)
                    return true;
                var activityKeys = Object.keys(activities);
                for(var i=0;i<activityKeys.length;i++){
                    if(activities[activityKeys[i]]===activity)
                        return true;
                    if(!activities[activityKeys[i]].completed)
                        return false;
                }
                return true;
            },
            validationAccessDenied:function(activityKey){
                this.$toaster.warning('Debes completar las actividades previas para poder acceder a '+activityKey);
            } 
        },
    }
</script>
