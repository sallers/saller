---

sidebar_position: 1

---
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';


# Material

<font face = "Calibri">

<div class="text-justify">

**Features Description:** The Global Material Database allows for the definition of complex materials using experimental data or parameterized models. The Material Database stores the material data to be used in the simulation. It also provides an interface to change material properties like color, mesh order, and fit parameters. User could import materials from “Standard” database to “User” material database.

</div>



<div class="text-justify">

**Standard  & User :**Material database includes standard and user material database.

</div>

## 1 Standard Material Database

<div class="text-justify">

The standard material database includes three parts, one is material list, the another is material property plot, and the another one is the material type. The material list includes a number of common materials, when creating a new simulation, the standard database will be loaded. And the materials in the standard material database can be imported into **“User”** material database. The default materials cannot be edited directly.

</div>

| !['figure 1'](../../static/img/tutorial/material/fig1.png "figure 1") |
| :------------------------------------------------------------: |


### 1.1 Material List

| !['figure 2'](../../static/img/tutorial/material/materialList.png) |
| :------------------------------------------------------------: |

<div class="text-justify">

1. __ID__ : Data ranking index
2. __Name__ : Material Name
3. __Mesh Oder__: Decides how overlapping objects are meshed in the simulation.
4. __Color__ : Material Color.You can set the colors according to your own preferences.
5. __Type__ : Types of material, including two types, Normal Material and List Data.

    Normal Material: Non-dispersive materials.

    List Data: Dispersive materials, Materials whose dielectric permittivity changes with wavelength settings, displayed in tabular form.changes with wavelength settings, displayed in tabular form.

6. __Last Modified__ :Last modified time
7. __Import to User/ Import to Project__: Import materials to user or project database.
8. __Export__: Export materials according to user needs.


</div>

### 1.2 Materials in the Standard Material Database

<div class="text-justify">

The following materials are included in the standard material database.

