# Standard Servo TowerPro SG-5010 (Adafruit 155)

Category: OUTPUTS
Modality: MOTION
Subtype: SERVO
Type: Actuator
Added: July 25, 2026
Senses: N/A
Actuates: Angular position (~180° rotation of an output shaft), positional holding torque
Connection: PWM
Status: Done
Voltage: 4.8 - 6V DC
Published: Yes

**Principle**: A small DC motor drives a reduction gear train to an output shaft. A potentiometer geared to that shaft reports the current angle to an internal control chip, which compares it against the angle you command via a PWM pulse and drives the motor to close the error. This closed feedback loop is what makes a servo hold a position rather than just spin — you tell it *where*, not *how fast*.

**Function**: Moves and holds its output horn to a commanded angle across roughly 180° (about 90° each side of centre). Torque is 5.5 kg·cm (76 oz·in) at 5V, rising to 6.5 kg·cm at 6V; speed is 0.2 s/60° at 4.8V, 0.16 s/60° at 6V. Position is set by pulse width, not voltage.

**Voltage**: 4.8 - 6V DC (5V works well). The three-wire control signal is a 3.3V- or 5V-tolerant PWM pulse; the signal line draws almost no current, but the motor rail can pull an amp or more under load — power it from a supply separate from your microcontroller's regulator.

**Typical use**:

- Kinetic sound-making — striking, plucking or damping an acoustic object on cue, where the angle has to come back the same every time.
- Pan/tilt rigs and puppet joints: a camera, sensor, light or limb that must *hold* a position rather than keep turning.

**Good for**:

- **The default starter actuator** — cheap, standard 3-pin lead, works with every microcontroller's servo library
- Precise, repeatable angular positioning without an encoder
- Good torque-to-price ratio; POM gears take moderate abuse
- Holds position against load without you writing any control code
- 25-tooth spline is the industry standard, so horns and brackets are everywhere

**Bad for**:

- Continuous rotation — it physically can't spin past ~180° (use Adafruit 154 for that)
- Precision robotics or metal-gear loads — POM (plastic) gears strip if stalled or shock-loaded
- Silent applications — audible gear buzz and hunting jitter near the target angle
- Battery-tight wearables — inrush and stall current are large for a coin-cell world
- Fast, smooth continuous motion — it steps to positions, it doesn't cruise

**Mini Jack connection diagram**: N/A — 3-pin servo header (not jack-patchable): Brown = GND, Red = +4.8-6V (V+), Orange = PWM signal. Drive the orange wire from a PWM-capable pin (e.g. Arduino D9/D10); tie all grounds together; power red from a dedicated 5V rail.

**Component diagram**: See product page / lab photo pending.

**Links**:

- [Adafruit product page and specs](https://www.adafruit.com/product/155)
- [Adafruit Servos guide (wiring + code)](https://learn.adafruit.com/adafruit-arduino-lesson-14-servo-motors)
- [Arduino Servo library reference](https://docs.arduino.cc/libraries/servo/)

**Buy**:

- [Adafruit #155 — Standard servo TowerPro SG-5010](https://www.adafruit.com/product/155)

**Use instructions/Tutorials**: Connect brown to ground, red to a 5V supply (share ground with your board), orange to a PWM pin. Send a pulse every ~20 ms: ~1.0 ms = one extreme, 1.5 ms = centre, ~2.0 ms = the other extreme. The Arduino `Servo` library abstracts this into `write(angle)`. If you don't get a full sweep, widen the pulse range toward 0.75-2.25 ms. Never mechanically force the horn while powered.

**Arduino IDE sketches**: Built-in `Servo` library.

```
#include <Servo.h>
Servo s;
void setup() { s.attach(9); }          // orange wire to D9
void loop() {
  s.write(0);   delay(1000);            // one end
  s.write(90);  delay(1000);            // centre
  s.write(180); delay(1000);            // other end
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Weight 47 g; dimensions 40.6 × 20.5 × 38 mm; 25-tooth spline; dead-band width ~1 µs; operating range 0-55°C; includes three horns and mounting hardware. Rated 4.8-6V — do not exceed 6V. For driving many servos or offloading PWM timing, pair with a PCA9685 16-channel servo driver over I2C.
![Standard Servo TowerPro SG-5010 (Adafruit 155)](standard-servo-towerpro-sg-5010-adafruit-155-1.jpg)

![Standard Servo TowerPro SG-5010 (Adafruit 155)](standard-servo-towerpro-sg-5010-adafruit-155-2.jpg)
