import Modal from "./Modal";

class ExistingModal extends Modal {
  constructor(existingData) {
    super();

    if (existingData) {
      this.titleInput.value = existingData.title || "";
      this.contentInput.value = existingData.content || "";

      /*const editButton = document.createElement("button");
      editButton.textContent = "수정";
      editButton.addEventListener("click", () => {
        this.handleEdit(); // 수정 기능을 호출하면서 기존 데이터를 전달합니다.
      });
      this.modalElement.appendChild(editButton);*/

      this.saveButton.textContent = "수정";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", () => {
        this.handleDelete(); // 삭제 기능을 호출하면서 기존 데이터를 전달합니다.
      });
      this.modalElement.appendChild(deleteButton);
    }
  }

  handleSave() {
    // 수정 기능 구현
    const updatedTitle = this.titleInput.value;
    const updatedContent = this.contentInput.value;

    // 로컬 스토리지에서 기존 데이터를 가져와 업데이트합니다.
    const updatedData = {
      title: updatedTitle,
      content: updatedContent
    };

    // 기존 데이터를 업데이트한 후 로컬 스토리지에 저장합니다.
    localStorage.setItem('savedData', JSON.stringify(updatedData));

    // 모달을 닫습니다.
    this.closeModal();
  }

  handleDelete() {
    // 삭제 기능 구현
    localStorage.removeItem('savedData');

    // 모달을 닫습니다.
    this.closeModal();
  }
}

export default ExistingModal;