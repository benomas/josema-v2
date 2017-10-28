<script>
    var customJs      = require("../custom-scripts");
    export default {
        data:function(){
            return {
                routePass      :false,
                showSpinner    :false,
                minBarPorcente :this.$root.$data.minBarPorcente,
            }
        },
        props:[
            "tree"
        ],
        computed:{
            subTree:function(){
                return this.getSubTree(this.tree,this.routeParams);
            },
            routeParams:function(){
                return this.$root.$route.params;
            },
            user:function(){
                return this.$root.$data.user;
            }
        },
        methods:{
            customAnscestor:function(depth){
                return this.getSubTree(this.tree,this.routeParams,depth);
            },
            getPorcent:function(sublevel,minValue,maxValue){ 
                var calculetPercente = sublevel.tAct==0?0:customJs.round10(Number(100*(sublevel.cAct/sublevel.tAct)),0); 
                if(typeof minValue !=="undefined" && minValue > calculetPercente)
                    return minValue;
                return calculetPercente;
            },
            getSubTree:function(tree,params,stopProperty){
                if(typeof params ==="undefined" || params.length===0)
                    return tree;

                var paramKeys = Object.keys(params);
                var tempTree=tree;
                for(var i=0;i<paramKeys.length;i++){
                    if(typeof tempTree[params[paramKeys[i]]] !=="undefined")
                        tempTree=tempTree[params[paramKeys[i]]];
                    else
                        if(typeof tempTree.children!=="undefined" && typeof tempTree.children[params[paramKeys[i]]] !=="undefined")
                            tempTree=tempTree.children[params[paramKeys[i]]];
                    if(typeof stopProperty!=="undefined" && stopProperty===paramKeys[i])
                        return tempTree;
                }
                return tempTree;
            },
            checkStrictOrder:function(containers,container){
                if(typeof container ==="undefined")
                    return true;
                if(!container.strict_order)
                    return true;
                if(container.tAct===container.cAct)
                    return true;
                var containerKeys = Object.keys(containers);
                for(var i=0;i<containerKeys.length;i++){
                    if(containers[containerKeys[i]]===container)
                        return true;
                    if(containers[containerKeys[i]].tAct > containers[containerKeys[i]].cAct)
                        return false;
                }
                return true;
            },
            rootData:function(property){
                return typeof this.$root.$data[property]!=="undefined"?this.$root.$data[property]:null;
            },
            validationAccessDenied:function(container){
                if(typeof container ==="undefined")
                    return true;
                this.$toaster.warning('Debes completar los '+container.level.plural_name+' previos para poder acceder a '+container.the_sublevel);
            },
            sublevelComplete:function(sublevel){
                return sublevel.tAct === sublevel.cAct;
            },
            getRandom:function(){
                return Math.random();
            },
        }
    }
</script>
