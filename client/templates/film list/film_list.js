Template.film_list.helpers ({
	films: ()=> {
		//console.log(Template.instance().category.get());
		return Films.find({}, {sort:{localTitle: 1}});

	}
});


//disc_type: 'DVD'