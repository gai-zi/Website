---
sidebar_position: 1
---

# 常用C++ STL

## 数组相关`arr`

### 定义数组元素

```cpp
#include<cstring>
memset(arr, 0, sizeof(arr));
memset(arr, -1, sizeof(arr));	//将arr数组每个字节全置为-1，每个数4字节变为-1
memset(arr, 0x3f, sizeof(arr));	//将arr数组每个字节全置为0x3f，每个数4字节相当于0x3f3f3f3f
```

### 求最大/小

```cpp
#include <algorithm>
std::cout << *( std::min_element( arr.begin(), arr.end() ) );
std::cout << *( std::max_element( arr.begin(), arr.end() ) );
```

## 求和

> 对于字符串可以将其连接起来（string类型的加，相当于字符串连接)

```cpp
#include <numeric>      // std::accumulate
// 参数3，累加值的初始值
std::cout << accumulate(arr.begin(),arr.end(),0);
```

### 查找

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;
int main(){
	vector<int> v= {3,4,1,2,8};
	//先排序
	sort(v.begin(),v.end()); // 1 2 3 4 8
    
	// 定义两个迭代器变量 
	vector<int>::iterator iter1;
	vector<int>::iterator iter2; 
	
    //返回nums有序数组中target出现的下标(如果没有，显示应该在的位置)
	iter1 = lower_bound(v.begin(),v.end(),3);//迭代器指向3
	iter2 = lower_bound(v.begin(),v.end(),7);//迭代器指向8（因为第一个大于等于8）
	
	cout << iter1 - v.begin() << endl; //下标 2
	cout << iter2 - v.begin() << endl; //下标 4 
}
```

## 字符串

### 寻找子串

```cpp
#include<string>
//在str寻找是否有curStr，返回下标
str.find(curStr) == string::npos
```

### 截取字符串

```cpp
#include<string>
//从str中截取从下标0开始，length长度的字符串
resStr = str.substr(0,length);
```

