
# Monitor

<font face = "Calibri">

<div class="text-justify">


Type of the monitor, Selections are ["index_monitor", "time_monitor", "power_monitor", "profile_monitor", "global_option"]


## 5.1 Index Monitor

The syntax and properties for adding index monitor are as follows. This function does not return any data.

```python
add(
        name: str,
        typename: Literal["index_monitor"],
        property: dict,
    ):
```

#### Geometry
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| monitor_type          | string  | -          | The types of index monitor that can be selected are "2d_x_normal","2d_y_normal" and "2d_z_normal".   |
| x, y, z                | number  |     -    | The center position of the index monitor. |
| X span, Y span, z_span | number  |     -   | Xspan, Y span, Z span of the index monitor. |
| x_min, x_max           | number  |     -     | X min, X max position of the index monitor. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the index monitor. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the index monitor. |

**Example:**
The following script add a 2D index monitor and set its dimension and position. This script assumes that FDTD or EME solver has been added to the simulation environment, and the pj is an instance of the project.

```python
mn = pj.Monitor()
mn.add(name="x_normal_index", type="index_monitor",
        property={"geometry": {"monitor_type": "2d_x_normal",
                              "x": 0, "x_span": 0, "y": 0, "y_span": 3, "z": 0, "z_span": 6}
                    })
```

## 5.2 Time monitor

```python
add(
        name: str,
        typename: Literal["time_monitor"],
        property: dict,
    ):
```
### General
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|  stop_method                | string  | "end_of_simulation" | Selects "end_of_simulation", "choose_stop_time" or "choose_number_of_snapshots" to stop  |
|  start_time                | number  | 0                 | A float, or a parameter, or a parameter expression that evaluates to a float                                                |
|   stop_time               | number  | 1000             | A float, or a parameter, or a parameter expression that evaluates to a float                                                |
|  number_of_snapshots       | integer |0 |                                                                                                       |

### Geometry 
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| monitor_type    | string | -          | The types of time monitor that can be selected are "point", "2d_x_normal","2d_y_normal","2d_z_normal", "x_linear", "y_linear", "z_linear", "three_dimension"|
| x, y, z               | number  |     -    | The center position of the time monitor. |
| x_span,  y_span, z_span | number  |     -   | X span, Y span, Z span of the time monitor. |
| x_min, x_max           | number  |     -     | X min, X max position of the time monitor. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the time monitor. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the time monitor. |

### Data to record                                                                                                                  

### Advancd 

sampling_rate:
min_sampling_per_cycle:

**Example:**
The following script add a time monitor and set its dimension and position. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
mn = pj.Monitor()
mn.add(name="time_monitor1", type="time_monitor",
           property={"general": {
               "stop_method": "end_of_simulation", "start_time": 0, "stop_time": 100, "number_of_snapshots": 10},
               "geometry": {"monitor_type": "point", "x": 0, "x_span": 0, "y": 0, "y_span": 0, "z": 0, "z_span": 0},
               "advanced": {"sampling_rate": {"min_sampling_per_cycle": 10}}})
```

## 5.3 Power monitor

```python
add(
        name: str,
        typename: Literal["index_monitor"],
        property: dict,
    ):
```


### Frequency profile 
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|  sample spacing                            |    string              |                                            |
|  use_wavelength_spacing                    | boolean | True              |                                                                                                                             |
|  use source limits                         | boolean | False             |                                                                                                                             |
|   spacing type                              | string  | wavelength        | Selections are "wavelength", "frequency"                                                                                 |
|   spacing_limit                             | string  | min_max           | Selections are "min_max", "center_span"                                                                                 |
| wavelength center, frequency center     | number  |      -             | A float, or a parameter, or a parameter expression that evaluates to a float                                                |
|  wavelength span, frequency span     | number  |-                   | A float, or a parameter, or a parameter expression that evaluates to a float                      |
|  wavelength min, wavelength wax                            | number  | -                  | A float, or a parameter, or a parameter expression that evaluates to a float           |
| frequency min, frequency max       | number  | -                  | A float, or a parameter, or a parameter expression that evaluates to a float           |
| frequency_points                | integer | 5                 |                     |

### Geometry
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| monitor_type    | string | -          | The types of power monitor that can be selected are "point", "2d_x_normal","2d_y_normal","2d_z_normal", "x_linear", "y_linear", "z_linear". |
| x, y, z               | number  |     -    | The center position of the power monitor. |
| X span, Y span, z_span | number  |     -   | Xspan, Y span, Z span of the power monitor. |
| x_min, x_max           | number  |     -     | X min, X max position of the power monitor. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the power monitor. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the power monitor. |

### Data to record 
Fields: <br/>   
output ex, ey, ez, hx, hy, hz: Choose whether to measure that field component. In 2D simulation, only some field components are non-zero.   <br/>                    
poynting_vector_and_power: <br/>   
output px, py, pz, power: Choose whether to output the results of poynting vector and transmittance. In 2D simulation, only some components are non-zero.
                                                                                   

**Example:**
The following script add a power monitor and set its dimension and position. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
mn = pj.Monitor()
mn.add(name="z_normal", type="power_monitor",
        property={"geometry": {"monitor_type": "2d_z_normal","x": 0, "x_span": 5, "y": 0, "y_span": 5, "z": 0, "z_span": 0}})
```

