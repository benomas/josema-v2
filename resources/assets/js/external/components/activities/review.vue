<template>
    <div class="col-sm-12">
        <vue-simple-spinner 
            v-if="showSpinner"
            class="fixed-sppiner"
            size="50"
            message="Cargando..."
            text-fg-color="#009458"
            line-fg-color="#1B7886" 
            line-bg-color="#159FBB"
            v-bind:line-size="4"
            v-bind:speed="1.0"
        >         
        </vue-simple-spinner>
        <div v-if="ready">
            <hr class="solid">                          
            <div class="col-xs-12" v-if="!showScore(activities,activity)">
                <div v-for="(question, questionKey) in questions">
                    <div class="col-sm-12">
                        <p class="lead" style="font-weight: bold;">{{questionKey+1}}. {{question.question}}</p>
                    </div>
                    
                    <div class="col-md-12 respuestas" v-if="question.answers">                                              
                        <div id="radio-demo" v-for="(answer, amswerKey) in question.answers">                                       
                            <input type="radio" v-bind:name="'question'+(questionKey+1)" v-bind:id="(questionKey+1)+'choice'+(amswerKey+1)" v-bind:value="answer" v-model="answers['question'+(questionKey+1)].answer">
                                <label v-bind:for="(questionKey+1)+'choice'+(amswerKey+1)">
                                    <span style="padding-right: 25px;"></span>{{amswerKey}}) {{answer}}
                                </label>  
                        </div>
                    </div>
                </div>
                <center>
                    <button type="button" 
                            class="btn btn-primary" 
                            v-on:click="completeActivity()">
                                Finalizar 
                                <i class="fa fa-chevron-right"></i>
                    </button>
                </center>
            </div>
            <div v-if="showScore(activities,activity)">
                <p class="lead" style="font-weight: bold; text-align: center;">Resultados de la Evaluación:</p>
                <div class="row">
                    <div class="counters with-borders">
                        <div class="col-md-4">
                            <div class="counter counter-primary">
                                <strong>{{animatedQuestions}}</strong>
                                <label>Preguntas</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="counter counter-primary">
                                <strong>{{animatedHits}}</strong>
                                <label>Aciertos</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="counter counter-primary">
                                <strong >{{animatedScore}}</strong>
                                <label>Calificación</label>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div v-if="activity.completed">
                    <p class="lead" style="text-align: center;">
                        Tu calificación es <b>Aprobatoria</b>
                        <br>¡Bien Hecho! Ahora puedes continuar con los demás temas de este Nivel.
                    </p>
                    <p class="lead" style="text-align: center;">
                        <a v-on:click="sendToGrandParentRoute()" >
                            <button type="button" class="btn btn-primary">
                                Ver temas
                            </button>
                        </a>
                        <button type="button"
                                v-if="hasConstancies"
                                class="btn btn-primary"
                                v-on:click="openModal()">Descargar diploma<span v-if="constancySublevels.length>1">s</span>
                                <i class="fa fa-chevron-right"></i>
                        </button>
                    </p>
                </div>
                <div v-if="!activity.completed">
                    <p class="lead" style="text-align: center;">
                        Tu calificación es <b>No Aprobatoria</b>
                        <br>Debes volver tomar el tema y haz la evaluación de nuevo.
                    </p>
                    <p class="lead" style="text-align: center;">
                        <a v-on:click="sendToParentRoute()">
                            <button type="button" class="btn btn-primary">
                                Reinicar Tema
                            </button>
                        </a>
                    </p>
                    <br>
                </div>
            </div>
        </div>
        <div class="modal fade bs-modal-md" tabindex="-1" role="basic" aria-hidden="true" ref="constancyModal">
                <div class="modal-dialog modal-md">
                    <div class="modal-content" >
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 class="modal-title">
                                <h3>Felicidades haz obtenido {{constancySublevels.length}} diploma<span v-if="constancySublevels.length>1">s</span></h3>
                                <i  class="fa fa-spinner fa-spin pull-right"
                                    style="font-size:28px; color:#3598DC; margin-right:12px;"
                                    v-show="showSpinner"
                                >
                                </i>
                            </h4>

                        </div>
                        <div class="modal-body">
                            <div v-for="(constancySublevel, constancySublevelKey) in constancySublevels">
                                <br>
                                <div class="col-xs-9">Descargar diploma de {{constancySublevel.the_sublevel}}</div>
                                <div class="col-xs-3">
                                    <a v-bind:href="'/sublevels/'+constancySublevel.id+'/constancy'" target="_blank">
                                        <button type="button" class="btn btn-primary">Diploma
                                            <i class="fa fa-chevron-right"></i>
                                        </button>
                                    </a>
                                </div>
                                <br>
                                <br>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn default" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    var TWEEN = require('@tweenjs/tween.js');
    import vueAppActivity from './activity.vue';
    export default {
        extends: vueAppActivity,
        data:function(){
            return {
                ready:false,
                questions:[],
                answers:{},
                showConstancyModal:false,
                animatedHits:0,
                animatedQuestions:0,
                animatedScore:0,
            }
        },
        created:function(){

            if(this.activity.activity_type.singular_name==="Evaluación"){
                if(!this.showScore(this.activities,this.activity))
                    this.getQuestions();
                else
                    this.ready=true;
            }
            else
                return false;
        },
        mounted: function(){
            if(this.showScore(this.activities,this.activity)){
                if(!this.activity.completed)
                    this.$toaster.warning('Debes completar las actividades previas para poder volver a realizar la esta actividad');
                this.runAnimations(false);
            }
        },
        computed:{
            score:function(){
                return this.activity.score;
            },
            hits:function(){
                return this.activity.hits;
            },
            tQue:function(){
                return this.activity.tQue;
            },
            constancySublevels:function(){
                var entity = this.activity;
                var constancyFinder=[];
                while(typeof entity["parent"]!=="undefined"){
                    if(entity["parent"]["has_constancy"] && entity["parent"]["tAct"]=== entity["parent"]["cAct"])
                        constancyFinder.push(entity["parent"]);
                    entity=entity["parent"];
                }
                return constancyFinder;
            },
            hasConstancies:function(){
                if(typeof this.constancySublevels==="undefined")
                    return false;
                return this.constancySublevels.length>0;
            }
        },
        methods:{
            enableSubmit:function(){
                if(typeof this.activity ==="undefined" || this.activity.completed)
                    return false;

                if(typeof this.answers==="undefined")
                    return false;

                var questions = Object.keys(this.answers);
                if(!questions || questions.length===0)
                    return false;

                for(var i=0;i<questions.length;i++)
                    if(this.answers[questions[i]].answer ===null)
                        return false;

                return true;
            },
            completeActivity:function(){
                if(!this.enableSubmit()){
                    this.$toaster.warning('Debes contestar todas las preguntas');
                    return false;
                }
                var serviceUrl = typeof this.activity !=="undefined"?this.activity.activity_type.table_name+'/'+this.activity.activity.id:"";
                var _this = this;
                _this.showSpinner=true;
                _this.$root.$data.enableRouting=false;
                this.$root.$options.services.activity.post(serviceUrl,{
                    answers:_this.answers,
                    "treeResume":_this.$root.treeResume()
                }).then(function (response) {
                    if(!response.data.reloadTree && typeof _this.activity !=="undefined" && response.data.completed){
                        _this.activity.completed = true;
                        _this.$root.$data.tree[_this.$root.$route.params.level]["children"][_this.$root.$route.params.module]["children"][_this.$root.$route.params.theme].cAct++;
                        _this.$root.$data.tree[_this.$root.$route.params.level]["children"][_this.$root.$route.params.module].cAct++;
                        _this.$root.$data.tree[_this.$root.$route.params.level].cAct++;
                    }
                    _this.activity.created =true;
                    _this.activity.score   =response.data.score;
                    _this.activity.hits    =response.data.hits;
                    if(response.data.reloadTree)
                        _this.$root.$data.tree = _this.$root.treeInitializer(response.data.tree);
                    _this.runAnimations();
                }).catch(function (error) {
                    if(typeof error.data!=="undefined" && typeof error.data.reloadTree!=="undefined" && error.data.reloadTree)
                        _this.$root.$data.tree = error.data.tree;
                    _this.showSpinner=false;
                    _this.$root.$data.enableRouting=true;
                });
            },
            getQuestions(){
                var serviceUrl = typeof this.activity !=="undefined"?"fixed/"+this.activity.activity_type.table_name+"/"+this.activity.activity.id+"/questions":"";
                var _this = this;
                _this.showSpinner=true;
                _this.ready=false;
                _this.$root.$options.services.activity.get(serviceUrl,{
                }).then(function (response) {
                    for(var i=0;i<response.data.length;i++)
                        _this.answers["question"+(i+1)]={"questionId":response.data[i].id,"answer":null};
                    _this.questions = response.data;
                    _this.activity.tQue=response.data.length;
                    _this.showSpinner=false;
                    _this.ready=true;
                }).catch(function (error) {
                    _this.showSpinner=false;
                });
            },
            openModal:function(constancyModal){
                $(this.$refs.constancyModal).modal('show');
            },
            showScore:function(activities,activity){
                if(!activity.created)
                    return false;
                if(typeof activity.completed!=="undefined" && activity.completed)
                    return true;

                if(!activity.strict_order)
                    return false;

                var activityKeys = Object.keys(activities);
                for(var i=0;i<activityKeys.length;i++){
                    if(activities[activityKeys[i]]===activity)
                        return false;
                    if(!activities[activityKeys[i]].completed)
                        return true;
                }
                return false;
            },
            runAnimations:function(openModal){
                this.showSpinner=false;
                var vm = this;
                var animationFrame;

                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }

                new TWEEN.Tween({ 
                    tweeningNumberScore:0, 
                    tweeningNumberHists:0, 
                    tweeningNumberQuestions:0
                })
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
                animationFrame = requestAnimationFrame(animate)
                this.$root.$data.enableRouting=true;
                if(typeof openModal ==="undefined" && this.hasConstancies)
                    this.openModal();
            }
        }
    }
</script>