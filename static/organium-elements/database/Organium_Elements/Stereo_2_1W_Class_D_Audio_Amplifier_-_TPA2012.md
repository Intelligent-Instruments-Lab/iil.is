# Stereo 2.1W Class D Audio Amplifier - TPA2012

Type: Amplifier
Added: February 23, 2023 2:21 PM
Senses: N/A (amplifier)
Actuates: Amplified audio signal to speakers
Connection: pins / terminals
Status: Done
Voltage: 2.7-5.5V input, outputs 2.1W per channel
Panel: Analog Outputs/Actuators

![849236CB-FE03-439D-BEC4-7F5B40997D05.jpeg](stereo-2-1w-class-d-audio-amplifier---tpa2012-1.jpeg)

**Name**: TPA2012 Stereo Class D Audio Amplifier

**Type**: Amplifier

**Principle**: Class D (switching) amplifier. High-efficiency digital switching amplifies audio signals with minimal heat generation. Stereo configuration provides two independent channels.

**Function**: Amplifies low-level audio signals to drive speakers or headphones. Stereo output (2 channels) with adjustable gain. Battery-friendly due to high efficiency (~85-90%).

**Voltage**: Input: 2.7-5.5V DC, Output: 2.1W per channel @ 4Ω, 1.4W per channel @ 8Ω

**Typical use**: Portable audio projects, battery-powered speakers, small instrument amplification, multimedia installations, headphone driving, low-power audio systems.

**Good for**:

- Battery-powered applications (high efficiency)
- Stereo audio output
- Low heat generation
- Compact size
- Adjustable gain (volume control)
- Low quiescent current
- Driving small speakers or headphones

**Bad for**:

- High-power applications (>2W per channel)
- Large speakers (low power output)
- Professional audio (use dedicated amplifiers)
- Subwoofer driving

**Mini Jack connection diagram**: N/A (breakout board with terminals)

**Component diagram**:

- **VIN**: Power input (2.7-5.5V DC)
- **GND**: Ground
- **L/R IN**: Left/right audio inputs
- **L/R OUT**: Left/right speaker outputs (+ and -)
- **Gain control**: Adjustable gain/volume
- **SD** (Shutdown): Enable/disable amplifier

**Links**:

- [Stereo 2.1W Class D Audio Amplifier TPA2012 - Adafruit #1552](https://www.adafruit.com/product/1552)

**Buy**: Check link above

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect VIN to 2.7-5.5V power supply
2. Connect GND to ground
3. Connect audio source to L/R inputs
4. Connect speakers (4Ω or 8Ω) to L/R outputs
5. Adjust gain potentiometer for desired volume
6. Set SD pin HIGH to enable (or leave floating)
7. Add 100-220µF capacitor on VIN for stability

**Arduino IDE sketches**:

Can be controlled via audio output from microcontroller (DAC or PWM audio)

`// Connect to Arduino audio output
// Enable amplifier via SD pin
int sdPin = 8; 
void setup() {
  pinMode(sdPin, OUTPUT);
  digitalWrite(sdPin, HIGH); // Enable amp
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: 2.1W/channel @ 4Ω (THD<10%), 1.4W/channel @ 8Ω, 2.7-5.5V supply, ~90% efficiency, stereo Class D, adjustable gain, thermal and short-circuit protection

**Speaker impedance**: Works with 4Ω or 8Ω speakers. Power output higher with 4Ω load.

**Efficiency advantage**: Class D amplifiers waste minimal power as heat (~85-90% efficient vs ~50-70% for Class AB), ideal for battery-powered projects.

**Applications**: Portable Bluetooth speakers, instrument amplification, multimedia projects, battery-powered audio systems, small installation speakers