## 5.4 Profile monitor

### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| monitor type    | string | -          | The types of profile monitor that can be selected are "2d_x_normal","2d_y_normal" and "2d_z_normal".        |
| x_resolution | integer | 100       |   The resolution of output simulation results of profile monitor.        |
| x, y, z               | number  |     -    | The center position of the profile monitor. |
| x_span, y_span, z_span | number  |     -   | X span, Y span, Z span of the profile monitor. |
| x_min, x_max           | number  |     -     | X min, X max position of the profile monitor. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the profile monitor. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the profile monitor. |

**Example:**
The following script add a profile monitor and set its dimension and position. This script assumes that EME solver has been added to the simulation environment, and the pj is an instance of the project.

```python
mn = pj.Monitor()
mn.add(name="y_normal", type="profile_monitor",
       property={"geometry": {"monitor_type": "2d_y_normal", "x_resolution": 100,
                              "x": 0, "x_span": 206, "y": 0, "y_span": 0, "z": 0, "z_span": 7}})
```

## 5.5 Global monitor/Global option

### Frequency power properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|  sample spacing          | integer | 0              |  Set the type of frequency interval for the frequency monitor. |
|  use wavelength_spacing  | boolean | True           |                                                                              |
|  use source limits       | boolean | False          |                                                                              |
|  spacing type            | string  | wavelength     | Selections are ["wavelength", "frequency"]                                   |
|  spacing limit           | string  | min_max        | Selections are ["min_max", "center_span"]                                    |
|  wavelength center, wavelength center  | number  |-                | A float, or a parameter, or a parameter expression that evaluates to a float |
|  wavelength span, frequency span  | number  |-                | A float, or a parameter, or a parameter expression that evaluates to a float |
|  wavelength min, wavelength max        | number  | -               | A float, or a parameter, or a parameter expression that evaluates to a float |
|  frequency_min, frequency max          | number  |-                | A float, or a parameter, or a parameter expression that evaluates to a float |
| frequency_points        | integer | 5              |                                                                              |

### Advanced 
min_sampling_per_cycle  

**Example:**
The following script add the global monitor and set its frequency domain range and number of frequency points. This script assumes that FDTD solver has been added to the simulation environment, and the pj is an instance of the project.

```python
mn = pj.Monitor()
mn.add(name="Global Option", type="global_option",
       property={"frequency_power": {  # "sample_spacing": "uniform", "use_wavelength_spacing": True,
           # ["min_max","center_span"]
           "spacing_type": "wavelength", "spacing_limit": "center_span",
           "wavelength_center": 1.5, "wavelength_span": 0.1, "frequency_points": 11}})
```


## 5.5 Band monitor

Integrate a band monitor into the current project.

```python
add(
            self,
            *,
            type: Literal["band_monitor"],
            name: str,
            property: PostProcessBandMonitor,
    )
```

| **Parameters** |      Description       |
| :------------: | :--------------------: |
|      name      |    The name of band monitor defined in the project.   |
|      type      |       To decide the type of monitor.       |
|    property    | The property of band monitor. |

**Example:**

```python
mn = pj.Monitor()   
mn.add(name="band_line", type="band_monitor", property={
    "geometry": {"monitor_type": "linear_z", "x": oe_x_mean, "x_span": 0, "y_min": 0, "y_max": 0, "z_min": oe_z_min, "z_max": oe_z_max,
                 "interpolate_accuracy": 9}})
# endregion
```

