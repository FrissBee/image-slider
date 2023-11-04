'use strict';

(() => {
  /**
   * The data hardcoded here can of course also come from a database or other files such as JSON.
   *
   * Make sure that the data has the same structure as the following.
   */
  const thumbnails = [
    { imagePath: './images/nature/pic_01.jpg', imageAlt: 'pic_01' },
    { imagePath: './images/nature/pic_02.jpg', imageAlt: 'pic_02' },
    { imagePath: './images/nature/pic_03.jpg', imageAlt: 'pic_03' },
    { imagePath: './images/nature/pic_04.jpg', imageAlt: 'pic_04' },
    { imagePath: './images/nature/pic_05.jpg', imageAlt: 'pic_05' },
    { imagePath: './images/nature/pic_06.jpg', imageAlt: 'pic_06' },
    { imagePath: './images/nature/pic_07.jpg', imageAlt: 'pic_07' },
    { imagePath: './images/nature/pic_08.jpg', imageAlt: 'pic_08' },
    { imagePath: './images/nature/pic_09.jpg', imageAlt: 'pic_09' },
    { imagePath: './images/nature/pic_10.jpg', imageAlt: 'pic_10' },
    { imagePath: './images/nature/pic_11.jpg', imageAlt: 'pic_11' },
    { imagePath: './images/nature/pic_12.jpg', imageAlt: 'pic_12' },
    { imagePath: './images/nature/pic_13.jpg', imageAlt: 'pic_13' },
    { imagePath: './images/nature/pic_14.jpg', imageAlt: 'pic_14' },
    { imagePath: './images/nature/pic_15.jpg', imageAlt: 'pic_15' },
    { imagePath: './images/nature/pic_16.jpg', imageAlt: 'pic_16' },
    { imagePath: './images/nature/pic_17.jpg', imageAlt: 'pic_17' },
  ];

  const thumbnails_with_link = [
    { imagePath: './images/movies/pic_01.jpg', imageAlt: 'pic_01', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_02.jpg', imageAlt: 'pic_02', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_03.jpg', imageAlt: 'pic_03', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_04.jpg', imageAlt: 'pic_04', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_05.jpg', imageAlt: 'pic_05', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_06.jpg', imageAlt: 'pic_06', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_07.jpg', imageAlt: 'pic_07', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_08.jpg', imageAlt: 'pic_08', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_09.jpg', imageAlt: 'pic_09', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_10.jpg', imageAlt: 'pic_10', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_11.jpg', imageAlt: 'pic_11', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_12.jpg', imageAlt: 'pic_12', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_13.jpg', imageAlt: 'pic_13', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_14.jpg', imageAlt: 'pic_14', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_15.jpg', imageAlt: 'pic_15', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_16.jpg', imageAlt: 'pic_16', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_17.jpg', imageAlt: 'pic_17', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_18.jpg', imageAlt: 'pic_18', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_19.jpg', imageAlt: 'pic_19', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_20.jpg', imageAlt: 'pic_20', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
    { imagePath: './images/movies/pic_21.jpg', imageAlt: 'pic_21', linkPath: 'https://frissbee.de/', linkTarget: '_blank' },
  ];

  const thumbnails_big = [
    { imagePath: './images/big/pic_01.jpg', imageAlt: 'pic_01' },
    { imagePath: './images/big/pic_02.jpg', imageAlt: 'pic_02' },
    { imagePath: './images/big/pic_03.jpg', imageAlt: 'pic_03' },
  ];

  /**
   * 1. Select the "image-slider" HTML tags
   */
  const imageSlider_Default = document.querySelector('image-slider.default');
  const imageSlider_Image = document.querySelector('image-slider.image');
  const imageSlider_Link = document.querySelector('image-slider.link');
  const imageSlider_Click = document.querySelector('image-slider.click');
  const imageSlider_Styled = document.querySelector('image-slider.styled');
  const imageSlider_Big = document.querySelector('image-slider.big');

  /**
   * 2. Set the data to the corresponding slider.
   */
  imageSlider_Default.thumbnails = thumbnails;
  imageSlider_Image.thumbnails = thumbnails;
  imageSlider_Link.thumbnails = thumbnails_with_link;
  imageSlider_Click.thumbnails = thumbnails;
  imageSlider_Styled.thumbnails = thumbnails;
  imageSlider_Big.thumbnails = thumbnails_big;

  /**
   * 3a. Add the EventListener if the "slider-type" attribute is set to "image".
   */
  imageSlider_Image.addEventListener('event-image', (e) => {
    // You get an object of the image like: {imagePath: './images/nature/pic_01.jpg', imageAlt: 'pic_01', imageIndex: 0}
    console.log(e.detail);
    // do something...
  });

  /**
   * 3b. Add the EventListener if the "slider-type" attribute is set to "click".
   */
  imageSlider_Click.addEventListener('event-image', (e) => {
    // You get the Event
    console.log(e.detail, e.detail.currentTarget.src);
    // do something...
  });

  /**
   * Set and get attributes with JavaScript
   *
   * Use the "setAttribute()" and "getAttribute()" methodes
   *
   * Examples for responsive design:
   */

  // 1. Example
  window.addEventListener(
    'resize',
    (e) => {
      if (e.target.innerWidth < 860) {
        imageSlider_Styled.setAttribute('thumbnail-height', '100px');
      } else {
        imageSlider_Styled.setAttribute('thumbnail-height', '370px');
      }
    },
    true
  );

  // 2. Example
  const setHeight = Number(imageSlider_Big.getAttribute('thumbnail-height').slice(0, -2));

  const onResizeSlider = () => {
    const newSetHeight = Math.round((imageSlider_Big.offsetWidth * setHeight) / window.screen.width);
    imageSlider_Big.setAttribute('thumbnail-height', newSetHeight + 'px');
  };

  window.onload = () => onResizeSlider();

  window.addEventListener('resize', (e) => onResizeSlider(), true);
})();
