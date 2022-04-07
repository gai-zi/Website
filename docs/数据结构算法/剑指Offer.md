---
sidebar_position: 2
---

# 剑指Offer

## Week 1

### [13. 找出数组中重复的数字](https://www.acwing.com/problem/content/14/)

**解决办法**：注意读题，数据为n且数字范围0~n-1，可以保证"**一个萝卜一个坑**"，把每个数放到对应的位置上，即让`nums[i] = i`

- 如果`nums[x] != x`，那我们就把x交换到正确的位置上，即`swap(nums[x], nums[i])`，交换完之后如果`nums[i] != i`，则重复进行该操作。由于每次交换都会将一个数放在正确的位置上，所以swap操作最多会进行$n-1$次，不会发生死循环。
- 如果`x != i && nums[x] == x`，则说明`x`出现了多次，直接返回`x`即可

**时间复杂度分析**：每次`swap`操作都会将一个数放在正确的位置上，最后一次`swap`会将两个数同时放到正确位置上，一共只有$n$个数和$n$个位置，所以`swap`最多会进行$n−1$次。所以总时间复杂度是 $O(n)$

```cpp
class Solution {
public:
    int duplicateInArray(vector<int>& nums) {
        int n = nums.size();
        if(!n)    return -1;
        //首先遍历一遍，找出不符合条件的数据返回-1
        for(auto x : nums)    if(x < 0 || x >= n) return -1;
        for(int i=0;i<n;i++){
            // 如果没有重复元素，经过这一步操作，0位置将会存储0， i位置将会存储i
            while (nums[nums[i]] != nums[i]) swap(nums[i], nums[nums[i]]);
            // 多个萝卜占不下一个坑，有重复元素
            if (nums[i] != i) return nums[i];
        }
        return -1;
    }
};
```

### [14. 不修改数组找出重复的数字](https://www.acwing.com/problem/content/15/)

**题目**：给定一个长度为$n+1$的数组`nums`，数组中所有的数均在`1~n`的范围内，其中$n\geqslant1$。请找出数组中任意一个重复的数，但不能修改数组。

**解决办法**：一共有n+1一个数，每个数取值范围1~n，肯定存在一个数出现两次。

分治思想解决，将每个数的**取值**的区间[1,n]划分为[1,n/2]喝[n/2+1, n]两个子区间，然后分别统计两个区间中数的个数。划分之后，左右两个区间里一定至少存在一个区间，区间中数的个数大于区间长度。
因此我们可以把问题划归到左右两个子区间中的一个，而且由于区间中数的个数大于区间长度，根据抽屉原理，在这个子区间中一定存在某个数出现了两次。依次类推，每次我们可以把区间长度缩小一半，直到区间长度为1时，我们就找到了答案。

**时间复杂度**：每次会将区间长度缩小一半，一共会缩小$O(logn)$次。每次统计两个子区间中的数时需要遍历一次，时间复杂度为$O(n)$。所以总时间复杂度是$O(nlogn)$

**空间复杂度**：没有额外数组，空间复杂度$O(1)$

```cpp
class Solution {
public:
    int duplicateInArray(vector<int>& nums) {
        int l = 1, r = nums.size() - 1;
        while (l < r) {
            int mid = l + r >> 1; // 划分的区间：[l, mid], [mid + 1, r]
            int s = 0;
            //每次能够划分出来多一个坑的区间
            for (auto x : nums)
                s += (x >= l && x <= mid);
            //判断重复的数字在哪一边，更新区间
            if (s > mid - l + 1) r = mid;
            else l = mid + 1;
        }
        //最后返回的就是多出坑的位置
        return r;
    }
};
```

### [15. 二维数组中的查找 ](https://www.acwing.com/problem/content/16/)

**题目**：在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。

请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**解决办法**：

根据题目给定的二维数组性质，从矩阵**右上角**开始枚举，当前枚举的是x

- `x` == `target` ，找到`target`
- `x` < `target` ，左边的数一定小于`target`，直接排除一行
- `x` > `target` ，下边的数一定大于`target`，直接排除一列

**时间复杂度**：每一步排除**一行**或**一列**，最多进行$n+m$次。所以时间复杂度$O(m+n)$

