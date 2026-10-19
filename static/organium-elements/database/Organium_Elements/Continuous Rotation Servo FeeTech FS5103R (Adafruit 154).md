# Continuous Rotation Servo FeeTech FS5103R (Adafruit 154)

Category: OUTPUTS
Modality: MOTION
Subtype: SERVO
Type: Actuator
Added: July 25, 2026
Senses: N/A
Actuates: Continuous rotation — direction and speed of the output shaft (both directions)
Connection: PWM
Status: Done
Voltage: 4.8 - 6V DC
Published: No
Hidden: the lab does not have this servo - the FeeTech was out of stock and the Batan D125F arrived instead (see the analog-feedback servo entry)

**Principle**: Mechanically a standard servo, but modified: the position potentiometer is disconnected from the output shaft and fixed at centre, and the end-stops are removed. Now the internal control loop can never "reach" its target, so the PWM pulse no longer sets an angle — it sets motor *speed and direction*. A 1.5 ms pulse reads as "already centred" so the motor stops; pulses above or below spin it forward or backward, faster the further from centre.

**Function**: Rotates its shaft continuously in either direction at a commanded speed. 1.5 ms pulse = stop; ~2.0 ms = full speed one way; ~1.0 ms = full speed the other. Torque 3 kg·cm at 4.8V, 3.2 kg·cm at 6V; free speed roughly 0.18 s/60° (≈ 50-60 RPM class, not a high-RPM motor).

**Voltage**: 4.8 - 6V DC (5V works best). Control input is a standard 3.3/5V-tolerant PWM signal; accepts pulses across ~500-2500 µs. Motor current spikes on start and stall — use a supply independent of the logic regulator.

**Typical use**:

- Slow, continuously turning mechanisms — turntables, mobiles, banners, and reels that wind and unwind string or ribbon.
- A motor whose speed and direction come straight from one pin with no driver board, including the classic two-servo wheeled rover.

**Good for**:

- **A speed-controllable motor with no motor driver** — the servo's own electronics and H-bridge are inside
- Dead simple to command: the same `Servo` library and 3-pin lead as a positional servo
- Good for robot wheels — bolt on a wheel horn and go
- Bidirectional and self-contained; no direction-pin logic to wire
- Cheap, standard 25-tooth spline, universally available horns

**Bad for**:

- Any job needing a known angle or exact turn count — there is no position feedback at all
- Precise or repeatable speed — the stop point and speed drift; expect to trim and calibrate
- High-RPM or high-torque loads — it's slow and plastic-geared
- Holding a static load — with no feedback it won't actively hold position
- Newer units lack the calibration access hole, so the neutral point can be fiddly to zero

**Mini Jack connection diagram**: N/A — 3-pin servo header (not jack-patchable): Brown/Black = GND, Red = +4.8-6V (V+), Orange/White = PWM signal. Drive the signal wire from a PWM pin; 1.5 ms holds it stopped. Share ground with the controller; power V+ from a dedicated rail.

**Component diagram**: See product page / lab photo pending.

**Links**:

- [Adafruit product page and specs](https://www.adafruit.com/product/154)
- [Adafruit continuous-rotation servo guide](https://learn.adafruit.com/using-a-servo-motor)
- [Arduino Servo library reference](https://docs.arduino.cc/libraries/servo/)

**Buy**:

- [Adafruit #154 — Continuous Rotation Servo FeeTech FS5103R](https://www.adafruit.com/product/154)

**Use instructions/Tutorials**: Wire like a normal servo (ground, 5V, signal). Send `write(90)` to stop — if it creeps, nudge the value (e.g. 88-92) or use the trim pot to find true neutral. `write(0)` and `write(180)` give full speed each way; intermediate values scale speed. Using `writeMicroseconds()` (1500 µs = stop) gives finer control than `write()`. It will not tell you how far it has turned — add an external encoder or timing if you need distance.

**Arduino IDE sketches**: Built-in `Servo` library.

```
#include <Servo.h>
Servo m;
void setup() { m.attach(9); }
void loop() {
  m.writeMicroseconds(2000); delay(1500); // forward
  m.writeMicroseconds(1500); delay(1000); // stop
  m.writeMicroseconds(1000); delay(1500); // reverse
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Weight ~40 g; dimensions 37 × 54 × 20 mm; 25-tooth spline; 30 cm lead; four horns included. Torque 3-3.2 kg·cm; pulse range 500-2500 µs, 1.5 ms = stop. Note the neutral/stop point varies between units and drifts with temperature — always calibrate stop in software. For distance/position, pair with a wheel encoder.
*Image: lab photo pending — component is in-hand; see Buy link for the product photo.*
