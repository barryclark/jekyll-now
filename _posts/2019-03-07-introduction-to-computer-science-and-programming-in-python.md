---
layout: post
title: Introduction to Computer Science and Programming in Python (Fall 2016)
date: 2019-03-07
---
Mục đích: Hiểu được vai trò của tính toán trong giải quyết vấn đề và tự tin viết được những chương trình (nhỏ) có ích.

Sách tham khảo: Guttag, John. Introduction to Computation and Programming Using Python: With Application to Understanding Data Second Edition. MIT Press, 2016.
 
Bài tập: Bao gồm 6 bài tập đều sử dụng ngôn ngữ Python để lập trình. 

1. What is computation?

Máy tính chỉ làm 2 việc: *thực thi tính toán* và *lưu trữ kết quả của các tính toán đó*.

Tri thức có 2 dạng: **khai báo (declarative)** và **mệnh lệnh (imperative)**.
* *Tri thức dạng khai báo* là các phát biểu về một sự thật hiển nhiên. Ví dụ như căn bậc 2 của *x* là một số *y* sao cho *y* * *y* = *x*. 
* *Tri thức dạng mệnh lệnh* là tri thức hướng dẫn cách để suy luận thông tin. Ví dụ phương pháp *Heron* (hay phương pháp *Babylon*):
  * Bắt đầu với 1 số *g* (dự đoán).
  * Nếu *g* * *g* xấp xỉ *x* thì dừng, *g* chính là kết quả.
  * Đặt lại *g* = (*g* + *x* / *g*) / 2.
  * Tiếp tục lặp lại bước đầu tiên.
  
**Thuật toán** là một dãy các bước đơn giản cùng với flow of control xác định khi nào mỗi bước được thực hiện. Phương pháp Heron là một ví dụ về thuật toán theo kiểu *đoán-và-thử* (là thuật toán mà dễ dàng kiểm tra xem một dự đoán có tốt hay không).

Hình thức hóa một chút, **thuật toán** là  
 
 

 
