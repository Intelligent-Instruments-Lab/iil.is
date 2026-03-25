# Electret Microphone

Type: Sensor
Added: January 13, 2023 10:50 AM
Senses: Vibrations in air (sound).
Actuates: Analog audio signal output
Connection: minijack
Status: Done
Voltage: 2.4-5.5

![Mic-removebg-preview.jpg](electret-microphone-1.jpg)

**Name**: Electret Microphone Amplifier (MAX4466 with Adjustable Gain)

**Type**: Sensor

**Principle**: Electret condenser microphone with integrated MAX4466 op-amp provides amplified audio signal suitable for microcontroller ADC input.

**Function**: Captures sound and amplifies to line level with adjustable gain (25x-125x via onboard potentiometer). Low-noise output optimized for microcontroller analog inputs.

**Voltage**: 2.4-5.5V operating, analog audio output

**Typical use**: Voice changers, audio recording/sampling, audio-reactive projects using FFT, sound level monitoring, speech recognition, acoustic instrument pickup.

**Good for**:

- Low-noise amplified audio
- Microcontroller ADC compatibility
- Adjustable gain for different sound levels
- Compact size
- Wide frequency response
- Battery-powered projects

**Bad for**:

- Driving speakers directly (use audio amplifier)
- Driving headphones (except smallest in-ear types)
- Professional audio recording (use dedicated audio interface)

**Mini Jack connection diagram**:

![max4466_schem.svg](electret-microphone-2.svg)

**Component diagram**: See schematic above

**Links**:

- [https://www.adafruit.com/product/1063](https://www.adafruit.com/product/1063)

**Buy**:

- [Electret Microphone Amplifier MAX4466 - Adafruit #1063](https://www.adafruit.com/product/1063)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect VCC to 2.4-5.5V, GND to ground
2. Connect OUT to analog input pin
3. Adjust gain potentiometer for desired sensitivity
4. Read analog values (centered around VCC/2)
5. For audio analysis, sample at high rate (e.g., 10kHz+)
6. For level detection, use envelope following or RMS calculation

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Output characteristics**: DC-biased at VCC/2. Audio signal swings above/below this midpoint. AC-couple with capacitor if DC bias is undesired.

**FFT applications**: Sample at Nyquist rate (2x highest frequency of interest). Use FFT libraries for frequency analysis in audio-reactive projects.