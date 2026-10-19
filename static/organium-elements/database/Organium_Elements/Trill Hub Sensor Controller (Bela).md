# Trill Hub Sensor Controller (Bela)

Category: INPUTS
Modality: CAPACITIVE
Type: Connector, Integrated System
Added: July 25, 2026
Senses: N/A — passive I2C breakout/hub (the connected Trill sensors do the sensing)
Actuates: N/A
Connection: I2C (QWIIC ports + solder pads)
Status: Done
Voltage: Passes host bus voltage: Vin 3–5 V, logic level follows host (3.3 V on Bela/Raspberry Pi, 5 V on Arduino)
Published: Yes

**Principle**: Not a sensor — a wiring convenience. The Hub is a passive breakout that fans one I2C connection out to many: five QWIIC ports plus six sets of open solder pads all sit on the same bus, with on-board pull-up resistors on SCL/SDA so you don't have to add your own. Every device keeps its own unique I2C address, so the host talks to each in turn over the shared two wires.

**Function**: Provides a single, tidy point of connection for a whole cluster of Trill sensors (and any other I2C devices) on one bus, with correct pull-ups already fitted. Turns a messy daisy-chain into a clean star of QWIIC cables.

**Voltage**: Whatever the host bus runs — Vin 3–5 V, logic level 3.3 V on Bela/Raspberry Pi or 5 V on Arduino/Teensy. The Hub itself adds only pull-up resistors and connectors.

**Typical use**:
- Connecting several Trill sensors to one Bela without a wiring nightmare — four sockets gathered onto a single I2C run.
- Keeping a shared bus orderly where Trill sensors sit alongside other I2C parts (IMUs, expanders, displays).

**Good for**:
- Clean, reliable multi-device I2C wiring — five QWIIC ports plus six solder-pad footprints.
- On-board pull-ups already correct — one common beginner I2C failure removed.
- Mixing QWIIC and bare-wire I2C devices on the same bus.
- Scaling a Trill installation without hand-soldering a splitter.

**Bad for**:
- Address clashes — it does not change addresses; every device on the bus still needs a unique one (set Trill sensors' addresses via their solder pads).
- Long bus runs / many devices — total capacitance and bus length still limit I2C reliability; a hub doesn't repeat or buffer the signal.
- Level shifting — it doesn't translate 5 V↔3.3 V; keep the whole bus at the host's logic level.
- Adding sensing — it senses nothing itself; you still need Trill sensors.

**Mini Jack connection diagram**: N/A — I2C bus: VIN / GND / SCL / SDA shared across all ports. Upstream QWIIC/pads go to the host; downstream QWIIC ports and solder pads fan out to the sensors. On-board pull-ups on SCL/SDA.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [About Trill (Bela Knowledge Base)](https://learn.bela.io/products/trill/about-trill/)
- [All about I2C (Bela Knowledge Base)](https://learn.bela.io/using-trill/all-about-i2c/)
- [Trill-Arduino library (GitHub)](https://github.com/BelaPlatform/Trill-Arduino)

**Buy**: [Trill Hub — Bela Shop (EU)](https://eu.shop.bela.io/products/trill-hub)

**Use instructions/Tutorials**: Connect the host's I2C (VIN/GND/SCL/SDA) to the Hub, then plug each Trill sensor into a QWIIC port with the included cables, or wire bare I2C devices to the solder pads. Give every sensor a unique I2C address (Trill defaults differ per type; change with the solder pads if you have two of the same type). In software, instantiate one Trill object per address and read them in your loop. Because pull-ups are on-board, don't add extra strong pull-ups elsewhere on the bus.

**Arduino IDE sketches**: Library: `Trill` (BelaPlatform/Trill-Arduino). No driver for the Hub itself — address each sensor individually.
```cpp
#include <Trill.h>
Trill bar;     // 0x20
Trill square;  // 0x28
void setup() {
  Serial.begin(115200);
  bar.begin(Trill::TRILL_BAR);        // both share the Hub's bus
  square.begin(Trill::TRILL_SQUARE);
}
void loop() {
  bar.read();  square.read();
  // ...read each sensor's touches...
  delay(20);
}
```

**Relevant software files**: — (no Hub driver; use `Trill.h` per sensor)

**Extra and gratuitous information and images**: Passive I2C hub — no I2C address of its own. Five QWIIC ports (five QWIIC-to-QWIIC cables included) plus six sets of open solder pads for non-QWIIC I2C devices. On-board SCL/SDA pull-up resistors. Bus voltage/logic follow the host (3–5 V). Negligible current draw of its own (power for sensors passes through). Pairs with any mix of Trill Bar/Square/Craft/Ring/Hex/Flex and other I2C parts.
![Trill Hub Sensor Controller (Bela)](trill-hub-sensor-controller-bela-1.jpg)