---
sidebar_position: 3
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

