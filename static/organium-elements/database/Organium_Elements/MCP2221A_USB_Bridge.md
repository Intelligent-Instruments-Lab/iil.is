# MCP2221A USB Bridge

Category: PROCESSING
Modality: BRIDGE
Type: Interface / adapter
Added: March 10, 2026 2:30 PM
Senses: Analog voltage (3 ADC channels), digital inputs, I2C data from attached sensors
Actuates: I2C traffic, digital outputs, one analog (DAC) output
Connection: USB-C to the host · I2C via STEMMA QT or header · 4 GPIO · UART
Status: Done
Voltage: USB 5 V in; 3.3 V logic, with a 3.3 V regulated output for sensors
Published: Yes

![MCP2221.jpg](mcp2221a-usb-bridge-1.png)

**Principle**: A laptop has no pins. It cannot read a sensor or toggle a wire, because those need bit-level timing an operating system will not give you. The usual answer is to put a microcontroller in the middle — and then every experiment costs a compile-and-flash cycle.

This removes that. The MCP2221A is a USB chip whose entire job is to turn USB packets into I2C traffic, pin states and analog readings, so **Python running on the computer talks straight to the hardware**. No firmware, no upload, no reset button: you change a line and run it again. It enumerates as a USB **HID** device — the same class as a mouse — so macOS and Windows already know it and **no driver is installed**.

Unlike the FT232H beside it in the box, this one has a real **analog input**, which is why it is the adapter the first-year course is built on.

**Function**: Bridges USB to **I2C** (master, up to 400 kHz), **4 GPIO** pins (G0–G3), a **10-bit ADC** on three of them, a **5-bit DAC** on one, and a UART. Driven from Python on the host through Adafruit **Blinka**, which presents the CircuitPython API — `import board`, `analogio`, `busio` — exactly as it appears on a microcontroller.

**Voltage**: Powered from USB 5 V. Logic is **3.3 V**; the regulated 3.3 V output can run the sensors hanging off it. GPIO is 25 mA max per pin.

**Typical use**:
- **The first-year programming course.** A student plugs one into their own laptop, reads a sensor in Python, and draws with it — no board, no toolchain, no flashing. The lab holds 25 for exactly this.
- **Finding out whether a sensor does what you hoped**, before any board exists: plug a STEMMA QT part in, scan the bus, read it, then port the working logic to a Feather once you trust it.

**Good for**:
- **Analog in** — three ADC channels, the reason to reach for this rather than the FT232H
- Zero driver friction: USB HID, so it just appears, on macOS, Windows and Linux alike
- The same CircuitPython libraries used on the boards, so sensor code carries over to the ESP32 work unchanged
- STEMMA QT, so it joins the plug-and-play I2C chain already in the lab
- Cheap and plentiful enough to give one to every student

**Bad for**:
- **Timing.** Every read is a USB round trip of a few milliseconds. Nothing here is real-time; anything sample-accurate belongs on a microcontroller or the Bela.
- **Standalone work.** Unplug the computer and it does nothing. It is not a board that runs your code.
- **SPI** — it has none. That is the FT232H's job.
- **Hot-plugging.** Blinka finds the adapter once, at `import board`, and caches it for the life of the process: unplug it and the running program cannot get it back. Restart the program.
- **5 V parts** — 3.3 V logic, so shift up if you must (the level shifters share its box).

**MCP2221A or FT232H?** Both bridge USB to hardware and both are in this box. The **MCP2221A** is the everyday choice and the course default — cheaper, simpler, driverless, and it does **I2C, UART, GPIO and analog input**. The **FT232H** is what you take when you need **SPI**, JTAG, or faster and more capable GPIO — but it has **no analog** and wants its FTDI driver situation sorted first. Reach for the MCP2221A; reach for the [FT232H](element.html?file=database/Organium_Elements/FT232H%20Breakout%20-%20USB%20to%20GPIO%2C%20SPI%2C%20I2C%20%28Adafruit%202264%29.md) when it isn't enough.

**Mini Jack connection diagram**: N/A — a USB interface, not a patchable module.

**Component diagram**:

- **USB-C**: power and data from the computer
- **STEMMA QT port**: I2C (SCL, SDA) + 3.3 V + GND — no soldering
- **Header pins**:
    - **G0–G3**: GPIO. G0–G2 double as **analog inputs**; G2 is also the DAC output
    - **SCL, SDA**: I2C
    - **3V**: regulated 3.3 V out · **5V**: USB rail · **GND**
    - **RX, TX**: UART · **R**: reset

**Links**: [Adafruit product page](https://www.adafruit.com/product/4471) · [CircuitPython libraries on any computer with MCP2221](https://learn.adafruit.com/circuitpython-libraries-on-any-computer-with-mcp2221) · [Microchip MCP2221A](https://www.microchip.com/wwwproducts/en/MCP2221A)

**Buy**: [Adafruit #4471](https://www.adafruit.com/product/4471). STEMMA QT cable sold separately.

**Use instructions/Tutorials**: Install **Adafruit Blinka** with the MCP2221 backend — `pip install adafruit-blinka hidapi` — and set `BLINKA_MCP2221=1` **before** `import board`. From there the CircuitPython API behaves as it does on a board.

Read the analog pin:

```python
import os
os.environ["BLINKA_MCP2221"] = "1"
import board, analogio

analog = analogio.AnalogIn(board.G1)     # G1 == ADC channel 1
print(analog.value)                      # 0 … 65535
```

Two things to know about that number. The ADC is **10-bit in hardware** — Blinka scales it into the familiar 0–65535 range, so it moves in steps of 64. And a pin connected to nothing **floats near 0**: touch a jumper to G1 and watch the value move before assuming anything is broken.

Scan and read I2C parts instead:

```python
import os
os.environ["BLINKA_MCP2221"] = "1"
import board, busio

i2c = busio.I2C(board.SCL, board.SDA)
print([hex(a) for a in i2c.scan()])      # the same STEMMA QT parts as on a Feather
```

**Arduino IDE sketches**: N/A — not an Arduino target. It is driven from Python on the host.

**Relevant software files**: `~/projects/inda/course-code/mcp2221-p5/sensor_sketch.py` — the first-year course starter: this adapter read in a background thread, driving a **p5py** (Processing-for-Python) sketch, in one file on the student's own laptop. `SIMULATE=1` runs it with no hardware. Its README carries the per-laptop install and the restart-on-unplug rule.

**Extra and gratuitous information and images**: MCP2221A, USB-C, STEMMA QT + breadboard headers, 27.0 × 17.7 × 5.0 mm, 2.2 g. I2C master to 400 kHz; 10-bit ADC ×3; 5-bit DAC ×1; 4 GPIO at 25 mA; UART. Works on Windows, macOS and Linux with no drivers, and reaches the 300+ CircuitPython sensor libraries through Blinka.html?file=database/Organium_Elements/FT232H%20Breakout%20-%20USB%20to%20GPIO%2C%20SPI%2C%20I2C%20%28Adafruit%202264%29.md), the ADS1115 and the level shifters. If several I2C parts behind it clash on address, the [PCA9548 multiplexer (#5626)](element.html?file=database/Organium_Elements/PCA9548%208-Channel%20I2C%20Multiplexer%20%28Adafruit%205626%29.md) is in the same box.
