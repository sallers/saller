# Source

<font face = "Calibri">

<div class="text-justify">

The subsequent code will exemplify the process of incorporating a light source and port within a simulation project.

As of now, the source module accommodates the inclusion of mode source and Gaussian source. Furthermore, our platform extends support for ports into both EME and FDTD simulations.  

## 4.1 Waveform

In FDTD simulations, waveforms are utilized to control the bandwidth of the source pluse. You can simply enter the central wavelength and range into the added waveform, and the bandwidth and shape of the pulse source will be automatically calculated.


The syntax and properties for adding waveform are as follows. This function does not return any data.

```python
add(        
        name: str,
        type: Literal["gaussian_waveform"],
        property: dict
    )

```

### Set frequency wavelength 
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| range_type       | string  |  -         | Selects "frequency" or "wavelength".                                    |
| range_limit      | string  |  -         | Selects "min_max" or "center_span".                                     |
|  wavelength_center, frequency_center  | number  |-                | The wavelength center and frequency center. |
|  wavelength_span, frequency_span  | number  |-                | The wavelength span and frequency span.|
|  wavelength_min, wavelength_max        | number  | -               | The minimum wavelength and maximum wavelength. |
|  frequency_min, frequency_max          | number  |-                | The minimum frequency and maximum frequency.|

### Set time domain
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| pulsetype                | string  |   -        | Set the source to standard or broadband.                                     |
| frequency                 | number  |      -     | The center frequency of the optical carrier. |
| pulselength               | number  |    -       |  The duration of the pulse's full width at half maximum power.  |
| offset                    | number  |     -      |  The time it takes for the source to reach its peak amplitude, measured relative to the start of the simulation. |
| bandwidth                 | number  |      -     |  The full width at half maximum frequency of the time-domain pulse. |


**Example:**

The following script adds a Gaussian waveform by setting the wavelength to 1.55 um and the wavelength span to 0.1 um. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
waveform name = "wv1550"
wv = pj.Waveform()
wv.add(name=waveform name, type="gaussian_waveform",
        property={"set": "frequency_wavelength",  # selections are ["frequency wavelength","time domain"]
                  "set frequency_wavelength": {
                        "range_type": "wavelength",  # selections are ["frequency","wavelength"]
                        "range_limit": "center_span",  # selections are ["min max","center span"]
                        "wavelength_center": 1.55,
                        "wavelength__span": 0.1,
                    }})
```

## 4.2 Mode source

The syntax and properties for adding mode source are as follows. This function does not return any data.

```python
add(
        name: str,
        type: Literal["mode_source"],
        property: dict,
    )
```

### General 
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| inject axis                             | string  |    -             | Selects the mode source propagation along the x-axis, y-axis or zaxis.|
| direction                               | string  | forward           | Selects the forward or backward direction of propagation for the mode source. |
| amplitude                               | number  | 1.0               |Specifies the peak amplitude of the electric field, with the unit in V/m.            |
| phase                                   | number  | 0.0               |  Specifies the initial phase of the source, with the unit in degrees.       |
| mode_selection                          | string  |  -                 | Selects "fundamental", "fundamental TE", "fundamental TM" or "user select" to inject mode.|
| mode_index                              | integer | 0                 |Selects the mode number from the list of calculated modes.                   |
| search                                  | string  | max_index         | Selects "max index" or "near n" to search modes.           |
| n                                       | number  | 1.0               |  Searchs modes near the specified effective index.                        |
| number_of_trial_modes                   | integer | 20                |  Records the maximum number of modes in the mode list.    |
| waveform                               | object  | -                  |  Selects the waveform ID from source pulse waveform list.                   |

### Geometry 

| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:---------------------                     -|
|  x, y, z               | number  |     -    | The center position of the mode source.             |
|  x span, y span, z span  | number  |     -   | X span, Y span, Z span of the mode source. |
|  x min, x max           | number  |     -     | X min, X max position of the mode source. |
|  y min, y max           | number  |     -     | Y min, Y max position of the mode source. |
|  z min, z max           | number  |     -     | Z min, Z max position of the mode source. |

### Boundary conditions
Select the override default boundary conditions to True, and each boundary condition can be set separately. The optional boundary conditions include "PEC", "PMC", "PML", "symmetric" or "anti symmetric". 

### Modal analysis
If the fraction of magnetic field intensity in PML is greater than the specified threshold, the mode is discarded.
 

**Example:**

The following script adds a mode source in FDTD simulation, sets the position and dimension of the light source, as well as the mode profile and waveform. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
wv_id = wv["waveform_name"]     # Selects the waveform ID from source pulse waveform list.
src = pj.Source()
src.add(name="source", type="mode_source", property={
                    "general": {"amplitude": 1, "phase": 0, "rotations": {"theta": 0, "phi": 0, "rotation_offset": 0},
                    "mode_selection": "fundamental", "waveform": {"waveform_id": wv_id}, 
                    "inject_axis": "x axis", "direction": "forward"},
                    "geometry": {"x": 0, "x span": 0, "y": 0, "y span": 3, "z": 0, "z span": 3},
                    "modal_analysis": {"mode_removal": {"threshold": 0.01}}})
```

