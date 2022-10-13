# FSC-C
A continuous measure of future-self continuity, developed for the web.

![Screenshot 2022-10-12 at 16 28 58](https://user-images.githubusercontent.com/571173/195370528-12c6ceb0-111c-483c-b14d-029ca053d166.png)
![Screenshot 2022-10-12 at 16 29 07](https://user-images.githubusercontent.com/571173/195370517-e6f80efa-b238-4596-82ee-30fba6fdb449.png)

For a live demo, click [here](https://jsfiddle.net/90Lvym4g/).

If you use this software for academic purposes, please cite the following [article](https://journals.sagepub.com/doi/pdf/10.1177/0894439316653513): 

  Kamphorst, B. A., Nauts, S. & Blouin-Hudon, E.-M. (2016). Introducing a Continuous Measure of Future Self-Continuity. _Social Science Computer Review_ 35(3).





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

* Click on the 'Look \& Feel' button of your survey (located below the 'Survey' tab).
* Open the 'Style' tab.
* Click on 'edit' link located at the bottom right corner of the 'Custom CSS' textarea. You will be shown a text editor.
* Copy the contents of the file _fsc-c.css_ to this text editor, and hit 'Save' to exit the text editor.
* Hit 'Apply' to save these settings.

Alternatively, you can rely on a CDN to load the CSS. For this method, past the following url into the text input labelled 'External CSS':
```html
"https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.css"
```
Hit the 'Apply' button to save.

### Step two: Adding headers and the FSC-C Javascript library.

* Click on the 'Look \& Feel' button of your survey (located below the 'Survey' tab).
* Choose the 'General' tab.
* Click on the 'edit' link at the bottom right corner of the 'Header' field to open a text editor. In the task bar, look for the 'Source' button. Click the 'Source' button, and add the following lines:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"  ></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bartkamphorst/fsc-c@5e76fc9/fsc-c.js"></script>
```

* Click 'Save' to exit the text editor.
* Click 'Apply' to save the changes.


### Step three: Creating a question with the FSC-C measure.

* Go into your survey and create a 'Text/Graphic' question.
* Select the question's text; you will be presented with a text editor.
* Choose 'HTML View'.

** Note that whenever you change the question's text, you should use this HTML View. Otherwise your custom HTML will likely be lost. **

* Add the following lines to the body of your HTML:

```html
<div class="QuestionText BorderColor">Ask your question here.</div><br/>
<div class="fsc-c-circle-container">
  <div class="fsc-c-circles fsc-c-draggable" id="fsc-c-1"><span>future self</span></div>
  <div class="fsc-c-circles"><span>present self</span></div>
</div>
<div id="fsc-c-1-distance">0</div>
<div id="fsc-c-1-overlap">0%</div>    
```

**(Notice that the last two divs are used to show the distance and overlap values on screen. If you do not want participants to see these values, just remove these divs from the HTML. They can be helpful though when testing to see if everything is working as expected.)**

* Change the text of the question, as well as the labels of the circles as you see fit.
* Exit the question editor by clicking outside of the editor.
* Preview your question to verify that the FSC-C measure is now operational (but notice that the values are not yet stored). You should be able to drag and drop the left circle and see the values change on screen.


### Step four: Adding embeddedData fields for storing values

* Go to 'Survey Flow' (located below the 'Survey' tab).
* Add a new Embedded Data Field Name that corresponds to the _id_ of the moving circle, with the string '-distance' appended. With the example code from the previous step, the field name would thus become 'fsc-c-1-distance'.
* Repeat the previous step, only with the suffix '-overlap'. With the example code from the previous step, the field name would thus become 'fsc-c-1-overlap'.
* Click on 'Apply' to save your changes.

### Step four: Adding custom Javascript to actually store the FSC-C values

* Navigate to 'Question behavior' for this question, and click on 'JavaScript'. You will be shown a text editor with three predefined functions (addOnload, addOnReady, and addOnUnload). 
* Place your cursor in the addOnload function and paste in the following javascript:

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

* This adds an event handler for `fsc-c:data` events, which are emitted every time the left circle of the FSC-C measure is dragged and dropped. It then basically runs through each set of values it receives and stores them as embedded data using Qualtrics' setEmbeddedData(key, value) function. For the key, it used the `id` of the fsc-c-draggable class with '-distance' or '-overlap' appended (thus corresponding with the embeddedData fields set in the previous step). 

* Click 'Save' to return to your survey.


### Step six: Check if your setup is working

* Run through your survey and look at the responses. 
* If all is well, you'll see embeddedData fields with the values of the FSC-C measure.


