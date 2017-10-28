<script>
    var customJs = require("../../custom-scripts");
    export default {
        data:function(){
            return {
                showSpinner:false,
                ready:false,
                waitForComplete:null,
                waitTime:this.$root.$data.waitTime,
            }
        },
        created: function() {
            if(!this.checkStrictOrder(this.activities,this.activity)){
                this.sendToParentRoute();
            }
            if(typeof this.activity !=="undefined" && !this.activity.completed){
                if(this.activity.activity_type.singular_name!=="Evaluación")
                    this.delayService();
                else
                    if(!this.showScore(this.activities,this.activity))
                        this.getQuestions();
            }
        },
        beforeDestroy:function(){
            clearTimeout(this.waitForComplete);
        },
        computed:{
            activities:function(){
                return this.getSubTree(this.tree,this.routeParams).activities
            },
            activity:function(){
                return this.activities[this.$route.params.activity];
            },
            routeParams:function(){
                return this.$root.$route.params;
            },
            parentRoute:function(){
                return "/nivel/"+this.$root.$route.params.level+"/modulo/"+this.$root.$route.params.module+"/tema/"+this.$root.$route.params.theme+"/"
            },
            grandPatherRoute:function(){
                return "/nivel/"+this.$root.$route.params.level+"/";
            }
        },
        props:[
            "tree",
            "theme",
        ],
        methods:{
            completeActivity:function(){
                if(typeof this.activity ==="undefined" || this.activity.completed)
                    return false;
                var serviceUrl = typeof this.activity !=="undefined"?this.activity.activity_type.table_name+'/'+this.activity.activity.id:"";
                var _this = this;
                _this.showSpinner=true;
                _this.ready=false;
                _this.$root.$data.enableRouting=false;
                this.$root.$options.services.activity.post(serviceUrl,{
                    "sublevel_id":_this.getSubTree(_this.tree,_this.routeParams).id,
                    "treeResume":_this.$root.treeResume()
                }).then(function (response) {
                    if(response.data.reloadTree){
                        _this.$root.$data.tree = _this.$root.treeInitializer(response.data.tree);
                    }else{
                        if(typeof _this.activity !=="undefined" && !_this.activity.completed){
                            _this.activity.completed = true;
                            _this.$root.$data.tree[_this.$root.$route.params.level]["children"][_this.$root.$route.params.module]["children"][_this.$root.$route.params.theme].cAct++;
                            _this.$root.$data.tree[_this.$root.$route.params.level]["children"][_this.$root.$route.params.module].cAct++;
                            _this.$root.$data.tree[_this.$root.$route.params.level].cAct++;
                        }
                    }
                    _this.showSpinner=false;
                    _this.ready=true;
                    _this.$root.$data.enableRouting=true;
                }).catch(function (error) {
                    if(typeof error.data!=="undefined" && typeof error.data.reloadTree!=="undefined" && error.data.reloadTree)
                        _this.$root.$data.tree = error.data.tree;
                    _this.showSpinner=false;
                    _this.$root.$data.enableRouting=true;
                });
            },
            delayService:function(){
                clearTimeout(this.waitForComplete);
                this.waitForComplete = setTimeout(()=>{
                    this.completeActivity();
                    clearTimeout(this.waitForComplete);
                }, this.waitTime);
            }
            ,getPorcent:function(sublevel,minValue,maxValue){ 
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
            rootData:function(property){
                return typeof this.$root.$data[property]!=="undefined"?this.$root.$data[property]:null;
            },
            checkStrictOrder:function(activities,activity){
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
            },
            sendToParentRoute:function(){
                var firstActivity = this.activities[Object.keys(this.activities)[0]];
                this.$router.push({ path: this.parentRoute+'actividad/'+firstActivity.activity_type.slug+'/'+Object.keys(this.activities)[0]+'/'});
            },
            sendToGrandParentRoute:function(){
                this.$router.push({ path: this.grandPatherRoute});
            },
            getRandom:function(){
                return Math.random();
            },
        }
    }
</script>
