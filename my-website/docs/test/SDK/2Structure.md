import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

# Structure

<font face = "Calibri">

<div class="text-justify">

The code within the "Structure" section is designed to assist you incorporating the necessary structures during the EO(Electro-Optic) simulation process. 

You can choose to create geometry models using GDS files. Meanwhile, you can also utilize various methods in this "Structure" module such as Bézier curves, tapering, and circular rings for your simulation project.



## 2.1 Add geometry

Use `Structure()` to instance a structure into the project, and then use `add_geometry()` to add any geometric structure.
The types that support adding geometric structures include "Triangle", "Rectangle", "Circle", "Ring", "Polygon", "Ellipse", "LinearTrapezoid", "Pyramid", "AnalyticalWaveguide", "Sphere", "StraightWaveguide", "BezierWaveguide" and "gds_file".

The syntax for adding geometry is as follows. "name" defines the name of the structure, "type" selects the type of the structure, and "property" sets the properties of the structure model. This function does not return any data.

note: Set the refractive index of the material for the structure by selecting the material to be added to the project, or use "object_defined_dielectric" to set the material, but require an additional keyword "refractive_index" to set the refractive index of the material. The material setting method for all geometric structures is the same.

### 2.1.1 Triangle

The geometric properties of triangle and an example of adding triangle into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["triangle"], 
        property: dict
    )
```
#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span                | number  |     -   | Z span of the geometry. |
| z_min, z_max          | number  |     -     | Z min, Z max position of the geometry. |
| control_points        | number  |      -  |  The vertices position for generating the geometry. |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a triangle to the structure of the instance, with three vertices of (0,0) (0,2) (2,2) um and a thickness of 0.22 um. Select the material of "object_defined_ieleectric" and set the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="triangle", type="Triangle", property={  
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},  
    "geometry": {"control_points":[{"x": 0, "y": 0}, {"x": 0, "y": 2}, {"x": 2, "y": 2}],
                 "x": 0, "y": 0, "z": 0, "z_span": 0.22,
                 "tilt_angle": 90, "tilt_position":"middle"}})
```


### 2.1.2 Rectangle

The geometric properties of rectangle and an example of adding rectangle into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["rectangle"], 
        property: dict
    )
```
#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| x_span, y_span, z_span  | number  |     -   | X span, Y span and Z span of the geometry. |
| x_min, x_max           | number  |     -     | X min, X max position of the geometry. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a rectangle to the structure of the instance, and set the dimension and material of the structure.

```python
st = pj.Structure()
st.add_geometry(name="rectangle", type="Rectangle", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},  
    "geometry": {"x": 0, "x_span": 1, "y": 0, "y_span": 1, "z": 0, "z_span": 1, 
                 "tilt_angle":90, "tilt_position":"top"}})
```

### 2.1.3 Circle

The geometric properties of circle and an example of adding circle into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["circle"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
|   radius               |    -     |  float   | The radius of the circle.  |
|   angle               |    -     |  float   | The angle of the arc length of the added circle., in degrees.  |
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span                 | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**
The following script adds a circle to the structure of the instance, sets the radius of the circle to 2 μ m, the thickness to 0.5 μ m, and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="circle", type="Circle", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},  
    "geometry": {"radius": 2, "angle": 360, "x": 0, "y": 0, "z": 0, "z_span": 0.5
                 "tilt_angle":90, "tilt_position":"top"}})
```

### 2.1.4 Ring

The geometric properties of ring and an example of adding ring into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["ring"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| inner_radius          | number  | -          | The inner radius of the ring. |
| outer_radius          | number  |   -        | The outer radius of the ring. |
| angle                 | number  | 360       | Define the range of the ring angles, in degrees. |
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span  | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| tilt_angle1            | number  | 90        | The tilt angle1 of the geometry, in degrees. |
| tilt_angle2            | number  | 90        | The tilt angle2 of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a ring to the structure of the instance, sets the inner radius to 4um, the outer radius to 6um, the thickness to 0.5um, and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="ring", type="Ring", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},  
    "geometry": {"x": 0, "y": 0, "z": 0, "z_span": 0.5,
                 "tilt_angle1": 90, "tilt_position": "top", "tilt_angle2": 90,
                 "angle":360, "inner_radius": 4, "outer_radius": 6,}})
