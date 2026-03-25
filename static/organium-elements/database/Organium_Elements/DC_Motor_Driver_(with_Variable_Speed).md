# DC Motor Driver (with Variable Speed)

Type: Connector, Power Supply
Added: February 13, 2023 11:27 AM
Senses: Manual Knob position
Actuates: DC motor speed control through PWM output
Connection: Minijack
Status: Done
Voltage: •Supply voltage: DC 2.2-12V; Output voltage: 1.8-12V; output current: <2A
Panel: Analog Outputs/Actuators 2

![PWMctrl-removebg-preview.jpg](dc-motor-driver-with-variable-speed-2.jpg)

**Name**: DC Motor Speed Controller (PWM)

**Type**: Power Supply, Controller

**Principle**: Pulse Width Modulation (PWM) - rapidly switches DC power on/off. Varying the duty cycle (on-time percentage) controls average voltage delivered to motor, thus controlling speed. Manual potentiometer adjusts duty cycle.

**Function**: Manually adjustable speed control for DC motors without requiring microcontroller programming. Turn knob to vary motor speed from stop to full speed.

**Voltage**: Input: 2.2-12V DC, Output: 1.8-12V, Max current: 2A

**Typical use**: Quick DC motor testing, simple motorized projects, prototype speed adjustment, educational demonstrations, standalone motor applications.

**Good for**:

- Fast prototyping without coding
- Simple speed control
- Testing motor performance at different speeds
- Projects not requiring programmable control
- Replacing bulky rheostats

**Bad for**:

- Detailed, programmable speed control
- Multiple motors requiring synchronized speeds
- High-current motors (>2A)
- Applications requiring precise speed feedback
- Remote or automated control

**Mini Jack connection diagram**:

- Power input: + (positive) and - (negative/ground) from power supply (2.2-12V)
- Motor output: + and - to DC motor terminals
- Manual knob adjusts PWM duty cycle

**Component diagram**:

Power Supply (2.2-12V) → PWM Controller [Knob] → DC Motor

**Links**:
N/A

**Buy**:
[Amazon.de Example](https://www.amazon.de/gp/product/B0B6TSQ1QH/)

Search: "DC PWM motor speed controller" on Amazon, AliExpress

**Make instructions**: N/A (commercial module)

**Use instructions/Tutorials**:

1. Connect power supply to input terminals (observe polarity)
2. Connect DC motor to output terminals
3. Turn knob clockwise to increase speed, counter-clockwise to decrease
4. Start with low speed and increase gradually
5. Ensure motor current doesn't exceed 2A

**Arduino IDE sketches**:
N/A - standalone analog device, no programming required

**Relevant software files**:
N/A

**Extra and gratuitous information and images**:

**Specs:**

- Max output current: 2A
- Input voltage: 2.2-12V DC
- Output voltage: 1.8-12V
- Control method: Manual potentiometer
- PWM frequency: Typically 20-30kHz (varies by model)

**Advantages over resistor-based speed control:**

- More efficient (less heat generation)
- Better torque at low speeds
- Wider speed control range

**Limitations:**

- No programmable control
- No speed feedback/regulation
- Can't reverse motor direction (requires H-bridge)
- Single motor control only

**Use case:** Quick testing and prototyping when you need "something that spins" without microcontroller complexity.

![IMG_20230213_094023.jpg](dc-motor-driver-with-variable-speed-1.jpg)