```cpp
class Solution {
public:
    bool searchArray(vector<vector<int>> array, int target) {
        
        int n = array.size();
        if(n==0)    return false;
        int m = array[0].size();
        int i = 0,j = m-1;                  //从数组右上角开始遍历
        
        for(;i<n && j>0;)
        {
            if(array[i][j] == target)   return true;
            if(array[i][j] > target) j++;   //删除一列不符合的元素
            if(array[i][j] < target) i++;   //删除一行
        }
        
        return false;
    }
};
```

### [16. 替换空格](https://www.acwing.com/problem/content/description/17/)

**题目**：请实现一个函数，把字符串中的每个空格替换成`"%20"`。

```cpp
class Solution {
public:
    string replaceSpaces(string &str) {
        string res;
        for(auto &x : str){
            if(x==' ')  res += "%20";
            else res+=x;
        }
        return res;
    }
};
```

### [17. 从尾到头打印链表](https://www.acwing.com/problem/content/18/)

**题目**：输入一个链表的头结点，按照 **从尾到头** 的顺序返回节点的值。返回的结果用数组存储。

```cpp
class Solution {
public:
    vector<int> printListReversingly(ListNode* head) {
        vector<int> arr;
        while(head){
            arr.push_back(head->val);
            head = head -> next;
        }
        reverse(arr.begin(), arr.end());
        return arr;
    }
};
```

### [20. 用两个栈实现队列](https://www.acwing.com/problem/content/36/)

**题目**：请用栈实现一个队列，支持如下四种操作：

- push(x) – 将元素x插到队尾；
- pop() – 将队首的元素弹出，并返回该元素；
- peek() – 返回队首元素；
- empty() – 返回队列是否为空；

```cpp
class MyQueue {
public:

    stack<int> s1,s2;
    /** Initialize your data structure here. */
    MyQueue() {
    } 
    /** Push element x to the back of queue. */
    void push(int x) {
        s1.push(x);
    }
    void copy(stack<int> &a, stack<int> &b) {
        while (a.size()) {
            b.push(a.top());
            a.pop();
        }
    }
    /** Removes the element from in front of queue and returns that element. */
    int pop() {
		copy(s1, s2);
        int res = s2.top();
        s2.pop();
        copy(s2, s1);
        return res;
    }
    /** Get the front element. */
    int peek() {
		copy(s1, s2);
        int res = s2.top();
		copy(s2, s1);
        return res;
    }
    /** Returns whether the queue is empty. */
    bool empty() {
        return s1.empty();
    }
};
```

### [21. 斐波那契数列](https://www.acwing.com/activity/content/problem/content/216/)

**题目**：输入一个整数$n$，求斐波那契数列的第$n$项。假定从$0$开始，第$0$项为$0$。

