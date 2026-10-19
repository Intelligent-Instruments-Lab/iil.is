# HydroMoth with Underwater Case

Category: PROCESSING
Modality: SYSTEMS
Type: Integrated System, Sensor
Added: July 25, 2026
Senses: Underwater sound (8kHz–384kHz sampling, audible into ultrasonic)
Actuates: Records uncompressed WAV to microSD; configurable USB audio/data interface
Connection: USB (configuration), microSD (data), magnetic reed switch
Status: Done
Voltage: 3 x AA batteries (~4.5V); USB-powered for configuration
Published: Yes

**Principle**: A submersible full-spectrum acoustic logger. It is an AudioMoth — the same EFM32 Gecko processor and analog MEMS microphone with adjustable-gain preamp — hardened for water: a conformal coating on the board resists moisture, a magnetic reed switch lets you arm/disarm it through the sealed case without opening it, an improved 32.768kHz oscillator cuts clock drift over long deployments, and the MEMS element behaves as a contact hydrophone against the sealed case wall. Sound in the water couples through the case to the microphone, is amplified, sampled and written to SD as uncompressed WAV.

**Function**: Autonomous, low-cost underwater sound recorder for extended, unattended deployments. Records continuously or on a schedule from 8kHz up to 384kHz sample rate (audible through ultrasonic), timestamped by an onboard real-time clock. Retrieve the microSD card afterwards for analysis. Frequency response is attenuated above ~40kHz once inside the underwater case.

**Voltage**: 3 x AA batteries (~4.5V) for deployment; USB provides power when configuring or flashing. Digital logic is 3.3V (EFM32).

**Typical use**:
- Underwater soundscape recording — bioacoustics (whales, fish, snapping shrimp) and harbour or shipping noise.
- Long unattended deployments on a mooring, buoy or dock line, running to a recording schedule with no cable to shore.

**Good for**:
- Cheap enough to deploy several where a research hydrophone costs 10–100x more
- Weeks-to-months of autonomous logging on AA batteries
- Full-spectrum capture — captures ultrasonic events most consumer gear misses
- Reed-switch control means no flooding risk from opening the case in the field
- Depth-tested to 30m (rated for 30–60m deployments); open firmware and active community
- Same config app / workflow as terrestrial AudioMoth — one toolchain for land and water

**Bad for**:
- Records to SD only — no live monitoring, no wireless telemetry, no real-time analysis
- Not a calibrated hydrophone: no certified sensitivity/frequency-response figures for quantitative SPL science
- Response rolls off above ~40kHz in the case — not ideal for the highest-frequency odontocete clicks
- No live streaming into an instrument or DAW while submerged
- Requires care with batteries, SD formatting and clock-setting before every deployment
- Depth limited (~30–60m) — not for deep-sea work

**Mini Jack connection diagram**: N/A — sealed underwater recorder with no external jack. Interfaces are: microSD card slot (data), USB (configuration/flashing/power), and a magnetic reed switch operated from outside the case. Onboard MEMS microphone acts as the hydrophone; there is no patchable analog signal out during deployment.

**Component diagram**: See product page / lab photo pending.

**Links**:
- [HydroMoth product page (GroupGets)](https://groupgets.com/products/hydromoth?currency=USD)
- [Open Acoustic Devices — AudioMoth/HydroMoth](https://www.openacousticdevices.info/)
- [AudioMoth Configuration App & firmware (GitHub)](https://github.com/OpenAcousticDevices/AudioMoth-Firmware-Basic)

**Buy**: [HydroMoth with Underwater Case — GroupGets](https://groupgets.com/products/hydromoth?currency=USD) ($144.99, includes HydroMoth 1.0.1 unit + AudioMoth Underwater Case)

**Use instructions/Tutorials**:
1. Install 3 x AA batteries and a FAT32-formatted microSD card.
2. Connect via USB to a computer and open the AudioMoth Configuration App.
3. Set the clock (UTC), choose sample rate, gain and recording schedule; write config to the device.
4. Seal it into the underwater case; use the magnetic reed switch to arm without opening.
5. Deploy on a mooring/line within the 30–60m depth rating.
6. Recover, dry, open, and pull the SD card; analyse the WAV files (with embedded timestamps and gain metadata) in Audacity, Raven, or a bioacoustics toolkit.

**Arduino IDE sketches**: — (runs its own EFM32 firmware, not Arduino; configured via the AudioMoth Configuration App or reflashed with AudioMoth firmware.)

**Relevant software files**: AudioMoth Configuration App, AudioMoth Time App, AudioMoth Flash App; open-source `AudioMoth-Firmware-Basic` (GitHub, fully compatible).

**Extra and gratuitous information and images**: Processor: Silicon Labs EFM32 Gecko. Microphone: analog MEMS acting as contact hydrophone; adjustable-gain preamp. Sample rates: 8,000–384,000 Hz, uncompressed WAV. Response attenuated above ~40kHz in case. Storage: microSD. Power: 3 x AA. Case depth-tested to 30m for 2 months (rated 30–60m). Improvements over stock AudioMoth: conformal coating, magnetic reed switch, better 32.768kHz oscillator, repositioned status LED for clear-case visibility. Onboard RTC keeps UTC. HydroMoth is the underwater variant of the AudioMoth family (see the separate AudioMoth entry).
![HydroMoth with Underwater Case](hydromoth-with-underwater-case-1.jpg)

**Underwater case details**: injection-moulded polycarbonate, sealed with a clasp and a compression **o-ring**, frosted transparent, Velcro strap included; body dimensions match the AudioMoth at 58 x 48 x 15 mm. (Salvaged from a duplicate HydroMoth entry that had been misfiled as "Template (1)" and was deleted on 2026-08-17.)
