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
        <br>
        <hr>
        <table class="table table-border fixed-4">
            <tr>
                <th class="t-middle t-center">
                </th>
                <th class="t-middle t-center">Progreso por actividades
                </th>
                <th class="t-middle t-center">Progreso por usuarios
                </th>
                <th class="t-middle t-center">Promedio evaluaciones
                </th>
            </tr>
            <tr
                v-for="(node, nodeKey) in inlineTree"
            >
                <td class="t-middle t-left uppercase-text"
                    v-bind:style="{ padding: paddingLeft(node)}"
                >
                    {{node.sl}}
                </td>
                <td class="t-middle t-center">
                    <vue-progress-bar
                        v-bind:bar-final-value="getActivityProgress(node)"
                        v-bind:bar-fixed-final-value="getActivityProgress(node,minBarPorcente)"
                        v-bind:bar-title="getActivityProgress(node)+'%'"
                    >
                    </vue-progress-bar>
                </td>
                <td class="t-middle t-center">
                    <vue-progress-bar
                        v-bind:bar-final-value="getUserProgress(node)"
                        v-bind:bar-fixed-final-value="getUserProgress(node,minBarPorcente)"
                        v-bind:bar-title="getUserProgress(node)+'%'"
                    >
                    </vue-progress-bar> 
                </td>
                <td class="t-middle t-center">
                    <span class="badge">{{animatedAverages[node.container+'-'+node.slug]}}</span>
                </td>
            </tr>
        </table>
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
                animatedAverages:{},
                inlineTree:[],
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
            },
            test:function(){ return this.animatedAverages}
        },
        beforeRouteLeave (to, from, next) {
            this.setGlobalSubTree(to.meta.subTree);
            next();
        },
        methods:{
            paddingLeft:function(node){
                if(node.container=="tema")
                    return " 0 0 0 15px ";
                return "0";
            }
        },
        created:function(){
            this.inlineTree = this.linealTree(this.subTree);
        },
        mounted:function(){
            for(var i=0;i<this.inlineTree.length;i++){
                this.$set(this.animatedAverages,[this.inlineTree[i]["container"]+"-"+this.inlineTree[i]["slug"]], 0);
                this.numericAnimator(this.animatedAverages,{
                    target:this.inlineTree[i]["container"]+"-"+this.inlineTree[i]["slug"],
                    final :this.getAverage(this.inlineTree[i]),
                    increment:3
                });
            }
        }
    }
</script>
