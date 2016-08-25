import {category} from '/imports/import.js'

Template.film_list.onCreated(function(){
	this.subscribe('images');
});

Template.film_list.helpers ({
	films: ()=> {
		if(category.get()===null){
			return Films.find({}, {sort:{localTitle: 1}});
		} else {
			return Films.find({disc_type: category.get()}, {sort:{localTitle: 1}});	
		}				
	}
});