# Conductive thread

Type: Resistor, Sensor
Added: January 19, 2023 4:59 PM
Senses: Touch, Bend, Pressure.
Actuates: Electrical signals through sewable circuits in textiles
Connection: sewing
Status: Done
Voltage: 3.3-5 for connected circuits
Panel: E-textiles

![conductive.jpg](conductive-thread-1.jpg)

**Name**: Conductive Thread (Stainless Steel, 3-ply)

**Type**: Resistor, Sensor, Connector

**Principle**: Stainless steel fibers twisted together to create a conductive, sewable thread. Conducts electricity while being flexible enough to sew by hand or machine. Resistance increases with length (~10 ohms per foot).

**Function**: Sewable conductor for creating circuits in textiles and wearables. Can be used to connect electronic components, create touch sensors, pressure sensors, or flexible connections in fabric-based projects.

**Voltage**: 3.3-5V (typical for embedded electronics), suitable for low-power applications

**Typical use**: E-textile projects, wearable electronics, soft circuits, capacitive touch sensors (with ESP-32’s capacitive sensor pins or Bela Trill), connecting LEDs in fabric, flexible switches, DIY pressure sensors, textile-based instruments.

**Good for**:

- Sewing circuits into fabric (hand or machine sewable)
- Capacitive touch sensing applications
- Flexible/stretchable connections
- Wearable electronics where rigid wires won't work
- Creating touch-sensitive textile surfaces
- Connecting components in soft materials
- Aesthetic circuit traces that integrate with textile design

**Bad for**:

- High current applications (resistance ~10Ω/foot causes voltage drop)
- Long-distance connections (resistance adds up)
- High-power circuits (LEDs should be low-power)
- Precision circuits requiring exact resistance values
- Applications requiring very low resistance connections
- High-frequency signals (not shielded, susceptible to interference)

**Mini Jack connection diagram**:
N/A - Sew directly to component pads or use with conductive fabric patches for connections. Can be soldered to PCBs or crimped into connectors.

**Component diagram**:
Thread sewn through fabric connecting: Power → Component → Ground, or creating sensor patterns for capacitive touch.

**Links**:

- [Adafruit Conductive Thread Tutorial](https://learn.adafruit.com/conductive-thread)
- [SparkFun E-Textiles Tutorial](https://learn.sparkfun.com/tutorials/lilypad-basics-e-sewing)

**Buy**:

- [Adafruit - Stainless Medium Conductive Thread (3-ply, 18m/60ft)](https://www.adafruit.com/product/641)

**Make instructions**: N/A (commercial product)

**Use instructions/Tutorials**:

**Sewing tips:**

- Use hand sewing or regular sewing machine
- Keep stitches tight and secure
- Tie off ends well to prevent unraveling
- Test conductivity with multimeter as you sew
- Avoid crossing positive and negative traces (shorts!)
- Use insulating fabric or stitches to separate traces
- ~10Ω per foot - measure actual resistance for your length

**For capacitive touch with ESP-32:**

- Connect thread to jumper wire and connect jumper wire to capacitance reading pin on ESP-32

[Touch sensor (direct input on the ESP-32)](Touch%20sensor%20(direct%20input%20on%20the%20ESP-32)%20113a02c4d7f080fb9fbdc72b61c13928.md)

**For capacitive touch with Trill:**

- Sew conductive thread pattern on fabric
- Connect thread ends to Trill sensor inputs
- Thread creates capacitive sensing area
- Touch changes capacitance, detected by Trill

**For LEDs:**

- Use low-power LEDs (high resistance thread causes voltage drop)
- Keep traces short
- Consider parallel paths for multiple LEDs
- Test voltage at LED to ensure adequate power

**Arduino IDE sketches**: N/A

**Relevant software files**:

- CapacitiveSensor library (Arduino) / ESP-32 has built-in capacitive pins
- Trill library for Bela/Arduino
- Standard GPIO for switches/connections

**Extra and gratuitous information and images**:

**Strength**: Moderate (can break with excessive tension)

**Care instructions:**

- Can be washed gently (hand wash recommended)
- Avoid bleach and harsh chemicals
- Check connections after washing
- May corrode over time with moisture