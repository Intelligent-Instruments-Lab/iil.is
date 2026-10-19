# Analog Feedback Standard Servo (Adafruit 1404)

Category: OUTPUTS
Modality: MOTION
Subtype: SERVO
Type: Actuator, Sensor
Added: July 25, 2026
Senses: Its own shaft angle — the internal position potentiometer's wiper is brought out as an analog voltage
Actuates: Angular position (~180° rotation of an output shaft), positional holding torque
Connection: PWM (control) + Analog (feedback)
Status: Done
Voltage: 4.8 - 6V DC
Published: Yes

**Principle**: A standard positional servo — motor, gear train, and a potentiometer that tracks the output shaft for the internal control loop — but with one addition: the potentiometer wiper is tapped and routed out on a fourth wire. So besides commanding an angle with PWM, you can *read* the servo's actual angle as an analog voltage. That closes the loop in your own code: you know where the horn really is, not just where you told it to go.

**Function**: Moves and holds its horn to a commanded angle over roughly 180°, and simultaneously outputs an analog voltage proportional to that angle. Torque 3.8 kg·cm at 4.8V (5.0 kg·cm at 6V); speed 0.22 s/60° at 4.8V (0.18 s/60° at 6V). The feedback wire's voltage swings across a portion of the supply rail as the shaft turns.

**Voltage**: 4.8 - 6V DC. PWM control input is 3.3/5V-tolerant. The feedback line is a raw potentiometer wiper referenced to the servo's supply — read it on a microcontroller ADC that shares the same ground; if the servo runs at 6V and your ADC is 3.3V, scale or divide so you never exceed the ADC's input range.

**Typical use**:
- Mechanisms that have to confirm they arrived — the feedback wire reports the true horn angle, so code can tell a completed move from a blocked one (a struck object stopping the horn, a jammed joint).
- Record-then-replay gestures: back-drive the horn by hand while logging the feedback, then play the movement back through the drive.

**Good for**:

- **Knowing where the shaft actually is** — the one servo that reports back, no encoder needed
- Detecting stalls, collisions or blocked motion (commanded angle diverges from feedback)
- Recording physical gestures by hand and replaying them
- Building your own outer control/PID loop in software for smoother or safer motion
- Standard 3-pin drive plus one extra wire — otherwise a drop-in for any standard servo

**Bad for**:

- Simple projects that don't use the feedback — you pay for a wire you'd ignore (use #155)
- High-precision metrology — the feedback pot is noisy and only roughly linear; expect to calibrate a lookup
- Continuous rotation — still a ~180° positional servo
- Sharing a supply with a clean ADC — motor noise rides on the feedback line; filter and average
- Heavy or shock loads — nylon gears, standard-grade

**Mini Jack connection diagram**: N/A — 3-pin servo header plus a 4th feedback wire (not jack-patchable): Brown = GND, Red = +4.8-6V (V+), Orange/Yellow = PWM signal, White = analog feedback (potentiometer wiper). Drive the signal from a PWM pin; read the white wire on an ADC pin that shares ground with the servo supply.

**Component diagram**: See product page / lab photo pending.

**Links**:

- [Adafruit product page and specs](https://www.adafruit.com/product/1404)
- [Adafruit analog-feedback servos guide (calibration + code)](https://learn.adafruit.com/analog-feedback-servos)
- [Arduino Servo library reference](https://docs.arduino.cc/libraries/servo/)

**Buy**:

- [Adafruit #1404 — Analog Feedback Standard Servo](https://www.adafruit.com/product/1404)

**Use instructions/Tutorials**: Wire the three standard leads plus the white feedback wire to an analog input. First calibrate: sweep the servo across its range with the drive attached, and record the min and max `analogRead()` values at known angles — these become your map endpoints. In use, command an angle with the `Servo` library and `analogRead()` the feedback to confirm the real position; a large, persistent gap means the horn is blocked. To record a gesture, detach or de-power the drive signal, move the horn by hand, log feedback over time, then replay those angles. Default 1-2 ms pulses may not give a full 180° — widen toward 0.75-2.25 ms if needed.

**Arduino IDE sketches**: Built-in `Servo` library plus `analogRead()`.

```
#include <Servo.h>
Servo s;
const int fb = A0;                 // white feedback wire
int fbMin = 100, fbMax = 500;      // fill from your calibration sweep
void setup() { s.attach(9); Serial.begin(9600); }
void loop() {
  s.write(120);                     // command an angle
  int a = map(analogRead(fb), fbMin, fbMax, 0, 180);
  Serial.println(a);                // actual measured angle
  delay(50);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Weight 48.8 g; dimensions 39.3 × 19.4 × 38.7 mm; nylon-fibre shell and gears; dual ball bearings; digital internal control circuitry. Feedback is the internal pot wiper, so its exact voltage span and linearity vary unit to unit — always calibrate min/max and average several reads to fight motor noise. Rated 4.8-6V; keep the feedback voltage within your ADC's range.
![Analog Feedback Standard Servo (Adafruit 1404)](analog-feedback-standard-servo-adafruit-1404-1.jpg)

**Accessories**: the horns and disc photographed for the SG-5010 entry fit this servo too — standard-size servo splines are interchangeable.

![Servo horns and mounting accessories](standard-servo-towerpro-sg-5010-adafruit-155-2.jpg)
