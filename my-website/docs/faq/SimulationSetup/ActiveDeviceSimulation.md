# Active Device Simulation

<br/><font face = "Calibri">

## 1. How to perform an active device simulation

Follow the steps below to perform an electrical simulation

1. Create a simulation project
2. Add materials and modify the parameters
3. Add structures and specify the material
4. Add doping
5. Add electrodes
6. Add local mesh, surface recombination, electrical monitors
7. Add an OEDevice solver, including simulation region, solver mode, generation rate, and convergence control settings
8. Run solver
9. Extract results

<br/>

Note:

1. If optical simulation is still required, after adding materials, you need to bind optical material properties to each material and add other optical simulation-related settings.
2. For electrical simulation, materials, structures, electrode settings, and an OEDevice solver are essential. Doping, local mesh, surface recombination, and electrical monitors can be set as needed.

<br/>

## 2. How to set up doping

Doping is added and set up through the `add_doping` function. The format of the function is
```python
st.add_doping(name, type, property)
```

`add_doping()` parameters:

- `name`--Doping name
- `type`--Doping type. Options are `"n"`, `"p"` and `"file"`. 
- `property`--Other properties

<br/>

### 2.1 Function doping

When `type` is set to `"n"` or `"p"`, function doping is applied. In this case, `type` also means the doping species, with `"n"` for donor and `"p"` for acceptor.

<br/>

Property list of function doping:

|                               | default | type  | notes                                              |
| :---------------------------- | :------ | :---- | :------------------------------------------------- |
| geometry.x                    |         | float |                                                    |
| geometry.x_span               |         | float |                                                    |
| geometry.y                    |         | float |                                                    |
| geometry.y_span               |         | float |                                                    |
| geometry.z                    |         | float |                                                    |
| geometry.z_span               |         | float |                                                    |
| geometry.x_min                |         | float |                                                    |
| geometry.x_max                |         | float |                                                    |
| geometry.y_min                |         | float |                                                    |
| geometry.y_max                |         | float |                                                    |
| geometry.z_min                |         | float |                                                    |
| geometry.z_max                |         | float |                                                    |
| general.distribution_function |         | str   | Selections are ['constant', 'gaussian']            |
| general.concentration         |         | float |                                                    |
| general.source_face           |         | str   | Available when distribution_function is 'gaussian' |
| general.junction_width        |         | float | Available when distribution_function is 'gaussian' |
| general.ref_concentration     |         | float | Available when distribution_function is 'gaussian' |
| volume.volume_type            | 'all'   | str   | Selections are ['all', 'material', 'region']       |
| volume.material_list          |         | list  | Available when volume_type is 'material'           |
| volume.region_list            |         | list  | Available when volume_type is 'region'             |

Description:

- `geometry`--Set the geometry parameters of doping box

- `general`--Set the distribution function, concentration and so on
  - `distribution_function`:
    - When it's set to `"constant"`, constant doping is applied and only `concentration` is required
    - When it's set to `"gaussian"`, Gaussian function doping is applied, and `concentration`, `ref_concentration`, `junction_width`, `source_face`  are required
  - `concentration`--Concentration in the non-diffusion area
  - `ref_concentration`--Concentration on the edge of diffusion area (edge of doping box)
  - `junction_width`--Diffusion junction width
  - `source_face`--The doping source face. Options are `"lower_x"`, `"lower_y"`, `"lower_z"`, `"upper_x"`, `"upper_y"` or `"upper_z"`. `"lower_x"` means the source face is `x=x_min`. Similarly for the rest. There is no diffusion area on the edge of source face. As for the other edges, there is a diffusion area respectively within the doping box.
  
- `volume`--Set a list of regions or materials to be doped
  - `volume_type`:
  - When it's set to `"all"`(by default)，the doping is applied to all the (semiconductor) structures, restricted by the doping box
    
  - When it's set to `"material"`, `material_list` is required, which means the doping is applied to the structures of the specified materials and restricted by the doping box
    
  - When it's set to `"region"`, `region_list` is required, which means the doping is applied to the specified structures and restricted by the doping box

<br/>

#### Gaussian doping explanation

![diagram of gaussian doping](./img/GaussianDoping.png)

<center>Fig 1. Gaussian doping</center>

As shown above, for Gaussian doping, there is a partition of constant doping profile in the doping box, and the constant concentration is the value of `concentration`. The width from the edge of constant area to the edge of doping box is `junction_width`. Concentration on the edge of doping box is the value of `ref_concentration`. (Note: There is no junction at the edge of source face.)

<br/>

#### Example for function doping

```python
st.add_doping(name="p_constant", type="p", property={
    "geometry": {"x": 0, "x_span": 1, "y": 0, "y_span": 1, "z": 0, "z_span": 1},
    "general": {"distribution_function": "constant", "concentration": 1e16},
    "volume": {"volume_type": "material", "material_list": [mt["mat1"], mt["mat2"]]}})
st.add_doping(name="n_diffusion", type="n", property={
    "geometry": {"x": 0, "x_span": 1, "y": 0, "y_span": 1, "z": 0, "z_span": 1},
    "general": {"distribution_function": "gaussian", "source_face": "upper_z", "junction_width": 0.1,
                "concentration": 1e18, "ref_concentration": 1e6},
    "volume": {"volume_type": "region", "region_list": ["Structure1", "Structure2"]}})
```

<br/>

### 2.2 Imported doping

When `type` is set to `"file"`, doping is imported from a file. 

<br/>

Property list for imported doping:

