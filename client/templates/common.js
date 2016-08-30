Template.registerHelper('formatDate', function(date){
	return moment(date).format('DD-MM-YYYY, H:mm:ss');
});

Template.registerHelper('onlyYear', function(date){
	return moment(date).format('YYYY');
});

Template.registerHelper("ratingOptions", function() {
    return {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6"
    };
});