```
### 2.1.5 Polygon

The geometric properties of polygon and an example of adding polygon into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["polygon"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| control_points  |    -     |  float   |  The vertices position for generating the geometry.     |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a polygon to the structure of the instance, sets the vertex coordinates of the polygon to (-2, -2) (2, -2) (2, 2) (-2, 2) um, with a thickness of 0.5um., and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="polygon", type="Polygon", property={
        "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2}, 
        "geometry": {"x": 0, "y": 0,
                     "z": 0, "z_span": 0.5,
                     "control_points":
                        [{"x": -2, "y": -2}, {"x": 2, "y": -2}, {"x": 2, "y": 2}, {"x": -2, "y": 2}],
                    "tilt_angle": 90, "tilt_position": "top", 
        }})
```

### 2.1.6 Ellipse

The geometric properties of ellipse and an example of adding ellipse into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["ellipse"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x_radius          | number  | -          | The x-axis radius of the ellipse. |
| y_radius          | number  |   -        | The y-axis radius of the ellipse. |
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a ellipse to the structure of the instance, sets the radius in the x direction to 3 um, the radius in the y direction to 5 um, the thickness to 0.5 um, and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="ellipse", type="Ellipse", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2}, 
    "geometry": {"x_radius": 3, "y_radius": 5,
                 "x": 0, "y": 0, "z": 0, "z_span": 0.5,
                 "tilt_angle": 90, "tilt_position": "top"}})
```  

### 2.1.7 Linear trapezoid

The geometric properties of linear trapezoid and an example of adding linear trapezoid into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["linear_trapezoid"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| control_points  |    -     |  float   |  The vertices position for generating the geometry.     |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a linear trapezoid to the structure of the instance, sets the vertex coordinates to (-2, 2) (-4, -2) (4, -2) (2, 2) um, with a thickness of 0.5 um and the refractive index of the material to 1.4.

```python
st = pj.Structrure()
st.add_geometry(name="linear_trapezoid", type="LinearTrapezoid", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2}, 
    "geometry": { "control_points":
                  [{"x": -2, "y": 2}, {"x": -4, "y": -2}, {"x": 4, "y": -2}, {"x": 2, "y": 2}],
                 "x": 0, "y": 0, "z": 0, "z_span": 0.5,
                 "tilt_angle": 90, "tilt_position": "top"}})
```

### 2.1.8 Pyramid

The geometric properties of pyramid and an example of adding pyramid into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["pyramid"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| x_span_bottom, y_span_bottom | number  |  -         | X bottom span , Y bottom span  of geometry. |
| x_span_top, y_span_top   | number  | -          | X top span, Y top span of geometry. |
| delta_x, delta_y      | number  | 0         |  X delta, Y delta of geometry.|
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**
The following script adds a pyramid to the structure of the instance, sets the top width in the x and y directions to 3 μ m, the bottom width to 5 μ m, the thickness to 0.5 μ m, and the refractive index of the material to 1.4.

```python
st = pj.Material()
st.add_geometry(name="pyramid", type="Pyramid", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},
    "geometry": {"x": 0, "x_span_top": 3,"x_span_bottom": 5,
                  "y": 0,"y_span_top": 3,"y_span_bottom": 5,
                  "z": 0, "z_span": 0.5,"delta_x": 0, "delta_y": 0}})
```    

### 2.1.9 Sphere

```python
add_geometry(
        name: str, 
        type: Literal["sphere"], 
        property: dict
    )
```
The geometric properties of sphere and an example of adding sphere into the project are shown below.

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| radius_x, radius_y, radius_z      | number  | 1.5       | The x, y and z axes radius of the geometry.|

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |


**Example:**
The following script adds a sphere to the structure of the instance, sets the radius in the x, y, and z directions to 1.5 um, and the refractive index of the material to 1.4.

```python
st.add_geometry(name="Sphere", type="Sphere", property={
            "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},
            "geometry": {"x": 0, "y": 0, "z": 0, "radius_x": 1.5,
                         "radius_y": 1.5, "radius_z": 1.5}})
