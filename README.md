# Better images/screenshots handling for Sphinx

## About script 

Default RST themes (and themes such as Sphinx Book Theme) load screenshots and images as standalone pages. Thus, users are forced to use the back button all the time, which makes it quite irritating to navigate throughout documentation and screenshots to say the least. 

This repo provides a simple JS script that loads screenshots/ images within the corresponding page. 

While in preview, clicking anywhere outside the image zone closes the preview.

Clicking on the image zooms it it. Clicking again zooms it out.

Clicking and holding enables the inspection mode, where users can view smaller details on the image and scroll the image around.

## Installation

- Paste the content of the `_static` folder within your sphinx project.


- Include the script in `conf.py`:

```py

html_static_path = ['_static']

html_js_files = [
    'image_zoom.js'
]


```


