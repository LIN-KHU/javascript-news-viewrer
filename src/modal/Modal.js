class Modal {
    constructor() {
        this.modalElement = document.createElement("div");
        this.modalElement.className = "modal";

        this.modalTitle = document.createElement("div");
        this.modalTitle.textContent = "의견 남기기";
        this.modalTitle.classList.add("modalTitle");
        this.modalElement.appendChild(this.modalTitle);

        this.titleInputLabel = document.createElement("div");
        this.titleInputLabel.textContent = "제목"; 
        this.titleInputLabel.classList.add("modalInputLabel");
        this.modalElement.appendChild(this.titleInputLabel);

        this.titleInput = document.createElement("input");
        this.titleInput.classList.add("modalTitleInput");
        this.modalElement.appendChild(this.titleInput);

        this.contentInputLabel = document.createElement("div");
        this.contentInputLabel.textContent = "내용"; 
        this.contentInputLabel.classList.add("modalInputLabel");
        this.modalElement.appendChild(this.contentInputLabel);

        this.contentInput = document.createElement("textarea");
        this.modalElement.appendChild(this.contentInput);

        this.saveButton = document.createElement("button");
        this.saveButton.textContent = "저장";
        this.saveButton.addEventListener("click", this.handleSave.bind(this));
        this.modalElement.appendChild(this.saveButton);

        this.closeButton = document.createElement("div");
        this.closeButton.textContent = 'x';
        this.closeButton.classList.add("modalCloseButton");
        this.closeButton.addEventListener("click", this.closeModal.bind(this));
        this.modalElement.appendChild(this.closeButton);
    }

    handleSave() {
        const title = this.titleInput.value;
        const content = this.contentInput.value;

        if (title && content) {
            localStorage.setItem('savedData', JSON.stringify({ title, content }));
            this.closeModal();
        } else {
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