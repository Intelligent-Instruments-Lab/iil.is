# Adjustable 10k voltage divider with alligator clips

Type: Connector, Sensor
Added: January 17, 2023 10:36 AM
Senses: Resistance (of external materials/sensors)
Actuates: Analog Voltage Signal (0 to Vcc) (e.g. to microcontroller ADC input)
Connection: Aligator clips
Status: Done
Voltage: 3.3-5V (Control voltage for microcontrollers)
Panel: Analog Inputs/Sensors

![connector-removebg-preview.jpg](adjustable-10k-voltage-divider-with-alligator-clip-1.jpg)

**Name**: Adjustable 10k Voltage Divider with Alligator Clips

**Type**: Connector, Sensor

**Principle**: Voltage divider circuit. A 10kΩ potentiometer forms one half of a voltage divider, with the unknown resistive material forming the other half. The output voltage varies proportionally with the material's resistance, allowing the microcontroller's ADC to measure resistance indirectly by reading voltage.

**Function**: Provides a ready-made 10k ohm voltage divider tool for quickly testing and measuring the resistive properties of conductive materials. The potentiometer can be adjusted to optimize the voltage range for different materials. Alligator clips allow for rapid connection to test materials without soldering.

**Voltage**: 3.3-5V (matches microcontroller logic levels)

**Typical use**:

- Rapid prototyping and testing of resistive materials (conductive fabrics, conductive thread, pressure-sensitive materials, DIY sensors)
- Characterizing the resistance range of homemade sensors
- Quick experimentation with novel conductive materials
- Educational demonstrations of voltage dividers
- Finding optimal resistance pairings for sensor circuits

**Good for**:

- Fast prototyping without soldering
- Testing materials with resistance under 10k ohms
- Experimenting with unknown or variable resistive materials
- Quick connections via alligator clips
- Adjustable voltage range via potentiometer
- Educational tool for understanding voltage dividers and resistive sensing

**Bad for**:

- Testing resistive materials over 10k ohms (voltage output will be too high, reducing resolution)
- Permanent installations (alligator clips are for prototyping only)
- High-current applications (potentiometers typically rated for low power)
- Precision measurements (manual adjustment is approximate)
- Materials with very low resistance (<100Ω) where most voltage drops across the potentiometer

**Mini Jack connection diagram**:
N/A - Alligator clip connections:

- **Power (Vcc)** → One end of potentiometer (typically 3.3V or 5V from microcontroller)
- **Ground (GND)** → One alligator clip → Test material → Other alligator clip → Other end of potentiometer
- **Signal out (Vout)** → Wiper of potentiometer → Analog input pin on microcontroller (A0, A1, etc.)

**Component diagram**:

`Vcc (3.3V or 5V)
    |
[Potentiometer 10kΩ]
    |---- Vout (to ADC)
    |
[Test Material via Alligator Clips]
    |
   GND`

**Links**:

- [SparkFun Voltage Divider Tutorial](https://learn.sparkfun.com/tutorials/voltage-dividers/all)
- [All About Circuits - Voltage Divider](https://www.allaboutcircuits.com/tools/voltage-divider-calculator/)

**Buy**:
Built in-house at IIL

**Make instructions**:
To build your own:

1. Get a 10kΩ potentiometer (linear taper recommended)
2. Solder wire leads to all three terminals (two ends + wiper)
3. Attach alligator clips to the two "end" terminals
4. The wiper terminal connects to your microcontroller's analog input
5. Apply Vcc to one alligator clip and GND to the other (configuration depends on desired voltage range)

Alternative simplified configuration:

- Connect Vcc to one pot terminal
- Connect GND to the opposite pot terminal
- Test material clips into the circuit between pot wiper and one of the fixed terminals

**Use instructions/Tutorials**:

Basic Arduino code for reading resistance via voltage divider:

cpp

```
*// Adjustable 10k Voltage Divider Test*
const int sensorPin = A0;  *// Analog input pin*
const float Vcc = 3.3;     *// Supply voltage*
const float R_known = 10000.0;  *// 10k potentiometer*

void setup() {
  Serial.begin(9600);
}

void loop() {
  int rawValue = analogRead(sensorPin);
  float Vout = (rawValue / 1023.0) * Vcc;  *// Convert to voltage*
  
  *// Calculate unknown resistance using voltage divider equation// Vout = Vcc * (R_unknown / (R_known + R_unknown))// Rearranged: R_unknown = (Vout * R_known) / (Vcc - Vout)*
  
  float R_unknown = (Vout * R_known) / (Vcc - Vout);
  
  Serial.print("Voltage: ");
  Serial.print(Vout, 3);
  Serial.print(" V  |  Resistance: ");
  Serial.print(R_unknown);
  Serial.println(" Ω");
  
  delay(500);
}
```

**Measurement Tips:**

- Adjust potentiometer to get Vout near mid-range (1.65V for 3.3V supply) for best resolution
- For materials <1kΩ, adjust pot toward lower resistance
- For materials >10kΩ, this tool won't provide good resolution (use different reference resistor)
- Take multiple readings as some materials (fabric, wool) have variable contact resistance

**Arduino IDE sketches**:
Standard Arduino analogRead() function - no special libraries needed

**Relevant software files**:
N/A - basic Arduino ADC reading

**Extra and gratuitous information and images**:

**How Voltage Dividers Work for Resistive Sensing:**
Microcontrollers can easily measure voltage (via ADC) but cannot directly measure resistance. A voltage divider solves this by creating a voltage proportional to the unknown resistance.

**Formula:**
Vout = Vcc × (R_unknown / (R_known + R_unknown))

**Optimal Range:**
For best ADC resolution, the unknown resistance should be similar to the known resistance (10kΩ in this case). This keeps Vout in the middle of the voltage range where the ADC has maximum sensitivity.

**Example Readings:**

- 1kΩ material: Vout ≈ 0.3V
- 5kΩ material: Vout ≈ 1.1V
- 10kΩ material: Vout ≈ 1.65V (half of 3.3V)
- 20kΩ material: Vout ≈ 2.2V
- 100kΩ material: Vout ≈ 3.0V (approaching Vcc, poor resolution)

**Why Alligator Clips:**
The alligator clips allow for quick, temporary connections to test materials without soldering. Essential for rapid experimentation with conductive fabrics, threads, pressure-sensitive materials, and other experimental sensors used in the Organium projects.

**Applications in Musical Instruments:**

- Testing conductive wool felt for pressure sensors
- Characterizing conductive thread for wearable controllers
- Evaluating custom resistive materials for touch interfaces
- Quick testing of DIY force-sensitive resistors (FSRs)