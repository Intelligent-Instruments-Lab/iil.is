# microSD Card Logging Shield (Whadda WPI304N)

Category: PROCESSING
Modality: BRIDGE
Type: Interface / adapter
Added: October 19, 2026
Senses: N/A
Actuates: N/A — reads and writes files on a microSD card over SPI
Connection: SPI — 6-pin header: GND · VCC · MISO · MOSI · SCK · CS
Status: Done
Voltage: 4.5–5.5 V in; the card itself runs at 3.3 V behind an on-board regulator and buffer
Published: Yes

**Principle**: A microSD card is a 3.3 V SPI device. A 5 V microcontroller cannot talk to one directly — its logic highs would be out of spec on the card's pins — so this board sits between them. An on-board regulator drops 5 V to the 3.3 V the card wants, and a **74VHC125** quad buffer shifts the three outgoing SPI lines (MOSI, SCK, CS) down to 3.3 V. MISO comes back the other way at 3.3 V, which a 5 V input already reads as a valid high. That is the whole board: a socket, a regulator, a buffer.

**Function**: Gives any SPI-capable microcontroller a filesystem. Once the card is mounted you open files by name and read or write them like any other stream, which is what makes it a *logging* board: sensor readings go to a `.csv` you later pull out and open on a laptop, with no network and nothing to lose when the power drops.

**Voltage**: 4.5–5.5 V on VCC. Do not feed it 3.3 V — the regulator needs headroom. The card is the fragile part: it draws current in bursts while writing, so a shared, marginal 5 V rail will show up as intermittent write failures rather than as an obvious power problem.

**Typical use**:
- Logging sensor data to a file over hours or weeks, where a laptop cannot stay connected and the reading only matters after the fact.
- Giving a standalone instrument its own storage — samples, settings, presets — so the piece carries its own data instead of depending on a host.

**Good for**:
- Turns a microcontroller into something with a filesystem for the price of a cable
- Cards are cheap, swappable, and readable on any computer — the data leaves the installation in a pocket
- Works with the Arduino `SD.h` library that ships with the IDE; no driver hunting
- Four M2 mounting holes, so it bolts down rather than dangling off its header

**Bad for**:
- Not actually a shield despite the name — it is a small breakout with a 6-pin header, not an Arduino form factor
- SPI writes block: a long write stalls your loop, which matters if you are also holding audio or tight timing
- Cards corrupt if power is cut mid-write; close the file or flush after each record if the piece might be switched off abruptly
- Capacity is capped — microSD up to 2 GB, microSDHC up to 32 GB; a 64 GB SDXC card will not mount
- No real-time clock on board, so log lines have no timestamp unless you add one

**Mini Jack connection diagram**: N/A — SPI bus part. Header order on the board: `GND · VCC · MISO · MOSI · SCK · CS`. On an Uno that is GND, 5 V, D12, D11, D13 and any free digital pin for CS (D10 by convention).

**Component diagram**: See the product page; lab photo below.

**Links**: [Whadda product page](https://whadda.com/product/microsd-card-logging-shield-for-arduino-2-pcs-wpi304n/) · [User manual (PDF)](https://www.velleman.eu/downloads/25/wpi304na4v01.pdf) · [Example code (ZIP)](https://www.velleman.eu/downloads/25/coding/wpi304n_example_code.zip) · [74VHC125MTC datasheet](https://www.velleman.eu/downloads/25/infosheets/74vhc125mtc_datasheet.pdf)

**Buy**: [Whadda WPI304N — microSD Card Logging Shield, 2 pcs](https://whadda.com/product/microsd-card-logging-shield-for-arduino-2-pcs-wpi304n/) (€9.95 for two)

**Use instructions/Tutorials**: Format the card as FAT32 first — exFAT, which large cards ship with, will not mount. Wire the six pins, pick a CS pin, and call `SD.begin(CS)`; if it returns false the usual causes are the card format, a missing ground, or CS on a pin the sketch is also using. Open with `SD.open("log.csv", FILE_WRITE)`, write, and **close the file** — or at minimum flush — because buffered data is lost if the board is powered down before the close.

**Arduino IDE sketches**: `SD.h`, included with the Arduino IDE.
```cpp
#include <SPI.h>
#include <SD.h>
const int CS = 10;
void setup() {
  Serial.begin(9600);
  if (!SD.begin(CS)) { Serial.println("no card — check format (FAT32) and wiring"); return; }
  File f = SD.open("log.csv", FILE_WRITE);
  if (f) { f.println("millis,reading"); f.close(); }   // close == data is safe
}
void loop() {
  File f = SD.open("log.csv", FILE_WRITE);
  if (f) { f.print(millis()); f.print(','); f.println(analogRead(A0)); f.close(); }
  delay(1000);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Sold as a 2-piece set (WPI304N). 74VHC125MTC quad buffer; four M2 mounting holes; microSD ≤ 2 GB and microSDHC ≤ 32 GB; SPI; 4.5–5.5 V in. Package 3.80 × 7.80 × 15.50 cm, ~23 g per unit.

*Photo: the manufacturer's product image, placed on this catalogue's background. Replace it with a lab photograph of the units in hand.*
![microSD Card Logging Shield (Whadda WPI304N) — two boards](microsd-card-logging-shield-whadda-wpi304n-1.jpg)
