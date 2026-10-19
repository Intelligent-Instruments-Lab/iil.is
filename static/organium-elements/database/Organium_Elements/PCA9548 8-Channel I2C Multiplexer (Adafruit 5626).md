# PCA9548 8-Channel I2C Multiplexer (Adafruit 5626)

Category: PROCESSING
Modality: BRIDGE
Type: Interface / bus expander
Added: September 2, 2026
Senses: N/A
Actuates: N/A — it decides which I2C devices the host can currently see
Connection: I2C in at 0x70 (0x70–0x77 by jumper) · 8 switched STEMMA QT channels out
Status: Done
Voltage: 3–5 V; on-board 3.3 V 500 mA regulator
Published: Yes

**Principle**: I2C identifies devices by **address**, and a great many sensors have an address fixed in silicon with no way to change it. Two such parts on one bus is not a conflict you can configure around — it is simply broken, and the usual symptom is that one of them *disappears*, which reads as a dead sensor rather than a clash.

This solves it by rearranging the geography instead of the addresses. The multiplexer is a **switch, not a translator**: it gives you eight separate downstream buses and connects **one at a time** to the host. Both parts keep 0x39; they just never see each other, because only one channel is live when you talk.

**Function**: Eight independently switchable I2C channels, each with its own STEMMA QT connector (two rows of four), plus the upstream port to the host and breadboard pins. The mux itself lives at **0x70**, moveable to **0x77** with jumpers, so eight multiplexers can chain for up to **64 same-address devices**. On-board 3.3 V regulator rated 500 mA; works with 3 V and 5 V systems.

You select a channel by writing **one byte — a bitmask** — to the mux's own address. Bit N enables channel N.

**Voltage**: 3–5 V in. The 3.3 V regulator can power the sensors on the channels.

**Typical use**:
- **Making identical sensors coexist.** Four of the same part, or two different parts that share an address, on one host — a situation this catalogue is full of (table below).
- **Keeping a plug-and-play chain plug-and-play.** In a classroom the alternative fix — a second I2C bus on spare GPIOs — means breadboarding and pull-up resistors. This keeps everything on STEMMA QT cables that a student cannot wire backwards.

**Good for**:
- Address collisions of any kind, without touching the devices
- Eight of the *same* sensor on one host — impossible otherwise for fixed-address parts
- Isolating bus capacitance: only one branch is connected at a time, so long chains behave better
- Sensors stay powered on every channel; only SDA/SCL are switched, so nothing loses state or needs re-initialising when you switch away

**Bad for**:
- ⚠️ **Simultaneous reads.** One channel at a time means devices are read in sequence, not together. For anything needing synchronised sampling, this is the wrong tool.
- **Transparent use.** Libraries know nothing about it, so every call needs wrapping — see below.
- Cases where a **second I2C bus** would do. For exactly two clashing devices on an ESP32, `Wire1` is simpler, cheaper and has no channel discipline to forget.
- A device whose address is 0x70–0x77 — that clashes with the mux itself.

**Mini Jack connection diagram**: N/A — a bus part, reached over STEMMA QT.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/5626) · [Adafruit learn guide](https://learn.adafruit.com/adafruit-pca9548-8-channel-stemma-qt-qwiic-i2c-multiplexer)

**Buy**: [Adafruit #5626](https://www.adafruit.com/product/5626)

**Use instructions/Tutorials**: Cable the host into the upstream port and each device into a numbered channel. Scan the bus: the mux answers at **0x70**, and the devices behind it are invisible until you select their channel.

```cpp
#define MUX 0x70
void muxChannel(uint8_t ch) {          // ch = 0..7
  Wire.beginTransmission(MUX);
  Wire.write(1 << ch);                 // bitmask: bit N = channel N
  Wire.endTransmission();
}

muxChannel(0); apds.readGesture();     // both at 0x39, never at the same moment
muxChannel(1); as7343.readAllChannels();
```

Three rules that make it work:

1. **Switch before every transaction — including inside `begin()`.** A device initialised on the wrong channel fails silently at startup and then looks broken all session.
2. ⚠️ **One bit at a time when addresses collide.** Because the control byte is a bitmask you *can* enable several channels at once (`0b00000011`). Do that with two devices at the same address and the clash returns — now as garbled data rather than a clean "not found", which is far harder to diagnose.
3. **Wrap the library, don't fight it.** Give each device a small helper that selects its channel then calls through; nothing else in your sketch needs to know the mux exists.

### The address collisions in this lab

Worth keeping, because these are the actual reasons you would reach for this board:

| Address | Parts that share it | Escape route |
|---|---|---|
| **0x39** | APDS9960 ×10 · [AS7343](element.html?file=database/Organium_Elements/Light-Color_Sensor_%28AS7341%29.md) — **both fixed** | mux, or a second bus |
| **0x36** | AS5600 ×5 (fixed) · rotary encoder breakout ×10 (moveable) | move the encoder — it has jumpers |
| **0x5A–0x5D** | MPR121 ×10 — only **4 addresses** | mux beyond four boards |
| **0x50–0x53** | Mini gamepad ×5 — only **4 addresses** | mux for the fifth |
| **0x48–0x4B** | ADS1115 ×3 — 4 addresses, enough today | — |

**Arduino IDE sketches**: No library needed — the mux is four lines of `Wire`. Scan each channel in turn to find what is plugged where:
```cpp
for (uint8_t ch = 0; ch < 8; ch++) {
  muxChannel(ch);
  Serial.print("channel "); Serial.print(ch); Serial.print(":");
  for (uint8_t a = 1; a < 127; a++) {
    if (a == MUX) continue;                       // don't scan the mux itself
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) { Serial.print(" 0x"); Serial.print(a, HEX); }
  }
  Serial.println();
}
```

**Relevant software files**: —

**Extra and gratuitous information and images**: PCA9548 (TCA9548A-compatible), 8 channels, address 0x70 default and 0x70–0x77 by jumper — so eight muxes give 64 same-address devices. Eight JST-SH STEMMA QT connectors in two rows of four, one upstream port, plus breadboard pins; on-board 3.3 V 500 mA regulator; 3 V and 5 V compatible. Five is one per station.
![PCA9548 8-Channel I2C Multiplexer (Adafruit 5626)](pca9548-8-channel-i2c-multiplexer-adafruit-5626-1.jpg)