//initialize localizr
var locale = localizr({ default: 'es', onChanged: setSelected});

function setSelected (lang) {
	$(".language-selector > li").removeClass("selected");
	$(".language-selector ." + lang).addClass("selected");
}

$(".language-selector > li").click(function () {
	locale.setLocale($(this).html());
});
