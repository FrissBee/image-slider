# Image slider

An easy to integrate image slider for your website.

# Preview

If you first want to see if the image slider is what you are looking for, [you can view it here](https://image-slider.frissbee.de/).

# Implementation

1. Clone or download the repo
2. Implement the `image-slider.js` file in your project
3. Implement the `<image-slider></image-slider>` HTML tag in your site
4. Pass the image slider the image data in your JS file
5. For the design use the attributes in the `<image-slider></image-slider>` HTML tag

# Example of implementation with the default settings

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Title</title>

    <!-- 1. Implement the "image-slider.js" file -->
    <script src="./assets/js/image-slider.js"></script>
    <!-- 2. Implement your "*.js" settings file -->
    <script src="./assets/js/settings-image-slider.js" defer></script>
  </head>

  <body>
    <!-- Some Content -->

    <!-- 2. Implementation of the "<image-slider></image-slider>" HTML tag -->
    <image-slider></image-slider>

    <!-- Some Content -->
  </body>
</html>
```

# All attributes

The following attributes are available:

#### Type of the image slider

- `slider-art` => There are: `default`, `image`, `link`, `click`.

#### For the design

- `thumbnail-height` => height of the image slider
- `color-bg` => background color of the image slider
- `color-icon` => color of the next and preview button
- `radius-slider` => radius of the image slider
- `slider-border` => border of the image slider
- `image-margin` => spacing between the images. **Important: no dimensions such as "px" or "rem", only a number**

See the examples and comments in the files for more information.
