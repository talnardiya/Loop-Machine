function AudioPlayer({ src }) {
    const audioRef = useRef();

    return (
        <div>
            <audio
                controls="controls"
                preload="auto"
                autobuffer="true"
                style={{ display: "none" }}
                ref={audioRef}
            >
                <source src={src} />
            </audio>

            <button onClick={() => audioRef.current.play()}>Play</button>
        </div>
    );
}