# Analog Joystick

Added: March 19, 2026 12:04 PM
Senses: X and Y position (analog
Actuates: Analog voltage output for parameter control
Connection: Minijack
Status: Done
Voltage: 3.3-5V reference (analog output 0-VCC)
Panel: Analog Inputs/Sensors
Published: Yes

![](analog-joystick-1.jpg)
**Name**: Mini Analog Joystick - 10K Potentiometers

**Type**: Sensor, Resistor

**Principle**: Dual-axis analog joystick using two independent 10KΩ potentiometers mechanically coupled to X and Y gantry with spring-return centering mechanism. Unlike arcade-style digital joysticks, this provides continuous analog position sensing via resistive voltage dividers.

**Function**: Provides two-dimensional analog position input. Each axis outputs voltage proportional to deflection angle (±25°). Center position outputs VCC/2. Spring system returns joystick to center when released.

**Voltage**: 3.3-5V reference voltage (user-defined), analog output 0-VCC

**Typical use**: Robotics control, game controllers, camera pan/tilt, motor speed/direction, menu navigation, cursor control, manual positioning systems, analog input devices.

**Good for**:
- Smooth analog directional control
- Self-centering spring-back action
- Independent X/Y axis sensing
- Durable construction (500,000 cycle lifetime)
- Wide operating temperature range (-10~80°C)
- Simple voltage divider circuit (no complex interface)
- Tactile feedback and precise control
- Retrofitting into control panels
- Game controller projects
- Robot teleoperation

**Bad for**:
- Applications requiring >±25° deflection range
- Digital/switch-based inputs (this is analog only)
- High-precision absolute positioning (±10% resistance tolerance)
- Extreme temperature environments (<-10°C or >80°C)
- High-vibration environments without proper mounting
- Wireless applications (requires multiple analog inputs)

**Mini Jack connection diagram**: Each potentiometer has 3 connections (one side to GND, middle to analog input, other side to VCC). Requires 2 analog input pins for full X/Y sensing.

**Component diagram**:
- Dual 10KΩ potentiometers (X and Y axis)
- Spring-return centering mechanism
- X/Y mechanical gantry
- Protective housing
- 6 connection tabs (3 per potentiometer)
- Joystick grip/knob
- Mounting holes

**Links**: 
- https://www.adafruit.com/product/3102
- Datasheet: https://cdn-shop.adafruit.com/product-files/3102/C4802-001+datasheet.pdf

**Buy**: 
- Adafruit #3102 ($19.95)
- 2.8mm spade connector kit: Adafruit #4748 (fits connection tabs)

**Make instructions**: Comes fully assembled. Optional: replace springs for stronger/weaker centering force.

**Use instructions/Tutorials**:

**Basic Wiring (per axis):**
1. Connect one outer potentiometer terminal to GND
2. Connect opposite outer terminal to VCC (3.3V or 5V)
3. Connect center (wiper) terminal to analog input pin
4. Repeat for second axis
5. Use 2.8mm spade connectors for secure connections

**Arduino Code Example:**
```cpp
const int xPin = A0;  // X-axis analog input
const int yPin = A1;  // Y-axis analog input

void setup() {
  Serial.begin(9600);
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
}

void loop() {
  int xValue = analogRead(xPin);  // 0-1023 (center ~512)
  int yValue = analogRead(yPin);
  
  // Map to -100 to +100 range
  int xPos = map(xValue, 0, 1023, -100, 100);
  int yPos = map(yValue, 0, 1023, -100, 100);
  
  Serial.print("X: ");
  Serial.print(xPos);
  Serial.print(" Y: ");
  Serial.println(yPos);
  
  delay(100);
}
```

**Calibration Tips:**
- Read center position at startup and store as zero reference
- Apply deadband (±5 units) around center to eliminate drift
- Use exponential curves for fine control near center

**Arduino IDE sketches**: Basic analog reading, calibrated control, motor control mapping

**Relevant software files**: N/A (uses standard analogRead)

**Extra and gratuitous information and images**: 

**Specifications:**
- Resistance: 10KΩ ±10%
- Independent linearity: ±1%
- Temperature coefficient: ±400ppm/°C
- Output smoothness: 0.5% max
- X/Y axis range: ±25° (50° total travel per axis)
- Mechanical lifecycle: 500,000 cycles
- Operating temperature: -10°C to 80°C
- Dimensions: 67.4mm × 52.7mm × 52.7mm
- Weight: 55.9g

**Physical Construction:**
- Durable spring-loaded mechanism
- Quality tactile feel with smooth action
- Replaceable springs for custom centering force
- Six 2.8mm spade connector tabs (3 per pot)
- Panel mount compatible with standard joystick mounting

**Comparison to Digital Joysticks:**
- **Arcade joysticks**: 4-8 digital switches (on/off only), instant response
- **This joystick**: Continuous analog values, proportional control, spring-return

**Analog Input Considerations:**
- ADC resolution determines position precision (10-bit = 1024 steps per axis)
- Center reading may vary slightly between units and with temperature
- Implement software calibration for best results
- Low-pass filter recommended if electrical noise present

**Applications:**
- **Robotics**: Tank-style drive control (left Y = left motor, right Y = right motor)
- **Art installations**: Interactive control elements

**Power Consumption:** Minimal - potentiometers are passive. Current draw depends on reference voltage and pull-up resistance (typically <1mA per axis at 5V).

**Mounting:** Joystick base has mounting holes. Use in conjunction with arcade button panels or custom control boxes.
