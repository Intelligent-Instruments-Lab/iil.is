# Audio Amplifiers

Type: Amplifier, Driver
Added: January 9, 2023 4:25 PM
Senses: Line-level audio signal
Actuates: Electro magnetic coils (speakers, tactile transducers, Seancoils)
Connection: Minijack
Status: Done
Voltage: 5-48V DC (varies by amp model)
Panel: Analog Outputs/Actuators

![amp-removebg-preview.jpg](audio-amplifiers-12.jpg)

**Name**: Audio Amplifier

**Type**: Amplifier, Driver

**Principle:** Controls current through transistors (typically class-D for efficiency) to amplify weak audio signals to levels sufficient to drive speakers and transducers.

**Function**: Amplifies line-level audio signals to drive electromagnetic devices (speakers, tactile transducers, seancoils, bone conductors, electromagnets).

**Voltage**: 5-48V DC (depends on amplifier model)

**Typical use:** Driving speakers, tactile transducers, seancoils, bone conductors, electromagnets with audio signals.

**Good for**:

- Amplifying signals for audio transducers
- Multiple power/impedance options available
- Efficient class-D designs
- Compact breakout boards

**Bad for**:

- Driving DC motors (use motor drivers instead, though audio amps can work)
- High-voltage applications
- Precision DC control

**Connection diagram**:

- Audio input: Line-level signal (typically 3.5mm jack or header pins)
- Power: Vcc and GND (voltage varies by model)
- Output: Speaker/transducer terminals (observe polarity for some devices)

**Component diagram**:

Audio Source → Audio Amp [Power Supply] → Speaker/Transducer

**Links**:
N/A

**Buy**:
Available from various sellers - common amplifier ICs (TPA2012, MAX98306, PAM8403, etc.). Each has different power ratings and features.

**Make instructions**: N/A (use breakout boards or follow IC datasheets)

**Use instructions/Tutorials**:

1. Match amplifier power to device requirements (check speaker/transducer wattage)
2. Use appropriate power supply (voltage and current rated for amp)
3. Don't exceed amp power ratings
4. For best results, match impedance (typically 4Ω or 8Ω loads)
5. Add heatsinking for high-power continuous operation

**Arduino IDE sketches**:
N/A - analog devices, controlled by audio signal level

**Relevant software files**:
N/A

**Extra and gratuitous information and images:** 

**Important:** Be careful in using the appropriate power supply (check Volts and Amps required, don’t exceed them). Also, it is a good idea to try to match the power output of the amp you are working with to the device you are driving (enough to get the amplitude your output device is capable off but not enough to blow it).

**Amplifiers in Organium collection:**

1. **TPA2012** - 2.1W Stereo Class-D
2. **PAM8403** - 3W Stereo Class-D
3. **TPA3110** - 15W+15W Stereo Class-D
4. **TDA7492P** - 50W+50W Stereo Class-D
5. **Bluetooth Amp Module** - Integrated Bluetooth + amplifier

**Selection criteria:**

- Power output needed (match to transducer rating)
- Supply voltage available
- Size constraints
- Stereo vs mono requirement
- Features (volume control, Bluetooth, etc.)

**Important:** Check voltage and current requirements. Don't exceed power ratings. Try to match amp output power to device capability to avoid damage while getting adequate volume.

Below are images and specs of the different amplifiers that are used in the Organium:

1.

![1737645143175.jpg](audio-amplifiers-4.jpg)

![Screenshot 2024-12-20 at 15.08.47.png](audio-amplifiers-7.png)

2.

![1737645143180.jpg](audio-amplifiers-5.jpg)

3.

![Screenshot 2024-12-20 at 15.28.39.png](audio-amplifiers-8.png)

![1737645143170.jpg](audio-amplifiers-3.jpg)

![Screenshot 2024-12-20 at 15.49.50.png](audio-amplifiers-9.png)

- 
    
    ![Screenshot 2024-12-20 at 15.50.20.png](audio-amplifiers-10.png)
    

4.

![1737645143159.jpg](audio-amplifiers-2.jpg)

![1737645143152.jpg](audio-amplifiers-1.jpg)

5.  Amp with Bluetooth

![1737646480859.jpg](audio-amplifiers-6.jpg)

![Screenshot 2025-01-23 at 15.35.54.png](audio-amplifiers-11.png)