|                         | default   | type   | notes                                                       |
|:------------------------|:----------|:-------|:------------------------------------------------------------|
| general.format          |           |  str   | Selections are ['DOP']                                      |
| general.file_path       |           |  str   |                                                             |
| general.species         |           |  str   | Selections are ['n', 'p']                                   |
| volume.volume_type      | 'all'     |  str   | Selections are ['all', 'material', 'region']                |
| volume.material_list    |           |  list  | Available when volume_type is 'material'                    |
| volume.region_list      |           |  list  | Available when volume_type is 'region'                      |

Description:

- `general`:
  - `format`--Set the format of doping file. Only `"DOP"` is supported currently
    - When it's set to `"DOP"`, the doping file is a text file that stores a doping profile in rectangular grid. There are three columns in the file, which are the first dimension coordinate [um], the second dimension coordinate [um] and the doping concentration [cm^-3] respectively. Doping concentration should be non-negative.
  - `file_path`--The absolute path of the doping file
  - `species`--Set the doping species. Option are `"n"` and `"p"`, with `"n"` for donor and `"p"` for acceptor.
- `volume`--Set a list of regions or materials to be doped, which is exactly the same as the case of function doping.

<br/>

#### Example for imported doping

```python
st.add_doping(name="p_imported", type="file", property={
    "general": {"format": "DOP", "file_path": p_file_path, "species": "p"},
    "volume": {"volume_type": "material", "material_list": [mt["mat1"], mt["mat2"]]}})
```

<br/>

## 3. How to set up electrical boundary condition

Electrodes and electrical boundary conditions are set up through the `add_electrode` function. The format of the function is

```python
st.add_electrode(name, property)
```

`add_electrode()` parameters:

- `name`--Electrode name
- `property`--Other properties

<br/>

There are two different type of electrical boundary conditions, which are `"steady_state"`and `"transient"`, specified by the property `bc_mode`.

<br/>

### 3.1 Steady state boundary condition

When the property `bc_mode` is set to `"steady_state"`, the steady state boundary condition is applied.

<br/>

Property list of steady state boundary condition:

|                               | default      | type    | notes                                            |
|:------------------------------|:-------------|:--------|:-------------------------------------------------|
| force_ohmic                   | true         | bool    |                                                  |
| bc_mode                       | steady_state | string  | Selections are ['steady_state'].                 |
| apply_AC_small_signal         | none         | string  | Selections are ['none', 'All'].                         |
| sweep_type                    | single       | string  | Selections are ['single', 'range', 'value'].     |
| voltage                       | 0            | float   | Available when sweep_type is 'single'            |
| range_start                   | 0            | float   | Available when sweep_type is 'range'             |
| range_stop                    | 1            | float   | Available when sweep_type is 'range'             |
| range_interval                | 1            | float   | Available when sweep_type is 'range'             |
| range_num_points              | 2            | integer | Available when sweep_type is 'range'             |
| []sweep_value_table.index     |              | integer | Available when sweep_type is 'value'.            |
| []sweep_value_table.number    |              | float   | Available when sweep_type is 'value'.            |
| surface_type                  | solid        | string  | Selections are ['solid'].                        |
| solid                         |              | string  |                                                  |

Description:

- `surface_type`--Type of the surface to be set as an electrode. Currently only `"solid"` is supported, meaning that all the surfaces of a structure are selected
- `solid`--Name of the structure to be set as an electrode. Available when `surface_type` is set to `"solid"`
- `force_ohmic`--Whether the electrode is ohmic, default to be `True`. Currently only ohmic contact is supported, so `force_ohmic` can't be set to `False`
- `bc_mode`--Set to `"steady_state"` for steady state boundary condition
- `apply_AC_small_signal`:
  - When it's set to `"none"` (as default), no AC small signal is applied at each sweeping voltage
  - When it's set to "All", the AC small signal is applied after steady state simulation at each sweeping voltage

- `sweep_type`--Type of sweeping voltage. Options are `"single"`, `"range"` and `"value"`
  - When it's set to `"single"`, `voltage` is required
  - When it's set to `"range"`, `range_start`, `range_stop`, and `range_interval` or `range_num_points` are required
  - When it's set to `"value"`, `sweep_value_table` is required
- `voltage`--Set the value of the single voltage
- `range_start`--Set the start value of the voltage range
- `range_stop`--Set the stop value of the voltage range
- `range_interval`--Set the voltage interval of the voltage range
- `range_num_points`--Set the number of points of the voltage range
- `sweep_value_table`--Table of voltage values. It's a list, whose item is a dictionay. In each of its item:
  - `index`--Set the index of the voltage value
  - `number`--Set the value of the voltage

<br/>

#### Example for single voltage

```python
st.add_electrode(name="anode", property={
    "solid": "Anode", "bc_mode": "steady_state", "sweep_type": "single",
    "voltage": 0, "apply_AC_small_signal": "none"})
```

<br/>

#### Example for voltage range

```python
st.add_electrode(name="anode", property={
    "solid": "Anode", "bc_mode": "steady_state", "sweep_type": "range",
    "range_start": 0, "range_stop": 1, "range_interval": 0.5, "apply_AC_small_signal": "none"})
```

<br/>

#### Example for voltage table

```python
st.add_electrode(name="anode", property={
    "solid": "Anode", "bc_mode": "steady_state", "sweep_type": "value",
    "sweep_value_table": [{"index": 0, "number": 0}, {"index": 1, "number": 0.5}, {"index": 2, "number": 1}]})
```

<br/>

### 3.2 Transient boundary condition

When the property `bc_mode` is set to `"transient"`, the transient boundary condition is applied.

<br/>

Property list of transient boundary condition:

