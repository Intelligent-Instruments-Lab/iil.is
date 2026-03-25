# Haptic Controller Breakout (Adafruit DRV2605L)

Type: Amplifier
Added: February 7, 2023 11:49 AM
Status: Done

![2305-13-removebg-preview.jpg](haptic-controller-breakout-adafruit-drv2605l-1.jpg)

**Name**: Adafruit DRV2605L Haptic Motor Controller

**Type**: Driver, Amplifier

**Principle**: I2C-controlled haptic driver chip with 123+ built-in waveform effects. Uses sophisticated algorithms to drive vibration motors efficiently.

**Function**: Drives haptic motors (ERM or LRA) with programmable vibration patterns. Includes library of pre-programmed effects (clicks, buzzes, alerts, transitions) controllable via I2C.

**Voltage**: 3.3-5V logic, 3-5.2V motor power supply, max 250mA output

**Typical use**: Adding haptic feedback to interfaces, wearables, instruments, controllers. Provides tactile notifications, button confirmation, alerts, immersive haptic experiences.

**Good for**:

- Programmable haptic effects without custom waveform generation
- 123+ built-in effects (clicks, transitions, alerts, ramps)
- I2C control (simple 2-wire interface)
- Auto-resonance tracking for LRAs
- Overdrive and braking control

**Bad for**:

- High-power motors (>250mA)
- Multiple simultaneous motors (one motor per controller)
- Custom waveforms beyond built-in library
- Applications without I2C-capable microcontroller

**Mini Jack connection diagram**: N/A (I2C breakout board)

**Component diagram**:

- VIN: 3-5.2V power
- GND: Ground
- SCL: I2C clock
- SDA: I2C data
- Motor +/- terminals

**Links**:

- [Adafruit DRV2605L Guide](https://learn.adafruit.com/adafruit-drv2605-haptic-controller-breakout/overview)
    
    [Adafruit DRV2605L Haptic Controller Breakout](https://learn.adafruit.com/adafruit-drv2605-haptic-controller-breakout/overview)
    
- Library Documentation:
[https://adafruit.github.io/Adafruit_DRV2605_Library/html/class_adafruit___d_r_v2605.html](https://adafruit.github.io/Adafruit_DRV2605_Library/html/class_adafruit___d_r_v2605.html)

**Buy**:

- [Adafruit DRV2605L Haptic Controller - Adafruit #2305](https://www.adafruit.com/product/2305)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Install Adafruit_DRV2605 library in Arduino IDE
2. Connect via I2C (SDA, SCL) and power (3.3-5V)
3. Connect haptic motor to motor terminals
4. Select ERM or LRA mode in code
5. Trigger effects by effect number (1-123)
6. Combine effects in sequences

**Arduino IDE sketches**:

cpp

`#include <Wire.h>
#include "Adafruit_DRV2605.h"

Adafruit_DRV2605 drv;

void setup() {
  drv.begin();
  drv.selectLibrary(1); // ERM library
  drv.setMode(DRV2605_MODE_INTTRIG);
}

void loop() {
  drv.setWaveform(0, 14); // Sharp click
  drv.setWaveform(1, 0);  // End
  drv.go();
  delay(1000);
}`

**Relevant software files**: Requires Adafruit_DRV2605 library

**Extra and gratuitous information and images**:

**Motor Types:**

- **ERM**: Eccentric Rotating Mass (typical vibration motors)
- **LRA**: Linear Resonant Actuator (more efficient, precise)

**Effect Libraries:**

- Library 1-5: ERM motors (different intensities)
- Library 6: LRA motors

**Sample Effects:**

- 1-7: Strong clicks (100%, 60%, 30%, etc.)
- 10-15: Sharp clicks
- 47-53: Buzz patterns
- 54-58: Alerts
- 88-117: Transition/ramp effects

**I2C Address**: 0x5A (fixed, cannot be changed)

**Max current**: 250mA continuous, ensure motor stays within limit.