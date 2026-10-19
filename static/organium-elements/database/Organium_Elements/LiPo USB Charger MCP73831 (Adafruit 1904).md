# LiPo USB Charger MCP73831 (Adafruit 1904)

Category: PROCESSING
Modality: VOLTAGE
Type: Power Supply, Driver
Added: July 25, 2026
Senses: Battery charge state (red = charging, green = full)
Actuates: Constant-current / constant-voltage charge of one 3.7V LiPo/Li-Ion cell
Connection: USB (Micro-B input) / JST-PH 2-pin (battery output)
Status: Done
Voltage: 5V USB input; charges single 3.7/4.2V Li-Ion/LiPo cell
Published: Yes

**Principle**: A tiny board built around Microchip's MCP73831 single-cell Li-Ion/LiPo charge controller. It runs the textbook three-stage charge cycle — preconditioning a deeply discharged cell, then constant-current fast charge, then constant-voltage top-off tapering to 4.2V. A single onboard resistor sets the charge current; two LEDs report state. Power comes from any 5V USB source.

**Function**: Safely recharges one 3.7V lithium-polymer or lithium-ion cell from a USB port. Default charge current is 100mA (gentle, safe for small cells); bridge the onboard solder jumper to step it to 500mA for 500mAh-or-larger packs.

**Voltage**: 5V input via Micro-B USB. Output tracks the cell: constant-current up to ~4.2V then constant-voltage hold. Designed for 3.7V/4.2V chemistry only — NOT the older 3.6V/4.1V cells, and not LiFePO4.

**Typical use**:
- Charging a LiPo in place over USB instead of opening the piece and swapping the cell.
- Giving a battery-powered node a recharge story a stranger can follow: one micro-USB socket on the panel and a red-to-green charge indicator.

**Good for**:
- Dead-simple: USB in, JST battery out, correct chemistry-safe charging with no code.
- Selectable 100mA / 500mA covers everything from tiny 40mAh cells to fat 2000mAh+ packs.
- Clear red/green status LEDs — you know at a glance when it's done.
- Tiny (21 x 19mm) and light (2g); tucks into a wearable or enclosure.

**Bad for**:
- Charger only — it does NOT power your project while charging or provide a regulated 3.3V/5V rail. Pair it with a boost/LDO or use a Feather/PowerBoost that combines charge + output.
- Single cell only; no balancing, no multi-cell packs.
- Micro-B input (not USB-C) — older connector to keep in your cable kit.
- Wrong for LiFePO4, NiMH, or 3.6V/4.1V legacy lithium — it charges to 4.2V.
- Don't leave charging lithium unattended near flammables; standard LiPo safety applies.

**Mini Jack connection diagram**: N/A — USB Micro-B input; battery on a 2-pin JST-PH connector. Pins: 5V USB in (Micro-B), JST + / - to the cell. Breakout pads also expose IN (5V), G (GND), and BAT (cell +) for soldered wiring.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [Adafruit product page](https://www.adafruit.com/product/1904)
- [MCP73831 datasheet (Microchip)](https://ww1.microchip.com/downloads/en/DeviceDoc/MCP73831-Family-Data-Sheet-DS20001984H.pdf)
- [Adafruit Li-Ion & LiPoly battery guide](https://learn.adafruit.com/li-ion-and-lipoly-batteries)

**Buy**: [Adafruit #1904](https://www.adafruit.com/product/1904)

**Use instructions/Tutorials**: Plug your single 3.7V LiPo into the JST connector (observe the keyed connector; Adafruit cells are pre-wired correctly). Connect a 5V USB source to the Micro-B port. Red LED = charging, green LED = full. For any cell 500mAh or larger you can bridge the "500mA" solder jumper to charge faster; leave it open (100mA) for small cells. To use the battery, unplug it and move it to your project — or wire BAT/G out to your regulator, but understand the charger is not a load-sharing power path.

**Arduino IDE sketches**: — (hardware charger; no firmware or library.)

**Relevant software files**: —

**Extra and gratuitous information and images**: Charge chip MCP73831. Default 100mA, jumper-selectable 500mA. Three-stage precondition / CC / CV cycle. Input 5V Micro-B USB. Output on 2-pin JST-PH, plus IN/G/BAT solder pads. PCB 21 x 19 x 2mm (0.8mm half-thickness board), ~7mm tall with JST, 2g. Ships assembled with a bonus JST cable. Single 3.7/4.2V Li-Ion/LiPo only — not 3.6/4.1V cells.
![LiPo USB Charger MCP73831 (Adafruit 1904)](lipo-usb-charger-mcp73831-adafruit-1904-1.jpg)