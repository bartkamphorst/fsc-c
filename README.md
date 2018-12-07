# FSC-C
A continuous measure of future-self continuity, developed for the web.

For a live demo, click [here](http://jsfiddle.net/xgdVM/113/embedded/result/).

If you use this software for academic purposes, please cite the following article: 

  Kamphorst, B. A., Nauts, S. & Blouin-Hudon, E.-M. (in press). Introducing a Continuous Measure of Future Self-Continuity. _Social Science Computer Review_.

# Instructions in a nutshell

To add the FSC-C measure to a webpage, follow these steps. 

* Copy the contents of the file _fsc-c.css_ to the CSS of your HTML webpage, for example by placing them in \<style\>\<\\style\> tags within the \<head\> of the page;
* Add the following include headers.
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
```

* Copy the contents of the file _fsc-c.js_ to your HTML webpage, placing it within \<script type="text/javascript"\>\<\\script\> tags.
* Add the following lines to the body of your HTML:

```html
<div class="circle-container">
  <div class="circles" id="circle-drag-1"><span>future self</span>
</div>
<div class="circles"><span>present self</span>
  </div>
</div>
```
Notice that the id includes a number (1). This is not strictly necessary, but it allows for multiple instances of the measure to be included on one page. Just make sure that each id is unique.

(Also, ensure that the div elements have the `circles` class so that they are styled properly. If the elements do not show up as circles, check that you have included the CSS / that the CSS is loaded properly.)

* Profit!

# Storing the measure's values

Typically, you'll want to store the measure's values. How to do so will depend on how you use the measure. For example, if you use the measure inside a HTML form, you can store the values in form fields that are then sent to a server on submission of the form. If, on the other hand, the measure is used in something like Qualtrics, there are often certain Javascript methods available that can be called to store the data (this will have to be added to the Javascript). We'll see an example of this in the Qualtrics instructions below.


# Detailed instructions for adding the FSC-C measure to Qualtrics

### Step zero: Getting ready.
* Log into Qualtrics and select the survey to which you wish to add the FSC-C measure.

### Step one: Adding the CSS.

* Click on the 'Look \& Feel' button of your survey (located below the 'My Surveys' tab).
* Choose the 'Advanced' option.
* Click on the '+ Add Custom CSS' button. You will be shown a text editor.
* Copy the contents of the file _fsc-c.css_ to this text editor, and hit 'Save'.
* Hit 'Save' again to return to your survey.

### Step two: Adding headers and the Javascript.

* Click on the 'Look \& Feel' button of your survey (located below the 'My Surveys' tab).
* Choose the 'Advanced' option.
* In the 'Header' field, add the following lines:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script></script>
```
* Then, in the same 'Header' field, position your cursor in between the last pair of script tags, and paste the contents of the file _fsc-c.js_ there.

**Notice that it is possible to use Qualtrics' text editor for editing the 'Header' field by clicking the 'edit' link, but make sure to use the 'Source' option if you decide to do so.**

* Uncomment the two lines that call Qualtrics' Qualtrics.SurveyEngine.setEmbeddedData(key, value) method. This is needed to store the FSC-C's values.

* Click 'Save' to return to your survey.

### Step three: Adding custom HTML to a question to enable the FSC-C measure.

* Create a 'Text/Graphic' question.
* Select the question's text; you will be presented with a text editor.
* Choose 'HTML View'.

** Note that whenever you change the question's text, you should use this HTML View. Otherwise your custom HTML will likely be lost. **

* Add the following lines to the body of your HTML:

```html
<div class="circle-container">
  <div class="circles" id="circle-drag-1"><span>future self</span>
</div>
<div class="circles"><span>present self</span>
  </div>
</div>
```

### Step four: Adding embeddedData fields for storing values

* Go to 'Survey Flow'
* Add a new Embedded Data Field Name that corresponds to the _id_ of the moving circle, with the string '-overlap' appended. With the example code from the previous step, the field name would thus become 'circle-drag-1-overlap'.
* Repeat the previous step, only with the suffix '-distance'. With the example code from the previous step, the field name would thus become 'circle-drag-1-distance'.


### Step five: Check if your setup is working

* Run through your survey and look at the responses. 
* If all is well, you'll see embeddedData fields with the values of the FSC-C measure.


