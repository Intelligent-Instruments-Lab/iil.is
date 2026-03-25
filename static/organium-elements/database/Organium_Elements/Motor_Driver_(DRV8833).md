# Motor Driver (DRV8833)

Type: Amplifier, Driver
Added: February 23, 2023 2:51 PM
Senses: N/A
Actuates: Controls DC motors and stepper motors
Connection: Minijack/Jumpers
Status: Done
Voltage: 2.7-10.8V motor power, 1.8-7V logic level

**Good For:** Running lower voltage DC motors than TB6612

![E4CDF480-5C93-46C6-8BC2-6D160523FCB3.jpeg](motor-driver-drv8833-1.jpeg)

**Name**: DRV8833 Dual Motor Driver Breakout

**Type**: Driver, Amplifier

**Principle**: Dual H-bridge MOSFET driver optimized for low-voltage motors. Uses PWM for speed control and H-bridge for bidirectional control.

**Function**: Controls two DC motors independently or one bipolar stepper motor. Specifically designed for lower voltage motors (2.7-10.8V) compared to TB6612 (4.5-13.5V).

**Voltage**: 2.7-10.8V (motor power and logic inputs), Output current: 1.5A per channel continuous (2A peak)

**Typical use**: Low-voltage robotics, battery-powered projects, small DC motors, vibration motors, 3-6V motor control, portable motorized instruments.

**Good for**:

- Running lower voltage DC motors than TB6612
- Battery-powered applications (3.7V LiPo, AA batteries)
- Motors in 2.7-10.8V range
- Dual independent motor control
- Compact, efficient control
- Low quiescent current
- Wide logic voltage compatibility

**Bad for**:

- High voltage motors (>10.8V)
- High current motors (>1.5A continuous)
- Motors requiring 12V operation (use TB6612 instead)
- Heavy-duty applications

**Mini Jack connection diagram**: N/A (breakout board with headers)

**Component diagram**:

- **VM**: Motor power supply (2.7-10.8V)
- **GND**: Ground
- **AIN1/AIN2**: Motor A control inputs (2.7-10.8V logic)
- **BIN1/BIN2**: Motor B control inputs (2.7-10.8V logic)
- **AOUT1/AOUT2**: Motor A outputs
- **BOUT1/BOUT2**: Motor B outputs
- **SLP** (Sleep): Logic HIGH to enable, LOW for low-power sleep mode
- **FLT** (Fault): Outputs LOW on fault condition

**Links**:

- [Adafruit DRV8833 Motor Driver - Adafruit #3297](https://www.adafruit.com/product/3297)

**Buy**: Check link above

**Make instructions**: N/A

**Use instructions/Tutorials**:

https://learn.adafruit.com/adafruit-drv8833-dc-stepper-motor-driver-breakout-board

1. Connect VM to motor power (2.7-10.8V)
2. Connect GND
3. Connect SLP to HIGH to enable driver
4. Connect motors to AOUT/BOUT terminals
5. Control via AIN1/AIN2 and BIN1/BIN2
6. Use PWM on control pins for speed control

**Control logic**:

- IN1=HIGH, IN2=LOW: Forward
- IN1=LOW, IN2=HIGH: Reverse
- IN1=LOW, IN2=LOW: Coast (motor freewheels)
- IN1=HIGH, IN2=HIGH: Brake

**Arduino IDE sketches**:

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

**Specs**: 1.5A continuous per channel, 2A peak, 2.7-10.8V motor and logic voltage, internal current regulation, thermal shutdown, under-voltage lockout, sleep mode for power saving

**TB6612 vs DRV8833**: Use DRV8833 for 3-9V motors (LiPo batteries, small hobby motors). Use TB6612 for 6-12V motors (higher voltage applications).

**Typical applications**: vibration motor control, low-voltage actuators, battery-powered motorized projects, toy motors