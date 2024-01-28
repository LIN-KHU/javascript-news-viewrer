class AuthorDate {
    constructor(author, publishedAt) {
      this.element = document.createElement("p");
      this.element.innerHTML = `<strong>Author:</strong> ${author || 'Unknown'} | <strong>Date:</strong> ${new Date(publishedAt).toLocaleDateString()}`;
    }
  
    getElement() {
      return this.element;
    }
  }

  export default AuthorDate;