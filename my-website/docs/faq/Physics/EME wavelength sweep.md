# How to set up EME scanning?

## EME length sweep

<font face = "Calibri">

<div class="text-justify">

EME has great advantages in scanning calculation in the length direction, it does not need to repeatedly calculate the modes at the interface of the divided units, and can quickly obtain the transmitted S-matrix.

Open the "length sweep" in the EME solver, select the length range of the scanning area, the number of scanning points, and the mode of the light source to obtain the s matrix transmitted by this mode.
</div>

## EME wavelength sweep

<div class="text-justify">
Due to the variation of mode distribution and effective refractive index with wavelength, wavelength scanning of EME is not suitable for scenarios with high material dispersion and mode dispersion.

Taking the classic core size 500∙200 nm^2 SOI waveguide as an example, the accuracy of wavelength scanning is within 5% in the ±40 nm wavelength range. However, this result varies depending on the size, structure, and material of the waveguide, and requires users to judge and verify based on the usage scenario.

In order to improve the calculation speed, this feature is disabled by default and can be opened in the settings of the solver EME with the option "use wavelength sweep".
</div>

</font>