|                                      | default      | type    | notes                                            |
|:-------------------------------------|:-------------|:--------|:-------------------------------------------------|
| force_ohmic                          | true         | bool    |                                                  |
| bc_mode                              |              | string  | Selections are ['transient'].                    |
| voltage                              | 0            | float   |                                                  |
| []time_table.time_start              |              | float   |                                                  |
| []time_table.time_stop               |              | float   |                                                  |
| []time_table.initial_step            |              | float   |                                                  |
| []time_table.max_step                |              | float   |                                                  |
| []time_table.optical.enabled         | 0            | integer | Selections are [0, 1]                            |
| []time_table.optical.envelop         |              | integer | Selections are [0]                               |
| []time_table.optical.source_fraction |              | float   |                                                  |
| surface_type                         | solid        | string  | Selections are ['solid'].                        |
| solid                                |              | string  |                                                  |

Description:

- `surface_type`, `solid`, `force_ohmic`--The same as the one in steady state condition
- `bc_mode`--Set to `"transient"` for transient boundary condition. Then the time dependence of the optical generation rate can be set at this electrode
- `voltage`--Set the voltage that  is applied to the electrode and a steady state simulation is performed first. The transient simulation is based on the steady state result. The optical generation rate is not applied during the steady state simulation.
- `v_step_max`--Set the max step of the voltage from the equilibrium state to steady state at the bias of `voltage`.
- `time_table`--Set the time dependence of optical generation rate. It's a list, whose item is a dictionary. In each of its item:
  - `time_start`--Set the start time point of the range. The value of `0` represents the steady state of the earlier simulation.
  - `time_stop`--Set the stop time point of the range
  - `initial_step`--Set the initial time step of the range
  - `max_step`--Set the max time step of the range
  - `optical`--Set the optical generation rate during the time range
    - `enabled`--Whether to apply optical generation rate during the time range. The value of `1` means `True`, and `0` means `False`
    - `envelop`--The envelop of the scaling factor of the light power during the time range. When it's set to `0`, the envelop is uniform
    - `source_fraction`--When `envelop` is set to`0`, this value is the scaling factor of the light power during the time range

<br/>

#### Example for transient boundary condition

```python
st.add_electrode(name="cathode", property={
    "solid": "Cathode", "bc_mode": "transient", "voltage": 1, "v_step_max": 0.5,
    "time_table": [{"time_start": 0, "time_stop": 2e-12, "initial_step": 1e-12, "max_step": 5e-12},
                   {"time_start": 2e-12, "time_stop": 50e-12, "initial_step": 1e-15, "max_step": 1e-12,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": 1e-3}},
                   {"time_start": 50e-12, "time_stop": 600e-12, "initial_step": 1e-12, "max_step": 10e-12,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": 1e-3}}]})
```

<br/>

### 3.3 Set up the appropriate boundary condition

When solving the frequency response of optical signal for the device, transient simulation should be performed. In this case, the `bc_mode` of the corresponding electrode should be set to `"transient"`, and the `solver_mode` of OEDevice solver should be set to `"transient"`, too.

In most of other cases, steady state or SSAC simulation is needed, the `bc_mode` of electrodes should be `"steady_state"`.

- When solving capacitance and resistance with respect to frequency, SSAC simulation is required. The `solver_mode` of OEDevice solver should be set to `"SSAC"`, and the `apply_AC_small_signal` of the corresponding electrode should be set to `"All"`.
- When running steady state simulation, just set the `solver_mode` of OEDevice solver to `"steady_state"`.

<br/>

## 4. How to set up surface recombination

Surface recombination is added and set up through `add_surface_recombination` function. The format of the function is

```python
st.add_surface_recombination(name, property)
```

`add_surface_recombination()` parameters:
- `name`--Name of the surface recombination
- `property`--Other properties

<br/>

Property list of surface recombination:

|                        | default             | type   | notes                                                                                                                |
|:-----------------------|:--------------------|:-------|:---------------------------------------------------------------------------------------------------------------------|
| surface_type           | domain_domain       | string | Selections are ['domain_domain', 'material_material'].                                                               |
| interface_type         | null                | string | Selections are ['null', 'InsulatorInterface', 'HomoJunction', 'HeteroJunction', 'MetalOhmicInterface', 'SolderPad']. |
| infinite_recombination | true                | bool   | Available when interface_type is 'MetalOhmicInterface'                                                               |
| velocity_hole          | 0                   | float  | Available when interface_type is 'MetalOhmicInterface'/'InsulatorInterface'                                          |
| velocity_electron      | 0                   | float  | Available when interface_type is 'MetalOhmicInterface'/'InsulatorInterface'                                          |
| domain_1               |                     | string | Available when surface_type is 'domain_domain'                                                                       |
| domain_2               |                     | string | Available when surface_type is 'domain_domain'                                                                       |
| material_1             |                     | material | Available when surface_type is 'material_material'                                                                 |
| material_2             |                     | material | Available when surface_type is 'material_material'                                                                 |

Description:

