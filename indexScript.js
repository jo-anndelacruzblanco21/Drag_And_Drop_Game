const draggableElement = document.querySelectorAll('.box');
const droppableElement = document.querySelectorAll('.droppable');
const remarksDiv = document.getElementById('remarksDiv');
let score = 0;

draggableElement.forEach(element => {
    element.addEventListener('dragstart', (drgStrt) => {
        drgStrt.dataTransfer.setData('text', drgStrt.target.id);
        drgStrt.currentTarget.classList.add('draggableFormat');
    });

    element.addEventListener('dragend', (drgendEvt) => {
        drgendEvt.currentTarget.classList.remove('draggableFormat');
    });
});

droppableElement.forEach(element => {
    element.addEventListener('dragover', (dragOver) => {
        dragOver.preventDefault();
    });

    element.addEventListener('drop', (dropEvt) => {
        dropEvt.preventDefault();
        const droppedElementId = dropEvt.dataTransfer.getData('text');
        const dropZoneId = dropEvt.target.getAttribute('data-draggable-id');
        const droppedElement = document.getElementById(droppedElementId);

        dropEvt.target.appendChild(droppedElement);

        if (dropZoneId === droppedElementId.replace('drag', 'drop')) {
            score++;
            remarksDiv.innerText = 'Correct!';
            scoreSection.innerText = `Score: ${score}`;
        } else {
            remarksDiv.innerText = 'Wrong!';
        }
    });
});