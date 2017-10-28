<script>
    var customJs      = require("../custom-scripts");
    export default {
        data:function(){
            return {
                routePass      :false,
                showSpinner    :false,
                minBarPorcente :this.$root.$data.minBarPorcente,
                //animatedPropertys:{},
            }
        },
        props:[
            "subTree",
            "slug",
        ],
        computed:{
        },
        methods:{
            preventCeroDivision:function(origin,propertys){
                if(typeof origin==="undefined")
                    return false;
                if(typeof propertys==="undefined")
                    return false;
                if(typeof propertys!=="object" && propertys==0)
                    return false;
                for(var i=0;i<propertys.length;i++){
                    if(typeof origin[propertys[i]]==="undefined" || origin[propertys[i]]==0)
                        return false;
                }
                return true;
            },
            setGlobalSubTree:function(child){
                this.$root.$data.subTree=child;
            },
            getUserProgress:function(subTree,minValue,maxValue){ 
                var calculetPercente = !this.preventCeroDivision(subTree,["totalOfUsers","completed"])?
                    0:
                    customJs.round10(Number(100*(subTree.completed/subTree.totalOfUsers)),0); 
                if(typeof minValue !=="undefined" && minValue > calculetPercente)
                    return minValue;
                return calculetPercente;
            },
            getActivityProgress:function(subTree,minValue,maxValue){ 
                var calculetPercente = !this.preventCeroDivision(subTree,["tAct","cAct"])?
                    0:
                    customJs.round10(Number(100*(subTree.cAct/subTree.tAct)),0); 
                if(typeof minValue !=="undefined" && minValue > calculetPercente)
                    return minValue;
                return calculetPercente;
            },
            getAverage:function(subTree,minValue,maxValue){
                var calculetPercente = !this.preventCeroDivision(subTree,["tQue","hits"])?
                    0:
                    customJs.round10(Number(100*(subTree.hits/subTree.tQue)),0); 
                if(typeof minValue !=="undefined" && minValue > calculetPercente)
                    return minValue;
                return calculetPercente;
            },
            getCompleted:function(subTree){
                if(!this.preventCeroDivision(subTree,["completed"]))
                    return 0;
                return subTree.completed;
            },
            setGlobalSubTree:function(child,slug){
                this.$root.$data.subTree=child;
            },
            linealTree:function(tree){
                var lineal = [];
                if(!tree || !tree.tree)
                    return lineal;
                var treeKeys = Object.keys(tree.tree);
                for(var i=0;i<treeKeys.length;i++){
                    lineal.push(tree.tree[treeKeys[i]]);
                    if( typeof tree.tree[treeKeys[i]]["tree"]!=="undefined" ){
                        var subLineal = this.linealTree(tree.tree[treeKeys[i]]);
                        if(typeof subLineal!=="undefined")
                            for(var j=0;j<subLineal.length;j++)
                                lineal.push(subLineal[j]);
                    }

                }
                return lineal;
            }
            /* todo, gereric numeric animator,
            runAnimations:function(subTree,propertys){
                var vm = this;
                var animationFrame;

                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }

                var initialValues ={};
                var finalValues   ={}

                for(var i=0;i<propertys.length;i++){
                    if(this.preventCeroDivision(subTree,propertys[i])){
                        initialValues["tweeningNumber"+propertys[i]]=0;
                        if()
                        finalValues["tweeningNumber"+propertys[i]]=0
                    }
                }

                new TWEEN.Tween(initialValues)
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ 
                    tweeningNumberScore: vm.score, 
                    tweeningNumberHists: vm.hits,
                    tweeningNumberQuestions: vm.tQue
                }, 1100)
                .onUpdate(function () {
                    vm.animatedScore     = this._object.tweeningNumberScore.toFixed(0)
                    vm.animatedHits      = this._object.tweeningNumberHists.toFixed(0)
                    vm.animatedQuestions = this._object.tweeningNumberQuestions.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                })
                .start()
                animationFrame = requestAnimationFrame(animate);
            }*/
        }
    }
</script>
