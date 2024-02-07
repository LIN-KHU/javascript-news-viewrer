class Modal {
    constructor() {
        this.modalElement = document.createElement("div");
        this.modalElement.className = "modal";

        this.modalTitle = document.createElement("div");
        this.modalTitle.textContent = "의견 남기기";
        this.modalElement.appendChild(this.modalTitle);

        this.titleInput = document.createElement("input");
        this.titleInput.placeholder = "제목";
        this.modalElement.appendChild(this.titleInput);

        this.contentInput = document.createElement("textarea");
        this.contentInput.placeholder = "내용";
        this.modalElement.appendChild(this.contentInput);

        this.saveButton = document.createElement("button");
        this.saveButton.textContent = "저장";
        this.saveButton.addEventListener("click", this.handleSave.bind(this));
        this.modalElement.appendChild(this.saveButton);
    }

    handleSave() {
        const title = this.titleInput.value;
        const content = this.contentInput.value;

        if (title && content) {
            localStorage.setItem('savedData', JSON.stringify({ title, content }));
            this.closeModal();
        } else {
            //alert("제목과 내용을 입력해주세요.");
            this.closeModal();
        }
    }

    openModal() {
        const sectionElement = document.querySelector("section");
        sectionElement.appendChild(this.modalElement);
        this.modalElement.style.display = "block";
      }
    
      closeModal() {
        const sectionElement = document.querySelector("section");
        sectionElement.removeChild(this.modalElement);
        this.modalElement.style.display = "none";
        this.titleInput.value = "";
        this.contentInput.value = "";
      }
}

export default Modal;