<template>
    <div 
        class="container"
        v-bind:class="[subTree.level.level_slug+'-'+subTree.sublevel_slug]"
    >
        <div    class="row mt-lg listado_temas">
            <div class="col-sm-6 pb-none">
                <div class="col-sm-1">
                </div>
                <div class="col-sm-5">
                    <div>
                        <center>
                            <img v-bind:src="subTree.icon" class="img-responsive" alt="" height="150px" width="150px" />
                        </center>
                    </div>
                </div>
                <div class="col-sm-6">
                        <center>
                            <div class="pt-xlg">
                                <h2 class="uppercase-text">{{subTree.sublevel}}</h2>
                            </div>
                            <vue-progress-bar
                                v-bind:bar-final-value="getPorcent(subTree)"
                                v-bind:bar-fixed-final-value="getPorcent(subTree,minBarPorcente)"
                                v-bind:bar-title="getPorcent(subTree)+'% ('+subTree.cAct +'/' + subTree.tAct+')'"
                            >
                            </vue-progress-bar>
                            <br>
                        </center>
                </div>
                <div class="col-sm-1">
                </div>

            </div>
            <div    
                v-if="subTree.children" class="col-sm-6 pb-none"
            >
                <div    v-for="(module, moduleKey) in subTree.children"
                        class="col-sm-12 pb-xlg" 
                        v-bind:class="[module.level.level_slug+'-'+module.sublevel_slug ,checkStrictOrder(subTree.children,module) ? 'icon_act_active' : 'icon_act_inactive']"
                >
                    <div class="row as-table">
                        <div class="col-sm-4" style="padding-right: 0;">
                            <div>
                                <center>
                                <img v-bind:src="module.icon" class="img-responsive" alt=""
                                     v-bind:title="getPorcent(module)+'%'"/>
                                </center>
                            </div>
                        </div>
                        <div class="col-sm-8" style="padding-left: 0;">
                                <div class="pt-lg">
                                    <ul 
                                        class="fa-chevron-right"
                                        v-bind:class="[module.level.level_slug+'-'+module.sublevel_slug]"
                                    >
                                        <li 
                                            v-if="module.children" v-for="(theme, themeKey) in module.children"
                                            v-bind:title="getPorcent(theme)+'% ('+theme.cAct +'/' + theme.tAct+')'"
                                            v-bind:class="[theme.level.level_slug+'-'+theme.sublevel_slug,checkStrictOrder(module.children,theme) ? 'icon_act_active' : 'icon_act_inactive',sublevelComplete(theme)?'completed':'']"
                                        >
                                            <a v-if="!checkStrictOrder(module.children,theme)" v-on:click="validationAccessDenied(theme)">
                                                {{theme.name}}
                                            </a>
                                            <router-link  v-if="checkStrictOrder(module.children,theme)" v-bind:to="'/nivel/'+routeParams.level+'/modulo/'+moduleKey+'/tema/'+themeKey+'/'">
                                                {{theme.name}}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6 pb-xlg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueAppContainer from './container.vue';
    export default {
        extends: vueAppContainer,
        created:function() {
            if(!this.checkStrictOrder(this.$root.$data.tree,this.$root.$data.tree[this.routeParams.level])){
                this.$router.push({ path: '/'});
            }
            this.routePass===true;
        },
        updated:function() {
            if(this.routePass)
                return true;
            if(!this.checkStrictOrder(this.$root.$data.tree,this.$root.$data.tree[this.routeParams.level])){
                this.$router.push({ path: '/'});
            }
            this.routePass===true;
        }
    }
</script>