|        **Parameters**         | Default |  Type   |                        Notes                         |
| :---------------------------: | :-----: | :-----: | :--------------------------------------------------: |
|       general.record_ec       |  true   | bool   |   The conduction band edge energy at 300K.                                                    |
|       general.record_ev       |  true   |  bool   |  The valance band edge energy at 300K.                                                    |
|       general.record_ei       |  true   |bool   |   The fermi level for intrinsic doped material.                                                   |
|      general.record_efn       |  true   |  bool   |   The electron quasi-Fermi energy.                                                   |
|      general.record_efp       |  true   |  bool   |  The hole quasi-Fermi energy.                                                    |
|      general.record_evac      |  true   |  bool   |                                                      |
|     geometry.monitor_type     |         | string  | Set the dimension type of the monitor. For electrical monitors, only 1D type and 2D type are available currently. Selections are ["linear_x", "linear_y", "linear_z"]. |
|     geometry.x      |    -     |  float   |  The x-coordinate of the center point position of the band monitor.    |
|   geometry.x_span   |     -    |  float   | The length in x direction of the band monitor. Restrained by condition: >0.  |
|   geometry.x_min    |    -     |  float   | The minimum x-coordinate endpoint data of the band monitor.      |
|   geometry.x_max    |     -    |  float   |  The maximum x-coordinate endpoint data of the band monitor.     |
|     geometry.y      |     -    |  float   |  The y-coordinate of the center point position of the band monitor.      |
|   geometry.y_span   |     -    |  float   | The width in y direction of the band monitor. Restrained by condition: >0.  |
|   geometry.y_min    |     -    |  float   |The minimum y-coordinate endpoint data of the band monitor.       |
|   geometry.y_max    |     -    |  float   |  The maximum y-coordinate endpoint data of the band monitor.      |
|     geometry.z      |     -    |  float   |   The z-coordinate of the center point position of the band monitor.    |
|   geometry.z_span   |     -    |  float   | The height in z direction of the band monitor. Restrained by condition: >0.  |
|   geometry.z_min    |     -    |  float   | The z-coordinate of the bottom position of the height of the band monitor.      |
|   geometry.z_max    |      -   |  float   |  The z-coordinate of the top position of the height of the band monitor.     |
| geometry.interpolate_accuracy |    1    | integer |  Set the accuracy of the rectangular grid for extracting the monitor result.  Restrained by condition: >=1 && <= 10. Here 1 means the grid size is 10nm, and 10 means the grid size is 1nm, and the grid size varies uniformly with the variation in "interpolate_accuracy".         |


## 5.6 Charge monitor

Incorporate a charge monitor into the current project.

```python
add(
            self,
            *,
            type: Literal["charge_monitor"],
            name: str,
            property: PostProcessChargeMonitor,
    )
```

| **Parameters** |      Description       |
| :------------: | :--------------------: |
|      name      |    The name of charge monitor defined in the project.   |
|      type      |       To decide the type of monitor.       |
|    property    | The property of charge monitor. |

**Example:**

```python
mn = pj.Monitor()
mn.add(name="np_line_080nm", type="charge_monitor", property={
       "geometry": {"monitor_type": "linear_y", "x": st_x_mean, "x_span": st_x_span, "y_min": -0.4, "y_max": 0.4, "z": 0.08, "z_span": 0,
                      "interpolate_accuracy": 9}})
```

