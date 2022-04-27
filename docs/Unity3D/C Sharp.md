---
sidebar_position: 1
---

# C#

## Debug

```c#
print("Hello World");
Debug.Log("Hello World");
Debug.LogWarning("This is a warning message!");
Debug.LogError("This is an error message!");
```

### 格式化输出

```c#
int a = 100;
float b = 0.6f;
Debug.Log(string.Format("a is: {0}, b is {1}", a, b));
Debug.Log(string.Format("a is: {0}, b is {1}", a, b));

Debug.Log("The a is:" + a);
```

### 彩色打印

```c#
Debug.LogFormat("This is <color=#ff0000>{0}</color>", "red");
Debug.LogFormat("This is <color=#00ff00>{0}</color>", "green");
Debug.LogFormat("This is <color=#0000ff>{0}</color>", "blue");
Debug.LogFormat("This is <color=yellow>{0}</color>", "yellow");
```

> [日志存储与上传 | 日志开关 | 日志双击溯源](https://blog.csdn.net/linxinfa/article/details/119280053)

## ForeachLoop

```c#
foreach(var item in strings){
    print (item);
}
```

## 线性插值

在制作游戏时，有时可以在两个值之间进行线性插值。这是通过 Lerp 函数来完成的。线性插值会在两个给定值之间找到某个百分比的值。例如，我们可以在数字 3 和 5 之间按 50% 进行线性插值以得到数字 4。这是因为 4 是 3 和 5 之间距离的 50%。

在 Unity 中，有多个 Lerp 函数可用于不同类型。对于我们刚才使用的示例，与之等效的将是 Mathf.Lerp 函数，如下所示：

```c#
// 在此示例中，result = 4
float result = Mathf.Lerp (3f, 5f, 0.5f);
```

Mathf.Lerp 函数接受 3 个 float 参数：一个 float 参数表示要进行插值的起始值，另一个 float 参数表示要进行插值的结束值，最后一个 float 参数表示要进行插值的距离。在此示例中，插值为 0.5，表示 50%。如果为 0，则函数将返回“from”值；如果为 1，则函数将返回“to”值。

Lerp 函数的其他示例包括 Color.Lerp 和 Vector3.Lerp。这些函数的工作方式与 Mathf.Lerp 完全相同，但是“from”和“to”值分别为 Color 和 Vector3 类型。在每个示例中，第三个参数仍然是一个 float 参数，表示要插值的大小。这些函数的结果是找到一种颜色（两种给定颜色的某种混合）以及一个矢量（占两个给定矢量之间的百分比）。

让我们看看另一个示例：

```c#
Vector3 from = new Vector3 (1f, 2f, 3f);
Vector3 to = new Vector3 (5f, 6f, 7f);

// 此处 result = (4, 5, 6)
Vector3 result = Vector3.Lerp (from, to, 0.75f);
```

在此示例中，结果为 (4, 5, 6)，因为 4 位于 1 到 5 之间的 75% 处，5 位于 2 到 6 之间的 75% 处，而 6 位于 3 到 7 之间的 75% 处。

使用 Color.Lerp 时适用同样的原理。在 Color 结构中，颜色由代表红色、蓝色、绿色和 Alpha 的 4 个 float 参数表示。使用 Lerp 时，与 Mathf.Lerp 和 Vector3.Lerp 一样，这些 float 数值将进行插值。

在某些情况下，可使用 Lerp 函数使值随时间平滑。请考虑以下代码段：

```c#
void Update (){
    light.intensity = Mathf.Lerp(light.intensity, 8f, 0.5f);
}
```

如果光的强度从 0 开始，则在第一次更新后，其值将设置为 4。下一帧会将其设置为 6，然后设置为 7，再然后设置为 7.5，依此类推。因此，经过几帧后，光强度将趋向于 8，但随着接近目标，其变化速率将减慢。请注意，这是在若干个帧的过程中发生的。如果我们不希望与帧率有关，则可以使用以下代码：

```c#
void Update (){
    light.intensity = Mathf.Lerp(light.intensity, 8f, 0.5f * Time.deltaTime);
}
```

这意味着强度变化将按每秒而不是每帧发生。

请注意，在对值进行平滑时，通常情况下最好使用 SmoothDamp 函数。仅当您确定想要的效果时，才应使用 Lerp 进行平滑。

## 引用

![image-20220426185903324](src/image-20220426185903324.png)

```
//引用，获取地址直接改变地址中的数据
Transform tran = transform;
tran.localScale = new Vector3(3f, 3f, 3f);
```

## as

在程序中，进行类型转换时常见的事，C#支持基本的强制类型转换方法，比较低效的方法：

```c#
Object obj1 = new NewType();
NewType newValue = (NewType)obj1;
//这样强制转换的时候，这个过程是不安全的，因此需要用try-catch语句进行保护，这样一来，比较安全的代码方式应如下所示：
Object obj1 = new NewType（）;
NewType newValue = null;
try{
    undefined newValue = （NewType）obj1；
}
catch (Exception err)
{
    undefined MessageBox.Show（err.Message）;
}
```

**高效的方法：**

```c#
Object obj1 = new NewType（）；
NewTYpe newValue = obj1 as NewType；
```
