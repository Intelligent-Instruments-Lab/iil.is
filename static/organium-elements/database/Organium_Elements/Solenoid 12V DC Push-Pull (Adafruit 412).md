# Solenoid 12V DC Push/Pull (Adafruit #412)

Category: OUTPUTS
Modality: MOTION
Subtype: SOLENOID
Type: Actuator
Added: July 25, 2026
Senses: N/A
Actuates: Linear push/pull motion of a captive steel plunger; strike, tap, latch, kick
Connection: PWM / digital via transistor driver (12 V coil, not directly MCU-driven)
Status: Done
Voltage: 12 V DC
Published: Yes

**Principle**: A coil of enamelled wire wound around a hollow bobbin. When current flows, the coil becomes an electromagnet and drags a ferromagnetic steel plunger into the core. A return spring pushes the plunger back out when the current stops, so a single pulse gives you one crisp "punch" and release. This is the same actuator family as door latches and pinball flippers — pure electromagnetic force, no gears.

**Function**: Converts an electrical pulse into a short, forceful linear stroke. It does not hold a position proportionally — it is essentially binary (energised = pulled in, off = spring-returned). Travel is 5.5 mm; starting force is ~0.5 N, rising to a 5.0 N retentive (holding) force once the plunger is seated.

**Voltage**: 12 V DC coil. Draws ~300 mA continuous with a ~250 mA inrush surge; coil resistance ~40 ohm, wound in 24 AWG. Logic level is not applicable directly — the coil needs its own 12 V rail and a transistor/MOSFET driver switched by a 3.3 V or 5 V microcontroller pin. Lower drive voltages give weaker, slower, mushier action; do not run from a 9 V battery.

**Typical use**:
- Robotic percussion — striking a drum head, a bell, a woodblock or a found object for a self-playing acoustic instrument.
- A mechanical knock or a released catch: a wall that taps back when you approach, a trapdoor, a ball-drop gate. Short pulses only — it heats fast on sustained duty.

**Good for**:
- Fast, satisfying, genuinely acoustic hits — far more percussive than a servo tap
- Cheap and rugged; no firmware beyond "pin HIGH for a few ms"
- Great teaching example of driving an inductive load (transistor + diode + separate supply)
- Repeatable timing — good for sequenced robotic drumming

**Bad for**:
- Anything proportional or positional — it is on/off, not a linear actuator you can hold mid-stroke
- Continuous duty: the coil heats quickly and can cook itself if left energised. Keep pulses short and duty low
- Battery/portable projects — 300 mA at 12 V is thirsty; not a 9 V-battery part
- Direct microcontroller drive — the pin cannot source the coil current, and back-EMF will destroy the MCU without a flyback diode
- Quiet applications — the strike and spring return are audible clacks (which is often the point, but not always)

**Mini Jack connection diagram**: N/A — this is a power actuator, not a jack-patchable CV/audio part. It is wired to a driver board: coil lead A to +12 V, coil lead B to the drain/collector of a MOSFET/transistor, source/emitter to ground, gate/base driven through a resistor from the MCU pin, and a flyback (kickback) diode across the coil, cathode to +12 V. The two coil leads are non-polarised (it is just a coil); the flyback diode is what has polarity.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page + wiring diagram](https://www.adafruit.com/product/412) · [Adafruit "Controlling a solenoid" learn guide](https://learn.adafruit.com/adafruit-arduino-lesson-13-dc-motors) · [Wikipedia: Solenoid](https://en.wikipedia.org/wiki/Solenoid)

**Buy**: [Small push-pull solenoid 12 VDC — Adafruit #412](https://www.adafruit.com/product/412)

**Use instructions/Tutorials**: Give the solenoid its own 12 V supply (do not power it from the MCU's 5 V). Use a logic-level N-channel MOSFET (e.g. IRLB8721) or a TIP120 Darlington: MCU pin → gate resistor (100–220 ohm) → gate, source to common ground (tie MCU ground and 12 V ground together), drain to one coil lead, other coil lead to +12 V. Put a 1N4001 (or faster 1N4148 for crisp percussion) flyback diode across the coil, band (cathode) toward +12 V. In code, pulse the pin HIGH for 10–50 ms then LOW — long enough to seat the plunger, short enough not to overheat. For loud strikes, mount the plunger tip so it swings freely and hits the surface at the end of travel.

**Arduino IDE sketches**: No dedicated library needed — plain `digitalWrite`.
```cpp
const int SOL = 9;              // MCU pin -> MOSFET gate
void setup() { pinMode(SOL, OUTPUT); }
void loop() {
  digitalWrite(SOL, HIGH);      // energise coil
  delay(20);                    // 20 ms strike pulse
  digitalWrite(SOL, LOW);       // release, let spring return
  delay(480);                   // rest — keep duty cycle low
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 12 V DC, ~300 mA continuous / ~250 mA inrush, coil resistance ~40 ohm, 24 AWG winding. Stroke 5.5 mm. Starting force ~0.5 N, retentive/holding force 5.0 N. Body length ~30 mm, weight ~39 g (1.4 oz). Captive armature with return spring (push or pull configurations). Non-polarised coil leads. Rated for intermittent duty — the datasheet-style rule of thumb is to keep it energised only as long as needed and let it cool between hits.
![Solenoid 12V DC Push-Pull (Adafruit 412)](solenoid-12v-dc-push-pull-adafruit-412-1.jpg)