# DC Motors

Category: OUTPUTS
Modality: MOTION
Subtype: DC
Type: Actuator
Added: January 9, 2023 4:14 PM
Senses: N/A
Actuates: Rotational motion, vibration (when used with offset weights)
Connection: Minijack
Status: Done
Voltage: 3–6VDC

![DCMotor.jpg](dc-motors-1.jpg)

**Name**: DC Motor (130-Size Hobby Motor)

>
> | Motor | Voltage | Qty |
> |---|---|---|
> | **DollaTek 130-size, 17000 RPM** (bare brushed motor — the one described below) | **3–6 V** | 2 packs = 20 |
> | **DC Gearbox "TT" Motor** 200 RPM (Adafruit #3777) | **3–6 V** | 14 |
> | **Round Robot Chassis 2WD** (Adafruit #3244 — 2 TT gearmotors each) | **3–6 V** | 8 (16 motors) |
> | **N20 DC Motor w/ magnetic encoder** (Adafruit #4638) | **6 V** rated | 6 |
>
> All run on **~3–6 V** — drive them from a DRV8833 / TB6612 / DRV8871 off a 5–6 V rail.
> **Terminal marking:** the DollaTek motors have an embossed **dot on one terminal = positive (+)**
> — feed +V there for the motor's nominal (clockwise, from the shaft end) direction. Brushed DC is
> symmetric, so reversing the leads only reverses the spin (no damage); the dot is a *direction
> reference* for wiring a batch of motors consistently.

**Type**: Actuator

**Principle**: Electromagnetic induction. Current flows through armature windings inside a magnetic field created by permanent magnets, generating torque that causes the shaft to rotate. A commutator reverses the current direction to maintain continuous rotation in the same direction.

**Function**: Converts electrical energy into mechanical rotational motion. Can be used for continuous rotation, creating vibration (with offset weight), or driving mechanical systems. Speed varies proportionally with applied voltage.

**Voltage**: 3–6VDC (the DollaTek 130-size we stock; the TT/chassis motors are also 3–6 V, the N20 is 6 V rated)

**Typical use**:
- Rotating and vibrating parts in kinetic work — a turning element in an instrument, or an offset weight that makes the motor itself a vibration source.
- Small motorised mechanisms driven through an H-bridge, where both speed and direction come from code.

**Good for**:

- Creating vibration when offset weight is attached to shaft
- Rotational motion and mechanical actuation
- Haptic feedback in wearables and controllers
- Speed control via PWM from microcontroller
- Prototyping - comes with pre-soldered wires
- Low 3–6 V operating range — driver/battery-friendly, Arduino-compatible
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

- DollaTek 130-size 3–6 V 17000 RPM (bare motor) — Amazon
- [DC Gearbox "TT" Motor 200 RPM 3–6 V (Adafruit #3777)](https://www.adafruit.com/product/3777)
- [Mini 3-Layer Round Robot Chassis 2WD (Adafruit #3244)](https://www.adafruit.com/product/3244)
- [N20 DC Motor + Magnetic Encoder 6 V (Adafruit #4638)](https://www.adafruit.com/product/4638)
- Reference (similar bare 130-size): [Adafruit DC Toy/Hobby Motor #711](https://www.adafruit.com/product/711)

**Make instructions**:
N/A (commercial component)

**To add offset weight for vibration:**

1. Cut small piece of material (plastic, metal)
2. Drill hole in material offset from center
3. Press-fit onto motor shaft or secure with adhesive
4. Test and adjust weight/position for desired vibration strength

**Use instructions/Tutorials**:
To be used with a DC motor driver

DC Motor Driver (with Variable Speed)

or

Dual Motor Driver PWM (L298N)

or other: TB6612 etc.

**Arduino IDE sketches**: N/A

**Relevant software files**: N/A

**Technical Specifications (DollaTek 130-Size Motor — our stock):**

- **Body size**: ~25mm × 20mm × 15mm (130-size class)
- **Shaft**: ~8mm length × 2mm diameter
- **Weight**: ~17 grams
- **Operating voltage**: 3–6 VDC (rated max ~6 V)
- **No-load speed**: ~17000 RPM @ 6 V
- **No-load current**: ~70 mA (typical 130-size)
- **Loaded / stall current**: ~250 mA loaded, up to ~500 mA stall (typical 130-size — size the driver for stall)
- **Operating temp**: -10°C to +60°C

*(Figures marked "typical" are for the 130-size class; the DollaTek datasheet only specifies 3–6 V and ~17000 RPM. Other DC motors in the same family differ: TT gearbox #3777 = 3–6 V / 200 RPM geared; N20 #4638 = 6 V geared w/ encoder.)*

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