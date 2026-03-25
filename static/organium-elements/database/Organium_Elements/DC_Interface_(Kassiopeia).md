# DC Interface (Kassiopeia)

Type: Amplifier, Connector, Power Supply
Added: January 19, 2023 10:05 AM
Senses: Control Voltage
Actuates: DC hardware (for example motors), Solenoids
Status: In progress
Voltage: 9V

![koma1-removebg-preview.jpg](dc-interface-kassiopeia-3.jpg)

The summary:

- 4 DC outputs (9V PWM or Pulse, 0.5A maximum per output)
- 4 CV / gate inputs
- 4 Intensity controls (the small pots on the top)
- DC power input 9V / 2A, center negative

There are two main ways of operating it: PWM and Pulse.

PWM Mode:

PWM gives you a pulsewidth modulated signal on the output. This is tech speak for having an output that can change its intensity, so if you were to attach a motor or LED or devices like that, you can continually give them more or less power. For a motor this would mean how fast it's spinning, for an LED how bright it is shining and so on.

You can simply use the intensity knob to set the intensity per channel. You can also feed a control voltage (CV) between 0 - 9V into the CV input and control the intensity via that CV. The setting of the intensity knob mixes together with the incoming CV.

Pulse Mode:

Pulse mode is essentially for solenoids. Instead of a continuously changing power output you get one single pulse of which you can set the intensity, e.g. how "hard" the solenoid hits. In this mode it doesn't make sense to feed a CV into the Kassiopeia but just a trigger or a gate.

Chrisi adds:

“Just for some more inspiration, with the bare DC cables I provided you, you can essentially solder them to anything that could be battery powered. We are using the Kassiopeia with small portable LCD TVs (you know the "90s trucker" kind), small record players that have a DC power supply, LED stripes, guitar pedals for "power starving" effects, motors, ... A lot of fun can be had with it :)”

[Kassiopeia Proto2 Schematics.pdf](DC%20Interface%20(Kassiopeia)/Kassiopeia_Proto2_Schematics.pdf)

![Koma2.jpeg](dc-interface-kassiopeia-1.jpeg)

![Koma3.jpeg](dc-interface-kassiopeia-2.jpeg)