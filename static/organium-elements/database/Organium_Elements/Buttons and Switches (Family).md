# Buttons and Switches (Family)

Category: INPUTS
Modality: TACTILE
Subtype: PRESS
Type: Sensor
Added: August 14, 2026
Senses: Finger press or thrown lever (contact closure)
Actuates: N/A
Connection: Digital (contact closure; needs a pull-up or pull-down)
Status: Done
Published: Yes

**Principle**: All of these do one thing — they make or break an electrical contact. None of them generates a signal on their own. A closed contact is just a wire; your microcontroller only sees a level because a **pull-up or pull-down resistor** holds the pin at a known voltage when the contact is open. Leave the resistor out and the pin floats, reading noise.

**The one distinction that matters — momentary vs latching**:

- **Momentary** (tactile buttons): closed only while you hold it, springs back open. The switch reports an *event*. Your code has to remember state if you want an on/off toggle, and it has to **debounce** — the metal contacts bounce for a few milliseconds and produce a burst of spurious transitions.
- **Latching** (slide, toggle, rocker): stays where you put it. The switch *is* the state, and the position is visible in the room without powering anything. No debounce concerns in practice.

Choosing wrongly is the usual beginner bug: a momentary button wired as a power switch, or a latching switch polled for "was it just pressed?".

| Part | Type | Notes |
|---|---|---|
| Tactile button, 6 mm | Momentary | The small square one. 4 legs, internally paired — the pairs are the *same* terminal, so wire across the pair that is NOT already connected (check with a meter, or wire diagonally) |
| Tactile switch, 12 mm square | Momentary | Bigger target, better feel for panel-mounted or performance use |
| Slide switch | Latching | Holds its position; use for power and mode selection |

See the dedicated pages for the two tactile SKUs. Related but distinct: **Footswitch** (a momentary switch you operate with your foot, hands-free) and **Tilt switch** (closes on orientation, not on touch).

**Voltage**: Passive and logic-level agnostic — works at 3.3 V or 5 V. The switch never sets the voltage; the pull resistor does.

**Typical use**:
- The panel controls of an instrument or installation: momentary for triggers and mode-cycling, latching for power and standing state.
- Teaching digital input — pull-up wiring and debouncing are the first two things a physical-computing student meets, and these are what they meet them on.

**Good for**:
- Unambiguous, tactile, zero-latency input that anyone understands without instruction.
- Cheap and robust; a bag of them covers most prototypes.
- Latching switches make state legible in the room, which matters for installation work.

**Bad for**:
- No pressure, position or velocity — it is one bit. For continuous touch use a **Ribbon - Linear SoftPot**, a **Trill** sensor or an **FSR**.
- Momentary contacts bounce; unfiltered they will fire several times per press.
- The 4-leg tactile footprint is easy to wire wrong (see the note above).

**Mini Jack connection diagram**: Contact closure — wire one side to ground and the other to a microcontroller input with `INPUT_PULLUP` enabled; the pin then reads LOW when pressed. Over minijack, use tip = signal and sleeve = ground.

**Component diagram**:

![Tactile button pinout — the four legs are two terminals, and which pairs are joined inside](diagram-button-pinout.svg)

![Slide switch (SPDT) pinout — the middle pin is the common, and the two ways to use it](diagram-switch-pinout.svg)

**Use instructions/Tutorials**: Enable the internal pull-up (`pinMode(pin, INPUT_PULLUP)`) rather than adding an external resistor — pressed then reads LOW, which is inverted but free. Debounce in software by ignoring further transitions for ~20 ms after the first, or by requiring the reading to be stable across two polls. For a latching switch just read the level; no debounce needed.

**Arduino IDE sketches**: `File > Examples > 02.Digital > Debounce` and `DigitalInputPullup`.

**Relevant software files**: —

**Extra and gratuitous information and images**: The photo shows the three together on a mini breadboard — the black slide switch (latching) above the 12 mm and 6 mm tactile buttons (momentary). Family page created 2026-08-14; the two tactile SKU pages remain for their specific specs and buy links.

![Buttons and Switches (Family)](buttons-and-switches-family-1.jpg)
