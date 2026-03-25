# Single String Pickup

Type: Sensor
Added: January 9, 2023 3:48 PM
Senses: Vibrating strings (or anything ferromagnetic which is vibrating and you can get close to)
Actuates: Line-level audio signal output
Connection: minijack
Status: Done
Voltage: 9V (battery)
Panel: Analog Inputs/Sensors

![NUpup-removebg-preview.jpg](single-string-pickup-3.jpg)

**Name**: Single String Electromagnetic Pickup

**Type**: Sensor

**Principle**: Electromagnetic induction. Vibrating ferromagnetic material (string) disturbs magnetic field, inducing current in coil. Similar principle to electric guitar pickups but optimized for single strings.

**Function**: Detects vibrations from ferromagnetic strings or objects through electromagnetic induction. Generates clean audio signal from string vibration without physical contact.

**Voltage**: 9V battery (check green LED indicator for battery status)

**Typical use**: Clean signal capture from vibrating strings, single-string instruments, experimental string setups, isolated string recording, monophonic string sensing.

**Good for**:

- Clean, isolated string signals
- Single-string applications
- Non-contact sensing
- Low noise pickup
- Permanent installations
- Battery-powered operation
- Focused pickup pattern (minimal crosstalk)

**Bad for**:

- Non-ferromagnetic strings (nylon, gut)
- Multiple simultaneous strings (use multi-string pickup)
- Non-vibrating objects
- Anything not ferromagnetic

**Mini Jack connection diagram**:

- Input: Mount near vibrating ferromagnetic string
- Output: Line-level audio from bottom of pre-amp

**Sensorwiki link**: [https://en.wikipedia.org/wiki/Pickup_(music_technology)](https://en.wikipedia.org/wiki/Pickup_(music_technology))

**Buy link**: [https://www.cycfi.com/projects/nu-series/](https://www.cycfi.com/projects/nu-series/)

**Component diagram**: Electromagnetic coil + magnet + preamp → 9V battery power → Line output

**Links**:

- [https://en.wikipedia.org/wiki/Pickup_(music_technology)](https://en.wikipedia.org/wiki/Pickup_(music_technology))

**Buy**:

- [Cycfi Nu Series Single String Pickup](https://www.cycfi.com/projects/nu-series/)

**Make instructions**: N/A (commercial product)

**Use instructions/Tutorials**:

1. Install 9V battery in enclosure
2. Power on unit (green LED should illuminate on top)
3. Position pickup close to vibrating string (~2-5mm)
4. Connect output (bottom jack) to audio interface/recorder/amplifier
5. If no green LED, replace 9V battery
6. Turn off when not in use to preserve battery

**Arduino IDE sketches**: N/A (audio output device)

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Battery indicator**: Green LED visible from top of enclosure confirms power. No LED = dead battery.

**Positioning**: Closer to string = louder signal and more high-frequency content. Position 2-5mm from string for optimal balance.

**Output level**: Line-level output suitable for direct connection to audio interfaces, mixers, or recording devices without additional amplification.

**Advantages over contact mics**: No physical contact required (no damping of string), cleaner signal, no handling noise, focused on single string.

![NU.jpg](single-string-pickup-2.jpg)

Plug the pickup in and switch on the power (you should get a green light visible from the top of the enclosure to confirm the battery has charge, otherwise open the enclosure and change it for a fresh one). 

![324634021_1109234236419220_4339240376865788068_n.jpg](single-string-pickup-1.jpg)

When the pickup is connected and powered you can get a clean signal out from the bottom of the power supply.