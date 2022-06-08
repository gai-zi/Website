---
sidebar_position: 1
---

# Lua Basic

## 变量

**赋值变量等于直接声明变量**

```lua
a = 1
b = 2
-- 局部变量，只能在当前代码块作用
local c = 1
-- 多重赋值（f==nil）
d,e,f = 0x11,2e10
```

### 布尔

**lua中只有`nil`和`false`代表假，其他(包括0)都代表真**

```lua
a = true
b = false
print(1>2)
print(1<2)
print(1<=2)
print(1>=2)
print(1==2)
print(1~=2)
print(a and b)
print(a or b)
print(not b)
```

### 短路求值 

> 短路求值是指`$$`和`||`都是先求左侧运算对象的值，当左侧运算对象的值无法确定表达式的结果时才计算右侧运算对象的值。
>
> 1. 对于`$$`，当且仅当左侧运算对象为真时才对右侧运算对象求值。
> 2. 对于`||`，当且仅当左侧运算对象为假时才对右侧运算对象求值。

lua的判断表达式不会直接返回`true` 或 `false`，而是直接返回短路运算结束的值

```lua
a = nil
b = 0
print(b>-1 and "yes" or "no")	--Output: yes
print(b>10 and "yes" or "no")	--Output: no
```

### nil

> 相当于C语言的NULL，Lua中未被声明的都是nil

```lua
print(d)
-- Output: nil
```

## 字符串

**单行文本**

```lua
-- 支持转义字符
a = "abcd\nefg"
print(a)

-- Output:abcd
-- efg
```

**多行文本**[[]]

`[[]]`会把原始值和格式存入字符串

```lua
c = [[abcd
efg
hij		k]]
print(c)
-- Output:[14:42:45] abcd
-- efg
-- hij		k
```

### 字符串连接

使用`..`连接字符串

```lua
a = "123"
b = "234"
c = a..b
print(c)

-- Output:123234
```

### 字符串转换

```lua
c = tostring(10)
-- 转换数字失败输出nil
n = tonumber("10")	
-- 输出字符串长度
print(#c)
```

## If

```lua
if 1>10 then 
    print("1>10")
elseif 1<10 then
    print("1<10")
else
    print("10")
end
```

## 循环

### for

```lua
-- var 从 exp1 变化到 exp2，每次变化以 exp3 为步长递增 var，并执行一次 "执行体"。exp3 是可选的，如果不指定，默认为1。
for var=exp1,exp2,exp3 do  
    <执行体>  
end
```

```lua
for i=10,1,-1 do
    print(i)
    if(i==5) then break end
end   
```

### while

```lua
while(condition)
do
   statements
end
```

## 函数

### **函数定义格式**

```lua
function function_name( ... )
    -- body
end
```

**举例:**

```lua
function fun(a,b,c)
    print(a,b,c)
end

fun(1,2)

-- Output:1	2 nil
```

### **函数返回值**

**可以返回多个值，对应多个赋值语句**

```lua
function f(a,b,c)
    	return a,b
end

i,j = f(1,2)
```

## Table

相当于关联型数组，**下标从1开始**，可以用任意类型的值来作数组的索引

```lua
-- 初始化表
mytable = {}

-- 指定值
mytable[1]= {1,"lua",{22,33}}

-- 移除引用
mytable = nil
-- lua 垃圾回收会释放内存

-- 获取数组长度
print(#mytable)
```

Table中可以存放**键值对**

```lua
mytable = {
    a = 1,
    b = "字母"
}
mytable["test"] = "测试"
print(mytable["a"],mytable["b"],mytable["test"])

-- Output:1	字母	测试
```

### Table操作

| 序号 | 方法 & 用途                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **table.concat (table [, sep [, start [, end]]]):**concat是concatenate(连锁, 连接)的缩写. table.concat()函数列出参数中指定table的数组部分从start位置到end位置的所有元素, 元素间以指定的分隔符(sep)隔开。 |
| 2    | **table.insert (table, [pos,] value):**在table的数组部分指定位置(pos)插入值为value的一个元素. pos参数可选, 默认为数组部分末尾. |
| 3    | **table.remove (table [, pos])**返回table数组部分位于pos位置的元素. 其后的元素会被前移. pos参数可选, 默认为table长度, 即从最后一个元素删起。 |
| 4    | **table.sort (table [, comp])**对给定的table进行升序排序。   |

```lua
fruits = {"banana","orange","apple"}
-- 返回 table 连接后的字符串
print("连接后的字符串 ",table.concat(fruits))
-- 指定连接字符
print("连接后的字符串 ",table.concat(fruits,", "))
-- 指定索引来连接 table
print("连接后的字符串 ",table.concat(fruits,", ", 2,3))

fruits = {"banana","orange","apple"}

-- 在末尾插入
table.insert(fruits,"mango")
print("索引为 4 的元素为 ",fruits[4])
-- 在索引为 2 的键处插入，后续元素后移一位
table.insert(fruits,2,"grapes")
print("索引为 2 的元素为 ",fruits[2])

print("最后一个元素为 ",fruits[5])
-- 返回移除的值
table.remove(fruits)
print("移除后最后一个元素为 ",fruits[5])
```

### `_G`

特殊的Table，表示全局表，**存放所有的全局变量**

```lua
a = 2 
-- 输出a的值，table的insert函数的地址
print(_G["a"],_G["table"]["insert"])
--Output:2	function: 0xc1
```

