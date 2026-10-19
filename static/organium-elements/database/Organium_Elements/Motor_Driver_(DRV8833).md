# Motor Driver (DRV8833)

Category: PROCESSING
Modality: DRIVERS
Type: Amplifier, Driver
Added: February 23, 2023 2:51 PM
Senses: N/A
Actuates: Controls DC motors and stepper motors
Connection: Minijack/Jumpers
Status: Done
Voltage: 2.7-10.8V motor power, 1.8-7V logic level

**Good For:** Running lower voltage DC motors than TB6612

![E4CDF480-5C93-46C6-8BC2-6D160523FCB3.jpeg](motor-driver-drv8833-1.jpeg)

**Name**: DRV8833 Dual Motor Driver Breakout

**Type**: Driver, Amplifier

**Principle**: Dual H-bridge MOSFET driver optimized for low-voltage motors. Uses PWM for speed control and H-bridge for bidirectional control.

**Function**: Controls two DC motors independently or one bipolar stepper motor. Specifically designed for lower voltage motors (2.7-10.8V) compared to TB6612 (4.5-13.5V).

**Voltage**: 2.7-10.8V (motor power and logic inputs), Output current: 1.5A per channel continuous (2A peak)

**Typical use**: Driving small 3-6V DC motors from logic — two motors forward and reverse, or one stepper. The low voltage range is the point: it suits battery-powered and vibration motors that a 12V driver would over-drive.

**Good for**:

- Running lower voltage DC motors than TB6612
- Battery-powered applications (3.7V LiPo, AA batteries)
- Motors in 2.7-10.8V range
- Dual independent motor control
- Compact, efficient control
- Low quiescent current
- Wide logic voltage compatibility

**Bad for**:

- High voltage motors (>10.8V)
- High current motors (>1.5A continuous)
- Motors requiring 12V operation (use TB6612 instead)
- Heavy-duty applications

**Compatible motors (which of these it drives):**
A DRV8833 = **two DC motors** (one per H-bridge, bidirectional PWM) **or one bipolar stepper**, at **2.7–10.8 V**. The room has **7× DRV8833**.

*In hand now (Rev5, received):*
| Motor / load | DRV8833? | Note |
|---|---|---|
| **DollaTek 130 DC motor** 3–6 V (×20) | ✅ yes | the only in-hand DC motor — 2 per board |
| **Water pump, air pump, USB fans, vibrating/haptic motor** | ✅ yes | small DC loads, one per H-bridge (a DRV2605L is better for *fine* haptics) |
| **Electromagnet 5 V** (×10) | ⚠️ possible | in range, but a relay is cleaner for simple on/off |
| **Solenoid 12 V (#412, ×20)** | ❌ no | 12 V > 10.8 V ceiling → use **TB6612** or a relay/MOSFET |
| **Servos** (#154 / #155 / #1404) | ❌ no | servos need a PWM *signal*, not an H-bridge → use **PCA9685** or a direct MCU pin |

*Rev6 (proposed — not yet ordered), where the DRV8833 is the ideal match:*
| Motor | DRV8833? | Note |
|---|---|---|
| **DC Gearbox "TT" motor #3777** (3–6 V) | ✅ ideal | running current well under 1 A/ch |
| **2WD robot chassis #3244** (2 TT motors) | ✅ perfect | one DRV8833 = both wheels, bidirectional |
| **N20 gearmotor 6 V #4638** | ✅ yes | geared, low current |
| **NEMA-8 stepper #4411** | ✅ yes | one bipolar stepper per board |
| **NEMA-17 12 V stepper #324** | ❌ no | 12 V → **TB6612** |

**Rule of thumb (our driver stash):** DRV8833 → our **3–6 V DC motors** (2/board) or one small bipolar stepper · **TB6612 (×5, →13.5 V)** → the 12 V stepper/solenoid · **DRV8871 (×6, 3.6 A)** → a bigger/higher-current single DC motor or pump · **PCA9685 (×2)** → the servos · **DRV2605L (×5)** → fine haptics.

**Mini Jack connection diagram**: N/A (breakout board with headers)

**Component diagram**:

- **VM**: Motor power supply (2.7-10.8V)
- **GND**: Ground
- **AIN1/AIN2**: Motor A control inputs (2.7-10.8V logic)
- **BIN1/BIN2**: Motor B control inputs (2.7-10.8V logic)
- **AOUT1/AOUT2**: Motor A outputs
- **BOUT1/BOUT2**: Motor B outputs
- **SLP** (Sleep): Logic HIGH to enable, LOW for low-power sleep mode
- **FLT** (Fault): Outputs LOW on fault condition

**Links**:

- [Adafruit DRV8833 Motor Driver - Adafruit #3297](https://www.adafruit.com/product/3297)

**Buy**: Check link above

**Make instructions**: N/A

**Use instructions/Tutorials**:

https://learn.adafruit.com/adafruit-drv8833-dc-stepper-motor-driver-breakout-board

1. Connect VM to motor power (2.7-10.8V)
2. Connect GND
3. Connect SLP to HIGH to enable driver
4. Connect motors to AOUT/BOUT terminals
5. Control via AIN1/AIN2 and BIN1/BIN2
6. Use PWM on control pins for speed control

**Control logic**:

- IN1=HIGH, IN2=LOW: Forward
- IN1=LOW, IN2=HIGH: Reverse
- IN1=LOW, IN2=LOW: Coast (motor freewheels)
- IN1=HIGH, IN2=HIGH: Brake

**Arduino IDE sketches**:

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: 1.5A continuous per channel, 2A peak, 2.7-10.8V motor and logic voltage, internal current regulation, thermal shutdown, under-voltage lockout, sleep mode for power saving

**TB6612 vs DRV8833**: Use DRV8833 for 3-9V motors (LiPo batteries, small hobby motors). Use TB6612 for 6-12V motors (higher voltage applications).

**Typical applications**: vibration motor control, low-voltage actuators, battery-powered motorized projects, toy motors

![Motor_Driver_(DRV8833)](motor-driver-drv8833-1.jpg)
