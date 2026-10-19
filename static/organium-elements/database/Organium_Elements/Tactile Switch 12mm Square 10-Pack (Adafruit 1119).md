# Tactile Switch 12mm Square 10-Pack (Adafruit 1119)

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

**Principle**: A larger momentary tactile switch. A metal dome under the square button collapses when pressed, bridging the internal contacts and shorting the terminals; releasing snaps it back open with a firm click. Normally open, non-latching — it conducts only while held. Same mechanism as a small 6 mm tact switch, just a bigger, more satisfying button top and a sturdier body.

**Function**: Reports a press as a contact closure. Normally open, momentarily closed while pressed. Four legs form two internally-connected pairs; you wire two legs that span the contact.

**Voltage**: Passive contact — no logic of its own. Wire between an input pin and GND (or Vcc) with a pull resistor so the pin reads a clean HIGH/LOW at your board's logic level (3.3 V or 5 V). Small-signal contacts — logic-level currents only, not power switching.

**Typical use**:
- Big, confident performance buttons — start/stop, scene launch, tap tempo — that can be hit without looking down.
- The "GO" button on a kiosk or plinth: a visitor finds and presses a 12 mm cap reliably where they would miss a 6 mm one.

**Good for**:
- Larger 12 mm square top — easy to hit, feels deliberate, takes a coloured cap nicely
- Firm, positive click; better for "hero" buttons than the tiny 6 mm switches
- Standard Omron B3F-40XX footprint — common CAD parts, caps, and libraries
- 10 per pack, cheap, breadboard- and PCB-friendly

**Bad for**:
- Panel mounting on a finished front panel — still a PCB part with no threaded bushing; use a dedicated panel-mount / arcade button for enclosure fronts
- Very dense layouts — 12 mm each eats board space fast
- Switching real loads — low-current contacts, not for motors/relays directly
- Clean single events without debouncing — it bounces like any mechanical switch; debounce in hardware or code

**Mini Jack connection diagram**: N/A — digital contact switch, not a bus device. As a gate/trigger on a jack panel: one leg to a mono TS jack tip, the other to sleeve (ground); pressing shorts tip to sleeve for a momentary gate. Pins: 4 legs = 2 internally-paired contacts; the two legs on the SAME side are joined, so wire two diagonally-opposite legs (one from each pair) to be sure you span the switch.

**Component diagram**:

![Tactile button pinout — the four legs are two terminals, and which pairs are joined inside](diagram-button-pinout.svg)

**Links**: [Adafruit product page + datasheet](https://www.adafruit.com/product/1119) · [Omron B3F-40XX datasheet](https://www.adafruit.com/product/1119) · [Arduino Button + Debounce tutorial](https://docs.arduino.cc/built-in-examples/digital/Debounce/)

**Buy**: [Adafruit #1119](https://www.adafruit.com/product/1119)

**Use instructions/Tutorials**: Wire one leg to a digital input and the diagonal leg to GND, enable `INPUT_PULLUP`: pin reads HIGH at rest, LOW when pressed. Debounce ~20–50 ms in code or with a small RC filter. On a breadboard, straddle the switch across the centre gap. If it reads always-pressed, you likely wired two legs of the same (already-shorted) pair — move to a diagonal leg. Fits standard 12 mm button caps for colour-coding a panel.

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

**Extra and gratuitous information and images**: 12 mm square × 6 mm tall body, 4 legs (two internally-paired contacts). Omron B3F-40XX footprint (EAGLE part `switch-omron:B3F-40XX`). Normally open, momentary. Small-signal contacts — logic-level use only. 10 switches per pack.
*Image: lab photo pending — component is in-hand; see Buy link for the product photo.*