- `surface_type`--Type of selection for the surface
  - When `surface_type` is `"domain_domain"`, the surface is the interface between two structures 
  - When `surface_type` is "material_material"`, the surface is the interface between two materials
- `interface_type`--Type of contact for the surface
  - `"InsulatorInterface"`--Semiconductor-insulator interface
  - `"HomoJunction"`--Homogeneous semiconductor-semiconductor interface
  - `"HeteroJunction"`--Heterogeneous semiconductor-semiconductor interface
  - `"MetalOhmicInterface"`--Semiconductor-conductor interface
  - `"SolderPad"`--Conductor-insulator interface
- `infinite_recombination`--Only available when `interface_type` is `"MetalOhmicInterface"`. The surface recombination velocity of holes and electrons will be available when `infinite_recombination` is `False`
- `velocity_hole`, `velocity_electron`--Surface recombination velocity of holes and electrons. Available when `interface_type` is `"MetalOhmicInterface"` or `"InsulatorInterface"`
- `domain_1`, `domain_2`--Names of the two structures at the interface. They must be set explicitly when `surface_type` is `"domain_domain"`
- `material_1`, `material_2`--The two materials at the interface. They must be set explicitly when `surface_type` is `"material_material"`

<br/>

## 5. How to simulate 3dB bandwidth of photodetector

The OEDevice solver doesn’t support simulations for the small signal of optical generation currently. Therefore, the frequency response of photo detector can only be obtained by transient simulation.

<br/>

### 5.1 Introduction for obtaining frequency response through transient simulation

First, obtain current-time (I-t) curve after applying optical generation in transient simulation. And then postprocess the I-t curve to get the frequency response.

Note:

- Please take the chapter “3.2 Transient boundary condition” above as reference for transient simulation setup;
- Optical generation is applied at one time point, and keeps until the photo current goes stable. That is, the dependency of optical generation rate on time is a step function and the I-t curve is the step response of photo current;
- The transient time ranges from the start of optical generation applying, to the time the photo current goes stable;
- At the beginning when optical generation is turned on, the photo current ramps up very rapidly, so small time step is needed during the period. When photo current varies slowly, the time step can be increased appropriately to shorten the simulation time;
- The high field mobility model of the material can be applied for a more accurate result of bandwidth;
- It is often desirable to set up the convergence control parameters to enhance the convergence of transient simulations.

<br/>

### 5.2 Comparison between transient simulation and small signal simulation

Transient simulation is fully nonlinear and can capture all the effects generated by a signal. In contrast, small-signal simulation is a linear approximation performed on a steady-state result. Consequently, all nonlinear effects caused by large signals are lost in this mode.

During small-signal simulation, the accuracy increases as the signal amplitude decreases. However, the accuracy of transient simulation is not affected by the signal amplitude. With appropriate settings, the accuracy of transient simulation can be higher than that of small-signal simulation.

<br/>

## 6. How to set up materials

<br/>

### 6.1 Material setup

When performing optical and electrical simulations, it usually takes two steps to set up a material.

First, add an electrical material through `add_lib` function. The format of the function is

```python
mt.add_lib(name, data, order, override)
```

`add_lib()` parameters:

- `name`--Custom material name
- `data`--Material data, requiring one of the built-in materials in the electrical material library, namely `mo.OE_Material`
- `order`--`mesh_order` of the material, default to be 2
- `override`--Override the default electronic parameters by custom values. It's empty by default, which means default models and parameters are applied

<br/>

Second, use the `set_optical_material` function to set the optical property for the material. The format of `set_optical_material` is

```python
set_optical_material(data)
```

`set_optical_material()` parameters：

- `data`--Optical material property，which can be one of the built-in materials in the optical material library `mo.Material`, or be from the custom optical material.

<br/>

#### Example of material setup

```python
mt.add_lib(name="mat_ge", data=mo.OE_Material.Ge,
           order=2, override=elec_Ge_properties) # elec_Ge_properties is a variable storing the modified electronic parameters for Germanium
mt["mat_ge"].set_optical_material(data=mo.Material.Ge_Palik)
```

<br/>

#### Example of using custom optical material properties

```python
mt.add_lib(name="mat_sio2", data=mo.OE_Material.SiO2, order=1)
mt.add_nondispersion(name="mat_sio2_op", data=[(1.444, 0)], order=1)
mt["mat_sio2"].set_optical_material(data=mt["mat_sio2_op"].passive_material)
```



Note:

1. Although the electrical and optical material properties are bound together through a two-step setting, in reality, there is no inherent connection between them. For instance, it is possible to set both the electrical properties of SiO2 and the optical properties of Si for the same material. The simulation will not generate errors or warnings in such cases, so users need to determine by themselves whether the material settings align with the physics.

2. The FDTD simulation currently doesn't support metal materials. Therefore, the optical property of metal materials should be set to `mo.Material.PEC` and the material name should also be `"pec"`.

<br/>

### 6.2 Electronic parameters of materials

Semiconductor Si and Ge support basic，band，mobility，velocity saturation and high field setting. Taking Ge as an example, the variable `elec_Ge_properties` below can be used to override its default electronic parameters.

```python
elec_Ge_properties = {"model": {"high_field": True, "mobility_force": "EQF"},
                      "basic": {"model": "Default",
                                "Default": {"affinity": 4.5-0.65969/2.0, "permitti": 16.0}, "print": 1},
                      "mobility": {"model": "Masetti",
                                   "Masetti": {"pc_e": 0, "mu_min1_e": 850, "mu_min2_e": 850, "mu1_e": 0, "mumax_e": 3900,
                                               "cr_e": 2.6e17, "alpha_e": 0.56, "pc_h": 0, "mu_min1_h": 300,
                                               "mu_min2_h": 300, "mu1_h": 0, "mumax_h": 1800, "cr_h": 1e17, "alpha_h": 1}, "print": 1},
                      "band": {"model": "Default",
                               "Default": {
                                   # DOS
                                   "nc300": 1.1372e+19, "nv300": 3.9189e+18,
                                   # Bandgap
                                   "eg300": 0.65969, "chi300": 4.5-0.65969/2.0,
                                   # Bandgap Narrowing
                                   "v0_bgn": 0,
                                   # Auger Recombination
                                   "augan": 1e-30, "augap": 1e-30, "augbn": 0, "augbp": 0, "augcn": 0, "augcp": 0, "aughn": 0, "aughp": 0,
                                   # SRH Recombination
                                   "taunmax": 1.5e-9, "taupmax": 1.5e-9, "nsrhn": 7.1e15, "nsrhp": 7.1e15,
                                   # Radiative Recombination
                                   "c_direct": 6.41e-14}, "print": 1},
                       "vsat": {"model": "Canali",
                                "Canali": {"beta0n": 2, "beta0p": 1, "betaexpn": 0, "betaexpp": 0, "alpha": 0, "vsatn0": 6e6, "vsatp0": 5.4e6,
                                "vsatn_exp": 0, "vsatp_exp": 0}, "print": 1}}
