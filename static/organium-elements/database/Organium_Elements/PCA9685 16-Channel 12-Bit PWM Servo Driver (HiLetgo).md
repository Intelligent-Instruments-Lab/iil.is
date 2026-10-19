# PCA9685 16-Channel 12-Bit PWM Servo Driver (HiLetgo)

Category: PROCESSING
Modality: DRIVERS
Type: Driver
Added: July 25, 2026
Senses: N/A
Actuates: 16 independent PWM outputs (servos, LEDs, motor-driver inputs, dimmers)
Connection: I2C
Status: Done
Voltage: 2.3–5.5V logic / servo rail 5–6V on V+
Published: Yes

**Principle**: The NXP PCA9685 is a dedicated I2C PWM generator. A 25 MHz on-board oscillator feeds a programmable prescaler, and the chip runs sixteen free-running 12-bit PWM channels entirely in hardware. Once you set a channel's on/off count over I2C, the chip holds that pulse forever without any further attention from the microcontroller — the CPU is free to do other work. The board adds a 3-pin header per channel (V+ / GND / PWM) and a screw terminal so servos can draw current from a separate power rail instead of the logic supply.

**Function**: Generates up to 16 independent PWM signals with 12-bit resolution (4096 steps per cycle) at a shared, adjustable frequency. Drives hobby servos directly, or dims/pulses LEDs, or feeds the enable/PWM pins of external motor drivers.

**Voltage**: Logic/VCC 2.3–5.5V (works with 3.3V and 5V microcontrollers). Servo/output rail V+ is separate — typically 5–6V for hobby servos, up to ~6V max. Never power servos from the microcontroller's 3.3V pin; use the V+ terminal.

**Typical use**:
- Many actuators moving together off two wires — 16 servos plucking, striking or damping in a kinetic instrument, or the joints of an animatronic figure.
- Any case where the host board is too busy to generate clean pulses: the chip keeps the timing itself, so the servos hold steady while the code does something else.

**Good for**:
- Freeing the microcontroller — hardware PWM means no jitter and no blocking `delay()` loops
- Scaling up: chain up to 62 boards on one bus for 992 outputs by strapping the A0–A5 address jumpers
- Mixed loads: servos on some channels, LEDs/dimmers on others, all at the same base frequency
- Works from 3.3V logic (ESP32, Pi, Feather) and 5V logic (Uno) without a level shifter

**Bad for**:
- Independent per-channel frequencies — all 16 share one prescaler value, so you can't run 50 Hz servos and 1 kHz LED dimming at once
- High-current motors — it only sources logic-level PWM; pair it with a real motor driver (L298N/DRV8871) for DC motors
- Audio-rate or precisely phase-locked signals — 24–1526 Hz range, not a fast waveform source
- Battery-tight wearables — driving many servos needs a stiff 5–6V rail and real current

**Mini Jack connection diagram**: N/A — I2C bus. Header pins: VCC (logic), GND, SCL, SDA, plus OE (output-enable, optional). Servo/output side: screw terminal V+ / GND for the power rail, and per-channel 3-pin groups ordered PWM / V+ / GND.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [NXP PCA9685 datasheet](https://www.nxp.com/docs/en/data-sheet/PCA9685.pdf)
- [Adafruit 16-channel PWM/servo driver guide (same chip)](https://learn.adafruit.com/16-channel-pwm-servo-driver)
- [Adafruit PCA9685 Arduino library](https://github.com/adafruit/Adafruit-PWM-Servo-Driver-Library)

**Buy**: [HiLetgo PCA9685 16-Channel 12-Bit PWM Servo Driver — Amazon](https://www.amazon.com/HiLetgo-PCA9685-Channel-12-Bit-Arduino/dp/B01D1D0CX2/)

**Use instructions/Tutorials**: Wire VCC/GND/SDA/SCL to your microcontroller. Connect a separate 5–6V supply (rated for the total stall current of your servos) to the V+ screw terminal — a big electrolytic across V+/GND helps. Plug servos into the 3-pin channel headers, brown/black wire to GND. In code, call `setPWMFreq(50)` for hobby servos, then `setPWM(channel, 0, pulse)` where pulse is roughly 150 (0°) to 600 (180°) out of 4096. Default I2C address is 0x40; solder the A0–A5 jumpers to give chained boards unique addresses.

**Arduino IDE sketches**: Library — **Adafruit PWM Servo Driver Library**.
```cpp
#include <Adafruit_PWMServoDriver.h>
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40);
void setup() {
  pwm.begin();
  pwm.setPWMFreq(50);          // 50 Hz for servos
}
void loop() {
  pwm.setPWM(0, 0, 150);       // channel 0 -> ~0 degrees
  delay(500);
  pwm.setPWM(0, 0, 600);       // channel 0 -> ~180 degrees
  delay(500);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: NXP PCA9685; default I2C address 0x40 (0x70 all-call, 0x00 general-call). Address selectable 0x40–0x7F via six solder jumpers → up to 62 boards / 992 channels per bus. 12-bit resolution = 4096 steps. PWM frequency 24 Hz–1526 Hz (all channels share it). Supports Fast-mode Plus I2C (up to 1 MHz), 30 mA SDA sink for high-capacitance buses. Output-enable (OE) pin can blank all outputs at once. Totem-pole outputs sink/source ~25 mA per channel (logic drive only). Board dimensions roughly 62 × 26 mm.
![PCA9685 16-Channel 12-Bit PWM Servo Driver (HiLetgo)](pca9685-16-channel-12-bit-pwm-servo-driver-hiletgo-1.jpg)