# MCP2221A USB Bridge

Type: Connector
Added: March 10, 2026 2:30 PM
Senses: USB data, I2C data, digital/analog GPIO inputs
Actuates: I2C communication, digital/analog GPIO outputs
Connection: USB-C / I2C
Status: Done
Voltage: USB powered (5V), 3.3V regulated output
Panel: DIgital Inputs/Sensors

![MCP2221.jpg](mcp2221a-usb-bridge-1.png)

**Name**: Adafruit MCP2221A Breakout - USB to GPIO/ADC/I2C Bridge

**Type**: Interface, Bridge

**Principle**: USB to I2C/GPIO/ADC/DAC interface chip. Allows computer to communicate directly with I2C devices, GPIOs, and analog signals without requiring microcontroller programming. Acts as USB HID device (no drivers needed).

**Function**: Bridges USB (computer) to I2C, GPIO, ADC, and DAC. Enables direct hardware control from Python/computer without Arduino/microcontroller. Provides I2C master interface, 4 GPIO pins (digital/analog), 10-bit ADC, and 5-bit DAC.

**Voltage**: USB powered (5V input), onboard 3.3V regulator, 3.3V logic levels

**Typical use**: Computer-based I2C sensor reading, GPIO control from PC, prototyping with CircuitPython libraries on PC, I2C device testing, data logging to computer, educational demonstrations, quick sensor iteration without firmware.

**Good for**:

- Direct I2C access from computer (no microcontroller needed)
- Running CircuitPython libraries on PC/Mac/Linux
- Rapid prototyping and testing
- 4x GPIO pins (digital or analog)
- 10-bit ADC inputs (3 channels)
- 5-bit DAC output
- STEMMA QT / Qwiic connectivity
- No driver installation (HID device)
- Python support (cross-platform)

**Bad for**:

- Standalone/embedded applications (requires PC)
- Real-time control (USB latency)
- High-speed I2C (limited to ~400kHz)
- Battery-powered applications
- Multiple simultaneous I2C masters

**Mini Jack connection diagram**: N/A (uses STEMMA QT JST SH connector and USB-C)

**Component diagram**:

- **USB-C**: Power and data from computer
- **STEMMA QT port**: I2C (SCL, SDA) + 3.3V + GND
- **Header pins**:
    - G0-G3: GPIO (digital I/O or analog input/output)
    - SCL, SDA: I2C signals
    - 3V: 3.3V regulated output
    - 5V: USB 5V power
    - GND: Ground
    - RX, TX: UART (future use)
    - R: Reset

**Links**:

- [https://www.adafruit.com/product/4471](https://www.adafruit.com/product/4471)
- [https://learn.adafruit.com/circuitpython-libraries-on-any-computer-with-mcp2221](https://learn.adafruit.com/circuitpython-libraries-on-any-computer-with-mcp2221)
- [https://www.microchip.com/wwwproducts/en/MCP2221A](https://www.microchip.com/wwwproducts/en/MCP2221A)

**Buy**: Check link above. STEMMA QT cable sold separately.

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect via USB-C to computer
2. Install Adafruit Blinka and MCP2221 libraries (Python)
3. Connect I2C devices via STEMMA QT port or header pins
4. Run Python code to control I2C/GPIO/ADC/DAC
5. Use CircuitPython libraries directly on PC
6. No firmware programming required

**Arduino IDE sketches**: N/A (not Arduino-compatible - use Python instead)

**Relevant software files**:

Python installation:

bash

`pip3 install adafruit-blinka`

**Python example**:

python

`import board
import busio
import adafruit_bme280

# Create I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create sensor object
sensor = adafruit_bme280.Adafruit_BME280_I2C(i2c)

# Read data
print(f"Temperature: {sensor.temperature}°C")
print(f"Humidity: {sensor.humidity}%")`

**Extra and gratuitous information and images**:

**Capabilities:**

- **I2C**: Master mode, up to 400kHz
- **GPIO**: 4 pins (G0-G3), 3.3V logic, 25mA max per pin
- **ADC**: 10-bit, 3 channels (G0-G2), reference to VDD
- **DAC**: 5-bit, 1 channel (G2), output voltage 0-VDD
- **UART**: RX/TX pins (limited support)

**Operating System Support**: Windows, macOS, Linux (no drivers needed - uses HID)

**Python Libraries**: Access to 300+ CircuitPython libraries for sensors, displays, and peripherals

**STEMMA QT Compatible**: Plug-and-play with Qwiic/STEMMA QT I2C devices (no soldering)

**Use Cases:**

- Quick I2C sensor testing without microcontroller
- Data logging from sensors to PC
- CircuitPython library development and testing
- Educational demonstrations
- Jupyter Notebook sensor interaction
- Google Sheets sensor logging
- Prototyping before embedded implementation

**Advantages over FT232H**: Lower cost, STEMMA QT connector included, simpler for I2C-only applications

**Limitations**:

- Requires computer connection (not standalone)
- USB latency (not suitable for real-time control)
- Single I2C master only
- GPIO limited to 4 pins

**Dimensions**: 27.0mm × 17.7mm × 5.0mm / 1.1" × 0.7" × 0.2"

**Weight**: 2.2g / 0.1oz

##