import FrequencyCalculator from './FrequencyCalculator';

export default class VCO {
    constructor(audioContext, type = 'sawtooth') {
        this._detune = 0;
        this._frequency = 0;
        this._amp = 1;
        this._note = 'C';
        this._octave = '0';

        this.oscillator = audioContext.createOscillator();
        this.oscillator.frequency.value = 1;
        this.oscillator.type = type;
        this.oscillator.start();

        this.gain = audioContext.createGain();
        this.gain.gain.value = this._amp;

        this.input = this.oscillator;
        this.output = this.gain;

        this.oscillator.connect(this.gain);
    }

    connect(input) {
        return this.output.connect(input);
    }

    play(note = 'C', octave = '0') {
        this._note = note;
        this._octave = octave;
        this.frequency = FrequencyCalculator.calculateFrequencyByStep(FrequencyCalculator.calculateSteps(note, octave) + this._detune);
        this.oscillator.frequency.value = this.frequency;

        this.gain.gain.value = this._amp;
    }

    stop() {
        this.gain.gain.value = 0;
    }

    destroy() {
        this.oscillator.stop();
        this.oscillator.disconnect();

        this.gain.disconnect()
    }

    get frequency() {
        return this._frequency;
    }

    set frequency(frequency) {
        this._frequency = parseFloat(frequency)
        this.oscillator.frequency.value = this._frequency;

        return this._frequency;
    }

    get detune() {
        return this._detune;
    }

    set detune(detune) {
        this._detune = parseInt(detune);
        this._frequency = FrequencyCalculator.calculateFrequencyByStep(FrequencyCalculator.calculateSteps(this._note, this._octave) + this._detune);
        this.oscillator.frequency.value = this._frequency;

        return this._detune;
    }

    get amp() {
        return this._amp;
    }

    set amp(amplitude) {
        this._amp = parseFloat(amplitude)
        this.gain.gain.value = this._amp;

        return this._amp;
    }

};