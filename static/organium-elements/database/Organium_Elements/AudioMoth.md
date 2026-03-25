# AudioMoth

Type: Integrated System, Sensor
Added: March 10, 2026 4:34 PM
Senses: Audio (8kHz-384kHz sampling)
Actuates: Records WAV files to microSD, USB audio output
Connection: N/A
Status: Done
Voltage: 3 x AA batteries (4.5V), USB-powered (for USB microphone mode)
Panel: Integrated Systems

![AudioMoth.jpg](audiomoth-1.png)

**Name**: AudioMoth - Full-Spectrum Acoustic Logger

**Type**: Sensor, Standalone Recording Device

**Principle**: Full-spectrum acoustic data logger based on EFM32 Gecko processor. Analog MEMS microphone with adjustable gain preamp captures audio from audible to ultrasonic frequencies. Records uncompressed WAV files to microSD card.

**Function**: Autonomous low-cost acoustic monitoring device. Records environmental sounds continuously or on schedule from 8kHz to 384kHz sample rates. Real-time clock manages scheduled recordings. Can be converted to USB microphone for live streaming.

**Voltage**: 3 x AA batteries (typical deployment), USB-powered in USB microphone mode

**Typical use**: Wildlife monitoring, bioacoustics research, bat surveys, environmental sound recording, acoustic ecology studies, noise pollution monitoring, field recordings, ultrasonic animal detection.

**Good for**:

- Long-term autonomous deployment (weeks/months on batteries)
- Full-spectrum recording (audible to ultrasonic, up to 192kHz+)
- Low-cost environmental monitoring
- Bat echolocation recording
- Scheduled/triggered recordings
- Weatherproof deployment (with case)
- Open-source hardware/firmware
- External microphone support (3.5mm jack, v1.2.0+)
- USB microphone conversion

**Bad for**:

- Real-time analysis (records to SD card)
- Wireless data transmission
- High-fidelity studio recording
- Compact wearable applications
- Applications requiring live monitoring without PC

**Mini Jack connection diagram**: 3.5mm jack for external electret condenser microphones (v1.2.0+)

**Component diagram**:

- EFM32 Gecko processor
- Analog MEMS microphone (onboard)
- Adjustable gain analog preamp
- MicroSD card slot
- Real-time clock (UTC)
- USB interface (configuration + USB mic mode)
- 3 x AA battery holder
- Switch (USB/Custom/Default positions)
- LED indicators

**Links**:

- [https://www.openacousticdevices.info/audiomoth](https://www.openacousticdevices.info/audiomoth)
- [https://github.com/OpenAcousticDevices/Application-Notes/blob/master/AudioMoth_Operation_Manual.pdf](https://github.com/OpenAcousticDevices/Application-Notes/blob/master/AudioMoth_Operation_Manual.pdf)
- [https://www.openacousticdevices.info/getting-started](https://www.openacousticdevices.info/getting-started)

**Buy**:

- [https://www.openacousticdevices.info/purchase](https://www.openacousticdevices.info/purchase)
- Available through distributors and group purchases

**Make instructions**: Open-source hardware - schematics and PCB files available on GitHub

**Use instructions/Tutorials**:

1. Install 3 x AA batteries
2. Insert microSD card (formatted FAT32)
3. Download AudioMoth Configuration App
4. Connect via USB, configure recording schedule and settings
5. Set switch to Custom or Default position
6. Deploy in field (use waterproof case for outdoor use)
7. Retrieve SD card for data analysis
8. Analyze WAV files with audio software or bioacoustics tools

**Software**:

- AudioMoth Configuration App (desktop)
- AudioMoth Time App (set clock)
- AudioMoth Flash App (firmware updates)
- AudioMoth Filter Playground (analysis)
- Mobile apps available

**Arduino IDE sketches**: N/A (uses custom firmware, not Arduino)

**Relevant software files**:

- Open-source firmware available on GitHub
- Alternative firmware options (USB microphone, GPS sync)

**Extra and gratuitous information and images**:

**Specifications:**

- Sample rates: 8,000 to 384,000 Hz
- Microphone: Analog MEMS
- Storage: MicroSD card (uncompressed WAV files)
- Processor: EFM32 Gecko (Silicon Labs)
- Power: 3 x AA batteries
- Dimensions: 58mm × 48mm × 15mm
- Weight: ~50g (without batteries)
- Real-time clock: Maintains UTC time
- Recording modes: Continuous, scheduled, triggered
- Gain: Adjustable (low/medium/high)

**Variants:**

- **AudioMoth**: Standard version
- **HydroMoth**: Underwater variant with repositioned LEDs, improved oscillator, magnetic reed switch
- **AudioMoth Dev**: Development board with JST headers, 3.5mm jack, 3.7-6V battery support
- **MicroMoth**: Micro-size (32mm × 24mm, 5g)
- **AudioMoth USB Microphone**: USB streaming variant

**Cases Available:**

- IPX7 Waterproof Case (terrestrial, with acoustic vent)
- Underwater Case (submersible to 30-60m)
- AudioMoth Dev Case (with GPS slot, battery holder, cable gland)
- USB Microphone Case

**Accessories:**

- AudioMoth GPS Board (PA1616S or PA1616D modules)
- AudioMoth GPS Hat
- External microphone (Primo EM419N cartridge)

**Applications:**

- Bat activity monitoring (ultrasonic recording)
- Bird song surveys
- Insect monitoring
- Marine mammal vocalizations (HydroMoth)
- Soundscape ecology
- Noise pollution studies
- Amphibian surveys
- Long-term acoustic monitoring

**Battery Life**: Weeks to months depending on recording schedule, sample rate, and battery quality

**Open Source**: Hardware designs, firmware, and PC applications all open-source and available on GitHub

**Community**: Active support forum and extensive application notes available

**Data Format**: Uncompressed WAV files with embedded metadata (timestamps, gain settings, battery voltage)

##