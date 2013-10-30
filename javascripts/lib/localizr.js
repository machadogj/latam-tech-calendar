/**
 * localizr - very simple script to localize a site in different languages.
 * Author: Gustavo Machado
 * Date: 10/29/2013
 *
 * Usage:
 *      var l = localizr({ default: 'es', onChanged: setSelected});
 *      l.setLocale('en'); //changes the language
 * @param {object} opts
 *      - {string} default language
 *      - {object} dics of languages
 *      - {fn}     onChanged callback triggered when laguange changed
 *      - {string} path to the language dictionaries
 * @return {object}
 * @api public
 */

function localizr ( opts ) {

    // default options
    opts           = opts           || {};
    opts.default   = opts.default   || "en";
    opts.dics      = opts.dics      || {}; //used to cache the dics
    opts.onChanged = opts.onChanged || function noop() {};
    opts.path      = opts.path      || 'javascripts/locale/';

    // get the default language from local storage
    var locale = localStorage.getItem("locale") || opts.default;
    
    setLocale(locale);

    //function for setting the locale in the localStorage
    /**
     * setLocale - sets the language.
     * @param {string} lang to be used
     * @api private
     */
    function setLocale (lang) {
        
        //save the language in the localStorage
        localStorage.setItem('locale', lang);

        // go through the dom searching for keys in the dictionary
        // and set the HTML content for it.
        function applyDictionary (dic) {
            for(var i in dic) {
                $(i).html(dic[i]);
            }
        }
        // either load the dictionary from memory or ajax.
        if (opts.dics[lang]) {
            applyDictionary(opts.dics[lang]);
            opts.onChanged(lang);
        }
        else {
            $.ajax({url: opts.path + lang + '.json'})
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

    return {
        setLocale: setLocale
    };
}