```

### 2.1.10 Straight wavegudie

The geometric properties of straight waveguide and an example of adding staright waveguide into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["straight_waveguide"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
| x_span, y_span, z_span         | number  |     -   | X span, Y span and Z span of the geometry. |
| x_min, x_max           | number  |     -     | X min, X max position of the geometry. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| tilt_angle1            | number  | 90        | The tilt angle1 of the geometry, in degrees. |
| tilt_angle1            | number  | 90        | The tilt angle2 of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |


**Example:**
The following script adds a straight waveguide to the structure of the instance, sets the size to 10 um * 1 um * 1 um, "tile_angle_1" to 70 degrees, and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="StraightWaveguide", type="StraightWaveguide", property={
            "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},
            "geometry": {"x": 0, "x_span": 10, "y": 0, "y_span": 1, "z": 0, "z_span": 1,
                         "tilt_position": "top", "tilt_angle1": 70, "tilt_angle2": 90
                         }})
```


### 2.1.11 Bezier wavegudie

The geometric properties of bezier waveguide and an example of adding bezier waveguide into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["bezier_waveguide"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
|  z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| width                 | number  | -          | The width of the geoemtry. |
| control_points        | number  |      -  |  The vertices position for generating the geometry. |
| tilt_angle1            | number  | 90        | The tilt angle1 of the geometry, in degrees. |
| tilt_angle1            | number  | 90        | The tilt angle2 of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**

The following script adds a bezier waveguide to the structure of the instance, sets the coordinates of the control points on the path to (1,1) (1,2) (2,2) (2,3) um with a width of 0.5 um and a thickness of 0.5 um, and the refractive index of the material to 1.4.

```python
st = pj.Structure()
st.add_geometry(name="bezier", type="BezierWaveguide", property={
    "material": {"material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},
    "geometry": {"x": 0, "y": 0, "z": 0, "z_span": 0.5, "width": 0.5,
                  "control_points":
                        [{"x": 1, "y": 1}, {"x": 1, "y": 2}, {"x": 2, "y": 2}, {"x": 2, "y": 3}],
                "tilt_angle1": 90, "tilt_position": "bottom", "tilt_angle2": 90,
                }})
```

### 2.1.12 Analytical waveguide 

The geometric properties of analytical waveguide and an example of adding analytical waveguide into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["analytical_waveguide"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
|  x_span, y_span, z_span         | number  |     -   | X span, Y span and Z span of the geometry. |
| x_min, _max           | number  |     -     | X min, X max position of the geometry. |
| y_min, y_max           | number  |     -     | Y min, Y max position of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| equation1             | string  | -          | Define the equation for the region where y>0. |
| equation2             | string  | 1         | Define the equation for the region where y<0. |
| nonsymmetric          | boolean | False     |     Select True to set the equation for y<0 separately.                           |
| resolution            | integer | 10        |   Calculate the number of variable values in an equation.                                |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

**Example:**
The following script adds a analytical waveguide to the structure of the instance, sets the size to 3um * 3um * 0.22um, the expression for x>0 (equation1) is "1/{x}", and the refractive index of the material is 1.4

```python
st = pj.Structure()
st.add_geometry(name="analyticalwaveguide", type="AnalyticalWaveguide",property={
                    "material": "object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2},
                    "geometry": {"x": 0, "x_span": 3, "y": 0, "y_span": 3, "z": 0, "z_span": 0.22,
                                       "equation1": "1/{x}", "nonsymmetric": False,
                                      #  "equation2": "x^2",
                                       "tilt_position": "top", "tilt_angle": 90,  "resolution": 100,
                          })
```


### 2.1.13 GDS file

The geometric properties of sphere and an example of adding sphere into the project are shown below.

```python
add_geometry(
        name: str, 
        type: Literal["gds_file"], 
        property: dict
    )
```

#### Geometry properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| x, y, z               | number  |     -    | The center position of the geometry. |
|  z_span         | number  |     -   | Z span of the geometry. |
| z_min, z_max           | number  |     -     | Z min, Z max position of the geometry. |
| path                   | string  |     -      |      The path name of the gds file.                                                                        |
| cell_name              | string  |      -   | If there is only one cell, a "*" can be input instead of the cell name       |
| layer_name             | array   |    -       |      The layer name of the gds file.                                                                         |
| tilt_angle            | number  | 90        | The tilt angle of the geometry, in degrees. |
| tilt_position         | string  | top       | Selections tilt position are "top", "middle", "bottom" and "user_defined".                   |
| user_defined_position | number  |      -  | This parameter is required when tilt position is "user_defined".     |

#### Material properties
| Parameter                | Type    | Default   | Description        |
|:---------------|:--------|:----------:|:----------------------|
| material              | object  |     -   | Select a material object in the material database.                                                                    |
| mesh_order            | integer |     -   |  Select a material in overlapping areas when generating grids, materials with higher mesh order have higher priority.|
| refractive_index      | number  |      -  | Defined refractive index of the material.                                                                             |
| color                 | string  |     -   | Defined color of the material, default "#70AD47".                                                                     |

  
**Example:**
```python
The following script import gds file to the structure of the instance, sets import parameters including the path name, cell name and layer name, structure thickness to 0.22 um, and material refractive index to 1.4.
path_name = "gds_file_path"
cell_name = "gds_cell_name"
layer_name = (1,0)
st = pj.Structure()
st.add_geometry(name="gds_file", type="gds_file", property={
                        "general": {"path": path_name, "cell_name": cell_name "layer_name": layer_name },
                        "geometry": {"x": 0, "y": 0, "z": 0, "z_span": 0.22},
                        "material": {"object_defined_dielectric", "refractive_index": 1.4, "mesh_order": 2}})
```    



## 2.2 Add doping

When participating in optoelectronic simulation, you have the option to utilize the provided code for introducing doping into the simulation structure. 

Our platform offers assistance in importing doping data from  files and also allows for the customization of doping regions according to your requirements.

```python
add_doping(
            self,
            *,
            name: str,
            type: "StructureDopingTypeSelection",
            property: "StructureDopingPropertyDict"
			)
```

|            Parameters         |             Description             |
| :------------: | :-------------: |
|      name      |   To set the name of doping in simulation   |
|      type      |   The method type of setting up doping. Selections are ["type", "n", "p"].    |
|    property    | The property of doping. |

### 2.2.1 Function doping
When `type` is set to `"n"` or `"p"`, function doping is applied. In this case, `type` also means the doping species, with `"n"` for donor and `"p"` for acceptor.

You can configure parameters related to importing doping files by adjusting settings under the `property.general` sections.

**Example:**

```python
st.add_doping(name="Uniform", type="p", property={
    "geometry": {"x": p_uniform_x_center, "x_span": p_uniform_x_span,
                 "y": p_uniform_y_center, "y_span": p_uniform_y_span,
                 "z": p_uniform_z_center, "z_span": p_uniform_z_span},
    "general": {"distribution_function": "constant", "concentration": p_uniform_con},
    "volume": {"volume_type": "material", "material_list": [mt["mat_si"]]}})
```

|   Parameters   |  Default  |   Type   |   Notes   |
| :---------------------------: | :-----: | :---: | :------------------------------------------------: |
|     geometry.x      |    -     |  float   |  The x-coordinate of the center point position of doping box.    |
|   geometry.x_span   |     -    |  float   | The length in x direction of the doping. Restrained by condition: >0.  |
|   geometry.x_min    |    -     |  float   | The minimum x-coordinate endpoint data doping box.      |
|   geometry.x_max    |    -     |  float   |  The maximum x-coordinate endpoint data of doping box.     |
|     geometry.y      |     -    |  float   |  The y-coordinate of the center point position of doping box.      |
|   geometry.y_span   |    -     |  float   | The width in y direction of the doping. Restrained by condition: >0.  |
|   geometry.y_min    |     -    |  float   |The minimum y-coordinate endpoint data of doping box.       |
|   geometry.y_max    |    -     |  float   |  The maximum y-coordinate endpoint data of doping box.      |
|     geometry.z      |    -     |  float   |   The z-coordinate of the center point position of doping box.    |
|   geometry.z_span   |     -    |  float   | The thinckness in z direction of doping box. Restrained by condition: >0.  |
|   geometry.z_min    |    -     |  float   |The z-coordinate of the bottom position of the height of doping box.      |
|   geometry.z_max    |    -     |  float   |  The z-coordinate of the top position of the height of doping box.     |

| general.distribution_function |      -   |  str  |    To set the type of distribution function for doping region. Selections are ["constant", "gaussian"]. When it"s set to "constant", constant doping is applied and only "concentration" is required. When it"s set to "gaussian", Gaussian function doping is applied, and "concentration", "ref_concentration", "junction_width", "source_face"  are required.       |
|     general.concentration     |     -    |  float |  To set the doping concentration in non-diffusion area.    |
|      general.source_face      |     -    |  str  | To set the doping source surface. Available when distribution_function is "gaussian". Selections are ["low_x", "low_y","low_z"]."lower_x" means the source face is "x=x_min". Similarly for the rest. There is no diffusion area on the edge of source face. As for the other edges, there is a diffusion area respectively within the doping box. |
|    general.junction_width     |     -    | float | To set the junction width. Available when distribution_function is "gaussian" |
|   general.ref_concentration   |     -    | float | Concentration on the edge of diffusion area (edge of doping box). Available when distribution_function is "gaussian". |
|      volume.volume_type       |  "all"  |  str  |   The default of "all" means the doping is applied to all the (semiconductor) structures, restricted by the doping box. Selections are ["all", "material", "region"]    |
|     volume.material_list      |    -     | list  |     It means the doping is applied to the structures of the specified materials and restricted by the doping box. Available when volume_type is "material".      |
|      volume.region_list       |      -   | list  |    It  means the doping is applied to the specified structures and restricted by the doping box.   Available when volume_type is "region"       |


### 2.2.2 Imported doping

When type is set to "ile", doping is imported from a file.

**Example:**

```python
st.add_doping(name="import_n", type="file", property={
    "general": {"format": "DOP", "file_path": n_dop_file, "species": "n"}})
```


|       Parameters       |    Default    | &ensp;   Type   &ensp; |                        Notes                         |
| :------------------: | :-----: | :--: | :------------------------------------------: |
|    general.format    |    -     | str  |     Set the format of doping file. Only "DOP" is supported currently. Selections are ["DOP"]. When it"s set to "DOP", the doping file is a text file that stores a doping profile in rectangular grid. There are three columns in the file, which are the first dimension coordinate [um], the second dimension coordinate [um] and the doping concentration [cm^-3] respectively. Doping concentration should be non-negative.         |
|  general.file_path   |    -     | str  |  The absolute path of the doping file         |
|   general.species    |    -     | str  |  To set the doing species. Selections are ["n", "p"].            |
|  volume.volume_type  |  "all"  | str  | To set a list of regions or materials for doping. Selections are ["all", "material", "region"].  |
| volume.material_list |    -     | list |   Available when volume_type is "material"   |
|  volume.region_list  |    -     | list |    Available when volume_type is "region"    |



## 2.3 Add electrode

In this section, we will demonstrate how to integrate electrode structures into optoelectronic simulations using the provided code. Currently, the platform allows configuring both steady-state and transient voltages for the electrodes. 

Detailed code descriptions and specific examples are provided below for reference.

```python
add_electrode(
            self,
            *,
            name: str,
            property: StructureElectrodeProperty,
    )
```

|          Parameters         &ensp; |             &ensp;           Description           &ensp;              |
| :------------: | :-----------------------------------: |
|      name      |    To set the name of eelectrode in simulation.   |
|    property    | To set the property of electrode in simulation. |

### 2.3.1 Steady state

When the property `bc_mode` is set to `"steady_state"`, the steady state boundary condition is applied.

**Example:**

```python
st = pj.Structure()
st.add_electrode(name="anode", property={
    "solid": "Anode", "bc_mode": "steady_state", "sweep_type": "range",
    "range_start": tcad_vmin, "range_stop": tcad_vmax, "range_interval": tcad_vstep, "apply_AC_small_signal": "none"})
st.add_electrode(name="cathode", property={
    "solid": "Cathode", "bc_mode": "steady_state",
    "sweep_type": "single", "voltage": 0, "apply_AC_small_signal": "none"})
```

|          Parameters          |      Default       |     Type      |                          Notes                           |
| :------------------------: | :----------: | :-----: | :------------------------------------------: |
|        force_ohmic         |     true     |  bool   |   Whether the electrode is ohmic, default to be True. Currently only ohmic contact is supported, so force_ohmic can"t be set to False.   |
|          bc_mode           | steady_state | string  |       To set the type of electircal boundary condition. Selections are ["steady_state",transient].       |
|   apply_AC_small_signal    |     none     | string  |   Determining whether to apply the small-signal alternating current. Selections are ["none", "All"]. When it"s set to "none", no AC small signal is applied at each sweeping voltage. When it"s set to "All", the AC small signal is applied after steady state simulation at each sweeping voltage      |
|         sweep_type         |    single    | string  | To set the voltage type of the electrode. Selections are ["single", "range", "value"]. |
|         v_step_max         |     0.5      |  float  |    The maxium step of voltage value.          |
|          voltage           |      0       |  float  |    The value of voltage. Available when sweep_type is "single"     |
|        range_start         |      0       |  float  |     The  start value of a voltage range. Available when sweep_type is "range"     |
|         range_stop         |      1       |  float  |     The  stop value of a voltage range. Available when sweep_type is "range"     |
|       range_interval       |      1       |  float  |     The  interval value of a voltage range. Available when sweep_type is "range"     |
|      range_num_points      |      2       | integer |     The   The number of points within the voltage range. Available when sweep_type is "range"     |
| []sweep_value_table.index  |       -       | integer |    The index table of voltage values. Available when sweep_type is "value".     |
| []sweep_value_table.number |       -       |  float  |     The value table of voltage. Available when sweep_type is "value".     |
|        surface_type        |    solid     | string  |     To set the surface type of electrode. Currently only "solid" is supported, meaning that all the surfaces of a structure are selected.      |
|           solid            |       -       | string  | Name of the structure to be set as an electrode. Available when surface_type is set to "solid".         |

### 2.3.2 SSAC (Small signal alternating current)

When solving the frequency response of optical signal for the device, transient simulation should be performed. In this case, the bc_mode of the corresponding electrode should be set to "transient", and the solver_mode of OEDevice solver should be set to "transient", too.

In most of other cases, steady state or SSAC simulation is needed, the "bc_mode" of electrodes should be "steady_state".

When solving capacitance and resistance with respect to frequency, SSAC simulation is required. The solver_mode of OEDevice solver should be set to "SSAC", and the apply_AC_small_signal of the corresponding electrode should be set to "All".

When running steady state simulation, just set the solver_mode of OEDevice solver to "steady_state".

**Example:**

```python
st.add_electrode(name="cathode", property={
    "solid": "Cathode", "bc_mode": "steady_state",
    "sweep_type": "range", "range_start": tcad_vmin, "range_stop": tcad_vmax, "range_interval": tcad_vstep, "apply_AC_small_signal": "All"})
```

### 2.3.3 Transient

When the property bc_mode is set to "transient", the transient boundary condition is applied.

**Example:**

```python
st = pj.Structure()
st.add_electrode(name="cathode", property={
    "solid": "Cathode", "bc_mode": "transient", "voltage": tcad_vbias, "v_step_max": 0.5,
    "time_table": [{"time_start": 0, "time_stop": 2e-12, "initial_step": 1e-12, "max_step": 5e-12},
                   {"time_start": 2e-12, "time_stop": 2.001e-12, "initial_step": 30e-18, "max_step": 30e-18,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": source_fraction}},
                   {"time_start": 2.001e-12, "time_stop": 2.01e-12, "initial_step": 30e-18, "max_step": 60e-18,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": source_fraction}},
                   {"time_start": 2.01e-12, "time_stop": 2.03e-12, "initial_step": 60e-18, "max_step": 2e-15,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": source_fraction}},
                   {"time_start": 2.03e-12, "time_stop": 10e-12, "initial_step": 2e-15, "max_step": 50e-15,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": source_fraction}},
                   {"time_start": 10e-12, "time_stop": 500e-12, "initial_step": 50e-15, "max_step": 10e-12,
                    "optical": {"enabled": 1, "envelop": 0, "source_fraction": source_fraction}}]})
```

|               Parameters               |    Default    |     type      |               Notes                  |
| :----------------------------------: | :-----: | :-----: | :---------------------------: |
|             force_ohmic              |  true   |  bool   |                               |
|               bc_mode                |    -    | string  | Selections are ["transient"]. |
|               voltage                |    0    |  float  | Set the voltage that is applied to the electrode and a steady state simulation is performed first. The transient simulation is based on the steady state result. The optical generation rate is not applied during the steady state simulation.     |
|                v_step_max            |     -    | string  |   Set the max step of the voltage from the equilibrium state to steady state at the bias of voltage.    |
|       []time_table.time_start        |    -     |  float  |  Set the start time point of the range. The value of 0 represents the steady state of the earlier simulation.    |
|        []time_table.time_stop        |    -     |  float  |   Set the stop time point of the range.            |
|      []time_table.initial_step       |    -     |  float  |  Set the initial time step of the range         |
|        []time_table.max_step         |    -     |  float  |  Set the max time step of the range         |
|     []time_table.optical.enabled     |    0     | integer |     Whether to apply optical generation rate during the time range. The value of 1 means True, and 0 means False. Selections are [0, 1].     |
|     []time_table.optical.envelop     |     -    | integer |   The envelop of the scaling factor of the light power during the time range. When it"s set to 0, the envelop is uniform.  Selections are [0].  |
| []time_table.optical.source_fraction |    -     |  float  | When envelop is set to0, this value is the scaling factor of the light power during the time range.    |
|             surface_type             |  solid   | string  |   Selections are ["solid"].   |
|                solid                 |     -    | string  |   Available when surface_type is set to "solid".    |







## 2.4 Add surface recombination

While conducting optoelectronic simulations, you can incorporate surface recombination into the simulation structure using the following code.

```python
add_surface_recombination(
            self,
            *,
            name: str,
            property: AddSurfaceRecombination,
    )
```

| Parameters |           Description           |
| :------------: | :-----------------------------: |
|      name      |   To set the name of surface recombination in simulation.   |
|    property    | To set the property of surface recombination in simulation.  |

**Example:**

```python
st.add_surface_recombination(name="Cathode_Si", property={
        "surface_type": "domain_domain", "interface_type": "MetalOhmicInterface",
        "domain_1": "Cathode", "domain_2": "Si_base", "infinite_recombination": False, "velocity_electron": 1e7, "velocity_hole": 1e7})
```

|     **Parameters**     |    Default    |   Type   |                            Notes                             |
| :--------------------: | :-----------: | :------: | :----------------------------------------------------------: |
|      surface_type      | domain_domain |  string  |    To set the type for calculating surface recombination. Selections are ["domain_domain", "material_material"].    |
|     interface_type     |     null      |  string  | To set the  interface type of surface recombination. Selections are ["null", "InsulatorInterface", "HomoJunction", "HeteroJunction", "MetalOhmicInterface", "SolderPad"]. "InsulatorInterface" is interface between semiconductor and insulator, "HomoJunction" means the interface between homogeneous semiconductor and semiconductor,"HeteroJunction" means the interface between heterogeneous semiconductor and semiconductor, "MetalOhmicInterface" means the interface between semiconductor and conductor, "SolderPad" means the interface between conductor and insulator. |
| infinite_recombination |     true      |   bool   |    Only available when interface_type is "MetalOhmicInterface". The surface recombination velocity of holes and electrons will be available when infinite_recombination is False.    |
|     velocity_hole      |       0       |  float   | To define surface recombination velocity of holes. Available when interface_type is "MetalOhmicInterface"/"InsulatorInterface" |
|   velocity_electron    |       0       |  float   | To define surface recombination velocity of electron. Available when interface_type is "MetalOhmicInterface"/"InsulatorInterface" |
|        domain_1        |         -      |  string  |        The region 1 for surface recombination. Available when surface_type is "domain_domain"        |
|        domain_2        |        -       |  string  |        The region 2 for surface recombination. Available when surface_type is "domain_domain"        |
|       material_1       |        -       | material |       The material 1 for surface recombination. Available when surface_type is "material_material"      |
|       material_2       |        -       | material |       The material 2 for surface recombination. Available when surface_type is "material_material"      |


</div>

</font>