```

Description:

- `basic`--Set the permittivity and affinity

- `band`--Set models and parameters of the band and the recombination

- `mobility`--Set the model and parameters of mobility

- `model`--Set the switch of high field mobility model and Fermi-Dirac statistics model

- `vsat`--Set the model and parameters of velocity saturation

For the detailed introduction about electronic parameters, please refer to the document `examples/active_demo/Physics_Model_in_OEDevice.pdf`.

<br/>

## 7. How to set up OEDevice solver

The OEDevice solver is added and set up through `simu.add` function. The format of the function is

```python
simu.add(name, type, property)
```

`simu.add()` parameters:

- `name`--Name of the solver
- `type`--Type of the solver. For active device simulation, the type of carrier transport solver is `"OEDevice"`
- `property`--Other properties

<br/>

Property list of OEDevice solver:

|                                          | default           | type    | notes                                                        |
| :--------------------------------------- | :---------------- | :------ | :----------------------------------------------------------- |
| general.norm_length                      | 1.0               | float   |                                                              |
| general.solver_mode                      | steady_state      | string  | Selections are ['steady_state', 'transient', 'SSAC'].        |
| general.temperature_dependence           | Isothermal        | string  | Selections are ['Isothermal'].                               |
| general.simulation_temperature           | 300               | float   |                                                              |
| advanced.non_linear_solver               | Newton            | string  | Selections are ['Newton'].                                   |
| advanced.linear_solver                   | MUMPS             | string  | Selections are ['MUMPS', 'LU', 'BCGS'].                      |
| advanced.use_quasi_fermi                 | disabled          | string  | Selections are ['disabled', 'enabled'].                      |
| advanced.damping                         | none              | string  | Selections are ['none', 'potential'].                        |
| advanced.potential_update                | 1.0               | float   |                                                              |
| advanced.multi_threads                   | let_solver_choose | string  | Selections are ['let_solver_choose', 'set_thread_count'].    |
| advanced.thread_count                    | 4                 | integer |                                                              |
| advanced.max_iterations                  | 30                | integer |                                                              |
| advanced.use_global_max_iterations       | true              | bool    |                                                              |
| advanced.poisson_max_iterations          | 30                | integer |                                                              |
| advanced.ddm_max_iterations              | 30                | integer |                                                              |
| advanced.relative_tolerance              | 1.0e-5            | float   |                                                              |
| advanced.tolerance_relax                 | 1.0e+5            | float   |                                                              |
| advanced.divergence_factor               | 1.0e+25           | float   |                                                              |
| genrate.genrate_path                     |                   | string  |                                                              |
| genrate.source_fraction                  |                   | float   |                                                              |
| genrate.coordinate_unit                  | m                 | string  | Selections are ['m', 'cm', 'um', 'nm'].                      |
| genrate.field_length_unit                | m                 | string  | Selections are ['m', 'cm', 'um', 'nm'].                      |
| geometry.dimension                       | 2d_x_normal       | string  | Selections are ['2d_x_normal', '2d_y_normal', '2d_z_normal']. |
| geometry.x                               |                   | float   |                                                              |
| geometry.x_span                          |                   | float   |                                                              |
| geometry.x_min                           |                   | float   |                                                              |
| geometry.x_max                           |                   | float   |                                                              |
| geometry.y                               |                   | float   |                                                              |
| geometry.y_span                          |                   | float   |                                                              |
| geometry.y_min                           |                   | float   |                                                              |
| geometry.y_max                           |                   | float   |                                                              |
| geometry.z                               |                   | float   |                                                              |
| geometry.z_span                          |                   | float   |                                                              |
| geometry.z_min                           |                   | float   |                                                              |
| geometry.z_max                           |                   | float   |                                                              |
| small_signal_ac.perturbation_amplitude   | 0.001             | float   |                                                              |
| small_signal_ac.frequency_spacing        | single            | string  | Selections are ['single', 'linear', 'log'].                  |
| small_signal_ac.frequency                | 1.0e+6            | float   |                                                              |
| small_signal_ac.start_frequency          | 1.0e+06           | float   |                                                              |
| small_signal_ac.stop_frequency           | 1.0e+09           | float   |                                                              |
| small_signal_ac.frequency_interval       | 9.9999e+10        | float   |                                                              |
| small_signal_ac.num_frequency_points     | 2                 | integer |                                                              |
| small_signal_ac.log_start_frequency      | 1.0e+06           | float   |                                                              |
| small_signal_ac.log_stop_frequency       | 1.0e+10           | float   |                                                              |
| small_signal_ac.log_num_frequency_points | 2                 | integer |                                                              |

Description:

- `geometry`：

  - `dimension`--Set the dimension of the simulation region. Only 2D simulation is supportd currently. When it's set to `"2d_x_normal"`, the simulation is on the yz plane. Similarly for the rest

- `general`:

  - `norm_length`--Set the length in the third dimension, default to be 1
  - `solver_mode`--Set the simulation mode. Steady state, transient and SSAC simulations are supported
  - `temperature`--Set the simulation temperature
  - `temperature_dependence`--Set the type of the temperature dependence. Only `"Isothermal"` is supported currently 

- `genrate`:

  - `genrate_path`--Set the absolute path of the optical generation rate file (gfile)
    - When it's set to `""` (by default), and empty string , no optical generation rate will be applied
    - When it's not empty, the gfile at the path will be imported to apply the optical generation rate

  - `coordinate_unit`--Set the coordinate unit in the gfile
  - `field_length_unit`--Set the length unit in the generation rate unit in the gfile
  - `source_fraction`--Set the scaling factor for the light power. The imported optical generation rate will be multiplied by this factor first, and then be used to solve the carrier transport

- `small_signal_ac`:

  - `perturbation_amplitude`--Set the voltage amplitude of the small signal
  - `frequency_spacing`--Set the spacing type of the frequency
    - When it's set to `"single"`, the frequency point is single
    - When it's set to `"linear"`, the frequency points are uniformly sampled
    - When it's set to `"log"`，the frequency points are uniformly sampled base on the logarithm of frequency
  - `frequency`--Set the value of the single frequency
  - `start_frequency`--Set the start frequency of linear spacing
  - `stop_frequency`--Set the stop frequency of linear spacing
  - `frequency_interval`--Set the frequency interval of linear spacing
  - `num_frequency_points`--Set the number of frequency points of linear spacing
  - `log_start_frequency`--Set the start frequency of logarithmic spacing

  - `log_stop_frequency`--Set the stop frequency of logarithmic spacing

  - `log_num_frequency_points`--Set the number of frequency points of logarithmic spacing

- `advanced`:

  - `non_linear_solver`--Set the non-linear solver, only Newton method is supported currently
  - `linear_solver`--Set the linear solver. Options are `"MUMPS"`, `"LU"`, `"BCGS"`.  `MUMPS` and `LU` are direct linear solvers which usually give the exact solution. However, `MUMPS` supports parallel computation while `LU` doesn't. ；`"BCGS"` is a Krylov subspace (KSP) iterative solver, which also supports parallel computation and is more efficient but can only give approximate results.
  - `use_quasi_fermi`--Whether to directly solve for the quasi-Fermi potential instead of carrier concentration as unkowns. `"enabled"` means `True`, and `"disabled"` means `False`
  - `damping`--Set the nonlinear update damping scheme. `"potential"` means the damping is based on the potential variation
  - `potential_update`--Set the threshold potential for potential damping. The large value will reduce the strength of damping effect
  - `multi_threads`:
    - When it's set to `"let_solver_choose"`, the solver will determine the number of threads to use. The default maximum number of threads is 4
    - When it's set to `"set_thread_count"`, the number of threads is set by the user to `thread_count`
  - `thread_count`--Custom number of threads
  - `max_iterations`--Set global maximum number of iterations, available when `use_global_max_iterations` is `True`
  - `use_global_max_iterations`--Whether to use global max iterations during the initialization of solving the Poisson equations and the subsequent computing for solving the drift-diffusion equations coupling with Poisson equations, default to be `True`
  - `poisson_max_iterations`--Set the max iterations during the initialization of solving the Poisson equations, available when `use_global_max_iterations` is `False`
  - `ddm_max_iterations`--Set the max iterations during the subsequent computing for solving the drift-diffusion equations coupling with Poisson equations, available when `use_global_max_iterations` is `False`
  - `relative_tolerance`--Set the relative update tolerance
  - `tolerance_relax`--Set the tolerance relaxation factor for convergence on relative tolerance criteria
  - `divergence_factor`--Nonlinear solver fault with divergence when each individual function norm exceeds the threshold as its absolute tolerance multiply by this factor

<br/>

## 8. How to set up electrical monitors

Electrical monitors are added and set up through `mn.add` function. The format is

```python
mn.add(name, type, property)
```

`mn.add()` parameters:

- `name`--Monitor name
- `type`--Monitor type. Options are `"charge_monitor"`, `"electric_monitor"`and `"band_monitor"`, which are for recording carrier concentration, electric field and potential, band structure respectively
- `property`--Other properties

<br/>

Property list of electrical monitors:

|                               | default | type    | notes                                                        |
| :---------------------------- | :------ | :------ | :----------------------------------------------------------- |
| geometry.monitor_type         | point   | string  | Selections are ['point', 'linear_x', 'linear_y', 'linear_z', '2d_x_normal', '2d_y_normal', '2d_z_normal', '3d']. |
| geometry.x                    |         | float   |                                                              |
| geometry.x_span               |         | float   | Restrained by condition: >=0.                                |
| geometry.x_min                |         | float   |                                                              |
| geometry.x_max                |         | float   |                                                              |
| geometry.y                    |         | float   |                                                              |
| geometry.y_span               |         | float   | Restrained by condition: >=0.                                |
| geometry.y_min                |         | float   |                                                              |
| geometry.y_max                |         | float   |                                                              |
| geometry.z                    |         | float   |                                                              |
| geometry.z_span               |         | float   | Restrained by condition: >=0.                                |
| geometry.z_min                |         | float   |                                                              |
| geometry.z_max                |         | float   |                                                              |
| geometry.interpolate_accuracy | 0       | integer |                                                              |

Description:

- `geometry`:
  - `monitor_type`--Set the dimension type of the monitor. For electrical monitors, only 1D type and 2D type are available currently
    - When it's `charge_monitor` or `electric_monitor`, Options `"linear_x"`, `"linear_y"`, `"linear_z"`, `"2d_x_normal"`, `"2d_y_normal"`, `"2d_z_normal"` are available. `"linear_x"` means the monitor is of 1D type and is along the x-direction, so the `y_span` and `z_span` should be 0. `"2d_x_normal"` means the monitor is of 2D type and is in the yz plane, so the `x_span` should be 0. Similarly for the rest

  - `interpolate_accuracy`--Set the accuracy of the rectangular grid for extracting the monitor result. Its value ranges from 1 to 10, where `1` means the grid size is 10nm, and `10` means the grid size is 1nm, and the grid size varies uniformly with the variation in `interpolate_accuracy`.

<br/>

#### Examples of add electrical monitors

```python
mn.add(name="electric_2d", type="electric_monitor", property={
        "geometry": {"monitor_type": "2d_x_normal", "x": 0, "x_span": 0, "y_min": -1, "y_max": 1, "z_min": -1, "z_max": 1,
                     "interpolate_accuracy": 4}})
    
