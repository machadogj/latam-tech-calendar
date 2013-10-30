#Latin America Tech Events Calendar

The purpose of this repository is to organize a single page with the best Latin America Technology Events, and help spread the word.

#Editing the Content

## Events

The list of events is being pulled from a json file in `javascripts/events.json`. If you want to add, remove or modify an event, you can do it from there.

This information is being used together with a handlebars template in order to render the content. If you want to change the way the content looks, you can edit the Handlebars template in `index.html`. It looks something like this:

    <script id="entry-template" type="text/x-handlebars-template">
      <h2>
        <a name="jsconf-colombia" class="anchor" href="#jsconf-colombia"><span class="octicon octicon-link"></span></a>
        {{name}}
      </h2>
      <p>
        <strong class="location">Location: </strong>{{location}}<br>
        <strong class="date">Date: </strong>{{date}}<br>
        <strong class="website">Website: </strong> <a href="{{url}}">{{url}}</a>  
      </p>
    </script>

## Translations
The site uses a series of JSON objects to localize the site in different
languages. In order to edit the content, please refer to the files in
`javascripts/locale/[lang].json`.

The JSON files uses `css selectors` in order to find the right place to
insert the content.