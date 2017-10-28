<template>
	<div>
	    <v-select
					v-if="selectEnabled && ready"
	    			:value="item"
	                :options="vOptions()"
	                :on-change="changeCallBack"
	                v-bind:placeholder="placeholder"
	    ></v-select>
	    <div
	    	class="form-control"
	    	v-if="!selectEnabled"
	    >
	    	<span v-if="item">
	    		{{ item['label'] }}
	    	</span>
	    </div>
    </div>
</template>

<script>
    if(typeof customJs==='undefined')
        var customJs = require('../../custom-scripts');
	import vSelect 	from 'vue-select';
	Vue.component('v-select', vSelect);

	export default {
		components: {vSelect},
	    created:function(){
	    	this.initialize();
	    },
	    data:function(){
	        return {
	        	item:null,
	        	ready:false
	        }
	    },
	    computed:{
	    	changeCallBack:function(){
	    		return this.change;
	    	},
	    	selectEnabled:function(){
	    		if(typeof this.selectMode ==='undefined' || this.selectMode)
	    			return true;
	    		return false;
	    	}
	    },
	    props: ['options','mask','selected','placeholder','selectMode'],
	    methods:{
	    	setItem:function(){
	        	if(typeof this.selected==='undefined' || !this.selected )
	    			return false;
	    		let tempOptions = this.vOptions();

	    		for(let i=0;i<tempOptions.length;i++){
	    			if(tempOptions[i]['value']===this.selected){
	    				this.item=tempOptions[i];
						return true;
	    			}
	    		}
	    		return false;
	    	},
	    	expSelectedItem:function(){
	    		if(typeof this.item==='undefined' || !this.item)
	    			return null;
	    		let item={};
	    		item[this.labelIndex()]=this.item.label;
	    		item[this.valueIndex()]=this.item.value;
	    		return item;
	    	},
	    	expSelectedValue:function(){
	    		if(typeof this.item!=='undefined' && this.item)
	    			return this.item.value;
	    		return null;
	    	},
	    	expSelectedLabel:function(){
	    		if(typeof this.item!=='undefined' && this.item)
	    			return this.item.label;
	    		return null;
	    	},
	    	vOptions:function(){

	    		let customOptions=[];

	    		if(typeof this.options!=='object')
	    			return customOptions;

	    		for(let i=0;i<this.options.length;i++){
	    			if(
	    				typeof this.options[i][this.labelIndex()]!=='undefined'	&&
	    				typeof this.options[i][this.valueIndex()]!=='undefined'
	    			)
	    				customOptions.push({
	    					'label':this.options[i][this.labelIndex()],
	    					'value':this.options[i][this.valueIndex()]
	    				});
	    		}

	    		return customOptions;
	    	},
	    	labelIndex:function(){
	    		if(typeof this.mask==='undefined' || typeof this.mask.label==='undefined')
	    			return 'label';
	    		return this.mask.label;
	    	},
	    	valueIndex:function(){
	    		if(typeof this.mask==='undefined' || typeof this.mask.value==='undefined')
	    			return 'value';
	    		return this.mask.value;
	    	},
	        change:function(newValue){

	        	let value = null;
	        	if(typeof newValue!=='undefined' && newValue!==null)
	        		value = newValue['value'];

				this.$emit('update:selected', value);
				this.$emit('vSelectChange');
	        },
	        initialize:function(){
	        	this.setItem();
	        	this.ready=true;
	        }
	    },
	    watch:{
	    	selected:function(newVal,oldVal){
	    		if(newVal!==oldVal)
	    			this.setItem();
	    	}
	    }
	}
</script>
