# DC Motors

Type: Actuator
Added: January 9, 2023 4:14 PM
Senses: N/A
Actuates: Rotational motion, vibration (when used with offset weights)
Connection: Minijack
Status: Done
Voltage: 4.5 to 9VDC
Panel: Analog Outputs/Actuators 2

![DCMotor.jpg](dc-motors-1.jpg)

**Name**: DC Motor (130-Size Hobby Motor)

**Type**: Actuator

**Principle**: Electromagnetic induction. Current flows through armature windings inside a magnetic field created by permanent magnets, generating torque that causes the shaft to rotate. A commutator reverses the current direction to maintain continuous rotation in the same direction.

**Function**: Converts electrical energy into mechanical rotational motion. Can be used for continuous rotation, creating vibration (with offset weight), or driving mechanical systems. Speed varies proportionally with applied voltage.

**Voltage**: 4.5 to 9VDC (wider operating range than typical toy motors which use 1.5-4.5V)

**Typical use**:

- Haptic feedback and vibration generation (with offset weight attached)
- Motion control in robotics and kinetic sculptures
- Mechanical actuation in interactive installations
- Rotating elements in musical instruments
- Alert/notification systems without sound
- Small motorized mechanisms

**Good for**:

- Creating vibration when offset weight is attached to shaft
- Rotational motion and mechanical actuation
- Haptic feedback in wearables and controllers
- Speed control via PWM from microcontroller
- Prototyping - comes with pre-soldered wires
- Wide voltage range (4.5-9V) makes it Arduino-compatible
- Compact 130-size form factor fits existing mounts
- Cost-effective for multiple-motor projects

**Bad for**:

- High-fidelity haptic feedback (use dedicated haptic drivers like DRV2605L for complex patterns)
- Precise rotational accuracy (use stepper motors instead)
- Audio-quality vibration (use exciter transducers for audio reproduction)
- Constant high-torque applications (motor may overheat)
- Very quiet applications (DC motors produce audible noise)
- Direct connection to microcontroller pins (requires motor driver or transistor)

**Mini Jack connection diagram**:
N/A - Direct wire connection:

- Red wire (or marked wire) → Positive voltage (typically from motor driver output) connect to Tip terminal of the minijack input
- Black/Blue wire → Negative/Ground (from motor driver output) connect to Sleeve terminal of the minijack input
- **DO NOT** connect motor directly to microcontroller GPIO pins - current draw (250mA loaded, 500mA stall) will damage the pin

[DC Toy / Hobby Motor - 130 Size](https://www.adafruit.com/product/711)

[https://www.notion.so](https://www.notion.so)

![DCmotor.jpeg](dc-motors-2.jpeg)

**Component diagram**: - 

**Links**:

- [Adafruit DC Motor Tutorial (Arduino Lesson 13)](https://learn.adafruit.com/adafruit-arduino-lesson-13-dc-motors)
- [Arduino Motor Reversing (Lesson 15)](https://learn.adafruit.com/adafruit-arduino-lesson-15-dc-motor-reversing)

**Buy**:

- [Adafruit DC Toy/Hobby Motor - 130 Size](https://www.adafruit.com/product/711)

**Make instructions**:
N/A (commercial component)

**To add offset weight for vibration:**

1. Cut small piece of material (plastic, metal)
2. Drill hole in material offset from center
3. Press-fit onto motor shaft or secure with adhesive
4. Test and adjust weight/position for desired vibration strength

**Use instructions/Tutorials**:
To be used with a DC motor driver 

[DC Motor Driver (with Variable Speed)](DC%20Motor%20Driver%20(with%20Variable%20Speed)%2055d02ce7ee5a4e4a83c9b9b07808f422.md)

or 

[Dual Motor Driver PWM (L298N)](Dual%20Motor%20Driver%20PWM%20(L298N)%20295a02c4d7f08002b33ccce357cfa34f.md)

or other: TB6612 etc.

**Arduino IDE sketches**: N/A

**Relevant software files**: N/A

**Technical Specifications (130-Size Motor):**

- **Body size**: 27.5mm × 20mm × 15mm
- **Shaft**: 8mm length × 2mm diameter
- **Weight**: ~17.5 grams
- **Rated voltage**: 6.0VDC
- **Operating range**: 4.5-9VDC
- **No-load speed**: 9100 ±1800 RPM
- **Loaded speed**: 4500 ±1500 RPM
- **No-load current**: 70 mA max
- **Loaded current**: 250 mA max
- **Stall current**: 500mA max
- **Starting torque**: 20 g·cm
- **Rated load**: 10 g·cm
- **Operating temp**: -10°C to +60°C

**Motor Driver Options:**

1. **Simple transistor** (PN2222, 2N2222) - Basic on/off + PWM speed control, one direction only
2. **MOSFET** (IRL530, IRLB8721) - Higher current capability, better efficiency
3. **H-bridge ICs** (L293D, L298N, TB6612) - Bidirectional control, multiple motors

**Why You Need a Driver:**
Microcontroller GPIO pins typically provide:

- 20-40mA maximum current
- DC motors draw 70-500mA
- **Direct connection will damage your microcontroller!**

**PWM Speed Control:**

- Use analogWrite() values 0-255
- 0 = stopped
- 128 = ~50% speed
- 255 = full speed
- Lower PWM values = less current draw, weaker vibration