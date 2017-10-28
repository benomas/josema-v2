<template>
    <div class="container tree-root">
        <label v-if="subTree.slug==='raiz'">Estadistica absoluta</label>
        <label v-if="subTree.slug!=='raiz'">Estadistica por {{subTree.slug}}</label>
        <hr>
        <ul class="list-group">
          <li class="list-group-item col-xs-3">
            <span class="badge">{{subTree.totalOfUsers}}</span>
            Total de usuarios: 
          </li>
          <li class="list-group-item col-xs-3">
            <span class="badge">{{getCompleted(subTree)}}</span>
            Usuarios completados: 
          </li>
          <li class="list-group-item col-xs-3">
            <span class="badge">{{getAverage(subTree)}}%</span>
            Promedio de calificaciones: 
          </li>
          <li class="list-group-item col-xs-3">
            <span class="badge">{{getProgress(subTree)}}%</span>
            Progreso: 
          </li>

        </ul>
        <center>
            <div    class="progress"
                    v-bind:title="getProgress(subTree)">
                <div
                    class="progress-bar progress-bar-primary"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    v-bind:style="{width:getProgress(subTree,3)+'%'}">
                    {{getProgress(subTree)}}%
                </div>
            </div>
        </center>
        <div    class="" 
                v-for="(child, childKey) in subTree.tree"
                style="display:inline-block;"
        >
            <router-link v-bind:to="child.absoluteSegmentRoute">
                <button type="button" class="btn btn-primary">{{childKey}}
                    <i class="fa fa-chevron-right"></i>
                </button>
            </router-link>
        </div>
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
            },
            myoption:function(){
                var myOptions = {
                    responsive:true,
                    maintainAspectRatio:true,
                    onClick:function(test,asd){ console.log([test,asd])},
                    title: {
                        display: true,
                        position: 'bottom',
                        text: 'Roles'
                    }, 
                    data : {
                        datasets: [{
                            data: [10, 20, 30]
                        }],  
                        labels: [
                            'Red',
                            'Yellow',
                            'Blue'
                        ]
                    },
                    animation:{
                        animateRotate:true}
                }
                return myOptions;
            }
        },
        methods:{
            setGlobalSubTree:function(child,slug){
                this.$root.$data.subTree=child;
            }
        },
        beforeRouteLeave (to, from, next) {
            this.setGlobalSubTree(to.meta.subTree);
            next();
        }
    }
</script>