</div>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Mesh Order</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Air</td>
      <td>2</td>
      <td>Lossless Material</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Al (Aluminium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Al (Aluminium) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Au (Gold) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Au (Gold) - Johnson and Christy</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Au (Gold) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Ge (Germanium) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Ge (Germanium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Si (Silicon) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>10</td>
      <td>SiO2 (Glass) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Si3N4 (Silicon Nitride) - Kischkat</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Si3N4 (Silicon Nitride) - Phillip</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>13</td>
      <td>Ag (Silver) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>14</td>
      <td>Pt (Platinum) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>15</td>
      <td>Ta (Tantalum) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>16</td>
      <td>TiN - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>17</td>
      <td>Cu (Copper) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>18</td>
      <td>Fe (Iron) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>19</td>
      <td>W (Tungsten) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>20</td>
      <td>Ti (Titanium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>21</td>
      <td>Ti (Titanium) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>22</td>
      <td>Sn (Tin) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>23</td>
      <td>H2O (Water) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>24</td>
      <td>Cr (Chromium) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>25</td>
      <td>Pd (Palladium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>26</td>
      <td>InAs - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>27</td>
      <td>Ag (Silver) - Palik (1-10um)</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>28</td>
      <td>Ag (Silver) - Johnson and Christy</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>29</td>
      <td>W (Tungsten) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>30</td>
      <td>Fe (Iron) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>31</td>
      <td>Cr (Chromium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>32</td>
      <td>Al2O3 - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>33</td>
      <td>In (Indium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>34</td>
      <td>Cu (Copper) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>35</td>
      <td>Ni (Nickel) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>36</td>
      <td>V (Vanadium) - CRC</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>37</td>
      <td>InP - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>38</td>
      <td>GaAs - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>39</td>
      <td>Ni (Nickel) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>40</td>
      <td>Rh (Rhodium) - Palik</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>41</td>
      <td>Ag (Silver) - Palik (0-2um)</td>
      <td>2</td>
      <td>List Data</td>
    </tr>
    <tr>
      <td>42</td>
      <td>PEC</td>
      <td>2</td>
      <td>PEC</td>
    </tr>
  </tbody>
</table>



### 1.3 Material Properties:

|![](../../static/img/tutorial/material/materialproperties.png) |
| :------------------------------------------------------------: |

<div class="text-justify">

**_Plot_** :User can view each material property in this plot area via clicking a certain material in material list, also can view properties they are interested in via two options in the bottom of plot. Material properties include __“Color”__, __“Name”__, __“Mesh Order”__, __“Wavelength”__, __“Frequency”__, __“n,k”__-Re(refractive index) & Im(refractive index), __“εr′,εr″__-Re(relative permittivity) & Im(relative permittivity), __“εr′,σ”__-Re(relative permittivity) & conductivity.

</div>

#### 1.3.1 Material Data & Model Fitting

<div class="text-justify">

Material Data tab: User can view each material property in this list via double clicking a certain material in material list. Material properties include __“Color”__, __“Name”__, __“Mesh Order”__, __“Wavelength”__, __“Frequency”__, __“n,k”__-Re(refractive index) & Im(refractive index), __“εr′,εr″__-Re(relative permittivity) & Im(relative permittivity), __“εr′,σ”__-Re(relative permittivity) & conductivity.
</div>

**(1). Material Data**


|![](../../static/img/tutorial/material/materialdataAndModelFitting.png) |
| :------------------------------------------------------------: |

<div class="text-justify">

**2. Model Fitting:** (Currently, the model fitting feature is not available and is still in the development process.)

</div>

## 2 User Material Database

<div class="text-justify">

__Feature Description__:The User material database, a database that stores materials defined by user.It includes two parts, one is material list, and another is material property plot. User can copy or delete a selected material, and also can export materials according to their needs.

</div>

|![](../../static/img/tutorial/material/userDataBase.png) |
| :------------------------------------------------------------: |



### 2.1 Material List

<div class="text-justify">

1. __ID__ : Data ranking index
2. __Name__ : Material Name
3. __Mesh Oder__: Decides how overlapping objects are meshed in the simulation.
4. __Color__ : Material Color. You can set the colors according to your own preferences.
5. __Type__ : Types of material, including two types, Normal Material and List Data.

    Normal Material: Non-dispersive materials.

    List Data: Dispersive materials, Materials whose dielectric permittivity changes with wavelength settings, displayed in tabular form.changes with wavelength settings, displayed in tabular form.

6. __Last Modified__ :Last modified time
7. __Import to User/ Import to Project__: Import materials to user or project database.
8. __Export__: Export materials according to user needs.

</div>

### 2.2 Material Properties

|![](../../static/img/tutorial/material/usermaterial.png)|
| :------------------------------------------------------------: |

<div class="text-justify">

**_Plot_** : User can view each material property in this plot area via clicking a certain material in material list, also can view properties they are interested in via two options in the bottom of plot, Such as **"Wavelength"**, **"Frequency"**,__“n,k”__-Re(refractive index) & Im(refractive index), __“εr′,εr″__-Re(relative permittivity) & Im(relative permittivity), __“εr′,σ”__-Re(relative permittivity) & conductivity.


#### 2.2.1 Material Data & Model Fitting

__Material Data Tab:__ User can view each material property in this list via double clicking a certain material in material list.Material properties include __“Color”__, __“Name”__, __“Mesh Order”__, __“Wavelength”__, __“Frequency”__, __“n,k”__-Re(refractive index) & Im(refractive index), __“εr′,εr″__-Re(relative permittivity) & Im(relative permittivity), __“εr′,σ”__-Re(relative permittivity) & conductivity.

**_Anisotropy_** : Two options in this drop-down menu, “None” and “Diagonal”, when diagonal option is checked, user can create FDTD, FDE, or EME anisotropic optical material in the “User Material Database” window.

**_Solver physics_** :Anisotropic materials react to electric field with directional dependent electric displacement. Permittivity can be represented by a 9 element tensor <InlineMath math="\varepsilon_{ij}" />.


<BlockMath math="D_i = \varepsilon_{ij}E_j" />

In general, this tensor can be diagnonalized by a proper choice of coordinate system, e.g. in principle dielectric axes. So it is simplified to

<BlockMath math="\varepsilon =\begin{bmatrix}
 \varepsilon_x & 0 & 0\\
 0 &  \varepsilon_y & 0\\
 0 & 0 &  \varepsilon_z
\end{bmatrix}" />

**_Diagonal anisotropic materials_**:To define an anisotropic material, set the Anisotropy field in the material database to Diagonal and assign the parameters for each diagonal component.

|![](../../static/img/tutorial/material/anisoropic.png)|
| :------------------------------------------------------------: |




</div>

</font>