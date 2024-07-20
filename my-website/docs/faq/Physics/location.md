# How to set the position of the light source and monitor?

<div class="text-justify">

<font face = "Calibri">

To reduce simulation errors caused by grid accuracy, the Source and Monitor should be placed in the position of the straight waveguide.

The calculation of "mode source" in FDTD is based on the position and size of the mode light source, so the calculated mode is suitable for stable transmission on cross-sections of the same size. If the position of the light source set by the user is in an area with structural changes, numerical errors may occur when encountering other waveguide cross-sections of different sizes without forming stable transmission due to the discretization of the Yee grid. Therefore, it is recommended that at least 3 grids around the Source be in the straight waveguide region, and the Monitor will also have the same problem when detecting mode energy. It is also recommended that at least 3 grids around the Monitor be in the straight waveguide region.

![](./img/location.png)

</font>

</div>