> [求解斐波那契数列的若干方法 - AcWing](https://www.acwing.com/blog/content/25/)

```cpp
class Solution {
public:
    int Fibonacci(int n) {
        if(n == 0)        return 0;
        else if(n == 1)     return 1;
        else return Fibonacci(n-1) + Fibonacci(n-2);
    }
};
```

### [22. 旋转数组的最小数字](https://www.acwing.com/problem/content/20/)

**题目**：把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

输入一个升序的数组的一个旋转，输出旋转数组的最小元素。

例如数组 {$3,4,5,1,2$ }为{$1,2,3,4,5$} 的一个旋转，该数组的最小值为$1$。

数组可能包含重复项。

**注意**：数组内所含元素非负，若数组大小为$0$，请返回$-1$。

**解决办法**：二分。图中水平的实线段表示相同元素。我们发现除了最后水平的一段（黑色水平那段）之外，其余部分满足二分性质：竖直虚线左边的数满足 `nums[i] ≥ nums[0]`；而竖直虚线右边的数不满足这个条件。
分界点就是整个数组的最小值。所以我们先将最后水平的一段删除即可。

另外，不要忘记处理数组完全单调的**特殊情况**：当我们删除最后水平的一段之后，如果剩下的最后一个数大于等于第一个数，则说明数组完全单调。

![](./src/旋转数组的最小数字.png)

**时间复杂度分析**：二分的时间复杂度是$O(logn)$，删除最后水平一段的时间复杂度最坏是$O(n)$，所以总时间复杂度是$O(n)$。

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size() - 1;
        if (n < 0) return -1;
        while(n>0 && nums[n] == nums[0])   n--;    //删除数组中前后相等的后序元素
        if(nums[n] >= nums[0])  return nums[0];     //考虑数组单调情况
        int l=0, r=n;
        while(l<r)
        {
            int mid = l + r >> 1;
            if(nums[mid] < nums[0]) r = mid;    //最小值一定在mid的左边，在第二个升序区间头部
            else l = mid + 1;
        }
        return nums[r];
    }
};
```

## Week 2

### [26. 二进制中1的个数](https://www.acwing.com/problem/content/description/25/)

**题目**：输入一个$32$位整数，输出该数二进制表示中$1$的个数。

**解决办法1**：参考基础算法-位运算符

```cpp
class Solution {
public:
    int LowBit(int x){
        return x & -x;
    }
    int NumberOf1(int n) {
        int res = 0;
        while(n)
        {
            n -= LowBit(n);
            res++;
        }
        return res;
    }
};
```

**解决办法2**：在C++中如果我们右移一个负整数，系统会自动在最高位补$1$，这样会导致$n$永远不为$0$，就死循环了。
解决办法是把$n$强制转化成**无符号整型**，这样$n$的二进制表示不会发生改变，但在右移时系统会自动在最高位补0。

**时间复杂度**：每次会将$n$除以$2$，最多会除$logn$次，所以时间复杂度是$O(logn)$

```cpp
class Solution {
public:
    int NumberOf1(int n) {
        int res = 0;
        unsigned int un = n; 
        while (un) res += un & 1, un >>= 1;
        return res;
    }
};
```

### [28. 在O(1)时间删除链表结点](https://www.acwing.com/problem/content/85/)

**题目**：给定单向链表的一个节点指针，定义一个函数在$O(1)$时间删除该结点。假设链表一定存在，并且该节点一定不是尾节点。

**解决办法**：由于是单链表，我们不能找到前驱节点，所以我们不能按常规方法将该节点删除。
我们可以换一种思路，将下一个节点的值复制到当前节点，然后将下一个节点删除即可。

```cpp
class Solution {
public:
    void deleteNode(ListNode* node) {
        ListNode* ne = node->next;
        
        node->val = ne->val;
        node->next = ne->next;
        
        delete ne; 
    }
};
```

### [29. 删除链表中重复的节点](https://www.acwing.com/problem/content/description/27/)

**题目**：在一个排序的链表中，存在重复的节点，请删除该链表中重复的节点，重复的节点不保留。

**解决办法**：为了方便处理边界情况，我们定义一个虚拟元素$dummy$指向链表头节点。
然后从前往后扫描整个链表，**每次扫描元素相同的一段**，如果这段中的元素个数**多于1个**，则**将整段元素直接删除**。

**时间复杂度**：整个链表只扫描一遍，所以时间复杂度是$O(n)$。

> 很巧妙的记录**前驱节点**$p$和**重复元素后第一个节点**$q$的指针，这样可以直接`p->next = q`删除$p-q$之间的所有节点

```cpp
class Solution {
public:
    ListNode* deleteDuplication(ListNode* head) {
        ListNode* front = new ListNode(-1);	
        front->next = head;		//前驱节点
        
        auto p = front;			
        while(p->next){
            auto q = p->next;	//扫描的节点
            //如果相同(包括自己),向后遍历
            while(q && p->next->val == q->val)  q = q->next;
            //如果上面只遍历了一次，说明p->next~~q没有重复元素，否则直接删除期间所有节点
            if(p->next->next == q)  p = p->next;	
            else p->next = q;
        }
        return front->next;
    }
};
```

## Week 7

### [79. 滑动窗口的最大值](https://www.acwing.com/activity/content/problem/content/274/)

**题目**：给定一个数组和滑动窗口的大小，请找出所有滑动窗口里的最大值。

```cpp
class Solution {
public:
    vector<int> maxInWindows(vector<int>& nums, int k) {
        deque<int> q;
        vector<int> res;
        for(int i=0;i<nums.size();i++)
        {
            //判断队头是否需要出队
            if(!q.empty() && i-k+1 > q.front())  q.pop_front();
            //维护单调性
            while(!q.empty() && nums[q.back()] <= nums[i])  q.pop_back();
            q.push_back(i);
            //队头为最大元素
            if(i>=k-1)    res.push_back(nums[q.front()]);
        }
        return res;
    }
};
```

