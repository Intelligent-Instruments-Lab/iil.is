# Hall Effect Sensor (US5881LUA)

Category: INPUTS
Modality: MAGNETIC / EMF
Type: Sensor
Added: October 3, 2024 2:52 PM
Senses: Whether a magnet is close — specifically a **south** pole facing the printed side
Actuates: N/A
Connection: Three legs — supply, ground, one digital output. No bus, no address, no library
Status: Done
Voltage: 3.5–24 V supply; the output's logic level is set by the pull-up, not by the supply
Published: Yes

![Hall effect sensor on a mini breadboard](hall-effect-sensor-1.jpg)

**Principle**: Pass a current through a thin slab of semiconductor and put it in a magnetic field, and the field pushes the moving charges to one side — a small voltage appears across the slab, at right angles to the current. That is the **Hall effect**, and it is the common way to notice a magnet with nothing moving and nothing touching.

This part does not hand you that voltage. Inside, it is amplified and fed to a comparator, so what comes out is not a measurement but a **decision**: a magnet is near, or it is not. It is a switch you operate through a wall — no contacts to wear out, nothing to corrode, nothing visible from outside the instrument.

**It answers to one magnetic pole only.** Bring the **south** pole of a magnet towards the printed face and the output switches; the north pole does nothing whatsoever. This is what *unipolar* means, and it is the first thing that goes wrong with this sensor — the magnet is simply the wrong way round. Turn it over before suspecting anything else.

**Function**: A three-legged TO-92 part. Hold it with the printed face towards you and the legs pointing down: **pin 1 (left) is the supply, pin 2 (middle) is ground, pin 3 (right) is the output.**

That output is **open-drain** — it can pull its pin down to ground, but it cannot drive it high. Left on its own it floats, and a floating pin reads convincing nonsense. It needs a **10 kΩ pull-up resistor from the output to your logic supply**; then it sits HIGH with no magnet near and goes LOW while a south pole is in range. One `digitalRead`, no library, no bus, no address.

The two switching thresholds are deliberately different. It turns on at about **25 mT** and does not release until the field has fallen to about **20 mT** — roughly **4 mT of hysteresis**. That gap is what stops the output chattering when a magnet hovers right at the edge of its range.

**Voltage**: **3.5 V to 24 V**, so it is equally at home on a 3.3 V rail, a 5 V rail, or straight off the 12 V supply a mechanism already has. Because the output is open-drain, **the logic level is set by whatever you pull up to, not by the supply** — run the sensor from 12 V, pull its output up to 3.3 V, and an ESP32 can read it safely. Very few sensors let you separate the two like that.

It draws about 2.5 mA, and the output can sink up to 50 mA — enough to drive a small LED directly, with its series resistor, instead of going through the microcontroller at all.

**Typical use**:
- **Position and end-stops.** A magnet on the moving part, the sensor fixed beside its travel. The mechanism never touches the sensor, so nothing wears and nothing needs aligning precisely.
- **Hidden switches.** Mount it behind wood, fabric, acrylic or a 3D print and wave a magnet at the outside. Nothing is visible, nothing can be jammed with dust, and the surface stays unbroken.
- **Counting rotation.** A magnet on the rim of a wheel and a pulse each time it passes. It will switch up to 10 kHz, far faster than anything mechanical turning in front of it.
- **Keys and levers that get knocked about**, where a mechanical switch would eventually fail.

**Good for**:
- Contactless and sealable — no contacts to bounce, wear or corrode
- Reading straight through any non-ferrous material
- Costing one digital pin and no code to speak of
- A wide supply voltage, with a logic level chosen independently of it
- Fast motion — up to 10 kHz

**Bad for**:
- Telling you **how near** the magnet is. This is a switch, not a measurement. For field strength and direction use the MLX90393; for the angle of a rotating shaft, the AS5600.
- North poles. It is unipolar: south only.
- Weak or distant magnets — it wants about 25 mT at its face, which is a few millimetres away with a small neodymium disc.
- Being read without a pull-up, which produces readings that look plausible and mean nothing.
- Detecting objects in general. It detects *magnets*, not proximity — anything you want to sense has to carry one.

**Mini Jack connection diagram**: Three conductors is exactly what a **TRS minijack** carries, so this sensor travels well on a jack lead when it has to sit away from the host board: **tip = output, ring = supply, sleeve = ground**, with the pull-up resistor at the host end rather than out at the sensor. Wire every such lead the same way round, or a sensor plugged into the wrong socket will meet its supply on the output pin.

**Component diagram**: — not yet drawn. In words: printed face towards you, legs down — **1 VDD (left) · 2 GND (middle) · 3 OUT (right)**.

**Links**: [Melexis US5881 datasheet](https://cdn-shop.adafruit.com/datasheets/US5881_rev007.pdf) · [Adafruit product page](https://www.adafruit.com/product/158)

**Buy**: [Hall Effect Sensor US5881LUA — Adafruit 158](https://www.adafruit.com/product/158)

**Use instructions/Tutorials**: Three wires and one resistor. Pin 1 to 3.3 V or 5 V, pin 2 to ground, pin 3 to a digital input with **10 kΩ from that pin up to the same logic supply**. If your board offers an internal pull-up, `INPUT_PULLUP` replaces the resistor entirely and the part needs no external components at all. Then bring the south pole of a magnet towards the printed face from a few millimetres and watch the pin fall to LOW. If nothing happens, flip the magnet.

**Arduino IDE sketches**: No library — it is a digital input.
```cpp
const int HALL = 2;              // any digital pin

void setup() {
  Serial.begin(115200);
  pinMode(HALL, INPUT_PULLUP);   // replaces the external 10k
}

void loop() {
  // open drain: LOW while a south pole is in range, HIGH otherwise
  Serial.println(digitalRead(HALL) == LOW ? "magnet" : "—");
  delay(50);
}
```
To count a passing magnet rather than poll for it, put it on an interrupt instead:
```cpp
attachInterrupt(digitalPinToInterrupt(HALL), count, FALLING);
```

**Relevant software files**: — none needed.

**Extra and gratuitous information and images**: Melexis **US5881LUA**, a unipolar Hall-effect switch in a TO-92 package with an open-drain output. Supply **3.5–24 V** (28 V absolute maximum), supply current **2.5 mA typical**, output sink **50 mA maximum**, output saturation **0.4 V at 20 mA**. Operate point **25 mT typical** (15 mT minimum, 30 mT maximum), release point **20 mT typical**, hysteresis **4.3 mT typical**. Maximum switching frequency **10 kHz**; operating temperature −40 to 150 °C.

Magnetic flux density is given here in millitesla, while magnet suppliers and older datasheets usually quote gauss: **1 mT = 10 gauss**, so the 25 mT operate point is 250 gauss.

A magnet is not an accessory to this sensor, it is half of it — see the [Neodymium Magnets entry](element.html?file=database/Organium_Elements/Neodymium%20Magnets%20%28Disc%2C%20Cube%2C%20Sphere%29.md) for the companion that turns it into a contactless control.
