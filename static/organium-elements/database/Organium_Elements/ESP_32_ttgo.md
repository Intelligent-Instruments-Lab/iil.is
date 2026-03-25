# ESP 32 ttgo

Type: Integrated System
Added: January 18, 2023 4:18 PM
Senses: Input from various sensors
Actuates: Forwards that input on to your computer
Status: Done
Voltage: 3.7V (?)

![esp32_ttgo-removebg-preview.jpg](esp-32-ttgo-4.jpg)

**Function**: Microcontroller

**Typical use: All Arduino-based projects**

**Good for: Instrument prototyping, wireless sensors, dedicated wifi protocols,**  

**Bad for: Audio-rate use, computationally demanding tasks**

**Sensorwiki link**:

**Buy link**: [http://www.lilygo.cn/prod_view.aspx?TypeId=50063&Id=1258](http://www.lilygo.cn/prod_view.aspx?TypeId=50063&Id=1258)

## Pinout diagram

Some pinouts are not indicated correctly (e.g. the SDA and SCL pins)

![esp32_pin.jpeg](esp-32-ttgo-3.jpeg)

[https://github.com/LilyGO/ESP32-MINI-32-V1.3](https://github.com/LilyGO/ESP32-MINI-32-V1.3)

IMPORTANT Configuration Notes:

## USB - Serial Communication

The USB connection may not be recognised automatically. It may be necessary to install the appropriate drivers for the serial communication chip of the TTGO microcontroller. Download the driver from this link https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html, and  follow the installation instructions:  https://github.com/WCHSoftGroup/ch34xser_macos

---

## I2C Communication

The I2C communication will not work out-of-the-box. This happens because the pins for the I2C communication of the TTGO is not marked correctly on the pinout diagram. 

To solve this you have to change the pins for the I2C communictaion (SDA and SCL) in the configuration file (pin_arduino.h). of the board.  Use the “Go” function of Finder (if you are on Mac), press the alt/opt key to show the hidden files (Library), and choose it. Search in this directory for the pin_arduino.h file  which is located inside Esp32 Library/model_name. Example: /Users/macmini/Library/Arduino15/packages/esp32/hardware/esp32/3.1.0/variants/ttgo-t7-v13-mini32

Change the pins in the file. Suggested pins: 

```python
static const uint8_t SDA = 19;
static const uint8_t SCL = 23;
```

Keep in mind that every time that the drivers/libraries of the ESP32 are updated the pin_arduino.h file returns to its default state and the I2C will not work, so it’s needed to be changed again.

---

## OSC Communication

Because of a conflict that might happen in some OS, when instantiating OSC communication prefer AnaloRead from pin 32 over.

---

## Rare error while uploading

Rare error caused by current spikes prevents sketch uploading, solved with: 

```python
esptool.py write_flash_status --non-volatile 0
```

---

## Power

Power the board from USB, battery connector, or use unregulated power source between 5 and 12V connected to 5V input pin and GND

![TTGO dimensions.jpeg](esp-32-ttgo-2.jpeg)

![ESPgit.jpeg](esp-32-ttgo-1.jpeg)