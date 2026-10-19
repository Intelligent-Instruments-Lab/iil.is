# ADS1115 16-Bit 4-Channel ADC (Adafruit 1085)

Category: PROCESSING
Modality: BRIDGE
Type: Analog-to-digital converter
Added: September 2, 2026
Senses: N/A directly — it gives *other* analog sensors far better resolution than the host has
Actuates: N/A
Connection: I2C (STEMMA QT / Qwiic) — addresses 0x48–0x4B via the ADDR pin · ALERT/RDY pin
Status: Done
Voltage: 2.0–5.5 V supply; works with 2 V and 5 V logic
Published: Yes

**Principle**: Every microcontroller has an ADC, and most of them are mediocre. The ESP32's is 12-bit and visibly non-linear at the ends of its range; the METRO 328's is 10-bit, so a full 5 V swing arrives in 1024 steps of about 5 mV each. If a sensor's whole useful output is 50 mV, that is ten steps — a signal that arrives as a staircase.

This chip does the conversion properly and hands over the number. **16 bits** is 65,536 steps, and in front of them sits a **programmable gain amplifier** that first zooms in on the voltage range you actually care about. That second part is the real trick: set the range to ±0.256 V and one step is about **7.8 microvolts**. A sensor whose output the board could barely see becomes a clean signal.

**Function**: 16-bit delta-sigma ADC, configurable as **4 single-ended** inputs or **2 differential** pairs. Programmable data rate **8 to 860 SPS**. Internal low-drift reference and oscillator, so it needs no external parts. Programmable comparator with an **ALERT/RDY** pin that can fire when a reading crosses a threshold, without the host polling. 150 µA continuous, auto-shutdown in single-shot.

**Voltage**: 2.0–5.5 V. Note the input limit: **the measured voltage must not exceed the supply**. On a 3.3 V rail you cannot read a 5 V sensor directly — divide it down first.

**Typical use**:
- **Rescuing a weak analog sensor.** Piezo discs, the conductive rubber cord, Velostat, photocells, homemade dividers — anything whose swing is small and whose resolution matters more than its speed. The **differential** mode is the other half of this: measuring across a sensor rather than against ground rejects noise picked up on the cable, which is what makes long runs to a sensor viable.
- **Adding analog to boards that have none.** The Raspberry Pi has no ADC at all. This is the standard way a Pi reads an analog sensor, and the same applies behind an FT232H.

**Good for**:
- 16 bits with a PGA — a genuine measurement rather than a rough reading
- Four channels for two wires, and four boards per bus = **16 analog inputs**
- Differential pairs that reject common-mode noise
- Wide supply range, so it sits happily between a 5 V sensor and a 3.3 V host
- Comparator + ALERT, so a threshold can wake the host instead of being polled for

**Bad for**:
- **Speed.** 860 SPS maximum is slow: fine for pressure, light, stretch and temperature, useless for audio. Audio-rate analog belongs on the Bela.
- **Voltages above the supply** — over-range damages it; divide first
- **High channel counts.** Sixteen inputs is the bus ceiling; beyond that use a multiplexer or a different approach.
- Cases where the host's own ADC is honestly good enough — for a potentiometer feeding a menu, this is wasted.

**Mini Jack connection diagram**: A natural jack-panel part, since its whole job is receiving analog signals from elsewhere. Bring a mono TS jack's tip to A0–A3 and sleeve to ground for single-ended CV or sensor input; for a long or noisy run, use a TRS jack into a **differential** pair (A0/A1) so the interference lands on both conductors and subtracts out. Keep every input inside 0 V to the supply rail.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/1085) · [Adafruit learn guide](https://learn.adafruit.com/adafruit-4-channel-adc-breakouts) · [Adafruit_ADS1X15 library](https://github.com/adafruit/Adafruit_ADS1X15)

**Buy**: [Adafruit #1085](https://www.adafruit.com/product/1085)

**Use instructions/Tutorials**: Plug in a STEMMA QT cable — it answers at **0x48**. Install **Adafruit ADS1X15**. Tie the ADDR pin to GND / VDD / SDA / SCL for 0x48 / 0x49 / 0x4A / 0x4B.

The one setting that decides whether it was worth using: **the gain**. Leaving it at the default ±6.144 V while measuring a 0–1 V sensor throws away most of the resolution you paid for. Pick the smallest range that still contains your signal.

| Gain setting | Full-scale range | Step size |
|---|---|---|
| `GAIN_TWOTHIRDS` (default) | ±6.144 V | 188 µV |
| `GAIN_ONE` | ±4.096 V | 125 µV |
| `GAIN_FOUR` | ±1.024 V | 31.25 µV |
| `GAIN_SIXTEEN` | ±0.256 V | 7.8 µV |

⚠️ The range is about *resolution*, not protection — it never lets you exceed the supply voltage safely.

**Arduino IDE sketches**: Library: `Adafruit ADS1X15`.
```cpp
#include <Adafruit_ADS1X15.h>

Adafruit_ADS1115 ads;

void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  if (!ads.begin(0x48)) {            // 0x48..0x4B via the ADDR pin
    Serial.println("No ADS1115 — check the QT cable");
    while (1) delay(10);
  }
  // choose the SMALLEST range that still contains your signal
  ads.setGain(GAIN_FOUR);            // +/-1.024V, 31.25uV per step
}

void loop() {
  int16_t single = ads.readADC_SingleEnded(0);          // A0 against ground
  int16_t diff   = ads.readADC_Differential_0_1();      // across A0-A1: noise cancels

  Serial.print(ads.computeVolts(single), 6); Serial.print(" V   diff ");
  Serial.println(ads.computeVolts(diff), 6);
  delay(100);
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: 16-bit delta-sigma ADC; 4 single-ended or 2 differential channels; 8–860 SPS; PGA to ×16; internal reference and oscillator; programmable comparator with ALERT/RDY; 2.0–5.5 V; 150 µA continuous; 25.4 × 17.8 × 4.6 mm with a 0.1" header and four mounting holes; STEMMA QT. Filed BRIDGE rather than as a sensor because it senses nothing itself: it is a translator between the analog world and an I2C bus, which is what that modality means. If four are ever on one bus and something else needs 0x48–0x4B, the [PCA9548 multiplexer (#5626)](element.html?file=database/Organium_Elements/PCA9548%208-Channel%20I2C%20Multiplexer%20%28Adafruit%205626%29.md) is in the same box.
![ADS1115 16-Bit 4-Channel ADC (Adafruit 1085)](ads1115-16-bit-4-channel-adc-adafruit-1085-1.jpg)