

//load the events from a json obj
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
$.ajax({url: 'javascripts/events.json'}).done(function (events) {
	var $list = $("#events-list");
	$list.html('');
	$.each(events, function (i, e) {
		$list.append(template(e));
	});
	//after the content was generated, localize it
	//initialize localizr
	var locale = localizr({ default: 'en', onChanged: setSelected});

	function setSelected (lang) {
		$(".language-selector > li").removeClass("selected");
		$(".language-selector ." + lang).addClass("selected");
	}

	$(".language-selector > li").click(function () {
		locale.setLocale($(this).html());
	});
});