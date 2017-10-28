<template>
    <div class="container tree-root">
        <div class="row">
            <center>
                <h2 class="uppercase-text" v-if="subTree.slug==='inicio'">Estadistica absoluta</h2>
                <h2 class="uppercase-text" v-if="subTree.slug!=='inicio'">Estadistica {{subTree.container}} {{subTree.sl}}</h2>
            </center>
        </div>
        <vue-progress-detail v-bind:sub-tree="subTree">
        </vue-progress-detail>
        <div 
            class="row"
            v-for="(role, roleKey) in subTree.tree"
        >   
            <br>
            <hr>
            <center><h2 class="uppercase-text">{{role.sl}}</h2></center>
            <br>
            <br>
            <div    class="col-sm-4 pb-xlg" 
                    v-for="(level, levelKey) in role.tree"
                    v-bind:class="[level.container+'-'+levelKey]"
            >
                <div class="col-sm-1">
                </div>
                <div    class="col-sm-10"
                >
                    <div>
                        <center>
                        <img v-bind:src="'/'+level.icon" class="img-responsive" alt="" />
                        <div class="pt-xlg">
                            <h3 class="uppercase-text">{{level.sl}}</h3>
                        </div>
                        <vue-progress-bar
                            v-bind:bar-final-value="getActivityProgress(level)"
                            v-bind:bar-fixed-final-value="getActivityProgress(level,minBarPorcente)"
                            v-bind:bar-title="getActivityProgress(level)+'%'"
                        >
                        </vue-progress-bar>
                        <br>
                        <router-link v-if="level.tree" v-bind:to="level.absoluteSegmentRoute">
                            <button type="button" class="btn btn-primary">Entrar
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </router-link>
                        </center>
                    </div>
                </div>
                <div class="col-sm-1">
                </div>

            </div>
            <br>
        </div>
        <br>
        <br>
        <br>
    </div> 
</template>

<script>
    import vueAppContainer from './container.vue';
    export default {
        extends: vueAppContainer,
        data:function(){
            return {
                routePass      :false,
                showSpinner    :false,
                minBarPorcente :this.$root.$data.minBarPorcente,
            }
        },
        props:[
            "subTree",
            "slug",
        ],
        computed:{
            totalOfUsers:function(){
                var totalOfUsers=[];
                if(typeof this.subTree.tree==="undefined")
                    return totalOfUsers;
                var childrenKeys=Object.keys(this.subTree.tree);
                for(var i=0;i<childrenKeys.length;i++){
                    totalOfUsers.push(this.subTree.tree[childrenKeys[i]].totalOfUsers);
                }
                return totalOfUsers;
            },
            completed:function(){
                var completed=[];
                if(typeof this.subTree.tree==="undefined")
                    return completed;
                var childrenKeys=Object.keys(this.subTree.tree);
                for(var i=0;i<childrenKeys.length;i++){
                    completed.push(this.subTree.tree[childrenKeys[i]].completed);
                }
                return completed;
            },
            progress:function(){
                var progress=[];
                if(typeof this.subTree.tree==="undefined")
                    return progress;
                var childrenKeys=Object.keys(this.subTree.tree);
                for(var i=0;i<childrenKeys.length;i++){
                    progress.push(100*this.subTree.tree[childrenKeys[i]].cAct/this.subTree.tree[childrenKeys[i]].tAct);
                }
                return progress;
            }
        },
        beforeRouteLeave (to, from, next) {
            this.setGlobalSubTree(to.meta.subTree);
            next();
        }
    }
</script>
