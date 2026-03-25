# Air Pressure sensor (MP3V5010DP)

Type: Resistor, Sensor
Added: January 23, 2025 5:07 PM
Senses: Differential Air Pressure 
Actuates: Analog Voltage Signal (0.1 to 3.1V) (e.g. to microcontroller ADC input)
Connection: Jumpers
Status: Done
Voltage: 2.7 to 3.3V
Panel: Analog Inputs/Sensors

![1737645143218.jpg](air-pressure-sensor-mp3v5010dp-1.png)

**Name**:  Air Pressure Sensor (MP3V5010DP)

**Type**: Sensor

**Principle:** Piezoresistive pressure sensing - measures the deflection of a silicon diaphragm when pressure is applied, converting mechanical stress into an electrical signal.

**Function**: Measures differential air pressure (pressure difference between two ports) and outputs an analog voltage proportional to the applied pressure.

**Voltage**: 2.7V to 3.3V supply voltage

**Typical use:** Breath controllers for wind instrument synthesis, pneumatic control systems, airflow measurement, HVAC systems, respiratory monitoring devices, altitude sensing, and any application requiring low-range differential pressure measurement (0-10 kPa / 0-1.45 psi).

**Good for:**  

- Measuring breath pressure for musical controllers
- Low-range differential pressure applications
- Battery-powered projects (low power consumption: ~10mA)
- Wide temperature range applications (-40°C to +125°C)
- Accurate analog pressure readings (±5% accuracy)

**Bad for:** 

- High pressure applications (limited to 10 kPa max)
- Absolute pressure measurement (this is a differential sensor)
- Measuring liquid pressure directly without protection
- Applications requiring digital output (outputs analog voltage only)

**Mini Jack connection diagram:** -

**Component diagram:**

![Pin routing MP3V5010dp.png](air-pressure-sensor-mp3v5010dp-3.png)

**Links**: [https://www.nxp.com/docs/en/data-sheet/MP3V5010.pdf](https://www.nxp.com/docs/en/data-sheet/MP3V5010.pdf)

**Buy**: https://www.amazon.de/-/en/PIC18F4320-I-PT-MP3V5010DP-electronic-components/dp/B0D8KGRYCL/ref=sr_1_1?crid=CH7AYZ9F807K&dib=eyJ2IjoiMSJ9.2-FpX-xpeWt9eFDHtF1RnQ.YOuvuxTf1PPCEWA5eeK-T5-chCP1kuZecwv27ZFyi1M&dib_tag=se&keywords=MP3V5010DP&qid=1761234220&sprefix=mp3v5010dp%2Caps%2C122&sr=8-1

**Make instructions:** N/A (commercial component, if used on a board requires SMD soldering)

**Use instructions/Tutorials:** 

- Pin 4(Vout): Analog input on microcontroller (A0, A1, etc.)
- Pin 2 (GND): Ground
- Pin 3 (Vcc): 3.3V or 5V power supply

**Arduino IDE sketches:** 

Simple sketch for measuring pressure

```
// MP3V5010DP Pressure Sensor Reading
const float SensorOffset = 0.1; // 0.1V offset from datasheet
const float Sensitivity = 0.27; // 270mV per kPa
```

```
void setup() {
Serial.begin(9600);
}
```

```
void loop() {
int rawValue = analogRead(A0); //Change accordingly
float voltage = rawValue * (3.3 / 1023.0); // Convert to voltage
float pressure = (voltage - SensorOffset) / Sensitivity; // Convert to kPa
```

```
Serial.print("Pressure: ");
Serial.print(pressure, 2);
Serial.println(" kPa");
```

```
delay(100);
}
```

**Relevant software files**: analog input - no special libraries required

**Extra and gratuitous information and images:** 

- Sensitivity: 270 mV/kPa (analog output increases linearly with pressure)
- Output voltage range: 0.1V to 3.1V (corresponding to 0-10 kPa)
- Differential ports: Apply pressure to Port 1, reference pressure to Port 2
- Temperature compensated and calibrated on-chip
- For musical breath controllers, connect a tube to Port 1 and leave Port 2 open to atmosphere
- Requires decoupling capacitor (0.1µF) between Vcc and GND for stable operation
- 8-pin SOP package (surface mount)

Similar models: MPX5010DP, MPXV5010DP

![Decoupling for MP3V5010DP.png](air-pressure-sensor-mp3v5010dp-2.png)