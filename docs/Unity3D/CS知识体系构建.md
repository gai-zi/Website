---
sidebar_position: 2
---

# CS知识体系构建

> 笔记出处：[C# 知识体系构建（第二版）](https://learn.u3d.cn/tutorial/csharp_map_build)

Unity 支持的 C# 版本如下:

- Unity 4.x 支持到 C# 2.0
- Unity 5.x 支持到 C# 3.0，
- Unity 2017.x 支持到 C# 6.0
- Unity 2018.4 ~ 2019.x 到 C# 7.3。
- Unity 2020.3 ~ 2021.1 到 C#8.0
- Unity 2022.x 到 C#9.0

## C# 1.0

![image-20220427184035805](src/image-20220427184035805.png)

### 类

:::note

面向对象编程 == 建模

:::

> 没有类会怎么样?
>
> 如果没有类，在 Unity 中就无法方便地写脚本了，因为 Unity 中的脚本需要继承 MonoBehaviour 类。
>
> 我们知道 MonoBehaviour 中包含了 transform、gameObject 的引用，也有一些生命周期方法，比如：Awake、Start、Update、OnDestory、OnEnable、OnDisable、OnTriggerEnter 等，提供了丰富的功能 和 API。
>
> 而我们写 Unity 脚本的时候，只需要简单地继承 MonoBehaviour 类就可以拥有以上所说的所有功能和 API。
>
> 也就是说类的继承这个功能，让用户更方便地复用代码，更方便地使用引擎的功能。
>
> 以上仅仅是一个小例子，大家可以从自己的编程经验出发，简单思考下没有类会怎么样？

**面向对象和面向过程的区别**

- 面向对象编程是以对象为基础进行设计的，而面向过程是以功能（函数）为基础进行思考的。
- 面向对象更擅设计，而面向过程更擅长实现。

**类的访问权限**

访问权限有：`internal`、`private`、`public`。

`internal`：同一程序集中的任何代码都可以访问该类型或成员，但其他程序集中的代码不可以。 换句话说，`internal` 类型或成员可以从属于同一编译的代码中访问。

internal class 一般在打 dll 的时候作用很大，可以控制有些类不让用户访问到，也可以配合 Unity 的 Assembly Definition 功能使用。

private class 用得不多，一般作为内部类存在。

**类的命名**

类的命名一般是名词，当然有的时候也是动词，比如写一个行为树，那可能会有类似 Wait 这样的类名。

**抽象类 与 接口**

抽象类中有的时候需要些抽象方法，抽象方法需要在子类中覆写。

不能 new 一个抽象类。

实现接口可以显式实现和隐式实现，显式实现可以控制方法的访问权限

**内部类**

有的时候需要在类内部创建一些只需要在类内部使用的对象，这时候可以用内部类。

**partial 关键字**

`paritial`可以实现类的逻辑拆分到不同的文件。

```csharp
// A1.cs 文件中 
public partial class A 
{     
    public void Say()     
    {         
        Debug.Log("Say Hello");     
    } 
}  
// A2.cs 文件中 
public partial class A 
{     
    public void Say2()     
    {         
        Debug.Log("Say Hello2");     
    } 
}
// 测试 
var a = new A(); 
a.Say(); 
a.Say2(); 
```

**泛型类**

类需要适配不同的类型的时候，可以用泛型类，比如单例的模板。

**引用类型 和 值类型**

- 引用类型，用类创建的类型就是引用类型。
- 值类型包含基础类型 和 结构体（struct）还有枚举创建出来的类型。

:::tip

盛传一句话，能用好 struct 的都是高手。

:::