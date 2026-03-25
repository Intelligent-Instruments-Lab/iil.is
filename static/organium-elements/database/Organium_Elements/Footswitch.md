# Footswitch

Type: Sensor
Added: November 20, 2024 12:08 PM
Senses: Pressure force
Actuates: Digital or analog signal (button press/release)
Connection: Minijack
Status: Done
Voltage: 3.3 - 5V
Panel: Analog Inputs/Sensors

![1732099885993 copy.png](footswitch-1.png)

**Name**: Footswitch (Foot Pedal)

**Type**: Sensor

**Principle**: Mechanical switch activated by foot pressure. Can be momentary (spring-return) or latching (toggle on/off).

**Function**: Hands-free control trigger activated by foot. Typically acts as a digital switch (on/off) but can be analog if using pressure-sensitive design.

**Voltage**: 3.3-5V (for digital switches), 0-5V analog output (for pressure-sensitive variants)

**Typical use**: Hands-free triggering in performance contexts, live looping controls, effects on/off switching, instrument mode changes, recording start/stop, page turning for digital sheet music.

**Good for**:

- Hands-free control during performance
- Momentary triggers (tap to activate)
- Sustain pedal functionality
- Live looping and effects switching
- Simultaneous hand and foot control
- Rugged, reliable triggering

**Bad for**:

- Precise timing under 10ms
- Anything else

**Mini Jack connection diagram**:

Needs a pull-up or pull-down resistor (for pull-up connect a 10k resistor between signal and pin going to Vcc, for a pull-down connect a 10k resistor between signal and pin going to GND)

**Component diagram:**

**Links**:

- [https://www.adafruit.com/category/235](https://www.adafruit.com/category/235) (foot switches and pedals)

**Buy**:

- [Adafruit Foot Switches](https://www.adafruit.com/category/235)

**Make instructions**:

Simple DIY footswitch can be made using:

- Momentary push button switch
- Wooden or 3D printed enclosure
- TRS cable connection
- Optional: rubber foot pad for grip

**Use instructions/Tutorials**:

1. Connect to digital input pin with pull-up or pull-down resistor
2. Debounce signal in software (typically 50ms delay)
3. Map to desired function (trigger, toggle, momentary action)
4. Position on floor in comfortable reach
5. Consider using with INPUT_PULLUP on Arduino for simple wiring

**Arduino IDE sketches**:
Standard digitalRead() with debouncing

`*// Example debounce code*
int footswitchPin = 2;
int lastState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

void loop() {
  int reading = digitalRead(footswitchPin);
  if (reading != lastState) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
    *// State is stable, use it*
  }
  lastState = reading;
}`

**Relevant software files**: N/A

**Extra and gratuitous information and images**:

• Switch rated for 250VAC, 10A

**Types**:

- **Momentary**: Spring-return, only active while pressed
- **Latching**: Toggle on/off with each press
- **Pressure-sensitive**: Analog output based on pressure applied

**Common applications in music**:

- Guitar effects pedals
- Keyboard sustain pedals
- Live looping controls (record/play/stop)
- Sampler triggers
- Tap tempo controls

##