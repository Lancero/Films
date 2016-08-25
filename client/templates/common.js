Template.registerHelper('formatDate', function(date){
	return moment(date).format('DD-MM-YYYY, H:mm:ss');
});