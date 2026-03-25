# Touch sensor (direct input on the ESP-32)

Type: Sensor
Added: October 2, 2024 2:45 PM
Senses: Touch (capacitive sensing of conductive contact)
Actuates: Continuous digital values
Connection: N/A
Status: Done
Voltage: N/A (integrated into ESP32 microcontroller, powered by board voltage)
Panel: N/A

![image.png](touch-sensor-direct-input-on-the-esp-32-1.png)

**Name**: Capacitive Touch Sensor (Built-in ESP32 Touch Pins)

**Type**: Sensor

**Principle**: Capacitive touch sensing. Detects changes in capacitance when conductive material (fingers, skin) contacts or approaches sensor pin. ESP32 measures capacitance variation on dedicated touch pins.

**Function**: Built-in capacitive touch sensing on ESP32 microcontroller. Direct touch detection without external components. Touch pins marked as TOUCH1, TOUCH2, etc. on board diagram.

**Voltage**: N/A (powered by board voltage, typically 3.3V)

**Typical use**: Touch-based parameter control, button alternatives, gestural interfaces, capacitive switches, interactive surfaces, wearable touch controls.

**Good for**:

- No external components required
- Multiple touch inputs available
- Direct integration with ESP32
- Adjustable sensitivity
- Low-cost touch sensing
- Can work through thin non-conductive materials

**Mini Jack connection diagram**: N/A (direct GPIO pins on ESP32 board)

**Component diagram**: Touch pins marked usually as TOUCH1, TOUCH2, etc. on ESP32 board diagram

**Links**:

- [https://docs.espressif.com/projects/arduino-esp32/en/latest/api/touch.html](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/touch.html)

**Buy**: N/A (integrated feature on ESP32 boards)

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Identify touch pins on ESP32 board from ESP32 pinout diagram
2. Use Arduino-ESP32 Touch API
3. Read touch values and set threshold
4. For better interaction: Attach wider conductive surface (foil, copper tape) to pin
5. Larger surface improves touch detection and performance ease
6. Calibrate threshold values for your application

**Arduino IDE sketches**:

cpp

`// Using ESP32 touch pins
int touchPin = T0; // TOUCH1 on TTGO/ESP32

void setup() {
  Serial.begin(9600);
}

void loop() {
  int touchValue = touchRead(touchPin);
  Serial.println(touchValue);
  
  if (touchValue < 40) { // Threshold (adjust)
    Serial.println("Touch detected!");
  }
  delay(100);
}`

**Relevant software files**: Requires Arduino-ESP32 board support

**Extra and gratuitous information and images**:

**Touch pins on ESP32**: Multiple touch-capable GPIO pins available (exact number depends on board variant). Consult board diagram for pin locations.

**Improving interaction**: Limited pin surface makes direct touch difficult during performance. Solution: Attach conductive material (aluminum foil, copper tape, conductive fabric) to pin to create larger touch surface.

**Sensitivity adjustment**: Threshold values vary based on surface area, material, and environmental conditions. Calibrate by reading baseline values and setting appropriate detection threshold.

**API**: Use ESP32 touchRead() function. Returns capacitance value (lower = touched, higher = not touched). Set threshold based on calibration.

**Applications**: Touch-based instrument controls, interactive installations, wearable interfaces, capacitive buttons, gestural controllers