mn.add(name="electric_1d", type="electric_monitor", property={
    "geometry": {"monitor_type": "linear_z", "x": 0, "x_span": 0, "y_min": 0, "y_max": 0, "z_min": -1, "z_max": 1,
                 "interpolate_accuracy": 4}})
    
mn.add(name="band_1d", type="band_monitor", property={
    "geometry": {"monitor_type": "linear_x", "x": 0, "x_span": 2, "y_min": 0, "y_max": 0, "z_min": 0, "z_max": 0,
                 "interpolate_accuracy": 4}})
```

<br/>

## 9. How to set up eletrical local mesh

< br/>

### 9.1 Electrical local mesh in a rectangle region

Electrical local mesh in a rectangle region is added and set up through `add_emesh` function. The format is

```python
st.add_emesh(name, property)
```

`add_emesh()` parameters:

- `name`--Custom name
- `property`--Other properties

Property list of electrical local mesh in a rectangle region:

|           | default | type  | notes                                  |
| :-------- | :------ | :---- | :------------------------------------- |
| x         |         | float |                                        |
| x_span    |         | float | Restrained by condition: >=0.          |
| x_min     |         | float |                                        |
| x_max     |         | float |                                        |
| y         |         | float |                                        |
| y_span    |         | float | Restrained by condition: >=0.          |
| y_min     |         | float |                                        |
| y_max     |         | float |                                        |
| z         |         | float |                                        |
| z_span    |         | float | Restrained by condition: >=0.          |
| z_min     |         | float |                                        |
| z_max     |         | float |                                        |
| mesh_size |         | float | max size of electrical simulation mesh |

Description:

- `mesh_size`--Set the max size of electrical mesh grid in the region

Note:

1. When the simulation region is in the xy plane, only the parameters in the x, y direction are effective, and parameters in the z direction will be ignored. Similarly for the rest.

<br/>

#### Example of electrical local mesh in a region setting

```python
st.add_emesh(name="local_mesh", property={
    "y": 0, "y_span": 1, "z": 0, "z_span": 1, "mesh_size": 0.01})
