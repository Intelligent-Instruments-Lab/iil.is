# Ultrasonic Distance Sensor (HRSC04)

Type: Sensor
Added: January 23, 2025 4:10 PM
Senses: Distance via ultrasonic wave reflection
Actuates: Digital pulse duration output
Connection: 4-pin (VCC, Trig, Echo, GND)
Status: Done
Voltage: 3 - 5V
Panel: Digital Inputs/Sensors

![ultrasonic-distance-sensor-hrsc04-2.png](ultrasonic-distance-sensor-hrsc04-2.png)

**Name**: Ultrasonic Distance Sensor (HC-SR04)

**Type**: Digital Sensor

**Principle**: Time-of-flight measurement using ultrasonic waves (~40kHz). Emits ultrasonic burst, measures time until echo returns, calculates distance.

**Function**: Measures distance to objects by emitting ultrasonic pulse and timing its return. Two transducers: emitter sends burst, receiver detects reflection. Distance calculated from pulse duration.

**Voltage**: 3-5V DC operating voltage

**Typical use**: Distance measurement, proximity detection, object detection, collision avoidance, automatic door triggers, level sensing, parking sensors.

**Good for**:

- Non-contact distance measurement (2cm-400cm range)
- Optimal range: 10cm-250cm
- Wide beam angle (~15°)
- Simple digital interface (Trig/Echo)
- Low cost
- Works in darkness

**Bad for**:

- Very small distances (<2cm)
- Motion sensing (use PIR instead)
- Precise angular positioning
- Soft/absorbent materials (poor reflection)
- Angled surfaces (must be perpendicular ±15°)

**Mini Jack connection diagram**: Does not follow mini jack protocol due to 4-pin design

**Component diagram**:

![Screenshot 2025-02-04 at 13.42.59.png](ultrasonic-distance-sensor-hrsc04-3.png)

**Pin configuration**:

- **VCC**: 5V power (can work with 3.3V but reduced range)
- **Trig**: Trigger input (send 10µs HIGH pulse)
- **Echo**: Echo output (pulse width = time to target)
- **GND**: Ground

**Links**:

- [https://www.adafruit.com/product/3942](https://www.adafruit.com/product/3942)
- [https://randomnerdtutorials.com/esp32-hc-sr04-ultrasonic-arduino/](https://randomnerdtutorials.com/esp32-hc-sr04-ultrasonic-arduino/)

**Buy**: Check links above

**Make instructions**: You need to include the relevant library in the Arduino IDE. Search for Adafruit + name of the sensor

**Use instructions/Tutorials**:

1. Connect VCC to 5V, GND to ground
2. Connect Trig to digital output pin
3. Connect Echo to digital input pin
4. Send 10µs HIGH pulse to Trig
5. Measure Echo pulse width (in microseconds)
6. Calculate distance: **distance (cm) = pulse duration (µs) / 58**
7. Target surface must be perpendicular to sensor (±15° tolerance)

**Arduino IDE sketches**:

[HR_SC04.ino](Ultrasonic%20Distance%20Sensor%20(HRSC04)/HR_SC04.ino)

**Relevant software files**: HC-SR04 arduino library

**Extra and gratuitous information and images**:

**Specs**: Range 2cm-400cm (optimal 10cm-250cm), beam angle ~15°, frequency ~40kHz, measuring cycle 60ms minimum, accuracy ±3mm

**How it works**:

1. Trig pin receives 10µs HIGH pulse → sensor emits 8-cycle ultrasonic burst
2. Echo pin goes HIGH when burst transmitted
3. Echo pin goes LOW when reflection received
4. Pulse width on Echo = time to target and back
5. Distance = (pulse duration × speed of sound) / 2

**Distance calculation**: Speed of sound ~343 m/s = 29.15 µs/cm (one way). Round trip = 58 µs/cm. Therefore: **distance (cm) = pulse duration (µs) / 58**

**Surface requirements**: Best results with hard, flat surfaces perpendicular to sensor. Soft materials (foam, fabric) absorb ultrasound poorly. Angled surfaces reflect away from sensor.

![1737645143242.jpg](ultrasonic-distance-sensor-hrsc04-1.jpg)

## 

```
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // ets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  //Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  //Calculate the distance
  distanceCm = duration * SOUND_SPEED/2;

  //digitalWrite(trigKasPin, LOW);
  //delay(1000);
  //digitalWrite(trigKasPin, HIGH);
  //delay(500);
```