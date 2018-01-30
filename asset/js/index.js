
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
  messages, // set locale messages
})

Vue.component('entity',{
	template : '<div class="col-sm-6 col-md-4">'
					+'<div class="thumbnail">'
					  +'<div class="caption">'
						+'<h3>{{name}} {{index}}</h3>'
						+'<p>...</p>'
						+'<p><a href="#" class="btn btn-primary" role="button">Çıkar</a> <a href="#" class="btn btn-default" role="button">Ekle</a></p>'
					  +'</div>'
					+'</div>'
				  +'</div>',
	props: ['name','index']			  
				  
});

Vue.component('row',{
	template : '<div class="row"> <entity v-for="(entity,index) in array" v-bind:name="entity.name" v-bind:index="index" :key="entity.id"></entity></div>',
	props: ['array']
	
});

var container = Vue.component('container',{
	template: 	'<div><div class="header"> HEADER </div>'
				+'<div class="content"><row v-for="entityArray in this.entityList"  v-bind:array="entityArray" ></row></div>'
				+'<div class="footer">FOOTER</div></div>',
	methods : {
		
	},
	mounted : function(){
		this.$nextTick(function () {
			 console.log("mounted");
		})
	},
	data :	function () {
		return {entityList :[[{id : 1 ,name : "A Entity"},{id : 2 ,name : "B Entity"},{id : 3 ,name : "C Entity"}],[{id : 4  ,name : "D Entity"},{id : 5 ,name:"E Entity"}]]}
	}
});
var vrouter = new VueRouter({
	routes: [
	{name: 'home', path: '/', component: container }
	]
})

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