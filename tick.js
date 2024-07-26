function handleTick()
{
    if (scene_id === 0) 
    {
        canvas.update();
    } 
    else if (scene_id === 1) 
    {
        frame_cnt = frame_cnt + 1;
        canvas.update();
    }
}

function display_message()
{ 
}

function read_text()
{
}