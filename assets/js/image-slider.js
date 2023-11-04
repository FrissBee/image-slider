'use strict';

(() => {
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
    <style>
      .container-slider {
        position: relative;
        display: inline-flex;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .container-thumbnails {
        position: relative;
        display: inline-flex;
        overflow: hidden;
        width:100%;
        box-sizing: border-box;
      }

      .thumbnails {
        position: relative;
        display: inline-flex;
        left: 0;
        transition: all 1s ease 0s;
        width: 100%;
        box-sizing: border-box;
      }

      .thumbnail-image {
        height: 100%;
        width: auto;
        box-sizing: border-box;
      }

      .cursor-pointer {
        cursor: pointer;
      }

      .pre, .next {
        position: absolute;
        padding: 0;
        top: 50%; 
        transform: translateY(-50%);
      }

      .pre {
        z-index:99;
      }

      .next {
        right: 22px;
      }

      .pre-btn, .next-btn {
        position: absolute;
        cursor: pointer;
        top: 50%; 
        transform: translateY(-50%);
        padding: 0;
        border:none;
        background-color: #e2e2e29f;
      }

      .pre-btn {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      .next-btn {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      button:disabled,
      button[disabled]{
        cursor: default;
      }

      .pre-svg, .next-svg {
        height: 2.5rem;
        position: relative;
        margin-top: 4px;
      }

      .pre-svg {
        margin-left: 2px;
      }

      .next-svg {
        margin-right: 2px;
      }
    </style>

    <div class="container-slider">
      <div class="pre">
        <button class="pre-btn" title="previous images">
          <svg xmlns="http://www.w3.org/2000/svg" class="pre-svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
        </button>
      </div>
      <div class="container-thumbnails">
        <div class="thumbnails"></div>
      </div>
      <div class="next">
        <button class="next-btn" title="next images">
          <svg xmlns="http://www.w3.org/2000/svg" class="next-svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
        </button>
      </div>
    </div>
  `;

  class ImageSlider extends HTMLElement {
    #state = {
      thumbnails: [],
    };
    #containerSlider = null;
    #thumbnails = null;
    #preBtn = null;
    #nextBtn = null;
    #preSvg = null;
    #nextSvg = null;
    #defaultSlideLength = 0;
    #currentSlideLength = 0;
    #countOfThumbnails = 0;
    #marginRight = 4;
    #completeThumbsLength = 0;
    #colorIcon = '#a3201a';
    #sliderHeight = '200px';
    #sliderArts = ['default', 'image', 'link', 'click'];
    #sliderArt = this.#sliderArts[0];

    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.appendChild(template.content.cloneNode(true));

      this.#containerSlider = root.querySelector('.container-slider');
      this.#thumbnails = root.querySelector('.thumbnails');
      this.#preBtn = root.querySelector('button.pre-btn');
      this.#nextBtn = root.querySelector('button.next-btn');
      this.#preSvg = root.querySelector('.pre-svg');
      this.#nextSvg = root.querySelector('.next-svg');
    }

    set thumbnails(value) {
      this.#state.thumbnails = value;
      this.#showThumbNails(this.#state.thumbnails);
      setTimeout(() => {
        this.#calculateSlider();
      }, 1000);
    }

    get thumbnails() {
      return this.#state.thumbnails;
    }

    static get observedAttributes() {
      return ['thumbnail-height', 'color-bg', 'color-icon', 'radius-slider', 'slider-border', 'image-margin', 'slider-art'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'thumbnail-height') {
        this.#containerSlider.style.height = newValue;
      } else if (name === 'color-bg') {
        this.#containerSlider.style.background = newValue;
      } else if (name === 'color-icon') {
        this.#preSvg.style.fill = newValue;
        this.#nextSvg.style.fill = newValue;
      } else if (name === 'radius-slider') {
        this.#containerSlider.style.borderRadius = newValue;
      } else if (name === 'slider-border') {
        this.#containerSlider.style.border = newValue;
      } else if (name === 'image-margin') {
        this.#marginRight = Number(newValue);
      } else if (name === 'slider-art' && this.#sliderArts.includes(newValue)) {
        this.#sliderArt = newValue;
      }
    }

    connectedCallback() {
      this.#settings();
    }

    #settings() {
      if (!this.hasAttribute('thumbnail-height')) this.#containerSlider.style.height = this.#sliderHeight;
      if (!this.hasAttribute('color-icon')) {
        this.#preSvg.style.fill = this.#colorIcon;
        this.#nextSvg.style.fill = this.#colorIcon;
      }
      this.#disableBtn(this.#preBtn, this.#preSvg);
      this.#handlePreThumbnail();
      this.#handleNextThumbnail();
      window.addEventListener('resize', (e) => this.#onResizeWindow(), true);
    }

    #onResizeWindow() {
      this.#currentSlideLength = 0;
      this.#thumbnails.style.left = this.#currentSlideLength + 'px';
      this.#disableBtn(this.#preBtn, this.#preSvg);
      this.#enableBtn(this.#nextBtn, this.#nextSvg);
      this.#calculateSlider();
    }

    #showThumbNails(thumbnails) {
      thumbnails.forEach((thumbnail, index) => {
        const thumb = document.createElement('img');
        thumb.src = thumbnail.imagePath;
        thumb.alt = thumbnail.imageAlt;
        thumb.classList = 'thumbnail-image';
        thumb.style.marginRight = this.#marginRight + 'px';
        thumb.dataset.index = index;

        if (this.#sliderArt === 'default') {
          this.#thumbnails.appendChild(thumb);
        } else if (this.#sliderArt === 'image') {
          thumb.addEventListener('click', (e) =>
            this.dispatchEvent(
              new CustomEvent('event-image', {
                detail: {
                  imagePath: thumbnail.imagePath,
                  imageAlt: thumbnail.imageAlt,
                  imageIndex: index,
                },
              })
            )
          );
          thumb.classList.add('cursor-pointer');
          this.#thumbnails.appendChild(thumb);
        } else if (this.#sliderArt === 'link') {
          const link = document.createElement('a');
          link.href = thumbnail.linkPath;
          link.target = thumbnail.linkTarget;
          this.#thumbnails.appendChild(link);
          link.appendChild(thumb);
        } else if (this.#sliderArt === 'click') {
          thumb.addEventListener('click', (e) => this.dispatchEvent(new CustomEvent('event-image', { detail: e })));
          thumb.classList.add('cursor-pointer');
          this.#thumbnails.appendChild(thumb);
        }
      });
    }

    #handlePreThumbnail() {
      this.#preSvg.addEventListener('click', (e) => {
        if (this.#currentSlideLength !== 0 && this.#currentSlideLength * -1 > this.#defaultSlideLength) {
          this.#currentSlideLength += this.#defaultSlideLength;
        } else {
          this.#currentSlideLength = 0;
          this.#disableBtn(this.#preBtn, this.#preSvg);
        }

        this.#enableBtn(this.#nextBtn, this.#nextSvg);
        this.#thumbnails.style.left = this.#currentSlideLength + 'px';
      });
    }

    #handleNextThumbnail() {
      this.#nextSvg.addEventListener('click', (e) => {
        const checkLength = this.#currentSlideLength * -1 + this.#defaultSlideLength;

        if (checkLength < this.#completeThumbsLength) {
          this.#currentSlideLength -= this.#defaultSlideLength;
        } else {
          this.#disableBtn(this.#nextBtn, this.#nextSvg);
          this.#currentSlideLength = -this.#completeThumbsLength;
        }

        this.#enableBtn(this.#preBtn, this.#preSvg);
        this.#thumbnails.style.left = this.#currentSlideLength + 'px';
      });
    }

    #disableBtn(btn, svg) {
      btn.disabled = true;
      svg.style.opacity = '0.6';
    }

    #enableBtn(btn, svg) {
      btn.disabled = false;
      svg.style.opacity = '1';
    }

    #calculateSlider() {
      const thumbs = this.#thumbnails.querySelectorAll('.thumbnail-image');
      const thumbOffsetWidth = thumbs[0].offsetWidth + this.#marginRight;
      this.#countOfThumbnails = Math.floor(this.#thumbnails.offsetWidth / thumbOffsetWidth);
      if (this.#countOfThumbnails === 0) this.#countOfThumbnails = 1;
      this.#defaultSlideLength = thumbOffsetWidth * this.#countOfThumbnails;
      this.#completeThumbsLength = this.#thumbnails.scrollWidth - this.#thumbnails.offsetWidth;

      // Because Firefox makes trouble
      if (this.#sliderArt === 'link') {
        this.#thumbnails.querySelectorAll('a').forEach((value) => (value.style.width = thumbOffsetWidth + 'px'));
      }
    }
  }

  customElements.define('image-slider', ImageSlider);
})();
