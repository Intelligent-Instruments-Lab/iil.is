# Motor Diver (TB6612)

Type: Amplifier
Added: February 23, 2023 2:56 PM
Senses: N/A
Actuates: Controls DC motors and stepper motors
Connection: minijack
Status: Done
Voltage: 2.7V-5V

![5F558A2C-93EC-49B9-9D85-072CE526D57E.jpeg](motor-diver-tb6612-1.jpeg)

[Adafruit TB6612 1.2A DC/Stepper Motor Driver Breakout Board](https://www.adafruit.com/product/2448)

**Name**: TB6612FNG Dual Motor Driver Breakout

**Type**: Driver, Amplifier

**Principle**: Dual H-bridge MOSFET driver. Uses pulse-width modulation (PWM) for speed control and H-bridge configuration for bidirectional motor control.

**Function**: Controls two DC motors independently (direction and speed) or one bipolar stepper motor. Provides more efficient and compact motor control than L298N-based drivers.

**Voltage**: Logic: 2.7-5V, Motor power: 4.5-13.5V, Output current: 1.2A per channel continuous (3.2A peak)

**Typical use**: Robotics, motorized instruments, automated mechanisms, wheeled robots, pan-tilt systems, bidirectional motor control with speed variation.

**Good for**:

- Dual motor control (independent direction/speed)
- Higher efficiency than L298N (MOSFET vs BJT)
- Compact size
- Built-in protection (thermal shutdown, under-voltage lockout)
- PWM speed control
- Lower heat dissipation

**Bad for**:

- High-current motors (>1.2A continuous)
- Single-motor applications (overkill, use simpler driver)
- Motors requiring >13.5V
- Stepper motors requiring >1.2A per phase

**Mini Jack connection diagram**: N/A (breakout board with headers)

**Component diagram**:

- **VM**: Motor power supply (4.5-13.5V)
- **VCC**: Logic power supply (2.7-5V)
- **GND**: Ground
- **PWMA/PWMB**: PWM speed control inputs
- **AIN1/AIN2, BIN1/BIN2**: Direction control inputs
- **STBY**: Standby pin (HIGH to enable)
- **Motor outputs**: A01/A02 (Motor A), B01/B02 (Motor B)

**Links**:

- [Adafruit TB6612 Motor Driver - Adafruit #2448](https://www.adafruit.com/product/2448)

**Buy**: Check link above

**Make instructions**: N/A

**Use instructions/Tutorials**:

https://learn.adafruit.com/adafruit-tb6612-h-bridge-dc-stepper-motor-driver-breakout

1. Connect VCC to 3.3V or 5V logic supply
2. Connect VM to motor power supply (4.5-13.5V)
3. Connect both GND pins
4. Connect STBY to HIGH (or logic VCC) to enable
5. Connect motors to A01/A02 and B01/B02 terminals
6. Control direction via AIN1/AIN2 (motor A) and BIN1/BIN2 (motor B)
7. Control speed via PWM on PWMA/PWMB pins

**Direction control logic**:

- IN1=HIGH, IN2=LOW: Forward
- IN1=LOW, IN2=HIGH: Reverse
- IN1=LOW, IN2=LOW: Brake
- IN1=HIGH, IN2=HIGH: Brake

**Arduino IDE sketches**:

**Relevant software files**: Arduino Stepper library or other similar

**Extra and gratuitous information and images**:

**Specs**: 1.2A continuous per channel, 3.2A peak, thermal shutdown protection, internal pull-down resistors on inputs, MOSFET H-bridge (more efficient than BJT), operating temp -20°C to 85°C

**Advantages over L298N**: Lower voltage drop (0.5V vs 2V), higher efficiency (~95% vs ~70%), less heat generation, smaller size, built-in protection diodes

**Applications**: automated turntables, motorized instruments, anything robotic