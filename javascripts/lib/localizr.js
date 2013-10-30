function localizr (opts) {
    // default options
    opts = opts || {};
    opts.default = opts.default || "en";
    opts.dics = opts.dics || {};
    opts.onChanged = opts.onChanged || function () {};

    // get the default language from local storage
    var locale = localStorage.getItem("locale") || opts.default;
    
    setLocale(locale);

    //function for setting the locale in the localStorage
    function setLocale (lang) {
        
        localStorage.setItem('locale', lang);

            // go through the dom searching for keys in the dictionary
        // and set the HTML content for it.
        function applyDictionary (dic) {
            for(var i in dic) {
                $(i).html(dic[i]);
            }
        }
        // either the load the dictionary from memory or ajax.
        if (opts.dics[lang]) {
            applyDictionary(opts.dics[lang]);
            opts.onChanged(lang);
        }
        else {
            $.ajax({url:'javascripts/locale/' + lang + '.json'})
                .done(function (data) {
                    opts.dics[lang] = data;
                    applyDictionary(data);
                    opts.onChanged(lang);
                })
                .fail(function (err) {
                    console.log('A problem occurred trying to load the locale: ' + locale);
                    console.log(err);
                });
        }
    }

    // return an object with configuration.
    return {
        setLocale: setLocale
    };
}