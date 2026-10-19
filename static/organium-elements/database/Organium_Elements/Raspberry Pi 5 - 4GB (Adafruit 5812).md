# Raspberry Pi 5 - 4GB (Adafruit 5812)

Category: PROCESSING
Modality: SYSTEMS
Type: Computer
Added: September 2, 2026
Senses: N/A
Actuates: N/A — a whole Linux computer; it runs the code that reads sensors and drives outputs
Connection: 40-pin GPIO header · 2× USB 3.0 · 2× USB 2.0 · Gigabit Ethernet · dual micro-HDMI · PCIe 2.0 ×1 · 2× 4-lane MIPI camera/display
Status: Done
Voltage: 5 V — and it wants **5 V at 5 A over USB-C with Power Delivery**, which is not an ordinary phone charger
Published: Yes

**Principle**: Unlike every microcontroller in the lab, this is a **computer**. It boots an operating system, runs many programs at once, has a filesystem and a network stack, and forgets nothing when you close the editor because the code lives on the card rather than being flashed into it. That difference decides what you reach for: a microcontroller does one timing-critical job forever; a Pi does the jobs that need a screen, a network, a camera, a database or a language that isn't C.

The cost of that generality is **determinism**. Linux will happily pause your loop for a few milliseconds to do something else. For anything that must be exactly on time — audio sample clocks, tight PWM, bit-banged protocols — a microcontroller or the Bela is the honest answer.

**Function**: 2.4 GHz quad-core 64-bit Arm Cortex-A76, VideoCore VII GPU (OpenGL ES 3.1, Vulkan 1.2), **4 GB LPDDR4X**. Dual 4Kp60 HDMI with HDR and a 4Kp60 HEVC decoder. Dual-band 802.11ac Wi-Fi and Bluetooth 5.0/LE. Two USB 3.0 ports (5 Gbps, simultaneous) plus two USB 2.0. Gigabit Ethernet with PoE+ (needs the HAT). microSD with SDR104. New on the Pi 5 and genuinely useful: a **PCIe 2.0 ×1** connector, a **real-time clock** with battery header, and a **power button**.

**Voltage**: This is the part that catches people. The Pi 5 asks for **5 V / 5 A (25 W) over USB-C PD**. Give it a smaller supply and it still boots, but it caps total USB current at about 600 mA — so a hub, an SSD or a hungry camera will brown out in ways that look like random crashes and corrupted cards rather than a power problem.

**Typical use**:
- **The piece that needs to see, hear or connect.** Camera work, machine learning on-device, a web interface, OSC or MQTT over the network, playing back video or large sample libraries — all the things a microcontroller cannot hold.
- **The brain of an installation** that has to run for weeks unattended, log to disk, and be reachable over the network to fix without a laptop and a USB cable.

**Good for**:
- Real Linux: Python, Node, OpenCV, PyTorch, a browser, ssh — the whole toolbox
- Networking and storage that microcontrollers can only pretend at
- Camera and display interfaces (2 × 4-lane MIPI) plus PCIe for fast storage or accelerators
- The 40-pin GPIO header, so it still talks I2C/SPI/UART to the same STEMMA QT boards as everything else

**Bad for**:
- **Precise timing.** Linux is not a real-time OS. Audio-rate work belongs on the Bela; tight PWM and protocol timing on an ESP32 or a METRO.
- **Analog input — there is none.** No ADC on the GPIO header at all. Use the ADS1115 or an MCP2221A alongside it.
- **Battery and low power.** It idles at watts, not milliwatts, and needs a graceful shutdown; pulling power mid-write corrupts the card.
- **5 V logic.** The GPIO pins are 3.3 V and are *not* tolerant. A 5 V signal into a Pi pin kills it — put a level shifter in between.

**Mini Jack connection diagram**: N/A — a computer, not a patchable module.

**Component diagram**: See product page / lab photo pending.

**Links**: [Adafruit product page](https://www.adafruit.com/product/5812) · [Raspberry Pi 5 documentation](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html) · [GPIO pinout](https://pinout.xyz/)

**Buy**: [Adafruit #5812](https://www.adafruit.com/product/5812)

**Use instructions/Tutorials**: Flash Raspberry Pi OS with the Raspberry Pi Imager, which can preload your Wi-Fi credentials, hostname, user and ssh key — do that and the board is reachable over the network on first boot with no screen or keyboard attached, which is how you will actually use it here.

⚠️ **These are bare boards, and the lab has none of the four things they need to switch on:**

| Missing | Why it matters |
|---|---|
| **5 V / 5 A USB-C PD supply** | nothing in the inventory provides it — the two adjustable bench supplies are barrel-jack units, not USB-C PD |
| **Active cooler** | the Pi 5 runs hot and throttles under sustained load; it has a metal heatsink but no fan |
| **microSD card** | there is no boot medium |
| **micro-HDMI cable** | the Pi 5 uses *micro*-HDMI, not the full-size plug people expect |

None of these are on any Rev6 line — all three Pi rows read "bare board". Worth ordering together before the first class that uses them.

**Arduino IDE sketches**: N/A — this is a Linux computer, not an Arduino target. Python is the usual way in:
```python
# pip install adafruit-blinka, then the same CircuitPython drivers the course uses
import board, busio
i2c = busio.I2C(board.SCL, board.SDA)
print([hex(a) for a in i2c.scan()])   # same STEMMA QT parts as on the Feathers
```

**Relevant software files**: —

**Extra and gratuitous information and images**: Only two because **Adafruit hard-limits the Pi 5 to 2 per order** — which is exactly why the planned Pi fleet cannot come from a single Adafruit order. Still outstanding: **8 GB ×2 (#5813)**, **16 GB ×1 (#6125)** and four more 4 GB, from later orders or Pimoroni.
![Raspberry Pi 5 - 4GB (Adafruit 5812)](raspberry-pi-5---4gb-adafruit-5812-1.jpg)