---
sidebar_position: 7
---

# 常用C++ STL

## vector

> 系统为程序分配空间时，所需时间与空间大小无关，与申请次数有关。
>
> **扩容倍增**：当我们新建一个vector的时候，会首先分配给他一片连续的内存空间，如	`std::vector<int> vec`，当通过push_back向其中增加元素时，如果初始分配空间已满，就会引起vector扩容，其扩容规则在`gcc`下以2倍方式完成：
>
> - 首先重新申请一个2倍大的内存空间；
> - 然后将原空间的内容拷贝过来；
> - 最后将原空间内容进行释放，将内存交还给操作系统；

**声明**

```cpp
vector<int> a(10); 

vector<int> a(10,0); 

vector<vector<int>> dp( 3 ,vector<int> (5,0));		//定义一个3X5的二维数组

vector<int> b(a); //用b向量来创建a向量，整体复制性赋值

vector<int> a(b.begin(),b.begin()+3); //定义了a值为b中第0个到第2个（共3个）元素

int b[7]={1,2,3,4,5,9,8};
vector<int> a(b,b+7); //从数组中获得初值
```

**常用操作**

```cpp
vector<int> arr;
arr.size();
arr.empty();
arr.clear();	//清空
arr.front(), arr.back();
arr.push_back(), arr.pop_back();
arr.begin(), arr.end();
arr[];

// erase the 6th element
myvector.erase (myvector.begin()+5);

// erase the first 3 elements:
myvector.erase (myvector.begin(),myvector.begin()+3);
```

**字典序比较**

```cpp
vector<int> a(10,3) , b(10,4);
a < b == true;
```

## pair<T, T>

```cpp
#include <utility>	// std::pair, std::make_pair

pair<int, string> p;
p = make_pair(10, "nb");	p = {110, "nb"};
p.first;
p.second;

pair<int, pair<int, int> > pp;
```

支持**比较**运算(字典序)，支持**排序**

## string

### 寻找子串

```cpp
//在str寻找是否有curStr，返回下标
str.find(curStr) == string::npos
```

### 截取子字符串

```cpp
//从str中截取从下标0开始，length长度的字符串
resStr = str.substr(0,length);
```

## queue

```cpp
#include <queue>          // std::queue

queue<int> q;
q.size();
q.push();
q.pop();
q.front();
q.back();
q.empty();
```

## priority_queue

**优先队列**，**大根堆**

```cpp
#include <queue>          // std::priority_queue
#include <iostream>       // std::cout

std::priority_queue<int> heap;
empty()
size()
top()
push()
pop()
    
//小根堆
priority_queue<int, vector<int>, greater<int>>	smallHeap
    //或
Smypq.push(-x);		//全都存入负数
```

## stack

```cpp
#include <stack>          // std::stack

std::stack<int> mystack;
empty()
size()
top()
push()
pop()
```

## deque

> 速度慢

```cpp
#include <deque>          // std::deque

deque<int> q;
q.size();
q.push();
q.pop();
q.front();
q.back();
q.empty();
q.clear();
push_back(), pop_back();		//后

push_front(), pop_front();		//前插

```

## 红黑树

`set`, `map`, `multiset`, `multimap`, 基于**平衡二叉树（红黑树）**，动态维护有序序列

```cpp
#include <set>

set
	size()
    empty()
    clear()
    begin()/end()
    ++, -- //返回前驱和后继，时间复杂度O(logn)

set/multiset
    insert(x)  //插入一个数
    find(x) == end()  //查找一个数
    count(x)  //返回某一个数的个数
    erase(x)
        (1) 输入是一个数x，删除所有x   O(k + logn)
        (2) 输入一个迭代器，删除这个迭代器
    lower_bound(x)  返回大于等于x的最小的数的迭代器
    upper_bound(x)  返回大于x的最小的数的迭代器
map/multimap
    insert(pair<T,T>)  //插入的数是一个pair
    erase(x)  //输入的参数是pair或者迭代器
    find()
    []   时间复杂度是 O(logn)
    lower_bound()/upper_bound()
```

## Hash

`unordered_set`, `unordered_map`, `unordered_multiset`, `unordered_multimap`, 哈希表
		和上面类似，增删改查的时间复杂度是$O(1)$
		不支持` lower_bound()/upper_bound()`， 迭代器的`++，--`

## 数组

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

### 求和

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

## bitset

 **圧位**

	bitset<10000> s;
	~, &, |, ^
	>>, <<
	==, !=
	[]
	
	count()  返回有多少个1
	
	any()  判断是否至少有一个1
	none()  判断是否全为0
	
	set()  把所有位置成1
	set(k, v)  将第k位变成v
	reset()  把所有位变成0
	flip()  等价于取反~
	flip(k) 把第k位取反
