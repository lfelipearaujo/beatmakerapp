class DrumKit {
    constructor() {
        this.playBtn = document.querySelector('.play');
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0; // track our pads
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');


    }
    // activate the pad class to change colour
    activePad() {
        this.classList.toggle('active');
    }
    // going through all the pads
    repeat() {
        let step = this.index % 8; // it will countin untill 8 and go back to 0;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            /// check if pads are active
            if (bar.classList.contains('active')) {
                // check each sound
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    // loop in the pads
    start() {
        const interval = (60 / this.bpm) * 1000;
        // check if its playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => { // arrow func so this refers to drumkit
                this.repeat();
            }, interval);
        } else {
            //clear interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0
                    break;
                case '2': ;
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
                    switch (muteIndex) {
                        case '0':
                            this.kickAudio.volume = 1;
                            break;
                        case '1':
                            this.snareAudio.volume = 1;
                        break;
                        case '2': ;
                            this.hihatAudio.volume = 1;
                            break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-nr");
        tempoText.innerHTML = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();


// Eventlisteners
// Pads
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend',function () {
        this.style.animation = '';
    })
});



drumKit.playBtn.addEventListener('click', function () {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    })
});

drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.mute(e);
    })
});

drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e);
});

