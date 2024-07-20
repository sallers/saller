import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

# About the basic concept

<font face = "Calibri">

## Mode

<div class="text-justify">
Modes refer to the stable transmission of electromagnetic waves in a waveguide, with each mode corresponding to a characteristic solution of Maxwell's equation in the waveguide. Each mode has a stable field distribution and different modes are orthogonal to each other.

</div>

## Propagation constant

<div class="text-justify">
The real part of the propagation constant represents the phase velocity, while the imaginary part represents the loss or gain.
</div>

## Effective refractive index

<div class="text-justify">
The direction and velocity of propagation vary with wavelength, medium structure, and refractive index. The ratio of propagation constant to vacuum wave vector is defined as the effective refractive index of the propagation direction.

<BlockMath math="β = n_{eff} \frac{2π}{λ}" />

</div>


## Phase velocity

The propagation speed of light of a certain mode at a single frequency.

<BlockMath math="V_p = \frac{c}{n_{eff}}" />

## Group refractive index

<div class="text-justify">

A type of average refractive index formed by changes in the speed and direction of light propagation due to factors such as non-uniformity of the propagation medium and wavelength of light.

<BlockMath math="n_g=n_{eff}-λ\frac{dn}{dλ}" />

</div>

## Coupling

<div class="text-justify">

When power transmission occurs within or between waveguides, it is called coupling between two modes. Two conditions need to be met:
* The mode overlap integral is not zero.
* the phase matching condition.

</div>

</font>