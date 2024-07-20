# What is the difference between Staircase and Subcell methods?

## Staircase approximation

<font face = "Calibri">

<div class="text-justify">
The Staircase approximation simply uses the mode field of discrete points to represent the mode field of the entire element, which has high computational efficiency. When the cell undergoes discontinuous changes, it can cause non physical reflections at the interface of the cell. The Staircase approximation method is applicable to staircase waveguides, mosaic type photonic devices, and square wave modulated waveguide gratings.

![](./img/staircase.png)

</div>

## Subcell approximation

<div class="text-justify">
The Subcell approximation calculates the mode at the interface of each cell as a first-order interpolation of adjacent cells, and can simulate continuously changing photonic structures with smaller cells.The Subcell approximation method is suitable for gradient waveguides, tapers, and sinusoidal modulated waveguide gratings. When using the Subcell method, it is important to perform convergence analysis on the number of cells in the structural change area to ensure that the number of slices is sufficient.

![](./img/subcell.png)

</div>

</font>