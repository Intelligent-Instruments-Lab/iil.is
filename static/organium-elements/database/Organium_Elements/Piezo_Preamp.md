# Piezo Preamp

Type: Amplifier, Enclosure
Added: February 8, 2023 2:37 PM
Senses: N/A (amplifier for piezo input)
Actuates: Line-level audio output
Connection: minijack
Status: Done
Voltage: 9V (battery) - Please make sure to turn off when not in use to save battery.
Panel: Analog Inputs/Sensors

![Piezo.jpg](piezo-preamp-3.jpg)

**Name**: Piezo Preamp (Contact Mic Buffer)

**Type**: Amplifier, Buffer

**Principle**: High-impedance buffer amplifier. Converts high-impedance piezo signal from  [Contact Mic / Piezo](Contact%20Mic%20Piezo%20a4d6ecb497a74593bcbaa6220d11a0d5.md) to low-impedance line level output, preventing signal loss and noise.

**Function**: Amplifies and buffers signal from contact microphones (piezo discs) to line level. Provides clean, usable audio signal from piezo transducers for connection to audio equipment.

**Voltage**: 9V battery (turn off when not in use to preserve battery)

**Typical use**: Amplifying contact microphones, listening to vibrations in materials, acoustic instrument pickup, percussion sensing, vibration monitoring.

**Good for**:

- Converting piezo signal to line level
- Reducing noise and impedance issues
- Direct headphone monitoring
- Clean audio input for recording
- Portable, battery-powered operation
- Works with all piezo contact mics

**Bad for**:

- Anything except treating piezo/contact mic signals
- Low-impedance microphones (use with piezos only)
- Applications without piezo input

**Mini Jack connection diagram**:

- **Input** (top): Piezo contact mic
- **Output** (bottom): Line-level audio (to headphones, audio interface, recorder)

**Component diagram**:

![Screenshot 2022-09-20 at 10.22.33.png](piezo-preamp-4.png)

**Links**:

- [http://www.richardmudhar.com/piezo-contact-microphone-hi-z-amplifier-low-noise-version/](http://www.richardmudhar.com/piezo-contact-microphone-hi-z-amplifier-low-noise-version/)

**Buy**: N/A (lab-made)

**Make instructions**:

- [Piezo Preamp (by HE)](https://www.notion.so/Piezo-Preamp-by-HE-1e7ba1ba56644a8db66ab31ac847502b?pvs=21)

**Use instructions/Tutorials**:

1. Insert fresh 9V battery if needed
2. Connect piezo contact mic to input (top)
3. Turn on via switch (green LED indicates power)
4. Connect output (bottom) to headphones or audio interface
5. **Important**: Turn off when finished to preserve battery life
6. Replace battery when green LED dims or no output

**Arduino IDE sketches**: N/A (analog audio device)

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Operation**: Green LED visible through "I" shaped hole indicates power on. Always verify LED is on before use and turn off after to save battery.

**Output capability**: Can drive headphones directly for monitoring or connect to any audio input (mixer, interface, recorder).

**Location**: Preamps stored on same panel as contact mics in Organolib.

**Why needed**: Piezo discs have extremely high output impedance. Without buffering, signal is weak, noisy, and prone to interference. Preamp solves this by converting to low-impedance line level.**:** 

![The Preamp has the output on the bottom, you can connect headphones directly to hear a connected contact mic or plug it into any audio input.](piezo-preamp-2.jpg)

The Preamp has the output on the bottom, you can connect headphones directly to hear a connected contact mic or plug it into any audio input.

![The Preamps will show a green light when turned on if the battery has power through the “I” shaped hole.](piezo-preamp-1.jpg)

The Preamps will show a green light when turned on if the battery has power through the “I” shaped hole.