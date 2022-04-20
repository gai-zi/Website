---
sidebar_position: 3
---

# Transformation

- 2D transformations : rotation, scale,shear(错切)
- Homogeneous coordinates(齐次笛卡尔坐标)
- Composing transforms(组合变换)
- 3D transforms

## Linear Transforms 线性变换


$$
x'=ax+by\\
y'=cx+dy
$$

$$
\left[
\begin{matrix}
x'\\
y'
\end{matrix}
\right]
=
\left[
\begin{matrix}
a & b\\
c & d
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y
\end{matrix}
\right]
$$

$$
x'=Mx
$$

### Scale

#### Scale Matrix 缩放矩阵

![](./src/scale00.png)

**均匀缩放**
$$
\left[
\begin{matrix}
x'\\
y'
\end{matrix}
\right]
=
\left[
\begin{matrix}
s & 0\\
0 & s
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y
\end{matrix}
\right]
=
(sx,sy)
$$
**非均匀缩放**
$$
\left[
\begin{matrix}
x'\\
y'
\end{matrix}
\right]
=
\left[
\begin{matrix}
s_x & 0\\
0 & s_y
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y
\end{matrix}
\right]
$$

#### Reflection Matrix 镜像矩阵

![](./src/Reflection-Matrix.png)

Horizontal relection : 
$$
\left[
\begin{matrix}
x'\\
y'
\end{matrix}
\right]
=
\left[
\begin{matrix}
-1 & 0\\
0 & 1
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y
\end{matrix}
\right]
=
(-x,y)
$$

#### Shear Matrix 切变矩阵

:::tip

切变：切边是图像非均匀拉伸，但是图像的面积和体积都没变

:::

![](./src/Shear-Matrix.png)

y坐标无变化，x坐标随高度y进行不同程度的增加
$$
\left[
\begin{matrix}
x'\\
y'
\end{matrix}
\right]
=
\left[
\begin{matrix}
1 & a\\
0 & 1
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y
\end{matrix}
\right]
=
(x+ay,y)
$$

### Rotate

图像绕<u>**原点**，**逆时针**</u>旋转$\theta$

![](./src/Rotation-Matrix.png)

**推导$R_\theta$旋转矩阵：**

![](./src/推到旋转矩阵公式.png)


$$
R_\theta
=
\left[
\begin{matrix}
cos\theta & -sin\theta \\
sin\theta & -cos\theta
\end{matrix}
\right]
$$

> 正交矩阵：逆矩阵=转置矩阵

$$
R_{-\theta}
=
\left[
\begin{matrix}
cos\theta & sin\theta \\
-sin\theta & -cos\theta
\end{matrix}
\right]
=
R_\theta^{-1}
=
R_\theta^T
$$

## Homogeneous coordinates 齐次坐标

:::tip

引入齐次坐标的意义：

- **平移操作不能转化为矩阵形式**，需要一种方法来统一变换操作->把平移操作转化为线性变化
- 用来明确区分向量和点,同时也更易用于进行仿射(线性)几何变换

:::

**<font color="red">增加一个维度</font>**

- **2D Point$=(x,y,1)^T$**

  

  **齐次坐标中的point：**$\left[
  \begin{matrix}
  x\\
  y\\
  w
  \end{matrix}
  \right]$​is the 2D point $\left[
  \begin{matrix}
  x/w\\
  y/w\\
  1
  \end{matrix}
  \right]$​ ,$w\neq0$

- **2D Vector$=(x,y,0)^T$**

  增加的维度设置为0，当进行下方的矩阵相乘时，得到的结果为$\left[
  \begin{matrix}
  x\\
  y\\
  0
  \end{matrix}
  \right]$，保证向量不变

使w值为0/1能够保证如下情况：

1. vector + vector = vector

2. point - point = vector

3. point + vector = point

4. point + point = 表示2个点的中点

   > $(x_1,y_1,1)^T + (x_2,y_2,1)^T = (x_1+x_2,y_1+y_2,2)^T= (\frac{x_1+x_2}{2},\frac{y_1+y_2}{2},1)^T$

### 平移—矩阵形式表示

$$
\left[
\begin{matrix}
x'\\
y'\\
w'
\end{matrix}
\right]
=
\left[
\begin{matrix}
1 & 0 & t_x\\
0 & 1 & t_y\\
0 & 0 & 1
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y\\
1
\end{matrix}
\right]
=
\left[
\begin{matrix}
x+t_x\\
y+t_y\\
1
\end{matrix}
\right]
$$

