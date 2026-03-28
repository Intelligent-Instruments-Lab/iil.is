const ELEMENTS_DATE = "2026-03-28";
const ELEMENTS = [
  {
    name: "Adjustable 10k voltage divider with alligator clips",
    page: "element.html?file=database/Organium_Elements/Adjustable_10k_voltage_divider_with_alligator_clip.md",
    img: "assets/img/thumbs/adjustable-10k-voltage-divider-with-alligator-clip-1.jpg",
    type: "Connector, Sensor"
  },
  {
    name: "Air Pressure sensor (MP3V5010DP)",
    page: "element.html?file=database/Organium_Elements/Air_Pressure_sensor_(MP3V5010DP).md",
    img: "assets/img/thumbs/air-pressure-sensor-mp3v5010dp-1.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "Analog Joystick",
    page: "element.html?file=database/Organium_Elements/Analog Joystick.md",
    img: "assets/img/thumbs/analog-joystick-1.jpg",
    type: ""
  },
  {
    name: "AudioMoth",
    page: "element.html?file=database/Organium_Elements/AudioMoth.md",
    img: "assets/img/thumbs/audiomoth-1.jpg",
    type: "Integrated System, Sensor"
  },
  {
    name: "Audio Amplifiers",
    page: "element.html?file=database/Organium_Elements/Audio_Amplifiers.md",
    img: "assets/img/thumbs/audio-amplifiers-1.jpg",
    type: "Amplifier, Driver"
  },
  {
    name: "BNO055 - 9-Axis Absolute Orientation Sensor (IMU)",
    page: "element.html?file=database/Organium_Elements/BNO055 - 9-Axis Absolute Orientation Sensor (IMU).md",
    img: "assets/img/thumbs/bno055---9-axis-absolute-orientation-sensor-imu-1.jpg",
    type: "Sensor"
  },
  {
    name: "Breadboard",
    page: "element.html?file=database/Organium_Elements/Breadboard.md",
    img: "assets/img/thumbs/breadboard-1.jpg",
    type: "Connector"
  },
  {
    name: "Circular Soft Potentiometer (Ribbon Sensor)",
    page: "element.html?file=database/Organium_Elements/Circular_Soft_Potentiometer_(Ribbon_Sensor).md",
    img: "assets/img/thumbs/circular-soft-potentiometer-ribbon-sensor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Conductive Wool Felt",
    page: "element.html?file=database/Organium_Elements/Conductive Wool Felt.md",
    img: "assets/img/thumbs/conductive-wool-felt-1.jpg",
    type: "Connector, Material, Resistor, Sensor"
  },
  {
    name: "Conductive thread",
    page: "element.html?file=database/Organium_Elements/Conductive_thread.md",
    img: "assets/img/thumbs/conductive-thread-1.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "Contact Mic / Piezo",
    page: "element.html?file=database/Organium_Elements/Contact_Mic_Piezo.md",
    img: "assets/img/thumbs/contact-mic-piezo-1.jpg",
    type: "Sensor, Transducer"
  },
  {
    name: "DC Interface (Kassiopeia)",
    page: "element.html?file=database/Organium_Elements/DC_Interface_(Kassiopeia).md",
    img: "assets/img/thumbs/dc-interface-kassiopeia-3.jpg",
    type: "Amplifier, Connector, Power Supply"
  },
  {
    name: "DC Motor Driver (with Variable Speed)",
    page: "element.html?file=database/Organium_Elements/DC_Motor_Driver_(with_Variable_Speed).md",
    img: "assets/img/thumbs/dc-motor-driver-with-variable-speed-1.jpg",
    type: "Connector, Power Supply"
  },
  {
    name: "DC Motors",
    page: "element.html?file=database/Organium_Elements/DC_Motors.md",
    img: "assets/img/thumbs/dc-motors-1.jpg",
    type: "Actuator"
  },
  {
    name: "Dual Motor Driver PWM (L298N)",
    page: "element.html?file=database/Organium_Elements/Dual_Motor_Driver_PWM_(L298N).md",
    img: null,
    type: "Actuator, Amplifier, Sensor"
  },
  {
    name: "ESP 32 ttgo",
    page: "element.html?file=database/Organium_Elements/ESP_32_ttgo.md",
    img: "assets/img/thumbs/esp-32-ttgo-4.jpg",
    type: "Integrated System"
  },
  {
    name: "Electret Microphone",
    page: "element.html?file=database/Organium_Elements/Electret_Microphone.md",
    img: "assets/img/thumbs/electret-microphone-1.jpg",
    type: "Sensor"
  },
  {
    name: "Electromagnet",
    page: "element.html?file=database/Organium_Elements/Electromagnet.md",
    img: "assets/img/thumbs/electromagnet-1.jpg",
    type: "Sensor, Transducer"
  },
  {
    name: "Fabric speaker",
    page: "element.html?file=database/Organium_Elements/Fabric_speaker.md",
    img: "assets/img/thumbs/fabric-speaker-1.jpg",
    type: "Actuator"
  },
  {
    name: "Flex Sensor",
    page: "element.html?file=database/Organium_Elements/Flex_Sensor.md",
    img: "assets/img/thumbs/flex-sensor-1.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "Footswitch",
    page: "element.html?file=database/Organium_Elements/Footswitch.md",
    img: "assets/img/thumbs/footswitch-1.jpg",
    type: "Sensor"
  },
  {
    name: "Force/Pressure sensor",
    page: "element.html?file=database/Organium_Elements/Force_Pressure_sensor.md",
    img: "assets/img/thumbs/force-pressure-sensor-2.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "Goosenecks",
    page: "element.html?file=database/Organium_Elements/Goosenecks.md",
    img: "assets/img/thumbs/goosenecks-1.jpg",
    type: "Connector"
  },
  {
    name: "Hall Effect Sensor",
    page: "element.html?file=database/Organium_Elements/Hall_Effect_Sensor.md",
    img: "assets/img/thumbs/hall-effect-sensor-1.jpg",
    type: "Actuator, Amplifier, Sensor"
  },
  {
    name: "Haptic Controller Breakout (Adafruit DRV2605L)",
    page: "element.html?file=database/Organium_Elements/Haptic_Controller_Breakout_(Adafruit_DRV2605L).md",
    img: "assets/img/thumbs/haptic-controller-breakout-adafruit-drv2605l-1.jpg",
    type: "Amplifier"
  },
  {
    name: "High torque, slow DC motor",
    page: "element.html?file=database/Organium_Elements/High_torque,_slow_DC_motor.md",
    img: "assets/img/thumbs/high-torque-slow-dc-motor-1.jpg",
    type: ""
  },
  {
    name: "Hydrophone",
    page: "element.html?file=database/Organium_Elements/Hydrophone.md",
    img: null,
    type: "Sensor"
  },
  {
    name: "IANG (wireless controller)",
    page: "element.html?file=database/Organium_Elements/IANG_(wireless_controller).md",
    img: "assets/img/thumbs/iang-wireless-controller-1.jpg",
    type: "Sensor"
  },
  {
    name: "Infrared (IR) proximity senso",
    page: "element.html?file=database/Organium_Elements/Infrared_(IR)_proximity_senso.md",
    img: "assets/img/thumbs/infrared-ir-proximity-senso-1.jpg",
    type: "Sensor"
  },
  {
    name: "Jumper Connector",
    page: "element.html?file=database/Organium_Elements/Jumper_Connector.md",
    img: "assets/img/thumbs/jumper-connector-1.jpg",
    type: "Connector"
  },
  {
    name: "Laser diode (laser pointer)",
    page: "element.html?file=database/Organium_Elements/Laser_diode_(laser_pointer).md",
    img: "assets/img/thumbs/laser-diode-laser-pointer-1.jpg",
    type: "Actuator"
  },
  {
    name: "Light-Color Sensor (AS7341)",
    page: "element.html?file=database/Organium_Elements/Light-Color_Sensor_(AS7341).md",
    img: "assets/img/thumbs/light-color-sensor-as7341-1.jpg",
    type: "Sensor"
  },
  {
    name: "Light Sensor (TSL 2591)",
    page: "element.html?file=database/Organium_Elements/Light_Sensor_(TSL_2591).md",
    img: "assets/img/thumbs/light-sensor-tsl-2591-1.jpg",
    type: "Sensor"
  },
  {
    name: "MCP2221A USB Bridge",
    page: "element.html?file=database/Organium_Elements/MCP2221A_USB_Bridge.md",
    img: "assets/img/thumbs/mcp2221a-usb-bridge-1.jpg",
    type: "Connector"
  },
  {
    name: "MLX90632 FIR Temperature Sensor",
    page: "element.html?file=database/Organium_Elements/MLX90632_FIR_Temperature_Sensor.md",
    img: "assets/img/thumbs/mlx90632-fir-temperature-sensor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Male jack with alligator clips",
    page: "element.html?file=database/Organium_Elements/Male_jack_with_alligator_clips.md",
    img: "assets/img/thumbs/male-jack-with-alligator-clips-1.jpg",
    type: "Connector"
  },
  {
    name: "Mechanized string tuner",
    page: "element.html?file=database/Organium_Elements/Mechanized_string_tuner.md",
    img: "assets/img/thumbs/mechanized-string-tuner-1.jpg",
    type: ""
  },
  {
    name: "MidiSense",
    page: "element.html?file=database/Organium_Elements/MidiSense.md",
    img: "assets/img/thumbs/midisense-1.jpg",
    type: "Actuator, Amplifier, Sensor"
  },
  {
    name: "Mini Jack Cable",
    page: "element.html?file=database/Organium_Elements/Mini_Jack_Cable.md",
    img: "assets/img/thumbs/mini-jack-cable-1.jpg",
    type: "Connector"
  },
  {
    name: "Modular Aerophone (?)",
    page: "element.html?file=database/Organium_Elements/Modular_Aerophone_(_).md",
    img: null,
    type: ""
  },
  {
    name: "Motor Diver (TB6612)",
    page: "element.html?file=database/Organium_Elements/Motor_Diver_(TB6612).md",
    img: "assets/img/thumbs/motor-diver-tb6612-1.jpg",
    type: "Amplifier"
  },
  {
    name: "Motor Driver (DRV8833)",
    page: "element.html?file=database/Organium_Elements/Motor_Driver_(DRV8833).md",
    img: "assets/img/thumbs/motor-driver-drv8833-1.jpg",
    type: "Amplifier, Driver"
  },
  {
    name: "Notochord",
    page: "element.html?file=database/Organium_Elements/Notochord.md",
    img: "assets/img/thumbs/notochord-1.jpg",
    type: "Software"
  },
  {
    name: "PIR (motion sensor)",
    page: "element.html?file=database/Organium_Elements/PIR_(motion_sensor).md",
    img: "assets/img/thumbs/pir-motion-sensor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Photo-resistor",
    page: "element.html?file=database/Organium_Elements/Photo-resistor.md",
    img: "assets/img/thumbs/photo-resistor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Piezo Preamp",
    page: "element.html?file=database/Organium_Elements/Piezo_Preamp.md",
    img: "assets/img/thumbs/piezo-preamp-1.jpg",
    type: "Amplifier, Enclosure"
  },
  {
    name: "Ribbon - Linear SoftPot",
    page: "element.html?file=database/Organium_Elements/Ribbon_-_Linear_SoftPot.md",
    img: "assets/img/thumbs/ribbon---linear-softpot-1.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "SCD-30 CO2 Sensor",
    page: "element.html?file=database/Organium_Elements/SCD-30_CO2_Sensor.md",
    img: "assets/img/thumbs/scd-30-co2-sensor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Single String Pickup",
    page: "element.html?file=database/Organium_Elements/Single_String_Pickup.md",
    img: "assets/img/thumbs/single-string-pickup-1.jpg",
    type: "Sensor"
  },
  {
    name: "Soil Sensor",
    page: "element.html?file=database/Organium_Elements/Soil_Sensor.md",
    img: "assets/img/thumbs/soil-sensor-1.jpg",
    type: "Sensor"
  },
  {
    name: "Solar cell",
    page: "element.html?file=database/Organium_Elements/Solar_cell.md",
    img: "assets/img/thumbs/solar-cell-1.jpg",
    type: "Power Supply, Sensor"
  },
  {
    name: "Speakers",
    page: "element.html?file=database/Organium_Elements/Speakers.md",
    img: "assets/img/thumbs/speakers-1.jpg",
    type: "Actuator"
  },
  {
    name: "Stainless steel wool",
    page: "element.html?file=database/Organium_Elements/Stainless_steel_wool.md",
    img: "assets/img/thumbs/stainless-steel-wool-1.jpg",
    type: "Material"
  },
  {
    name: "Stereo 2.1W Class D Audio Amplifier - TPA2012",
    page: "element.html?file=database/Organium_Elements/Stereo_2_1W_Class_D_Audio_Amplifier_-_TPA2012.md",
    img: "assets/img/thumbs/stereo-2-1w-class-d-audio-amplifier---tpa2012-1.jpg",
    type: "Amplifier"
  },
  {
    name: "String rigging",
    page: "element.html?file=database/Organium_Elements/String_rigging.md",
    img: "assets/img/thumbs/string-rigging-1.jpg",
    type: "Connector"
  },
  {
    name: "Tactile Transducer",
    page: "element.html?file=database/Organium_Elements/Tactile_Transducer.md",
    img: "assets/img/thumbs/tactile-transducer-1.jpg",
    type: "Actuator, Transducer"
  },
  {
    name: "Temperature Sensor",
    page: "element.html?file=database/Organium_Elements/Temperature_Sensor.md",
    img: "assets/img/thumbs/temperature-sensor-1.jpg",
    type: "Resistor, Sensor"
  },
  {
    name: "Template",
    page: "element.html?file=database/Organium_Elements/Template.md",
    img: "assets/img/thumbs/template-1-1.jpg",
    type: "Actuator, Amplifier, Sensor"
  },
  {
    name: "Template (1)",
    page: "element.html?file=database/Organium_Elements/Template_(1).md",
    img: "assets/img/thumbs/template-1-1.jpg",
    type: "Integrated System, Sensor"
  },
  {
    name: "Tilt switch",
    page: "element.html?file=database/Organium_Elements/Tilt_switch.md",
    img: "assets/img/thumbs/tilt-switch-2.jpg",
    type: "Sensor"
  },
  {
    name: "Touch sensor (direct input on the ESP-32)",
    page: "element.html?file=database/Organium_Elements/Touch_sensor_(direct_input_on_the_ESP-32).md",
    img: "assets/img/thumbs/touch-sensor-direct-input-on-the-esp-32-1.jpg",
    type: "Sensor"
  },
  {
    name: "Ultrasonic Distance Sensor (HRSC04)",
    page: "element.html?file=database/Organium_Elements/Ultrasonic_Distance_Sensor_(HRSC04).md",
    img: "assets/img/thumbs/ultrasonic-distance-sensor-hrsc04-1.jpg",
    type: "Sensor"
  },
  {
    name: "Untitled",
    page: "element.html?file=database/Organium_Elements/Untitled.md",
    img: null,
    type: ""
  },
  {
    name: "Untitled",
    page: "element.html?file=database/Organium_Elements/Untitled_d6d2cfa4.md",
    img: null,
    type: ""
  },
  {
    name: "Untitled",
    page: "element.html?file=database/Organium_Elements/Untitled_eca3192c.md",
    img: null,
    type: ""
  },
  {
    name: "Velcro prototyping panel",
    page: "element.html?file=database/Organium_Elements/Velcro_prototyping_panel.md",
    img: "assets/img/thumbs/velcro-prototyping-panel-1.jpg",
    type: "Enclosure, Material"
  },
  {
    name: "X-Bee",
    page: "element.html?file=database/Organium_Elements/X-Bee.md",
    img: null,
    type: ""
  },
  {
    name: "Xth Sense",
    page: "element.html?file=database/Organium_Elements/Xth_Sense.md",
    img: "assets/img/thumbs/xth-sense-2.jpg",
    type: "Sensor"
  },
];
