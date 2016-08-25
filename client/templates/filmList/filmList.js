import {category} from '/imports/import.js'

Template.filmList.onCreated(function(){
	this.subscribe('images');
});

Template.filmList.helpers ({
	films: ()=> {
		if(category.get()===null){
			return Films.find({}, {sort:{localTitle: 1}});
		} else {
			return Films.find({disc_type: category.get()}, {sort:{localTitle: 1}});	
		}				
	}
});