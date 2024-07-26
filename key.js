// キーイベントの登録
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

// キーが押されたとき
function handleKeyDown(event) {

    //console.log( event.key )
    //console.log( event.altKey )
    //console.log( event.ctrlKey )
    //console.log( event.shiftKey )

    let keyCode = event.keyCode;

    switch (keyCode) {
        case 13: // enter
            if (scene_id === 0)
            {
                scene_id = 1;
                canvas.removeChild(titleText);
                canvas.addChildAt(man, 1);
                canvas.addChildAt(woman, 2);
                canvas.addChildAt(message_box, 3);
            }
            else if (scene_id === 1) 
            {
                // 何もしない
            }
            break;
        default: break;
    }
}

function handleKeyUp(event) {
    let keyCode = event.keyCode;

    switch (keyCode) {
        case 13: isPressEnter = false; break;
        case 37: isPressLeft = false; break;
        case 38: isPressUp = false; break;
        case 39: isPressRight = false; break;
        case 40: isPressDown = false; break;
        default: break;
    }
}