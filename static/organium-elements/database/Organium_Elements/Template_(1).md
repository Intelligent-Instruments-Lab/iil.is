# Template (1)

Type: Integrated System, Sensor
Added: March 10, 2026 4:38 PM
Senses: Underwater audio (8kHz-384kHz sampling)
Actuates: Records WAV files to microSD
Connection: N/A
Status: Done
Voltage: 3 x AA batteries (4.5V)
Panel: Integrated Systems

![HydroMoth.jpg](template-1-1.png)

**Name**: HydroMoth - Underwater Acoustic Logger

**Type**: Sensor, Standalone Recording Device

**Principle**: AudioMoth variant specifically designed for underwater acoustic monitoring. Uses same core technology (EFM32 Gecko processor, MEMS microphone) with hardware modifications optimized for underwater deployment in sealed case.

**Function**: Autonomous underwater acoustic data logger. Records marine/aquatic sounds from 8kHz to 384kHz sample rates. Improved oscillator reduces clock drift during long deployments. Magnetic reed switch enables recording control without opening waterproof case.

**Voltage**: 3 x AA batteries

**Typical use**: Underwater bioacoustics, marine mammal monitoring, fish vocalizations, coral reef soundscapes, aquatic ecology research, hydrophone recording, underwater noise pollution studies.

**Good for**:

- Underwater acoustic monitoring (tested to 30m depth for 2 months)
- Marine mammal vocalizations
- Fish sounds and reef ecology
- Long-term autonomous underwater deployment
- Wet environment operation (magnetic switch)
- Re-positioned LEDs for visibility in underwater case
- Improved MEMS oscillator (reduced clock drift)
- Compatible with all AudioMoth software
- Full-spectrum underwater recording

**Bad for**:

- Very deep deployments (>60m depth limit)
- Real-time underwater monitoring
- Wireless underwater data transmission
- Applications requiring external hydrophone
- Studio-quality underwater recording

**Mini Jack connection diagram**: N/A (uses internal waterproof MEMS microphone)

**Component diagram**:

- EFM32 Gecko processor
- Waterproof MEMS microphone
- Improved 32.768 kHz MEMS oscillator
- Magnetic reed switch (start/stop without opening case)
- Re-positioned LEDs (visible in underwater case)
- MicroSD card slot
- Real-time clock (UTC)
- USB interface (configuration)
- 3 x AA battery holder

**Links**:

- [https://www.openacousticdevices.info/audiomoth](https://www.openacousticdevices.info/audiomoth) (HydroMoth section)
- [https://github.com/OpenAcousticDevices/Application-Notes/blob/master/Using_HydroMoth_to_Make_Underwater_Recordings/Using_HydroMoth_to_Make_Underwater_Recordings.pdf](https://github.com/OpenAcousticDevices/Application-Notes/blob/master/Using_HydroMoth_to_Make_Underwater_Recordings/Using_HydroMoth_to_Make_Underwater_Recordings.pdf)
- [https://www.openacousticdevices.info/purchase](https://www.openacousticdevices.info/purchase)

**Buy**:

- [https://www.openacousticdevices.info/purchase](https://www.openacousticdevices.info/purchase)
- Available through distributors and group purchases

**Make instructions**: Open-source hardware variant of AudioMoth

**Use instructions/Tutorials**:

1. Install 3 x AA batteries
2. Insert microSD card (formatted FAT32)
3. Configure using AudioMoth Configuration App (same as AudioMoth)
4. Set recording schedule and parameters
5. Install in underwater case with o-ring seal and clasp
6. Use magnetic reed switch to start/stop recordings underwater
7. Deploy at depths up to 30-60m
8. Retrieve and analyze WAV files

**Software**: Same as AudioMoth:

- AudioMoth Configuration App
- AudioMoth Time App
- AudioMoth Flash App
- Compatible with all AudioMoth firmware

**Arduino IDE sketches**: N/A (uses custom firmware)

**Relevant software files**: Open-source firmware (same codebase as AudioMoth)

**Extra and gratuitous information and images**:

**Specifications:**

- Sample rates: 8,000 to 384,000 Hz
- Microphone: Waterproof MEMS (optimized for underwater)
- Storage: MicroSD card (uncompressed WAV)
- Processor: EFM32 Gecko
- Power: 3 x AA batteries
- Dimensions: Same as AudioMoth (58mm × 48mm × 15mm)
- Depth rating: 30-60m (in underwater case)
- Oscillator: Improved 32.768 kHz MEMS (reduced drift)

**Key Differences from AudioMoth:**

1. **Re-positioned LEDs**: Visible through underwater case
2. **Improved oscillator**: 32.768 kHz MEMS oscillator reduces clock drift during long deployments
3. **Magnetic reed switch**: Start/stop recordings without opening case (critical for wet conditions)
4. **Optimized for underwater case**: Designed specifically for underwater deployment

**Underwater Case:**

- Injection-molded polycarbonate
- Sealed with clasp and compression o-ring
- Tested to 30m depth for 2 months
- Available in frosted transparent
- Velcro strap included
- Compatible with standard AudioMoth (v1.2.0 recommended for low self-noise)

**Applications:**

- Marine mammal vocal behavior (whales, dolphins, seals)
- Fish communication and spawning sounds
- Coral reef soundscape ecology
- Underwater noise pollution assessment
- Hydroacoustic surveys
- Aquatic ecosystem monitoring
- Freshwater/marine bioacoustics research

**Deployment Notes:**

- Use HydroMoth-specific underwater case for proper sealing
- Magnetic switch allows control without opening case underwater
- Improved oscillator critical for long-duration deployments (weeks/months)
- Position LEDs visible for status checking through case
- Battery life depends on recording schedule and temperature

**Software Compatibility**: 100% compatible with AudioMoth software ecosystem - configuration, firmware updates, and analysis tools all work identically

**Open Source**: Same open-source approach as AudioMoth - hardware designs and firmware available on GitHub

##