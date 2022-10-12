# FSC-C
A continuous measure of future-self continuity, developed for the web.

For a live demo, click [here](https://jsfiddle.net/90Lvym4g/).

If you use this software for academic purposes, please cite the following [article](https://journals.sagepub.com/doi/pdf/10.1177/0894439316653513): 

  Kamphorst, B. A., Nauts, S. & Blouin-Hudon, E.-M. (2016). Introducing a Continuous Measure of Future Self-Continuity. _Social Science Computer Review_ 35(3).

![Screenshot 2022-10-12 at 16 28 58](https://user-images.githubusercontent.com/571173/195370528-12c6ceb0-111c-483c-b14d-029ca053d166.png)
![Screenshot 2022-10-12 at 16 29 07](https://user-images.githubusercontent.com/571173/195370517-e6f80efa-b238-4596-82ee-30fba6fdb449.png)



# Instructions in a nutshell

To add the FSC-C measure to a webpage, follow these steps. 

* Add the following include headers to include JQuery, JQuery-UI, and FSC-C (javascript and css stylesheet).
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"  ></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.css">
```

* Add the following lines to the body of your HTML:

```html
<div class="fsc-c-circle-container">
  <div class="fsc-c-circles fsc-c-draggable" id="fsc-c-1"><span>future self</span></div>
  <div class="fsc-c-circles"><span>present self</span></div>
</div>
<div id="fsc-c-1-distance">0</div>
<div id="fsc-c-1-overlap">0%</div>  
```
Notice that the id includes a number (1). This is not strictly necessary, but it allows for multiple instances of the measure to be included on one page. Just make sure that each id is unique.

(Also, ensure that the div elements have the `fsc-c-circles` class so that they are styled properly. The first circle additionally requires the `fsc-c-draggable` class. If the elements do not show up as circles, check that you have included the CSS / that the CSS is loaded properly.)

* Profit!

# Storing the measure's values

Typically, you'll want to store the measure's values. How to do so will depend on how you use the measure. For example, if you use the measure inside a HTML form, you can store the values in form fields that are then sent to a server on submission of the form. If, on the other hand, the measure is used in something like Qualtrics, there are often certain Javascript methods available that can be called to store the data (this will have to be added to the Javascript). We'll see an example of this in the Qualtrics instructions below. The basic format however is to implement an "event handler" for a `fsc-c:data` event:
```html
<script>
  jQuery(function($) {
    $( ".fsc-c-draggable" ).on( "fsc-c:data", function(event, data) {
      // process the data
      Object.entries(data).forEach(([id, values]) => {
        console.log(id + '-distance', values['distance']);
        console.log(id + '-overlap', values['overlap']);
      })
    })
  });
</script>
```


# Detailed instructions for adding the FSC-C measure to Qualtrics

### Step zero: Getting ready.
* Log into Qualtrics and select the survey to which you wish to add the FSC-C measure.

### Step one: Adding the CSS.

* Click on the 'Look \& Feel' button of your survey (located below the 'My Surveys' tab).
* Choose the 'Advanced' option.
* Click on the '+ Add Custom CSS' button. You will be shown a text editor.
* Copy the contents of the file _fsc-c.css_ to this text editor, and hit 'Save'.
* Hit 'Save' again to return to your survey.

Alternatively, you can rely on a CDN to load the CSS. For this method, go to the 'Header' field (still under 'Look \& Feel' \> 'Advanced') and add the following line:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.css">
```

### Step two: Adding headers and the Javascript.

* Click on the 'Look \& Feel' button of your survey (located below the 'My Surveys' tab).
* Choose the 'Advanced' option.
* In the 'Header' field, add the following lines:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"  ></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.js"></script>

<script></script>
```
* Then, in the same 'Header' field, position your cursor in between the last pair of script tags, and implement your event handler there. An example can be found in `fsc-c_example.html`, which is reproduced here:
```javascript
  jQuery(function($) {
    $( ".fsc-c-draggable" ).on( "fsc-c:data", function(event, data) {
      // process the data
      Object.entries(data).forEach(([id, values]) => {
      // Qualtrics only: use Qualtrics.SurveyEngine.setEmbeddedData(key, value) to store the values as Qualtrics embeddedData.
	    // Notice that these embedded data has to be added explicitly in the survey flow in order for them to show up in your data exports.
        Qualtrics.SurveyEngine.setEmbeddedData(id + '-distance', values['distance']);
        Qualtrics.SurveyEngine.setEmbeddedData(id + '-overlap', values['overlap']);
      })
    })
  });
```

**Notice that it is possible to use Qualtrics' text editor for editing the 'Header' field by clicking the 'edit' link, but make sure to use the 'Source' option if you decide to do so.**

* Click 'Save' to return to your survey.

### Step three: Adding custom HTML to a question to enable the FSC-C measure.

* Create a 'Text/Graphic' question.
* Select the question's text; you will be presented with a text editor.
* Choose 'HTML View'.

** Note that whenever you change the question's text, you should use this HTML View. Otherwise your custom HTML will likely be lost. **

* Add the following lines to the body of your HTML:

```html
<div class="fsc-c-circle-container">
  <div class="fsc-c-circles fsc-c-draggable" id="fsc-c-1"><span>future self</span></div>
  <div class="fsc-c-circles"><span>present self</span></div>
</div>
<div id="fsc-c-1-distance">0</div>
<div id="fsc-c-1-overlap">0%</div>    
```

### Step four: Adding embeddedData fields for storing values

* Go to 'Survey Flow'
* Add a new Embedded Data Field Name that corresponds to the _id_ of the moving circle, with the string '-distance' appended. With the example code from the previous step, the field name would thus become 'fsc-c-1-distance'.
* Repeat the previous step, only with the suffix '-overlap'. With the example code from the previous step, the field name would thus become 'fsc-c-1-overlap'.


### Step five: Check if your setup is working

* Run through your survey and look at the responses. 
* If all is well, you'll see embeddedData fields with the values of the FSC-C measure.