```

<br/>

### 9.2 Electrical local mesh along a line

Electrical local mesh along a line is added and set up through `add_emesh_alone_line` function. The format is

```python
st.add_emesh_alone_line(name, property)
```

`add_emesh_alone_line()` parameters:

- `name`--Custom name
- `property`--Other properties

Property list of electrical local mesh along a line:

|                | default   | type   | notes                                  |
|:---------------|:----------|:-------|:---------------------------------------|
| start_x        |  0        | float  |                                        |
| start_y        |  0        | float  | Restrained by condition: >=0.          |
| start_z        |  0        | float  |                                        |
| end_x          |  1        | float  |                                        |
| end_y          |  1        | float  |                                        |
| end_z          |  1        | float  | Restrained by condition: >=0.          |
| mesh_size      |  0.01     | float  |                                        |

Description:

- `start_x`--Set x coordinate of the start point. Similarly for the rest
- `mesh_size`--Set the max size of electrical mesh grid in the range

Note:

1. When the simulation region is in the xy plane, besides `start_x`, `start_y`, `end_x` and  `end_y`, it is also required to set the `start_z` and  `end_z`, which should both be the same as the z coordinate of the plane. Similarly for the rest.

<br/>

#### Example of electrical local mesh along a line setting

```python
st.add_emesh_along_line(name="local_mesh_along_line", property={
    "start_x": 0, "start_y": -1, "start_z": -1, "end_x": 0, "end_y": 1, "end_z": 1, "mesh_size": 0.01})
