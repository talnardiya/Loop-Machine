import React, { useState } from "react"
import { Howl } from "howler";

export default function LoopMachine() {
    const sound = new Howl({
        src: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
        html5: true,
        loop: false
    });

    return <div>

        <div onClick={() => sound.mute()}>Click me to mute sound</div>
        <div onClick={() => sound.play()}>Click me to play sound</div>
        <div onClick={() => sound.pause()}>Click me to pause sound</div>
        <div onClick={() => sound.stop()}>Click me to stop sound</div>
        <textarea rows={'4'} cols={'50'} onClick={() => sound.loop()}>Click me to loop sound</textarea>
    </div>;
}
