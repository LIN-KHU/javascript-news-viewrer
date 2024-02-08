import Modal from "./Modal";

class ExistingModal extends Modal {
  constructor(existingData) {
    super();

    if (existingData) {
      this.titleInput.value = existingData.title || "";
      this.contentInput.value = existingData.content || "";

      this.modalTitle.textContent = "의견 수정하기"

      this.saveButton.textContent = "수정";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        this.handleDelete(); 
      });
      this.modalElement.appendChild(deleteButton);
    }
  }

  handleSave() {
    const updatedTitle = this.titleInput.value;
    const updatedContent = this.contentInput.value;

    const updatedData = {
      title: updatedTitle,
      content: updatedContent
    };

    localStorage.setItem('savedData', JSON.stringify(updatedData));

    this.closeModal();
  }

  handleDelete() {
    localStorage.removeItem('savedData');

    this.closeModal();
  }
}

export default ExistingModal;