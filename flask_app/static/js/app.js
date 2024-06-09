document.addEventListener('DOMContentLoaded', function() {
    const canvases = document.querySelectorAll('.canvas');

    canvases.forEach((canvas, index) => {
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;

        ctx.strokeStyle = "black";
        ctx.lineJoin = 'round'; // 펜 모양 (round, bevel, miter)
        ctx.lineCap = 'round'; // 펜 끝 모양 (butt, round, square)
        ctx.lineWidth = 12;
        ctx.fillStyle = 'white';

        let painting = false;

        function startPainting() {
            painting = true;
        }

        function stopPainting() {
            painting = false;
            ctx.beginPath();
        }

        function onMouseMove(event) {
            const x = event.offsetX;
            const y = event.offsetY;
            if (!painting) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }

        function onTouchMove(event) {
            const touch = event.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            if (!painting) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            event.preventDefault(); // 터치 스크롤 방지
        }

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);

        canvas.addEventListener("touchstart", startPainting);
        canvas.addEventListener("touchmove", onTouchMove);
        canvas.addEventListener("touchend", stopPainting);
        canvas.addEventListener("touchcancel", stopPainting);

    });

    document.querySelector('.input_button').addEventListener('click', function() {
        canvases.forEach((canvas, index) => {
            const imageData = canvas.toDataURL();
            document.getElementById(`imageData${index}`).value = imageData;
        });
        document.getElementById('canvasForm').submit();
    });

    document.querySelector('.reset_button').addEventListener('click', function() {
        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
});

function saveImages() {
    let allCanvasesFilled = true; // 캔버스에 그림이 없는지 여부를 나타내는 변수

    // 각 캔버스를 확인하여 비어 있는지 여부를 결정
    document.querySelectorAll('.canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        // 캔버스에 그림이 없는 경우
        if (ctx.getImageData(0, 0, canvas.width, canvas.height).data.every(pixel => pixel === 0)) {
            allCanvasesFilled = false;
        }
    });

    // 캔버스에 그림이 없는 경우
    if (!allCanvasesFilled) {
        // "글씨를 써주세요!" 메시지를 표시
        alert("글씨를 써주세요!");
    } else {
        // 그림이 있는 경우, 이미지 저장 및 처리 로직 진행
        const formData = new FormData();
        document.querySelectorAll('.canvas').forEach((canvas, index) => {
            const imageData = canvas.toDataURL();
            formData.append(`imageData${index}`, imageData);
        });
        fetch('/index', {
            method: 'POST',
            body: formData
        }).then((response) => response.text()).then((html) => console.log(html))

        fetch('/save_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            data.image_urls.forEach(url => {
                const image = new Image();
                image.src = url;
                document.body.appendChild(image);
                window.location.href = '/result';
            });
        });
    }
}


// function saveImages2() {
//     const formData = new FormData();
//     document.querySelectorAll('.canvas').forEach((canvas, index) => {
//         const imageData = canvas.toDataURL();
//         formData.append(`imageData${index}`, imageData);
//     });

//     fetch('/collection_image', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         window.location.href = "/";
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

function saveImages2() {
    window.location.href = "/";
}



function saveImages3() {
    const formData = new FormData();
    document.querySelectorAll('.canvas').forEach((canvas, index) => {
        const imageData = canvas.toDataURL();
        formData.append(`imageData${index}`, imageData);
    });

    fetch('/check_answer', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const isCorrect = data.is_correct;
        const correctModal = document.getElementById('correct');
        const incorrectModal = document.getElementById('incorrect');

        if (isCorrect) {
            document.querySelectorAll('.correct-image').forEach((image, index) => {
                image.src = '/static/images/correct_dumi.png';
                image.style.display = 'block';
            });

            document.querySelectorAll('.correct-message').forEach((message) => {
                message.style.display = 'block';
            });

            correctModal.style.display = "block";

            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            
        } else {
            document.querySelectorAll('.incorrect-image').forEach((image, index) => {
                image.src = '/static/images/incorrect_dumi.png';
                image.style.display = 'block';
            });

            incorrectModal.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function resetCanvas() {
    document.querySelectorAll('.canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

function submitForm() {
    saveImages();
    document.getElementById("canvasForm").submit();
}

function goToWriteIndex() {
    window.location.href = "/write.html";
}

function goBack() {
    window.history.back();
}

function reloadPage() {
    window.location.reload();
}


function showOverlay() {
    document.getElementById('overlay').style.display = 'block';
}


// 모달 기능 스크립트 추가
var modal = document.getElementById("myModal");
var btn = document.getElementById("homeButton");
var span = document.getElementsByClassName("close")[0];
var confirmBtn = document.getElementById("confirmBack");
var cancelBtn = document.getElementById("cancelBack");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

cancelBtn.onclick = function() {
    modal.style.display = "none";
}

confirmBtn.onclick = function() {
    window.location.href = "/";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
