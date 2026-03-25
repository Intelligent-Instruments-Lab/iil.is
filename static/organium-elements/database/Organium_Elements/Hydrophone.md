# Hydrophone

Type: Sensor
Added: January 11, 2023 2:48 PM
Senses: Underwater sound, vibrations in water
Actuates: Audio signal output
Connection: Minijack
Status: Done
Voltage: Depends on preamp circuit (typically 3.3-9V)


**Name**: Hydrophone (Underwater Microphone)

**Type**: Sensor

**Principle**: Piezoelectric transducer converts underwater sound pressure waves into electrical signals. Waterproofed housing protects electronics while allowing acoustic coupling.

**Function**: Detects and records sounds underwater. Converts acoustic vibrations in water to electrical audio signals.

**Voltage**: Preamp circuit typically 3.3-9V (piezo element itself is passive)

**Typical use**: Underwater sound recording, marine biology research, underwater performance installations, aquatic instrument sensing, hydroacoustic monitoring, interactive water installations.

**Good for**:

- Recording underwater sounds
- Detecting aquatic life vocalizations
- Water-based installations
- Sensing underwater impacts/vibrations
- Long cable runs (low impedance with preamp)

**Bad for**:

- Airborne sound detection
- High-frequency ultrasonic detection (bandwidth limited)
- Deep diving (pressure limits depend on construction)
- Precise localization without multiple units

**Mini Jack connection diagram**: Audio output to recorder/amplifier/audio interface

**Component diagram**: Piezo element → Preamp circuit → Waterproof housing → Audio output cable

**Links**:

- [DIY Hydrophone by Sasha Leitmann (CCRMA)](https://ccrma.stanford.edu/~sleitman/Hydrophone/)

**Buy**:

- DIY components: piezo transducer, cable, waterproofing materials
- Commercial: Aquarian Audio, Dolphin Ear hydrophones

**Make instructions**:

See comprehensive DIY guide: [https://ccrma.stanford.edu/~sleitman/Hydrophone/](https://ccrma.stanford.edu/~sleitman/Hydrophone/)

**Basic DIY approach:**

1. Use piezo transducer element
2. Build simple preamp circuit (op-amp based)
3. Waterproof with silicone/epoxy/balloon
4. Use shielded audio cable
5. Test in shallow water first

**Use instructions/Tutorials**:

1. Submerge hydrophone in water
2. Connect output to audio recorder/interface
3. Adjust preamp gain for optimal level
4. Record or process audio signal
5. Avoid handling cable during recording (vibrations transmit)

**Arduino IDE sketches**: Can connect to analog input for processing, or use audio interface for recording

**Relevant software files**: Standard audio recording/processing software

**Extra and gratuitous information and images**:

**Construction considerations:**

- Piezo element must be acoustically coupled to water
- Complete waterproofing essential
- Cable strain relief prevents leaks
- Preamp improves signal quality and reduces noise
- Frequency response typically 20Hz-20kHz

**Applications:**

- Field recording underwater environments
- Interactive water installations responding to splashes
- Marine biology monitoring
- Underwater musical instruments
- Detecting impacts on water containers

**DIY vs Commercial:** DIY hydrophones work well for creative projects. Commercial units offer better frequency response, depth rating, and durability for professional applications.