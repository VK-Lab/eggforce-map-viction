import sanitizeHtml from 'sanitize-html';

const getSafeHTML = (html: string) => {
  return {
    __html: sanitizeHtml(html, {
      allowedAttributes: {
        a: ['href', 'title', 'rel', 'target'],
      },
      allowedClasses: {
        '*': ['link--discord'],
      },
    })
  };
}

export {
  getSafeHTML
}
