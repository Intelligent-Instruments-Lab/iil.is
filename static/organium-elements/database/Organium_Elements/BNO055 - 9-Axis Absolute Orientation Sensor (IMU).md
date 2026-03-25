# BNO055 - 9-Axis Absolute Orientation Sensor (IMU)

Type: Sensor
Added: February 17, 2023 12:46 PM
Senses: Acceleration (3-axis), Angular velocity (3-axis), Magnetic field (3-axis), Absolute orientation, Temperature
Actuates: Digital data over I2C (e.g. to ESP32 microcontroller), can be forwarded via WiFi as OSC/MIDI messages
Connection: I2C
Status: Done
Voltage: 3.3 - 5V
Panel: Digital Inputs/Sensors
Published: Yes

![Acc-ESP32.jpg](bno055---9-axis-absolute-orientation-sensor-imu-1.jpg)

**Principle**: MEMS (Micro-Electro-Mechanical Systems) with intelligent sensor fusion. Combines triaxial 14-bit accelerometer (capacitive sensing), triaxial 16-bit gyroscope (Coriolis effect), and triaxial magnetometer (Hall effect) with onboard ARM Cortex-M0 processor running Bosch Sensortec sensor fusion algorithms to provide drift-free absolute orientation.

**Function**: Measures 3-axis acceleration, 3-axis angular velocity, 3-axis magnetic field, and temperature. Performs automatic sensor fusion onboard to output absolute orientation as Euler angles, quaternions, or rotation vectors. Provides automatic background calibration without user intervention.

**Voltage**: 3.3V (logic level), can be powered with 3.3-5V supply

**Typical use**:

- Wireless gesture controllers for musical expression (via ESP32 + WiFi/OSC)
- Absolute orientation tracking for interactive installations
- Motion-based instrument control with drift-free positioning
- Wearable musical instruments (gloves, armbands)
- Augmented acoustic instruments
- Head tracking for spatial audio
- Robotics and drone stabilization

**Good for**:

- **Plug-and-play orientation sensing** - sensor fusion done onboard, no complex algorithms needed
- Drift-free absolute orientation (unlike 6-axis IMUs)
- Automatic calibration - no manual calibration required
- Multiple output formats: Euler angles, quaternions, linear acceleration, gravity vectors
- Stable readings even in magnetically noisy environments
- Low computational overhead on host microcontroller
- Musical gesture control with reliable orientation data
- Newer boards have STEMMA QT connectors for solderless connections

**Bad for**:

- Budget-constrained projects (more expensive than MPU6050)
- Applications near strong magnetic fields (will affect magnetometer)
- **ESP32 with older firmware** - I2C protocol violations cause compatibility issues (use ESP-IDF 5.3.2 or later for better results)
- Use with I2C multiplexers (I2C protocol violations)
- Projects requiring only basic acceleration data (overkill for simple applications)

**Mini Jack connection diagram**: - 
N/A - Uses I2C protocol:

- VIN → 3.3-5V
- GND → Ground
- SCL → (I2C clock pin)
- SDA → (I2C data pin)
- INT → Optional interrupt pin (for motion detection interrupts)
- RST → Optional reset pin

**Component diagram**:
See images showing BNO055 connected to ESP32 via I2C

**Links**:

- [Adafruit BNO055 Guide](https://learn.adafruit.com/adafruit-bno055-absolute-orientation-sensor)
- [Adafruit BNO055 Library (GitHub)](https://github.com/adafruit/Adafruit_BNO055)

**Buy**:

- [Adafruit BNO055 Breakout](https://www.adafruit.com/product/2472)

**Use instructions/Tutorials**:

Basic BNO055 orientation reading with Adafruit library:

```
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
```

```
Adafruit_BNO055 bno = Adafruit_BNO055(55);
```

```
void setup() {
Serial.begin(115200);
```

```
if(!bno.begin()) {
Serial.println("No BNO055 detected. Check wiring!");
while(1);
}
```

```
delay(1000);
bno.setExtCrystalUse(true); // Use external crystal for better accuracy
}
```

```
void loop() {
// Get orientation as Euler angles
sensors_event_t event;
bno.getEvent(&event);
```

```
Serial.print("Heading: "); Serial.print(event.orientation.x);
Serial.print(" Roll: "); Serial.print(event.orientation.y);
Serial.print(" Pitch: "); Serial.println(event.orientation.z);
```

```
// Get calibration status (0=uncalibrated, 3=fully calibrated)
uint8_t sys, gyro, accel, mag;
bno.getCalibration(&sys, &gyro, &accel, &mag);
Serial.print("Calibration - Sys:"); Serial.print(sys);
Serial.print(" Gyro:"); Serial.print(gyro);
Serial.print(" Accel:"); Serial.print(accel);
Serial.print(" Mag:"); Serial.println(mag);
```

```
delay(100);
}
```

**Arduino IDE sketches**:

- Install "Adafruit BNO055" library via Library Manager
- Also install dependencies: "Adafruit Unified Sensor" and "Adafruit BusIO"

**Relevant software files**:

- Adafruit_BNO055 library
- For wireless transmission: ESP32 WiFi + OSC library

**Extra and gratuitous information and images**:

**Sensor Output Data Types:**

- Absolute Orientation (Euler Vector): 100Hz, 360° sphere
- Absolute Orientation (Quaternion): 100Hz, four-point quaternion
- Angular Velocity Vector: 100Hz, rad/s
- Acceleration Vector: 100Hz, m/s² (gravity + linear motion)
- Magnetic Field Strength Vector: 20Hz, micro Tesla (µT)
- Linear Acceleration Vector: 100Hz, m/s² (acceleration minus gravity)
- Gravity Vector: 100Hz, m/s² (minus any movement)
- Temperature: 1Hz, degrees Celsius

**CRITICAL ESP32 NOTE:**
The BNO055 I2C implementation violates the I2C protocol in some circumstances. With ESP32 and ESP32-S3, use CircuitPython 9.2.2 or later (which use ESP-IDF 5.3.2 or later) for better compatibility. Earlier versions may have reliability issues. Operation with SAMD51, RP2040, STM32F4, and nRF52840 is more reliable. **If experiencing I2C communication problems with ESP32, try updating to the latest ESP-IDF version.**

**Hardware Features:**

- Newer boards include STEMMA QT connectors for solderless I2C connections
- Onboard 10kΩ pull-up resistors on I2C lines
- I2C Address: 0x28 (default) or 0x29 (if ADR pin connected to 3.3V)

**Operating Modes:**

- Config Mode: Configuration only
- Non-Fusion Modes: Raw sensor data access
- Fusion Modes: IMU, COMPASS, M4G, **NDOF** (9-axis absolute - recommended for musical applications)

**Musical Applications:**

- Used in:
    
    [MidiSense](MidiSense%20295a02c4d7f080f38401ebb4ba1b5106.md)
    
- Common mapping: Euler angles → continuous parameters, sharp movements → triggers
