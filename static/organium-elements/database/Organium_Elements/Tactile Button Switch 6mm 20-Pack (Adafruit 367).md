# Tactile Button Switch 6mm 20-Pack (Adafruit 367)

Category: INPUTS
Modality: TACTILE
Subtype: PRESS
Type: Sensor
Added: July 25, 2026
Senses: Momentary finger press (on/off contact closure)
Actuates: N/A
Connection: Digital (2-terminal momentary contact; 4 legs internally paired)
Status: Done
Voltage: Passive switch — logic-level agnostic; use with 3.3 V or 5 V and a pull resistor
Published: Yes

**Principle**: A momentary tactile ("tact") switch. Under the plastic button is a springy metal dome. At rest the two contact pairs are open; press the button and the dome collapses to bridge them, shorting the terminals. Release and the dome snaps back open — with the characteristic tactile "click." Not a latching switch: it conducts only while held.

**Function**: Reports a press as an electrical contact closure. Normally open; momentarily closed while pressed. The four legs are two pairs of two — each pair is internally connected, so you only ever wire two diagonally-opposite legs.

**Voltage**: The switch itself is passive and carries no logic — it just makes/breaks a contact. Wire it between an input pin and GND (or Vcc) with a pull resistor so the pin reads a clean HIGH/LOW at whatever logic level your board uses (3.3 V or 5 V). Small-signal contacts; keep it to logic-level currents, not power switching.

**Typical use**:
- Note and trigger buttons on a step sequencer, drum pad or synth panel, and the menu, mode and tap-tempo buttons beside them.
- Anywhere a board needs a small, cheap digital input — a limit or bump switch, a manual reset, a prototype's "home" button.

**Good for**:
- Dirt cheap in bulk (20 per pack) — buy a fistful for a whole panel of buttons
- Solid tactile click; unambiguous press feel
- Standard Omron B3F-10XX footprint, so libraries, CAD parts, and caps are everywhere
- Breadboard-friendly for teaching and quick prototypes

**Bad for**:
- Panel mounting on a finished enclosure — these are PCB parts with no threaded bushing; use a proper panel-mount button for a front panel
- High force / heavy performance abuse — small dome, not built for hard drumming; use arcade buttons for that
- Clean signals without debouncing — mechanical bounce will fire multiple events per press unless you debounce in hardware or code
- Switching real loads (motors, LEDs at power) — low-current contacts only

**Mini Jack connection diagram**: N/A — digital contact switch, not a bus device. It can, however, act as a gate/trigger source on a jack panel: wire one leg to a mono TS jack tip and the other to sleeve (ground); pressing shorts tip to sleeve for a momentary gate. Pins: 4 legs = 2 internally-paired contacts; the two legs on the **same side are joined** to each other, and the switch sits between the two sides — so wire two diagonally-opposite legs (one from each pair) to be sure you span it. Wire a same-side pair by mistake and the circuit is permanently closed; turning the switch a quarter turn fixes it. See the component diagram below.

**Component diagram**:

![Tactile button pinout — the four legs are two terminals, and which pairs are joined inside](diagram-button-pinout.svg)

**Links**: [Adafruit product page + datasheet](https://www.adafruit.com/product/367) · [Omron B3F series datasheet](https://www.adafruit.com/product/367) · [Arduino Button + Debounce tutorial](https://docs.arduino.cc/built-in-examples/digital/Debounce/)

**Buy**: [Adafruit #367](https://www.adafruit.com/product/367)

**Use instructions/Tutorials**: Wire one leg to a digital input and the diagonal leg to GND, then enable the pin's internal pull-up (`INPUT_PULLUP`): the pin reads HIGH at rest and LOW when pressed. Debounce with a ~20–50 ms software delay or a small RC filter. On a breadboard, straddle the switch across the centre gap so each contact pair lands in a different half. If your reads seem always-pressed, you probably wired two legs of the SAME pair (already shorted) — move to a diagonal leg.

**Arduino IDE sketches**: No library needed (or use the `Bounce2` library for clean debouncing).
```cpp
const int BTN = 2;
void setup() {
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
}
void loop() {
  if (digitalRead(BTN) == LOW) {   // pressed = LOW with pull-up
    Serial.println("pressed");
    delay(150);                     // crude debounce
  }
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 6.0 × 6.0 × 5.0 mm body, 4 legs (two internally-paired contacts). Omron B3F-10XX footprint (EAGLE part `switch-omron:B3F-10XX`). Normally open, momentary. Small-signal contacts — treat as logic-level only. 20 switches per pack.
*Image: lab photo pending — component is in-hand; see Buy link for the product photo.*