|         **Parameters**         | Default |  Type   |                            Notes                             |
| :----------------------------: | :-----: | :-----: | :----------------------------------------------------------: |
|    general.record_electrons    |  true   |  bool   | The distribution of electron concentration in monitor. |
|      general.record_holes      |  true   |  bool   |  The distribution of hole concentration in monitor.     |
| general.integrate_total_charge |  true   |  bool   | Available when monitor_type is in ["2d_x_normal", "2d_y_normal", "2d_z_normal"]. |
|     geometry.monitor_type      |         | string  | Selections are ["linear_x", "linear_y", "linear_z", "2d_x_normal", "2d_y_normal", "2d_z_normal"]. |
|     geometry.x      |    -     |  float   |  The x-coordinate of the center point position of the charge monitor.    |
|   geometry.x_span   |     -    |  float   | The length in x direction of the charge monitor. Restrained by condition: >0.  |
|   geometry.x_min    |    -     |  float   | The minimum x-coordinate endpoint data of the charge monitor.      |
|   geometry.x_max    |     -    |  float   |  The maximum x-coordinate endpoint data of the charge monitor.     |
|     geometry.y      |     -    |  float   |  The y-coordinate of the center point position of the charge monitor.      |
|   geometry.y_span   |     -    |  float   | The width in y direction of the charge monitor. Restrained by condition: >0.  |
|   geometry.y_min    |     -    |  float   |The minimum y-coordinate endpoint data of the charge monitor.       |
|   geometry.y_max    |     -    |  float   |  The maximum y-coordinate endpoint data of the charge monitor.      |
|     geometry.z      |     -    |  float   |   The z-coordinate of the center point position of the charge monitor.    |
|   geometry.z_span   |     -    |  float   | The height in z direction of the charge monitor. Restrained by condition: >0.  |
|   geometry.z_min    |     -    |  float   | The z-coordinate of the bottom position of the height of the charge monitor.      |
|   geometry.z_max    |      -   |  float   |  The z-coordinate of the top position of the height of the charge monitor.     |
| geometry.interpolate_accuracy  |    1    | integer |            Restrained by condition: >=1 && <= 10.            |



## 5.7 Electric monitor

Integrate an electric monitor into the current project.

```python
add(
            self,
            *,
            type: Literal["electric_monitor"],
            name: str,
            property: PostProcessElectricMonitor,
    )
```

| **Parameters** |    Description     |
| :------------: | :----------------: |
|      name      |    The name of electric monitor defined in the project.   |
|      type      |       To decide the type of monitor.       |
|    property    | The property of electric monitor. |

**Example:**

```python
 mn = pj.Monitor()
 mn.add(name="electric_2d", type="electric_monitor", property={
        "geometry": {"monitor_type": "2d_x_normal", "x": oe_x_mean, "x_span": 0, "y_min": -Ge_y_span_bottom*3/4, "y_max": Ge_y_span_bottom*3/4, "z_min": 0, "z_max": Si_z_span+Ge_z_span,
                     "interpolate_accuracy": 6}})
```

|             **Parameters**             | Default |  Type   |                            Notes                             |
| :------------------------------------: | :-----: | :-----: | :----------------------------------------------------------: |
|     general.record_electrics_field     |  true   |  bool   | The distribution of electric field in monitor.       |
| general.record_electrostatic_potential |  true   |  bool   |  The distribution of electric potential in monitor.        |
|      general.calculate_net_charge      |  true   |  bool   | Available when monitor_type is in ["2d_x_normal", "2d_y_normal", "2d_z_normal"]. |
|         geometry.monitor_type          |         | string  | Selections are ["linear_x", "linear_y", "linear_z", "2d_x_normal", "2d_y_normal", "2d_z_normal"]. |
|     geometry.x      |    -     |  float   |  The x-coordinate of the center point position of the electric monitor.    |
|   geometry.x_span   |     -    |  float   | The length in x direction of the electric monitor. Restrained by condition: >0.  |
|   geometry.x_min    |    -     |  float   | The minimum x-coordinate endpoint data of the electric monitor.      |
|   geometry.x_max    |     -    |  float   |  The maximum x-coordinate endpoint data of the electric monitor.     |
|     geometry.y      |     -    |  float   |  The y-coordinate of the center point position of the electric monitor.      |
|   geometry.y_span   |     -    |  float   | The width in y direction of the electric monitor. Restrained by condition: >0.  |
|   geometry.y_min    |     -    |  float   |The minimum y-coordinate endpoint data of the electric monitor.       |
|   geometry.y_max    |     -    |  float   |  The maximum y-coordinate endpoint data of the electric monitor.      |
|     geometry.z      |     -    |  float   |   The z-coordinate of the center point position of the electric monitor.    |
|   geometry.z_span   |     -    |  float   | The height in z direction of the electric monitor. Restrained by condition: >0.  |
|   geometry.z_min    |     -    |  float   | The z-coordinate of the bottom position of the height of the electric monitor.      |
|   geometry.z_max    |      -   |  float   |  The z-coordinate of the top position of the height of the electric monitor.     |
|     geometry.interpolate_accuracy      |    1    | integer |            Restrained by condition: >=1 && <= 10.            |

</div>

</font>