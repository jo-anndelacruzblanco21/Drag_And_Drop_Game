const draggableElement = document.querySelectorAll('.box');

const droppableElement = document.querySelectorAll('.droppable');

const remarksDiv = document.getElementById('remarksDiv');

const scoreSection = document.getElementById('scoreSection');

let score = 0;

// DRAG EVENTS
draggableElement.forEach(element => {

    element.addEventListener('dragstart', (drgStrt) => {

        drgStrt.dataTransfer.setData('text', drgStrt.currentTarget.id);

        drgStrt.currentTarget.classList.add('draggableFormat');

    });

    element.addEventListener('dragend', (drgEnd) => {

        drgEnd.currentTarget.classList.remove('draggableFormat');

    });

});

// DROP EVENTS
droppableElement.forEach(element => {

    // ALLOW DROP
    element.addEventListener('dragover', (dragOver) => {

        dragOver.preventDefault();

    });

    // DROP EVENT
    element.addEventListener('drop', (dropEvt) => {

        dropEvt.preventDefault();

        const droppedElementId =
            dropEvt.dataTransfer.getData('text');

        const droppedElement =
            document.getElementById(droppedElementId);

        const dropZoneId =
            dropEvt.currentTarget.getAttribute('data-answer');

        // PREVENT MULTIPLE DROPS
        if (dropEvt.currentTarget.children.length > 0) {
            return;
        }

        // MOVE IMAGE
        dropEvt.currentTarget.appendChild(droppedElement);

        // CHECK ANSWER
        if (dropZoneId === droppedElementId) {

            score++;

            remarksDiv.innerText = "✅ Correct!";

            dropEvt.currentTarget.style.backgroundColor =
                "lightgreen";

        } else {

            remarksDiv.innerText = "❌ Wrong!";

            dropEvt.currentTarget.style.backgroundColor =
                "#ffb3b3";
        }

        // UPDATE SCORE
        scoreSection.innerText = `Score: ${score}`;

    });

});