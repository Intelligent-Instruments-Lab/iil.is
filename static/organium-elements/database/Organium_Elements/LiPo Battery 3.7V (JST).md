# LiPo Battery 3.7 V (JST)

Category: INPUTS
Modality: VOLTAGE
Type: Power source
Added: August 6, 2026
Senses: N/A
Actuates: N/A — stores and supplies portable power
Connection: 2-pin JST plug (⚠ see connector caveat) — charge via a LiPo charger, not directly
Status: Done
Voltage: 3.7 V nominal (4.2 V full → ~3.0 V empty)
Published: Yes

**Principle**: A single-cell lithium-polymer battery. One cell = **3.7 V nominal**, swinging from ~4.2 V fully charged to ~3.0 V empty. Most cells include a small **protection board** (over-charge / over-discharge / short cut-off) at the tab end. In stock: **1000 mAh** and a **3000 mAh 102050** cell (the number is its size in mm: 10 × 20 × 50).

**Function**: Untethered power for a project. Feeds a board's BAT/JST input; recharged through a dedicated LiPo charger (e.g. the MCP73831 breakout or a Feather's on-board charger).

**Typical use**:
- The power source that lets an instrument or a costume piece leave the bench — the JST plug goes straight into a Feather or QT Py and the piece runs untethered.
- Moving or hard-to-reach nodes where no cable can follow; pair it with the MCP73831 charger so it recharges in place.

**Good for**:
- High energy density in a light, flat pack.
- Rechargeable hundreds of cycles; 3.7 V pairs naturally with 3.3 V boards + boost.
- Standard JST-terminated for plug-and-go on many dev boards.

**Bad for**:
- **Safety** — never short, puncture, over-discharge or charge unattended; a swollen cell is retired immediately. Charge only with a proper LiPo charger (CC/CV) — **not** a bench supply straight to the cell.
- **⚠ Connector mismatch** — these generic cells use **JST 1.25 mm / Micro-JST 1.3 mm** plugs, **not** the 2.0 mm **JST-PH** that Adafruit boards use. Do **not** just plug them in — check the pitch and **polarity** first; you'll often need a re-crimp or an adapter lead. (Polarity is not standardised on generic cells.)
- High-current loads (motors) — a small cell sags; size mAh to the draw.
- Cold/hot extremes reduce capacity and life.

**Mini Jack connection diagram**: N/A — 2 conductors, **+** and **−**. Confirm polarity against your board's silkscreen before connecting (reversed = damage).

**Component diagram**: See product page / lab photo pending.

**Links**:
- [Adafruit: LiPo battery basics & safety](https://learn.adafruit.com/li-ion-and-lipoly-batteries)
- [JST connector types explained (PH vs SH vs 1.25)](https://learn.adafruit.com/jst-ph-connector-cheat-sheet)
- [LiPo USB Charger MCP73831 (companion, in catalogue)](https://www.adafruit.com/product/1904)

**Buy**: 1000 mAh (YELUFT) & 3000 mAh 102050 — Amazon.es. Reference cells: [Adafruit LiPo range](https://www.adafruit.com/category/574)

**Use instructions/Tutorials**: Verify plug pitch + polarity against your board (adapt the lead if it's a 1.25 mm plug into a 2.0 mm PH socket). Charge through a LiPo charger IC set to the right current (≤ 1C). Watch the voltage: stop discharging near 3.0 V. Store around 3.7–3.8 V (~50 %) if unused.

**Arduino IDE sketches**: N/A (measure pack voltage via a divider into an ADC if you want a fuel gauge, or use a dedicated gauge IC).

**Relevant software files**: N/A.

**Extra and gratuitous information and images**: Single-cell Li-Po, 3.7 V nominal. Stock: 1000 mAh (×20) + 3000 mAh 102050 (×6), Amazon.es addition (invoice to Áslaug). Filed IN·VOLTAGE as a power **source** (the charger boards live in PRO·VOLTAGE, the barrel/9V connectors in CON·VOLTAGE). **Connector caveat is the headline: 1.25 mm ≠ 2.0 mm JST-PH.**
![LiPo Battery 3.7V (JST)](lipo-battery-37v-jst-1.jpg)