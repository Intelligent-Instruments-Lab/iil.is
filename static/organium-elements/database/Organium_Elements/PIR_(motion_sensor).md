# PIR (motion sensor)

Type: Sensor
Added: February 17, 2023 2:36 PM
Senses: Motion (infrared changes from moving warm bodies)
Actuates: Digital signal (HIGH/LOW)
Connection: Minijack
Status: Done
Voltage: 5-12V DC
Panel: Digital Inputs/Sensors

![image.jpg](pir-motion-sensor-2.jpg)

![image.jpg](pir-motion-sensor-1.jpg)

**Name**: PIR Motion Sensor (Passive Infrared)

**Type**: Sensor

**Principle**: Passive infrared detection. Senses changes in infrared radiation from warm bodies (humans, animals) moving within detection range. Pyroelectric sensor detects IR differential between two zones.

**Function**: Detects motion by sensing changes in infrared heat signatures. Outputs digital HIGH when motion detected, LOW when no motion. Adjustable sensitivity and timeout duration.

**Voltage**: 5-12V DC operating voltage, digital output (3.3V or 5V compatible)

**Typical use**: Motion-activated lighting, security systems, presence detection, automatic door triggers, energy-saving systems, occupancy sensing, interactive installations.

**Good for**:

- Detecting human/animal presence
- Wide detection range (typically 5-7m)
- Low power consumption
- Adjustable sensitivity
- Adjustable timeout (how long output stays HIGH)
- No emitted radiation (passive)
- Works in darkness

**Bad for**:

- Detecting stationary objects
- Very slow movement (below detection threshold)
- Precise position tracking
- Detecting through glass or walls
- Very close proximity (<1m)
- Temperature extremes affecting accuracy

**Mini Jack connection diagram**:

![pir_schem.svg](pir-motion-sensor-3.svg)

**Component diagram**:

- **VCC**: 5-12V power
- **GND**: Ground
- **OUT**: Digital output (HIGH on motion, LOW no motion)
- **Sensitivity pot**: Adjusts detection sensitivity
- **Time delay pot**: Adjusts how long output stays HIGH after detection

**Links**:

- [https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor)
- Search: "PIR motion sensor" or "HC-SR501"

**Buy**:

- [Adafruit PIR Motion Sensor](https://www.adafruit.com/category/35)
- Common model: HC-SR501

**Make instructions**: N/A

**Use instructions/Tutorials**:

1. Connect VCC to 5-12V power
2. Connect GND to ground
3. Connect OUT to digital input pin
4. Adjust sensitivity pot for detection range
5. Adjust time delay pot for output duration (typically 5s-300s)
6. Allow 30-60s warm-up time after power-on
7. Read digital input: HIGH = motion detected, LOW = no motion

**Arduino IDE sketches**:

cpp

`int pirPin = 2;

void setup() {
  pinMode(pirPin, INPUT);
  Serial.begin(9600);
  delay(60000); // 60s warm-up
}

void loop() {
  if (digitalRead(pirPin) == HIGH) {
    Serial.println("Motion detected!");
  }
  delay(100);
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: Detection range 5-7m typical, detection angle ~120°, 5-12V DC operation, digital output, adjustable sensitivity and timeout, warm-up time 30-60s, magnetic mount on back (some models)

**Adjustments**: Two potentiometers typically control sensitivity (detection distance) and time delay (how long output stays HIGH after motion stops).

**Detection principle**: Measures IR differential between dual sensor elements. Motion causes temperature change across sensors, triggering output.

**Limitations**: Cannot detect motion through glass. Affected by ambient temperature changes. May false-trigger from heat sources (heaters, sunlight).