## Affine Transformations 仿射变换

- 使用齐次坐标把不同的变换，**统一**成一种表现形式

  **代价**：增加一个维度

- Affine map = linear map + translation

  仿射变换=线性变换+平移（存在顺序：**先线性变换，再平移**）

### 齐次坐标表示

$$
\left[
\begin{matrix}
x'\\
y'\\
1
\end{matrix}
\right]
=
\left[
\begin{matrix}
a & b & t_x\\
c & d & t_y\\
0 & 0 & 1
\end{matrix}
\right]

\left[
\begin{matrix}
x\\
y\\
1
\end{matrix}
\right]
$$

### 2D Transformations 变换

> 第三列$t_x,t_y$非零，表示平移操作

#### Scale

$$
S(s_x,s_y)=
\left(
\begin{matrix}
s_x & 0 & 0\\
0 & s_y & 0\\
0 & 0 & 1
\end{matrix}
\right)
$$

#### Rotation

$$
R(\alpha)=
\left(
\begin{matrix}
cos\alpha & -sin\alpha & 0\\
sin\alpha & -cos\alpha & 0\\
0 & 0 & 1
\end{matrix}
\right)
$$

#### Translation 平移

$$
T(t_x,t_y)=
\left(
\begin{matrix}
1 & 0 & t_x\\
0 & 1 & t_y\\
0 & 0 & 1
\end{matrix}
\right)
$$

## Inverse Transform 逆变换

$$
M^{-1}
$$

**在矩阵和几何意义上，$M^{-1}$是M的逆变换**

![](./src/逆变换.png)

## Composite Transform 组合变换

> e.g. 如何进行下列变换？

![](./src/组合变换1.png)

**注意变换顺序**：**旋转**后**平移**

![](./src/组合变换2.png)

**矩阵的应用**：**从右到左**
$$
T_{(1,0)} \cdot R_{45}\left[\begin{matrix}x\\y\\1\end{matrix}\right]
=
\left[\begin{matrix}1 & 0 & 1\\0 & 1 & 0\\0 & 0 & 1\end{matrix}\right]
\left[\begin{matrix}cos45^\circ & -sin45^\circ & 0\\sin45^\circ & -cos45^\circ & 0\\0 & 0 & 1\end{matrix}\right]
$$

### 结合变换

有一系列仿射变换矩阵$A_1,A_2,A_3,...,A_n$，对一点进行变换操作，根据**结合律**可以把**多变1**
$$
A_n(A_2(A_1(x))) = A_n\cdots A_2\cdot A_1\cdot \left(\begin{matrix}x\\y\\1\end{matrix}\right)
$$

### 分解变换

> e.g. 如何绕给定点$c$进行旋转
>
> - 将图形平移至原点
> - 旋转
> - 平移back
>
> $T(c)\cdot R(\alpha)\cdot T(-c)$

![](./src/分解变换.png)

## 3D Transforms

- 3D Point $=(x,y,z,1)^T$

  $\left[\begin{matrix}x\\y\\z\\w\end{matrix}\right]$is the 3D point $\left[\begin{matrix}x/w\\y/w\\z/w\\1\end{matrix}\right]$ ,$w\neq0$

- 3D Vector $=(x,y,z,0)^T$

### 3D仿射变换

