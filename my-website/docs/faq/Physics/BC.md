# How to set boundary condition?

<font face = "Calibri">

The boundary conditions include perfectly matched layer (PML), perfect electric conductor (PEC), symmetric and antisymmetric.

## 1.PML


The intensity of the light field after entering the PML will decay, which can be used to absorb the electromagnetic field at the boundary. You can set the absorption of PML through the following parameters.


* Number of layers of PML.
* Kappa Alpha and Sigma are the orders of polynomials.
* Increasing Kappa will enhance the absorption of evanescent waves and weaken the absorption of guided modes.
* Increasing Sigma will reduce reflection and increase dispersion error.
* Increasing the value of Alpha/Sigma improves the stability of absorption, but the absorption effect will decrease.
* Increasing Alpha/Sigma increases stability and reduces absorption capacity.

The light on the PML interface also generates reflections, which can be reduced by extending the structure through the boundary region.For the EME solver, Max-Optics optimized PML to improve mode orthogonality, which resulted in reduced absorption of guided modes. The general PML parameters of FDTD  are as follows: {"pml_layer":8,"pml_kappa:2,"pml_sigma":0.8,"pml_polynomial":3,"pml_alpha":0,"pml_alpha_polynomial":1}.



## 2.PEC

<div class="text-justify">
The conductivity  of PEC is infinite and the penetration depth is almost zero, used to reflect electromagnetic fields. It reflects almost 100% without any energy loss.

In FDE/EME simulation, the default boundary condition is PEC, and it can greatly reduce simulation time.

</div>

## 3.Symmetric

<div class="text-justify">
When there is a symmetry plane in the structure, certain field components must be zero on the symmetry plane. The use of symmetric boundary conditions can make the horizontal component of the electric field and the vertical component of the magnetic field zero.
In periodic structures, using symmetric boundary conditions at the boundary where the source polarization is tangent can shorten the simulation time by half.
</div>

## 4.Anti-Symmetric
Similarly, using asymmetric boundary conditions can make the vertical component of the electric field and the horizontal component of the magnetic field zero. In periodic structures, asymmetric boundary conditions are used at the boundary perpendicular to the source polarization. If used together with symmetric boundary conditions, it can save four times the time.

## What situations require strengthening the absorption of PML?

<div class="text-justify">
The default parameters of PML are more accurate for the simulation results of (Bragg grating, spot size converter), and parameter settings that increase guided mode absorption are needed for radiation devices.
For the FDTD solver, the absorption parameters of the PML layer are consistent with the Gloden software.

* Grating coupler is a device with strong radiation, which requires an increase in PML during simulation_ Sigma to improve absorption capacity.
* Users can moderately increase PML as needed_ The number of layers, but having too many layers can greatly increase simulation time.
* The PML boundary is calculated in the complex domain, so the calculation time and memory are generally more than twice that of the PEC/PML boundary.

</div>

</font>