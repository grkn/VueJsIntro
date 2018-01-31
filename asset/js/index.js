
Vue.component('i18n_custom',{
		
	template : '<select v-model="lang"  v-on:change="changeLanguage">'
	+'<option value="en">{{ $t("message.english") }}</option>'
	+'<option value="tr">{{ $t("message.turkish") }}</option>'
	+'</select>',

	methods : {
		changeLanguage : function(){
			window.localStorage.setItem("lang", this.lang);
			window.location.reload();
		}
	},
	data : function(){
		return {lang : window.localStorage.getItem('lang')};
	}
});



if(!window.localStorage.getItem("lang"))
		window.localStorage.setItem("lang", "tr");
		
var i18n = new VueI18n({
  locale: window.localStorage.getItem("lang"), // set locale
  messages:messages // set locale messages
});

Vue.component('entity',{
	template : '<div class="col-sm-6 col-md-4">'
					+'<div class="thumbnail">'
					  +'<div class="caption">'
						+'<h3>{{index}} - {{name}} </h3>'
						+'<p><input type="text" v-model="sentence"></p>'
						+'<p><label>{{$t("message.storedSentence")}} : </label><span>{{storedSentence}}</span></p>'
						+'<p><a  class="btn btn-primary" role="button" v-on:click="removeSentece(id)">{{$t("message.remove")}}</a>' 
						+'<a class="btn btn-default" role="button" v-on:click="addSentence(id)">{{$t("message.add")}}</a></p>'
					  +'</div>'
					+'</div>'
				  +'</div>',
	props: ['name','index','id'],

	methods : {
		addSentence : function(id){
			console.log(id);
			if(this.sentence.trim() != ""){
					this.storedSentence = this.sentence;
			}
		},
		removeSentece : function(id){
			if(this.sentence.trim() != ""){
					this.storedSentence = "";
			}
		}
	},
	data :	function () {
		return {sentence : "",storedSentence : ""}
		
	}
				  
});

Vue.component('row',{
	template : '<div class="row"> <entity v-for="(entity,index) in array" v-bind:name="entity.name" v-bind:id="entity.id"  v-bind:index="index" :key="entity.id"></entity></div>',
	props: ['array']
	
});

var container = Vue.component('container',{
	template: 	'<div style="position:relative;width:80%;left:10%">'
						+'<div class="header"><div class="page-header">'
							+'<div  style="text-align:center">'
								+'<h1>{{$t("message.header")}}</h1>'
							+'</div>'
							+'<span>'
								+'<router-link :to="{ name: \'home\'}">{{$t("message.home")}}</router-link>'
							+'</span>'
							+'<span style="float:right">'
								+'<i18n_custom></i18n_custom>'
							+'</span>'
						+'</div>'
				+'</div>'
				+'<div class="content"><div><label>{{$t("message.search")}}</label> <input type="text" v-model="searchText" v-on:keyup="search"/></div><br/><br/><row v-for="entityArray in this.entityList"  v-bind:array="entityArray" ></row></div>'
				+'<div class="footer"></div></div>',
	methods : {
		search : function(){
			if(this.searchText.trim() == ""){
				this.immutableObjectToEntity();
				return;
			}
			this.immutableObjectToEntity();
			for(var i = 0 ; i < this.original.length ;i++){
				for(var j = 0 ; j < this.original[i].length;j++){
					if(this.original[i][j].name.toUpperCase().indexOf(this.searchText.toUpperCase()) < 0){
						var k = 0 ;
						for(k=0 ; k < this.entityList.length;k++){
							var z = 0 ;
							var flag = false;
							for(z = 0 ; z < this.entityList[k].length; z++){
								if(this.entityList[k][z].id == this.original[i][j].id){
									flag= true;
									break;
								}
							}
							if(flag){
								this.entityList[k].splice(z,1);
							}
						}
					}
				}
			}
		},
		immutableObjectToOriginal: function(){
			for(var i = 0 ; i < this.entityList.length ;i++){
				var mod3Array = [];
				for(var j = 0 ; j < this.entityList[i].length;j++){
					var obj = {};
					for(var key in this.entityList[i][j]){
						obj[key] = this.entityList[i][j][key];
					}
					mod3Array = mod3Array.concat(obj);
				}
				
				this.original.push(mod3Array);
			}
		},
		immutableObjectToEntity: function(){
			this.entityList = [];
			for(var i = 0 ; i < this.original.length ;i++){
				var mod3Array = [];
				for(var j = 0 ; j < this.original[i].length;j++){
					var obj = {};
					for(var key in this.original[i][j]){
						obj[key] = this.original[i][j][key];
					}
					mod3Array = mod3Array.concat(obj);
				}
				
				this.entityList.push(mod3Array);
			}
		}
			
			
	},
	mounted : function(){
		this.$nextTick(function () {
			this.immutableObjectToOriginal();
		})
		
	},
	data :	function () {
		return {entityList :[[{id : 1 ,name : "A Intent"},{id : 2 ,name : "B Intent"},{id : 3 ,name : "C Intent"}],[{id : 4  ,name : "D Intent"},{id : 5 ,name:"E Intent"}]], original :[],
		searchText : ""}
		
	}
});
var vrouter = new VueRouter({
	routes: [
	{name: 'home', path: '/', component: container }
	]
});

var vue = new Vue({
  el: '#app',
  data: {
  },
  methods :{	
  }
  ,
	mounted: function () {
	  this.$nextTick(function () {
		 
	  })
	}
  ,
  methods : {},
  router : vrouter,
  i18n : i18n
  
});	