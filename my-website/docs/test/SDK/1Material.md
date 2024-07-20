

# Material

<font face = "Calibri">

<div class="text-justify">

Use `Material()` to instance a material into the project, use `add_nondispersion`, `add_dispersion` and `add_anisotropy` functoin to add new materials or use `add_lib` utilize materials from the material library.


## 1.1 Add nondispersion material

The syntax and properties of adding non dispersive material are shown below. This function does not return any data.


```python
add_nondispersion(
        name: str,
        data: List[Tuple[float, float]],
        order: int = 2,
        color: Optional[str] = None      
	)
```

| Parameter  | Type | Default | Description|
|:------------:|:-----:|:-----:|:--------------------|
|name |string | - |Define the name of the material.|
| data |tuple | - | Input a tuple, format is [(index real, index imag)] | 
| order | integer | 2  | Priority of the material, with larger number indicating higher priority.|
| color     | string  |    -     | Set the color for material display, format is "#RRGGBB" .   |

**Example:**
The following command adds non dispersive material to the material of the instance, sets the material name to "SiO2", data to [(1.444, 0)], mesh order to 1 and color to "#654321".

```python

mt = Project.Material()
mt.add_nondispersion(name="nondispersion_material", data=[(1.444, 0)], order=1,color="#654321")
```

</div>

## 1.2 Add dispersion material

The syntax and properties of adding dispersive material are shown below. This function does not return any data.


```python
add_dispersion(
        name: str,
        data: List[Tuple[float, float, float]],
        order: int = 2,
        color: Optional[str] = None
	)
```

| Parameter      | Type    | Default   | Description    |
|:---------|:--------|:----------:|:--------------|    
| name      | string  |  -  |   Define the name of the material.             |
| data      | tuple |     -      |A list of tuple, format is [(wavelength, index real, index imag), ...]       |
| order       | integer | 2         |  Indicates the priority of the material, with higher numbers indicating higher priority.      | 
| color   | string  |    -     | Set the color for material display, format is "#RRGGBB" .   |


**Example:**

The following command adds dispersive material to the material of the instance, sets the material name to "SiO2", data to [(1.55e-06,, 1.444, 0), (1.30e-06, 1.81, 0.227)], mesh order to 2 and color to "#654321".

```python
w_index = [(1.55e-06, 1.444, 0), (1.30e-06, 1.81, 0.227)]
mt = pj.Material()
mt.add_dispersion(name="dispersion",
    data=w_index, order=2, color="#654321"
    )
```

## 1.3 Add anisotropy material

The syntax and properties of adding non anisotropy material are shown below. This function does not return any data.


```python
add_anisotropy(
        name: str,
        data: Union[List],
        order: int = 2,
        color: Optional[str] = None
   )
```
| Parameter | Type | Default | Description |
|:------------------|:--------|:----------:|:-------------------------|
| name   | string  |    -   |   Define the name of the material.           |
| data  | tuple   | - | A list of tuple, format is [(wavelength, xx index real, xx index imag, yy index real, yy index imag, zz index real, zz index imag), ...] |
| order   | integer | 2         |  Priority of the material, with larger number indicating higher priority.  |
| color   | string  |    -     | Set the color for material display, format is "#RRGGBB" .   |

**Example:** 
The following command adds anisotropy material to the material of the instance, sets the material name to "LN", data to [(wavelength * 1e-6, 2.211, 0, 2.138, 0, 2.211, 0)] and mesh order to 2.

```python
wavelength = 1.55
w_xyz = [(wavelength * 1e-6, 2.211, 0, 2.138, 0, 2.211, 0)]
mt = pj.Material()
mt.add_anisotropy(name="anisotropy_material", 
      data=w_xyz, order=2
      )
```

## 1.4 Add material from the material library

The syntax and properties of adding material from material library are shown below. This function does not return any data.


```python
add_lib(
        name: str,
        data: Optional[str],
        order: int = 2
    )
```

| Parameter               | Type    | Default   | Description                    |
|:-----------------|:--------|:----------:|:---------------------|
| name         | string  |     -      |    Define the name of the material.    |                  
| data   | object  | -  | A library material object, format is mo.Material.Air       |
| order     | integer | 2      |     Priority of the material, with larger number indicating higher priority.    |

**Example:**

The following command adds material from material library to the material of the instance, sets the material name to "Air", data to mo.Material.Air and mesh order to 2.

```python
mt = Project.Material()
mt.add_lib(name="Air", data=mo.Material.Air, order=2)

```

</font>