4X4矩阵表示变换三维变换
$$
\left[\begin{matrix}x'\\y'\\z'\\1\end{matrix}\right]
=
\left[\begin{matrix}
a & b & c & t_x\\
d & e & f & t_y\\
g & h & i & t_z\\
0 & 0 & 0 & 1
\end{matrix}\right]

\left[\begin{matrix}
x\\
y\\
z\\
1
\end{matrix}\right]
$$

#### Scale

$$
S(s_x,s_y,s_z)=
\left(
\begin{matrix}
s_x & 0 & 0 & 0\\
0 & s_y & 0 & 0\\
0 & 0 & s_z & 0\\
0 & 0 & 0 & 1
\end{matrix}
\right)
$$



#### Translation

$$
T(t_x,t_y,t_z)=
\left(
\begin{matrix}
1 & 0 & 0 & t_x\\
0 & 1 & 0 & t_y\\
0 & 0 & 1 & t_z\\
0 & 0 & 0 & 1
\end{matrix}
\right)
$$

#### Rotation

绕$x,y,z$轴旋转
$$
R_x(\alpha)
=
\left[\begin{matrix}
1 & 0 & 0 & 0\\
0 & cos\alpha & -sin\alpha & 0\\
0 & sin\alpha & cos\alpha & 0\\
0 & 0 & 0 & 1
\end{matrix}\right]

\left[\begin{matrix}
x\\
y\\
z\\
1
\end{matrix}\right]
$$

$$
R_y(\alpha)
=
\left[\begin{matrix}
cos\alpha & 0 & sin\alpha & 0\\
0 & 1 & 0 & 0\\
-sin\alpha & 0 & cos\alpha & 0\\
0 & 0 & 0 & 1
\end{matrix}\right]

\left[\begin{matrix}x\\y\\z\\1\end{matrix}\right]
$$

$$
R_z(\alpha)
=
\left[\begin{matrix}
cos\alpha & -sin\alpha & 0 & 0\\
sin\alpha & cos\alpha & 0 & 0\\
0 & 0 & 1 & 0\\
0 & 0 & 0 & 1
\end{matrix}\right]

\left[\begin{matrix}x\\y\\z\\1\end{matrix}\right]
$$

### Euler angles 欧拉角

可以把三个方向$x,y,z$轴的的旋转变换，合并为一个3D变换
$$
R_{xyz}(\alpha,\beta,\gamma)=R_x(\alpha)R_y(\beta)R_z(\gamma)
$$

#### Roll ,Pitch,Yaw

- Pitch：俯仰角
- Yaw：偏航
- Roll:：翻滚

![](./src/RollPitcgYaw.png)

### Rodrigues' Rotation 罗德里格公式

**向量绕n轴，旋转$\alpha$角度**

![](./src/罗德里格公式.png)

### Quaternion 四元数

待补充

## Viewing(观测) transformation

### View/Camera transformation

> 思考现实中照相的步骤——MVP变换(Model,View,Projection)
>
> 1. 找一个好的**位置**，排列好人物（**model**模型变换）
> 2. 找一个好的**角度**放置相机（**view**视野变换）
> 3. 拍照！（**Projection**投影变换 3D->2D）

#### 相机属性

- Position
- Look-at direction
- Up direction

![](./src/约定相机.png)



约定相机：up at Y，look at -Z

![](./src/完成约定相机.png)

**如何把相机移动到约定的up at Y,look at -Z位置?需要将相机和物体一起变换到目标位置.**

![](./src/数学中变换相机.png)

1. 先进行平移变换$T_{view}$，再进行旋转变换$R_{view}$
2. 直接求原位置到约定位置不方便，不如反过来求解，求解$(1,0,0),(0,0,-1)$等目标向量转换为原向量所需的矩阵$R_{view}^{-1}$，再求逆矩阵$R_{view}$即可求解
3. 即可把相机位置和人物/模型位置摆放好(model,view is ready)，接下来需要的是投影(projection)了

![](./src/数学中变换相机1.png)

### Projection(投影) transformation

#### Orthographic  vs. Perspective 

区别：是否存在**近大远小、一叶障目**？

![](./src/正交透视投影.png)

#### Orthographic 正交投影

- 相机位于原点origin，朝向-Z，up to Y
- 丢弃Z坐标
- 将生成的矩形平移并缩放为 [-1, 1] 

![](./src/正交透视图.png)

> **e.g. 将物体转换为正交投影，先平移再缩放**
>
> ![](./src/转为正交投影.png)

#### Perspective 透视投影

**如何做透视？**

1. 先”挤压“截头锥体，使之成为立方体(n->n,f->f)($M_{persp->ortho}$)
2. 做正交投影（$M_{ortho}$）

![](./src/如何做透视投影.png)

目的要寻找**原点和目标点的关系**，通过相似三角形可以求得。

![](./src/寻找透视变换规律.png)

求出$M_{persp->ortho}$
$$
M_{persp->ortho}
=
\left(\begin{matrix}
n & 0 & 0 & 0\\
0 & n & 0 & 0\\
0 & 0 & n+f & -nf\\
0 & 0 & 1 & 0
\end{matrix}\right)
$$
再做正交变换：$M_{persp}=$$M_{ortho}M_{persp->ortho}$，求得透视变换

> e.g. 参考Frustum图，一个点在(n+f)/2处，做透视投影后z的值会更贴近f or n？
>
> 得到的矩阵与（x，y，z，1）相乘后z的值等于$(-nf)/z+(n+f)$,是个反比例函数，这个图像恒过（n，n）与（f，f），在n与f之间，是下凹的，所以变小了