```

<br/>


## 10. How to extract electrical result

The simulation results are extracted by the `extract` function in SDK.

<br/>

### 10.1 Extract generation rate

Generation Rate is extracted from result_afdtd (result of AFDTD simulation). The format is

```python
result_generate = result_afdtd.run_generation_rate_analysis(name, monitor, average_dimension, light_power, coordinate_unit, field_length_unit)
result_generate.extract(data, export_csv, show, log, savepath)
```
`result_afdtd.run_generation_rate_analysis()` parameters:

- `name`--Custom name
- `monitor`--Name of the `power_monitor` for calculating optical generation rate. The `power_monitor` is required to be of 3D type
- `average_dimension`--Set the direction to take the average of the optical generate rate
- `light_power`--Set the power of the light source, measured in W. The optical generation rate will be scaled based on the power
- `coordinate_unit`--Set the coordinate unit in the optical generation rate file (gfile). Options are `"m"`, `"cm"`, `"um"` and `"nm"`
- `field_length_unit`--Set the length unit in the generation rate unit in the optical generation rate file (gfile).  Options are `"m"`, `"cm"`, `"um"` and `"nm"`. If it's set to `"m"`, the generation rate unit in the gfile will be `/m^3/s`. Similarly for the rest

<br/>

`result_genrate.extract()` parameters：

- `data`--Type of the result
  - When `data` is set to `"generation_rate"`, besides an image file and a csv file, the result files also include a text file in `.gfile` format. The coordinate unit in the csv and the image file is `um`, and the generation rate unit in the two files is `/cm^3/s`. These units can't be modified when extracting the result. However, the units in the gfile are controlled by `coordinate_unit`、`field_length_unit`. And only the gfile can be imported to the OEDevice solver
  - When data is set to `"pabs_total"`, the total absorption power is extracted

- `export_csv`--Whether to export csv file
- `show`--Whether to show the plot in a popup window
- `log`--Whether to apply a logarithmic normalization in the intensity plot
- `savepath`--The save path of the result extraction

<br/>

#### Example of extracting generation rate

```python
result_generate = result_afdtd.run_generation_rate_analysis(name='genrate', monitor=3D_power_monitor_name, average_dimension='x', light_power=1, coordinate_unit='m', field_length_unit='m')
result_generate.extract(data='generation_rate',  export_csv=True, show=False, log=False, savepath=savepath)
```

<br/>

### 10.2 Extract electrode result

The results of electrode are extracted from result_oedevice (result of OEDevice simulation). The format is

```python
result_oedevice.extract(data, electrode, operation, export_csv, show, savepath)
```

Extraction of electrode result parameters:

- `data`--Type of result
  - When it's steady state simulation or SSAC simulation, options `"I"`, `"In"`, `"Ip"` are available, which means the current at the electrode versus voltage is extracted, with
    - `"I"` for the total current
    - `"In"` for the electron current
    - `"Ip"` for the hole current
  - When it's SSAC simulation, options `"Iac"` and `"C"` are available, which means the AC current or capacitance at the electrode versus voltage at different frequency points is extracted, with
    - `"Iac"` for the total AC current
    - `"C"` for the capacitance
  - When it's transient simulation, options `"I"`, `"In"`, `"Ip"` are available, which means the current at the electrode versus time is extracted, with
    - `"I"` for the total current
    - `"In"` for the electron current
    - `"Ip"` for the hole current
- `electrode`--Name of the electrode
- `operation`--Options are `"real"` (by default), `"imag"`, `"abs"`, `"abs2"`. For a result whose value is a real number, this parameter can be omitted. Bur for a result whose value is a complex number, like `"Iac"`, it must be used to extract the real and imaginary part of the result respectively
- `export_csv`--Whether to export csv file
- `show`--Whether to show the plot in a popup window
- `savepath`--The save path of the result extraction

<br/>

#### Example of extracting electrode result

```python
result_oedevice.extract(data="I", electrode="cathode", export_csv=True, show=False, savepath=savepath)
result_oedevice.extract(data="Iac", electrode="cathode", operation="real", export_csv=True, show=False, savepath=savepath)
```

<br/>

### 10.3 Extract results of electrical monitor

The electrical monitor result extraction is similar to the electrode result extraction, but a monitor instead of an electrode is required to be specified. The format is

```python
result_oedevice.extract(data, monitor, operation, export_csv, show, log, savepath)
```

Extraction of electrode result parameters:

- `data`--Type of result

  - When the monitor is `charge_monitor`, options `"n"`, `"p"` are available, which means the concentration of carriers is extracted, with
    - `"n"` for the electron
    - `"p"` for the hole
  - When the monitor is `electric_monitor`, options `"electric_field"`, `"ex"`, `"ey"`, `"ez"`, `"potential"` are available, which means the concentration of carriers is extracted, with
    - `"electric_field"` for the absolute value of the electric field
    - `"ex"` for the x component of the electric field
    - `"ey"` for the y component of the electric field
    - `"ez"` for the z component of the electric field
    - `"potential"` for the electrostatic potential
  - When the monitor is `band_monitor`, options `"conduction_band"`, `"valence_band"`, `"equasi_fermi"`, `"hquasi_fermi"` are available, which means the band structure is extracted, with
    - `"conduction_band"` for the conduction band energy level
    - `"valence_band"` for the valence band energy level
    - `"equasi_fermi"` for the electron quasi-Fermi potential
    - `"hquasi_fermi"` for the hole quasi-Fermi potential

- `operation`--Options are `"real"` (by default), `"imag"`, `"abs"`, `"abs2"`

- `export_csv`--Whether to export csv file. When the monitor is of 2D type, the result is a distribution in a 2D region, and the plot is an intensity image; When the monitor is of 1D type, the result is a distribution along a 1D range, and the plot is a curve

- `show`--Whether to show the plot in a popup window

- `log`--Whether to take the logarithm of the result

- `savepath`--The save path of the result extraction

<br/>

#### Example of extracting electrical monitor result

```python
result_device.extract(data="n", monitor="charge_2d", export_csv=True, show=False, log=True, savepath=savepath)
result_device.extract(data="p", monitor="charge_1d", export_csv=True, show=False, log=False, savepath=savepath)
result_device.extract(data="electric_field", monitor="electric_2d", export_csv=True, show=False, savepath=savepath)
result_device.extract(data="ex", monitor="electric_2d", operation="abs", export_csv=True, show=False, savepath=savepath)
result_device.extract(data="potential", monitor="electric_1d", export_csv=True, show=False, savepath=savepath)
result_device.extract(data="conduction_band", monitor="band_1d", export_csv=True, show=False, savepath=savepath)
result_device.extract(data="hquasi_fermi", monitor="band_1d", export_csv=True, show=False, savepath=savepath)
```

<br/>

### 10.4 Extract results of modulator analysis

The results of modulator analysis are extracted from result_afde (result of AFDE). The format is

```python
result_afde.extract(data, operation, export_csv, show, savepath)
```

`result_afde.extract()` parameters:

- `data`--Type of result. Options are `"effective_index"`, `"loss"`, which means the effective index or loss versus voltage is extracted
- `operation`--Options are `"real"` (by default), `"imag"`, `"abs"`, `"abs2"`. For a result whose value is a real number, this parameter can be omitted. Bur for a result whose value is a complex number, like `"effective_index"`, it must be used to extract the real and imaginary part of the result respectively
- `export_csv`--Whether to export csv file
- `show`--Whether to show the plot in a popup window
- `savepath`--The save path of the result extraction

<br/>

#### Example of extracting modulator analysis result

```python
result_afde.extract(data="effective_index", export_csv=True, operation="real", show=False, savepath=savepath)
result_afde.extract(data="effective_index", export_csv=True, operation="imag", show=False, savepath=savepath)
result_afde.extract(data="loss", export_csv=True, show=False, savepath=savepath)
```

<br/>

</font>