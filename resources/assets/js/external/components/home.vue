<template>
    <div class="container tree-root">
        <div class="row mt-lg">
            <div    class="col-sm-4 pb-xlg" 
                    v-for="(level, levelKey) in subTree"
                    v-bind:class="[level.level.level_slug+'-'+levelKey]"
            >
                <div class="col-sm-1">
                </div>
                <div    class="col-sm-10" 
                        v-bind:class="[checkStrictOrder(subTree,level) ? 'icon_act_active' : 'icon_act_inactive']"
                >
                    <div>
                        <center>
                        <img v-bind:src="level.icon" class="img-responsive" alt="" />
                        <div class="pt-xlg">
                            <h2 class="uppercase-text">{{level.name}}</h2>
                        </div>
                        <vue-progress-bar
                            v-bind:bar-final-value="getPorcent(level)"
                            v-bind:bar-fixed-final-value="getPorcent(level,minBarPorcente)"
                            v-bind:bar-title="getPorcent(level)+'% ('+level.cAct +'/' + level.tAct+')'"
                        >
                        </vue-progress-bar>
                        <br>
                        <a v-if="level.has_constancy && sublevelComplete(level)" v-bind:href="'/sublevels/'+level.id+'/constancy'" target="_blank">
                            <button type="button" class="btn btn-primary">Diploma
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </a>
                        <a v-if="!checkStrictOrder(subTree,level)" v-on:click="validationAccessDenied(level)">
                            <button type="button" class="btn btn-primary">Entrar
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </a>
                        <router-link v-if="checkStrictOrder(subTree,level)" v-bind:to="'/nivel/'+levelKey+'/'">
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
        </div>
        <div class="modal fade bs-modal-lg" tabindex="-1" role="basic" aria-hidden="true" ref="introducctionVideo">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">   
                        <div class="col-md-12" style="float:none;">
                            <div class="embed-responsive sombraiframe embed-responsive-16by9">
                                <iframe src="http://player.vimeo.com/video/237002781" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        </div>  
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn default" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import vueAppContainer from './container.vue';
    export default {
        extends: vueAppContainer,
        mounted:function(){
            if(this.user.firstLogin)
                $(this.$refs.introducctionVideo).modal('show');
        }
    }
</script>
