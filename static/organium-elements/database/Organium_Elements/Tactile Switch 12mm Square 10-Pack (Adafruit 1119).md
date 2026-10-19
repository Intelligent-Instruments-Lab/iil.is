# Tactile Switches — 6mm & 12mm (Momentary)

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

**Principle**: A momentary tactile ("tact") switch. Under the button top is a springy metal dome; pressing collapses it so it bridges the internal contacts and shorts the terminals, and releasing snaps it back open with the characteristic click. Normally open and non-latching — it conducts only while held. Both sizes work this way; the 12 mm has a bigger, firmer top and a sturdier body, the 6 mm is the small square one you can fit a dozen of on a panel.

**Function**: Reports a press as an electrical contact closure. The four legs are **two internally-connected pairs**, so you wire two legs that span the switch rather than two that are already joined.

**The two sizes**:

| | 6 mm (#367) | 12 mm (#1119) |
|---|---|---|
| Button top | small square, 6 × 6 × 5 mm | 12 mm square × 6 mm tall, takes a coloured cap |
| Footprint | Omron B3F-10XX | Omron B3F-40XX |
| Pack | 20 | 10 |
| Feel | light click | firm, deliberate |
| Reach for it when | a panel needs many buttons, or a board needs a cheap input | the button is a "hero" control, or a stranger has to find it |

Electrically and in code they are the same part: same pull-up wiring, same debouncing, same diagonal-leg rule.

**Voltage**: Passive contacts — the switch carries no logic of its own. Wire between an input pin and GND (or Vcc) with a pull resistor so the pin reads a clean HIGH/LOW at your board's logic level, 3.3 V or 5 V. Small-signal contacts: logic-level currents only, never power switching.

**Typical use**:
- Note and trigger buttons on a step sequencer, drum pad or synth panel, and the menu, mode and tap-tempo buttons beside them — usually 6 mm, because there are many of them.
- The one button that has to be hit without looking, or found by a visitor on a plinth: start/stop, scene launch, "GO". That is what the 12 mm is for.

**Good for**:
- Cheap in bulk and instantly breadboardable; the standard first digital input for teaching
- Solid, unambiguous click in both sizes
- Standard Omron footprints, so CAD parts, caps and libraries are everywhere
- 12 mm takes a coloured cap, which is the easy way to colour-code a panel

**Bad for**:
- Panel mounting on a finished enclosure — both are PCB parts with no threaded bushing; use a proper panel-mount or arcade button for a front panel
- Heavy performance abuse — a small dome is not built for hard drumming
- Clean single events without debouncing — mechanical bounce fires several transitions per press unless you debounce in hardware or code
- Switching real loads such as motors or relays; low-current contacts only
- Dense layouts, in the 12 mm case — each one eats board space fast

**Mini Jack connection diagram**: N/A — a digital contact switch, not a bus device. It can act as a gate or trigger on a jack panel: one leg to a mono TS jack tip, the other to sleeve (ground), so pressing shorts tip to sleeve for a momentary gate. Pins: 4 legs = 2 internally-paired contacts, and **the two legs on the same side are joined to each other**, with the switch sitting between the sides — so wire two diagonally-opposite legs. Wire a same-side pair by mistake and the circuit is permanently closed; rotating the switch a quarter turn fixes it.

**Component diagram**:

![Tactile button pinout — the four legs are two terminals, and which pairs are joined inside](diagram-button-pinout.svg)

**Links**: [Adafruit #1119 — 12 mm](https://www.adafruit.com/product/1119) · [Adafruit #367 — 6 mm](https://www.adafruit.com/product/367) · [Arduino Button + Debounce tutorial](https://docs.arduino.cc/built-in-examples/digital/Debounce/)

**Buy**: [Adafruit #1119 — Tactile Switch 12 mm Square (10-pack)](https://www.adafruit.com/product/1119) · [Adafruit #367 — Tactile Button Switch 6 mm (20-pack)](https://www.adafruit.com/product/367)

**Use instructions/Tutorials**: Wire one leg to a digital input and the diagonal leg to GND, then enable the pin's internal pull-up (`INPUT_PULLUP`): the pin reads HIGH at rest and LOW when pressed. Debounce with a ~20–50 ms software delay or a small RC filter. On a breadboard, straddle the switch across the centre gap so each contact pair lands in a different half. **If it reads always-pressed, you wired two legs of the same (already-shorted) pair** — move to a diagonal leg. The 12 mm fits standard 12 mm caps for colour-coding.

**Arduino IDE sketches**: No library needed (or `Bounce2` for clean edges).
```cpp
const int BTN = 3;
bool last = HIGH;
void setup() {
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
}
void loop() {
  bool now = digitalRead(BTN);
  if (last == HIGH && now == LOW) Serial.println("pressed");  // falling edge
  last = now;
  delay(10);   // simple debounce
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 6 mm = 6.0 × 6.0 × 5.0 mm body, Omron B3F-10XX footprint, 20 per pack. 12 mm = 12 mm square × 6 mm tall, Omron B3F-40XX footprint, 10 per pack. Both normally open and momentary, four legs forming two internally-paired contacts, small-signal contacts for logic-level use only.
*Image: lab photo pending — both sizes are in-hand and appear together on the Buttons and Switches family page.*