## 4.3 Gaussian source

The syntax and properties for adding gaussian source are as follows. This function does not return any data.

```python
add(
        name: str,
        type: Literial["gaussian source"],
        property: dict,
    )
```
### General 
| Parameter                                 | Type    | Default                  | Description                                                                  |
|:------------------------------------------|:--------|:-------------------------|:-----------------------------------------------------------------------------|
| inject_axis                             | string  |   -               | Selects the mode source propagation along the x-axis, y-axis or zaxis.|
| direction                               | string  | forward           | Selects the forward or backward direction of propagation for the mode source. |
| amplitude                               | number  | 1.0               |Specifies the peak amplitude of the electric field, with the unit in V/m.            |
| phase                                   | number  | 0.0               |  Specifies the initial phase of the source, with the unit in degrees.       |
| waveform                               | object  | -                  |  Selects the waveform ID from source pulse waveform list.                   |
|  angle_theta                       | number  | 0                  | The angle between the propagation direction and the injection axis of source, with the unit in degrees.           |
|  angle_phi                         | number  | 0                        |  In a right-hand coordinate system, the angle of propagation is rotated around the injection axis of the source.  |
|  polarization_angle                | number  | 0                        |  The polarization angle defines the orientation of the injected electric field. A polarization angle of zero degrees indicates P-polarized radiation, while an angle of 90 degrees indicates S-polarized radiation.    |

beam_settings:<br/>
Beam_parameters: Selects "waist_size_and_position" or "beam_size_and_divergence" to set the beam parameters. Waist_radius and distance_from_caist are valid when beam_parameters is set to waist_steze_1and_position. Similarly, beam_radius and divergence_angle are valid when beam_marameters is selected as beam_size_and_divergence.<br/>
waist radius: 1/e field (1/e2 power) radius of the beam for a Gaussian beam.<br/>
distance from waist: The distance between the injection plane and the beam waist. A positive distance indicates a diverging beam, while a negative distance indicates a converging beam.
beam radius: 1/e field (1/e2 power) radius of the beam for a Gaussian beam.<br/>
divergence angle: The radiation divergence angle measured in the far field. A positive angle indicates a diverging beam, while a negative angle indicates a converging beam.

### Geometry
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|  x, y, z               | number  |     -    | The center position of the gaussian source. |
|  x span, y span, z span         | number  |     -   | X span, Y span, Z span of the gaussian source. |
|  x min, x max           | number  |     -     | X min, X max position of the gaussian source. |
|  y min, y max           | number  |     -     | Y min, Y max position of the gaussian source. |
|  z min, z max           | number  |     -     | Z min, Z max position of the gaussian source. |

**Example:**

The following script adds a gaussian source in FDTD, sets the position and dimension of the light source, as well as the mode profile and waveform. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.


```python
wv_id = wv["waveform_name"]     # Selects the waveform ID from source pulse waveform list.
so = pj.Source()
so.add(name="source", type="gaussian_source", axis="z_backward",
           property={"general": {"angle_theta": 0, "angle phi": 0, "polarization_angle": 0, "waveform": {"waveform_id": wv_id},
                                 "beam_settings": {"calculation method": "use_scalar_approximation", 
                                                   "beam_parameters": "waist_size_and_position", 
                                                   "waist_radius": 5.2, "distance_from_waist": 1.5}},
                     "geometry": {"x": 4, "x span": 20, "y": 0, "y span": 20, "z": 1.5, "z span": 0}})

```
     
