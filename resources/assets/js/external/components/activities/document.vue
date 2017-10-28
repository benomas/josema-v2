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
        <hr class="solid">
        <div class="col-xs-12" >
            <div class="embed-responsive sombraiframe embed-responsive-4by3">
                <iframe v-bind:src="activity.activity.issuu_frame" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>
<script>
    import vueAppActivity from './activity.vue';
    export default {
        extends: vueAppActivity
    }
</script>
