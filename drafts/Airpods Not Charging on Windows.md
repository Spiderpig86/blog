# Airpods Not Charging on Windows

Airpods are pretty cool, especially when you never have to worry about the tangled mess of wired headphones. What’s not cool is when you own a Windows machine and plugging the USB wire to charge your Airpod doesn’t work. The steps below should apply to all Airpods, but I have personally tested it using a first generation Airpods Pro. I only realized this was a problem when after leaving the Airpods to charge via my laptop USB port for days, it never seemed to charge.

This guide is for anyone who has tried to charge their Airpods to no avail despite many resets.

## What was not the issue

If you look online, most of the guides will suggest you to reset your Airpods in case there was some other internal failure, such as the firmware for both Airpods being out of sync. Before you proceed with the rest of this guide, I recommend following those steps [here](https://support.apple.com/en-us/HT209463) first.

## The fix

The root cause of this issue is a driver problem. To fix it, all you have to do is:

1. Connect your Airpods case with your Windows machine using the charging cable you have.
2. Open Control Panel and click 'Devices and Printers'.
3. Under the 'Unspecified' dropdown group, you should see 'AirPod Case'. Double click this item.

![](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Airpods%20Not%20Charging%20on%20Windows/Step3.PNG)

4. Open the 'Hardware' tab and double click 'HID-compliant vendor-defined device'.

![](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Airpods%20Not%20Charging%20on%20Windows/Step4.PNG)

5. Click on 'Change settings'.

![](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Airpods%20Not%20Charging%20on%20Windows/Step5.PNG)

6. Click 'Disable Device'.

![](https://raw.githubusercontent.com/Spiderpig86/blog/master/images/Airpods%20Not%20Charging%20on%20Windows/Step6.PNG)

7. Finally, unplug and plug in your AirPod case. At this time, your case should charge correctly.

I hope these steps fixed the issue. If not, feel free to consult other guides or give it a good ol slap to get things working again.