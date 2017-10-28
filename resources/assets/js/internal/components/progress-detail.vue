<template>
    <div>
        <hr>
        <div class="row t-middle" v-bind:title="'actividades completadas hasta aqui'">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 t-middle">
                Progreso por actividades
                <vue-progress-bar
                    v-bind:bar-final-value="getActivityProgress(subTree)"
                    v-bind:bar-fixed-final-value="getActivityProgress(subTree,minBarPorcente)"
                    v-bind:bar-title="getActivityProgress(subTree)+'%'"
                >
                </vue-progress-bar>
            </div><!--
            --><div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 t-middle" v-bind:title="'Usuarios que han concluido'">
                Progreso por usuarios
                <vue-progress-bar
                    v-bind:bar-final-value="getUserProgress(subTree)"
                    v-bind:bar-fixed-final-value="getUserProgress(subTree,minBarPorcente)"
                    v-bind:bar-title="getUserProgress(subTree)+'%'"
                >
                </vue-progress-bar>
            </div><!--
            --><div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 t-middle" v-bind:title="'Total de usuarios con acceso'">
                <div>
                    Total de usuarios: <span class="badge">{{animatedTotalOfUsers}}</span>
                </div>
            </div><!--
            --><div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 t-middle" v-bind:title="'Promedio de calificaciones para usuarios que han realizado evaluaciones'">
                Promedio evaluaciones: <span class="badge">{{animatedAverage}}</span>
            </div>
        </div>
        <!--
        <div class="row">
            <center>
                <div    class="progress"
                        v-bind:title="getActivityProgress(subTree)">
                    <div
                        class="progress-bar progress-bar-primary"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        v-bind:style="{width:getActivityProgress(subTree,minBarPorcente)+'%'}">
                        {{getActivityProgress(subTree)}}%
                    </div>
                </div>
            </center>
        </div>
        -->
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
                animatedTotalOfUsers:0,
                animatedAverage:0,
            }
        },
        props:[
            "subTree",
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
        mounted:function(){
            this.numericAnimator(this,{
                target:"animatedTotalOfUsers",
                final :this.subTree.totalOfUsers,
                increment:3
            });
            this.numericAnimator(this,{
                target:"animatedAverage",
                final :this.getAverage(this.subTree),
                increment:3
            });
        }
    }
</script>
