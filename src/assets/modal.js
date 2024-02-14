export function openModal(article) {
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close-modal");

    modal.classList.add("open");

    closeModal.addEventListener("click", () => {
        modal.classList.remove("open");
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
    
    const storedOpinion = localStorage.getItem(article);
    DisplayOpinion(article, storedOpinion);
  }

  function DisplayOpinion(article, storedOpinion) {
    const opinionForm = document.getElementById("opinion-form");
    const opinionTitle = document.getElementById("opinion-title");
    const opinionContent = document.getElementById("opinion-content");
    
    if (storedOpinion) {
        const parseOpinion = JSON.parse(storedOpinion);
  
        const SavedOpinion = document.getElementById("modal-header");
        SavedOpinion.innerHTML = `
        <h3>${parseOpinion.title}</h3>
        <p>${parseOpinion.content}</p>
        `;
        
        opinionTitle.value = parseOpinion.title;
        opinionContent.value = parseOpinion.content;
  
        const saveButton = document.getElementById("save-opinion");
        let editButton = document.getElementById("edit-opinion");
        let deleteButton = document.getElementById("delete-opinion");
  
        if(saveButton) {
          saveButton.remove();
        }
  
        if (!editButton) {
          editButton = document.createElement("button");
          editButton.textContent = "edit";
          editButton.id = "edit-opinion";
    
          editButton.addEventListener("click", () => {
            event.preventDefault();
            
            const editedTitle = opinionTitle.value; 
            const editedContent = opinionContent.value;

            if (editedTitle !== "" && editedContent !== "") {
                localStorage.removeItem(article);
                
                const opinion = { title:editedTitle, content:editedContent };
                localStorage.setItem(article, JSON.stringify(opinion));
                modal.classList.remove("open");
            } else {
                alert("제목과 내용을 모두 입력하세요.");
            }
          });
    
          opinionForm.appendChild(editButton);
        }
    
        if (!deleteButton) {
          deleteButton = document.createElement("button");
          deleteButton.textContent = "delete";
          deleteButton.id = "delete-opinion";
    
          deleteButton.addEventListener("click", () => {
            localStorage.removeItem(article);
            modal.classList.remove("open");
          });
    
          opinionForm.appendChild(deleteButton);
        }
      } else {
        opinionTitle.value = "";
        opinionContent.value = "";
  
        const saveButton = document.getElementById("save-opinion");
        const editButton = document.getElementById("edit-opinion");
        const deleteButton = document.getElementById("delete-opinion");
  
        saveButton.textContent = "save";
        saveButton.addEventListener("click", () => {
            const savedTitle = opinionTitle.value;
            const savedContent = opinionContent.value;
            
            if (savedTitle !== "" && savedContent !== "") {
                localStorage.removeItem(article);
                
                const opinion = { title: savedTitle, content: savedContent };
                localStorage.setItem(article, JSON.stringify(opinion));
                modal.classList.remove("open");
            } else {
                alert("제목과 내용을 모두 입력하세요.");
            }
        });
  
        if (editButton) {
          editButton.remove();
        }
  
        if (deleteButton) {
          deleteButton.remove();
        }
      }
  }