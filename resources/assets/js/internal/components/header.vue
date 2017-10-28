<template>
     <header id="header" class="header-narrow">
        <div class="header-body" style="background-color: #159fbb; ">
            <div class="header-container container">
                <div class="header-row">
                    <div class="header-column">
                        <div class="header-logo">
                            <a href="#">
                                <img alt="Porto" src="img/bw_logo_blanco_-01.svg">
                            </a>
                        </div>
                    </div>
                    <div class="header-column">
                        <div class="header-row">
                            <div class="header-nav header-nav-dark-dropdown">
                                <button class="btn header-btn-collapse-nav" data-toggle="collapse" data-target=".header-nav-main">
                                    <i class="fa fa-bars"></i>
                                </button>
                                <div class="header-nav-main header-nav-main-square custom-header-nav-main-effect-1 collapse">
                                    <nav>
                                        <ul class="nav nav-pills" id="mainNav">
                                            <li class="item-menu divisor sinrayaizq">
                                                <router-link v-bind:to="'/'">NIVELES</router-link>
                                            </li>
                                            <li class="item-menu divisor">
                                                <router-link v-bind:to="'/ayuda'">AYUDA</router-link>
                                            </li>
                                            <li class="item-menu divisor dropdown dropdown-mega dropdown-mega-signin signin logged" id="headerAccount">
                                                <a class="dropdown-toggle" v-if="user">
                                                    <i class="fa fa-user"></i> {{user.first_name}} {{user.last_name}} 
                                                </a>
                                                <a class="dropdown-toggle" v-if="!user">
                                                    <i class="fa fa-user"></i>
                                                    <vue-simple-spinner
                                                        style="display:inline-table;"
                                                        size="12"
                                                    >         
                                                    </vue-simple-spinner>
                                                </a>
                                                <ul class="dropdown-menu" v-if="user">
                                                    <li>
                                                        <div class="dropdown-mega-content">

                                                            <div class="row">
                                                                <div class="col-md-7">
                                                                    <div class="user-avatar">
                                                                        <div class="img-thumbnail">
                                                                            <img v-bind:src="user.photo" alt="">
                                                                        </div>
                                                                        <p><strong>{{user.first_name}} {{user.last_name}}</strong><span>{{user.roles[0].name}}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-5">
                                                                    <ul class="list-account-options">
                                                                        <li style="color: #fff"
                                                                            v-bind:title="getPorcent(activities)+'% ('+activities.cAct +'/' + activities.tAct+')'">
                                                                                Avance Total: {{getPorcent(activities)}}%
                                                                        </li>
                                                                        <li>
                                                                            <a href="/logout"><i class="fa fa-sign-out"></i><strong> Cerrar Sesión</strong></a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    var customJs      = require("../custom-scripts");
    export default {
        mounted() {
        },
        computed:{
            user:function(){
                if(typeof this.$root.$data.user==="undefined")
                    return null;
                return this.$root.$data.user;
            },
            tree:function(){
                return this.$root.$data.tree;
            },
            activities:function(){
                var treeKeys =  Object.keys(this.tree);
                var activities={tAct:0,cAct:0};
                for(var i=0;i<treeKeys.length;i++){
                    activities.tAct+=this.tree[treeKeys[i]].tAct;
                    activities.cAct+=this.tree[treeKeys[i]].cAct;
                }
                return activities;
            }
        },
        methods:{
            getPorcent:function(activities,minValue,maxValue){ 
                var calculetPercente = customJs.round10(Number(100*(activities.cAct/activities.tAct)),0); 
                if(typeof minValue !=="undefined" && minValue > calculetPercente)
                    return minValue;
                return calculetPercente;
            },
        }
    }
</script>
