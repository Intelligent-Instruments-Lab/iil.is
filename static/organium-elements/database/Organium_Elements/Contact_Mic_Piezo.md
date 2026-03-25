# Contact Mic / Piezo

Type: Sensor, Transducer
Added: November 15, 2022 10:37 AM
Senses: Vibrations in materials
Actuates: Can vibrate (act as a weak speaker)
Connection: Minijack
Status: Done
Voltage: Produces weak current (variable voltage output when sensing)
Panel: Analog Inputs/Sensors

![NOTE: Needs a preamp to get a good signal (and protect certain inputs you may want to connect it too:](contact-mic-piezo-1.jpg)

NOTE: Needs a preamp to get a good signal (and protect certain inputs you may want to connect it too:

**Name**: Piezo Disc (Contact Microphone)

**Type**: Sensor, Transducer

**Principle**: Piezoelectricity - piezo crystals emit electrical current when subjected to mechanical stress. When a surface vibrates, the disc deforms, generating voltage. Can be reversed: applying voltage causes deformation (weak speaker).

**Function**: Pressed against a surface will detect vibrations in that surface. Detects vibrations resonating through materials. Pressed against surfaces to "hear" internal vibrations. Can also act as transducer to create vibrations.

**Voltage**: Produces weak current (typically 0-10V peaks depending on vibration intensity). **Requires preamp** for proper signal level and input protection.

**Typical use**: Contact microphones for acoustic instruments (strings, percussion), hydrophones (when waterproofed), amplifying resonant objects, detecting mechanical vibrations, DIY instrument pickups.

**Good for**:

- Listening to vibrating surfaces
- Percussion on solid materials
- Acoustically active objects
- Excluding room acoustics (direct contact)
- DIY hydrophones (when encased in epoxy)
- Low-cost sensor/microphone

**Bad for**:

- Airborne sound (voice, ambient noise)
- Body sounds (not ideal for stethoscope use)
- Direct connection to line/mic inputs without preamp (can damage inputs)
- High-fidelity recording (limited frequency response)

**Mini Jack connection diagram**:
Basic: Center pad (positive) and outer ring (ground). **Must use preamp circuit before connecting to audio inputs.**

![piezo_schem.svg](contact-mic-piezo-4.svg)

**Component diagram**:
Piezo disc → Preamp circuit → Audio input/amplifier

**Links**:

- [Wikipedia: Piezoelectric Sensor](https://en.wikipedia.org/wiki/Piezoelectric_sensor)
- 
    
    [Piezo Preamp](Piezo%20Preamp%20b70c3dcb8e7342e7854bad2e8417dc77.md)
    

**Extra and gratuitous information and images:**

**Buy**: Available at Íhlutir (local supplier), Amazon, Adafruit, electronics distributors

**Use instructions/Tutorials**:

1. Attach piezo disc to surface to be amplified
2. Connect to preamp circuit (essential!)
3. Connect preamp output to audio interface/mixer
4. Experiment with placement on different materials for varied timbres

**For hydrophone:** Encase entire piezo in epoxy or waterproof sealant, ensuring connections are protected.

**Arduino IDE sketches**:
For vibration sensing: Standard analogRead() of piezo voltage (with appropriate voltage divider/protection circuit)

**Relevant software files**:
N/A - analog signal processing

**Extra and gratuitous information and images**:

**Why preamp is essential:**

- Piezo output is high impedance (needs buffering)
- Protects audio inputs from voltage spikes
- Boosts weak signal to usable level
- Improves frequency response

**Typical preamp circuit:** High-impedance buffer (op-amp or JFET input) with gain control, powered by 9V battery.

**Frequency response:** Good mid-high frequencies, limited low-frequency response (better for percussive/transient sounds than sustained bass).

**Reversible use:** Apply audio signal to piezo to use as weak speaker/transducer for vibrating surfaces.

![330035311_851312275968240_2618098262848861477_n-removebg-preview.jpg](contact-mic-piezo-2.jpg)

![PiezoContactMic.jpg](contact-mic-piezo-3.jpg)