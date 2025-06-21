// src/extensions/ExtendedImage.js
import { mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';

export const ExtendedImage = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'blog-image',
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          return { class: attributes.class };
        },
      },
    };
  },
});