## 4.3 FDTD port

Incorporate a port into the current FDTD simulation project. 

```python
add(    
        name: str,
        type: Literal["fdtd port"],
        property: dict
    )
```

### Geometry 
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|  x, y, z               | number  |     -    | The center position of the FDTD port. |
|  x span, y span, z span         | number  |     -   | X span, Y span, Z span of the FDTD port. |
|  x min, x max           | number  |     -     | X min, X max position of the FDTD port. |
|  y min, y max           | number  |     -     | Y min, Y max position of the FDTD port. |
|  z min, z max           | number  |     -     | Z min, Z max position of the FDTD port. |

### Boundary conditions
Select the override default boundary conditions to True, and each boundary condition can be set separately. The optional boundary conditions include "PEC", "PMC", "PML", "symmetric" or "anti symmetric". 

### Modal analysis
If the fraction of magnetic field intensity in PML is greater than the specified threshold, the mode is discarded.
 

**Example:**

The following script adds a port in FDTD simulation, sets the position and dimension of the light source, as well as the mode profile and waveform. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
wv_id = wv["waveform_name"]     # Selects the waveform ID from source pulse waveform list.
pt = pj.Port(property={"waveform_id": wv_id, "source port": "port_left"})
pt.add(name="port_left", type="fdtd_port",
       property={"geometry": {"x": 0, "x span": 0, "y": 0,
                              "y span": 3, "z": 0, "z span": 3},
                 "modal_properties": {"general": {"inject axis": "x_axis", "direction": "forward",
									  "mode_selection": "fundamental"}}})
```


## 4.4 EME port

The syntax and properties for adding mode source are as follows. This function does not return any data.

```python
add(
        name: str,
        type: Literal["eme_port"],
        property: dict,
    )
```   

### Geometry  
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| port location                       | string  |  -                 |  Set the location of EME port, selections are "left" and "right".                     |
| use full simulation span            | boolean | True              |   Set whether the port uses the full simulation area, selections are "True" and "False". |
| x, y, z               | number  |     -    | The center position of the EME port. |
| x span, y span, z span | number  |     -   | Xspan, Y span, Z span of the EME port. |
| x min, x max           | number  |     -     | X min, X max position of the EME port. |
| y min, y max           | number  |     -     | Y min, Y max position of the EME port. |
| z min, z max           | number  |     -     | Z min, Z max position of the EME port. |

### EME port  
| mode selection                          | string  |                   | Selects "fundamental", "fundamental TE", "fundamental TM" or "user select" to inject mode.|
| mode index                              | integer | 0                 |Selects the mode number from the list of calculated modes.                   |
| search                                  | string  | max index         | Selects "max index" or "near n" to search modes.           |
| n                                       | number  | 1.0               |  Searchs modes near the specified effective index.                        |
| number of trial modes                   | integer | 20                |  Records the maximum number of modes in the mode list.    |

### Boundary conditions
Select the override default boundary conditions to True, and each boundary condition can be set separately. The optional boundary conditions include "PEC", "PMC", "PML", "symmetric" or "anti symmetric". 

### Modal analysis
If the fraction of magnetic field intensity in PML is greater than the specified threshold, the mode is discarded.
 

**Example:**
The following script adds ports in EME simulation, selects the mode of "port1" as the source, and sets the calculation fundamental mode and the size is the span of the full simulation area.  This script assumes that EME solver has been added to the simulation environment, and the pj is an instance of the project.


```python
pjp = pj.Port(property={"source_port": "port1"})
pjp.add(name="port1", type="eme_port",
        property={"geometry": {"port_location": "left", "use_full_simulation span": True},
                  "eme_port": {"general": {"mode_selection": "user_select", "mode_index": 0, "number_of_trial_modes": 20}}})
pjp.add(name="port2", type="eme_port",
        property={"geometry": {"port_location": "right", "use_full_simulation_span": True},
                  "eme_port": {"general": {"mode_selection": "user_select", "mode_index": 0, "number_of_trial_modes": 20}}})    

```

</div>


</font>


