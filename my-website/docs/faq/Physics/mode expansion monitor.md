# What is Mode expansion monitor?

<font face = "Calibri">

<div class="text-justify">

The pattern expansion monitor, as a sub attribute of the power monitor, inherits the position, size, wavelength range, and frequency points of the power monitor.
</div>

# The meaning of each option in mode selection?

<div class="text-justify">
In the user selection feature, the mode index starts from 0, and users can customize the number of monitoring modes by entering a list [0, 1, 2, 3,...].

"Fundamental Mode" represents the selection of the first given mode, "Fundamental TE Mode" represents the selection of the first TE mode, which is usually TE0 mode in the 2D waveguide section, "Fundamental TM Mode" represents the selection of the first TM mode, which is usually TM0 in the 2D waveguide section, and "User Select" represents user-defined ".

Frequency points can be set separately and will solve for the specified number of FDE modes. Before simulation, FDE calculations will be performed on each frequency point of the mode monitor. 
</div>

# When is the mode extension monitor enabled?

<div class="text-justify">
If there are too many frequency points in the mode monitor, it will increase the simulation time. If the input and output waveguides of the device are both single-mode waveguides, the distance between waveguides is relatively long, and the coupling is weak, and the device does not have polarization and mode conversion, the mode extension of the power monitor can not be enabled.In the presence of polarization, mode conversion, or overlap in the monitoring area of the power monitor in the device, it is necessary to enable mode unfolding of the power monitor to obtain more accurate simulation results.The settings for mode deployment monitoring can refer to (examples\precision\FDTD_HalfRing.py).


</div>

</font>