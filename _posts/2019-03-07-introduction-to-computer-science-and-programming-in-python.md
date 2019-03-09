---
layout: post
title: Introduction to Computer Science and Programming in Python (Fall 2016)
date: 2019-03-07
---
**Mục đích**: Hiểu được vai trò của tính toán trong giải quyết vấn đề và tự tin viết được những chương trình (nhỏ) có ích.

**Sách tham khảo**: [Guttag, John. Introduction to Computation and Programming Using Python: With Application to Understanding Data Second Edition. MIT Press, 2016. ISBN: 9780262529624](https://mitpress.mit.edu/books/introduction-computation-and-programming-using-python-second-edition).
 
**Bài tập**: Bao gồm 6 bài tập đều sử dụng ngôn ngữ Python để lập trình. 

**1. What is computation?**

Đọc chương 1 và phần 2.1 trong sách tham khảo.

Máy tính chỉ làm 2 việc: thực thi tính toán và lưu trữ kết quả của các tính toán đó.

Tri thức có 2 dạng: khai báo (declarative) và mệnh lệnh (imperative).
Tri thức dạng khai báo là các phát biểu về một sự thật hiển nhiên. Ví dụ như căn bậc 2 của x là một số y sao cho y * y = x. 
Tri thức dạng mệnh lệnh là tri thức hướng dẫn cách để suy luận thông tin. Ví dụ phương pháp Heron (hay phương pháp Babylon):
   Bắt đầu với 1 số g (dự đoán).
   Nếu g * g xấp xỉ x thì dừng, g chính là kết quả.
   Đặt lại g = (g + x / g) / 2.
   Tiếp tục lặp lại bước đầu tiên.
  
Thuật toán là một dãy các bước đơn giản cùng với flow of control xác định khi nào mỗi bước được thực hiện. Phương pháp Heron là một ví dụ về thuật toán theo kiểu đoán-và-thử (là thuật toán mà dễ dàng kiểm tra xem một dự đoán có tốt hay không).

Hình thức hóa một chút, thuật toán là một dãy hữu hạn các bước mô tả tính toán với một tập các input nó sẽ tiến hành thông qua một tập các trạng thái xác định và cho ra output.

Máy tính đời đầu gọi là fixed-program computers, được thiết kế để làm những công việc rất cụ thể, chủ yếu là để giải các bài toán như tính quỹ đạo của đạn pháo. Một trong những chiếc máy tính đầu tiên (xây dựng vào năm 1941 bởi Atanasoff và Berry) không làm gì ngoài giải hệ phương trình tuyến tính. Máy bombe của Alan Turing xây dựng trong Thế Chiến Thứ Hai chỉ với mục đích phá mã máy Enigma của Đức Quốc Xã. Máy tính cầm tay đơn giản cũng là một fixed-program computers. Nó có thể làm phép tính số học đơn giản nhưng không thể làm những việc như xử lí văn bản hay chạy video game. Muốn thay đổi chương trình thì người ta phải thay thế mạch.

Chiếc máy tính thực sự hiện đại đầu tiên là chiếc Manchester Mark 1. Khác với những người tiền nhiệm, nó là một stored-program computer. Nó lưu trữ và thao tác một dãy các lệnh, và có khả năng thực thi bất kì lệnh nào trong dãy đó. Bằng cách tạo ra kiến trúc tập lệnh, và biểu diễn tính toán như một dãy các lệnh, ta được một cổ máy linh hoạt hơn. Nếu coi các lệnh là dữ liệu, ta có thể dễ dàng thay đổi chương trình, và việc đó được kiểm soát bởi một chương trình khác. Do đó trọng tâm của máy tính là một chương trình được gọi là interpreter, nó có thể thực thi bất kì tập lệnh hợp lệ nào và sử dụng nó để tính toán bất cứ vấn đề nào miễn sao vấn đề đó mô tả được bằng những câu lệnh đơn giản. 

Chương trình và dữ liệu được lưu trong bộ nhớ. Program counter trỏ vào một vị trí cụ thể trong vùng nhớ và việc tính toán bắt đầu từ câu lệnh tại vị trí đó. Và thông thường nó sẽ thực hiện câu lệnh kế tiếp nhưng đôi khi dựa vào bộ test hiện thời nó có thể nhảy đến bất cứ câu lệnh nào trong dãy lệnh. Đó gọi là flow of control (điều khiển luồng). Nó cho phép chương trình thực hiện những tác vụ phức tạp. 

Với một tập cố định những tính năng ban đầu, một lập trình viên giỏi có thể tạo ra những chương trình hữu ích mà không bị giới hạn. Điều đó cho thấy lập trình là một cố gắng tuyệt vời. 

Để tạo ra những câu lệnh thì chúng ta cần ngôn ngữ lập trình. 

Năm 1936, Alan Turing đã mô tả một thiết bị điện toán giả định gọi là Universal Turing Machine (máy Turing). Máy có bộ nhớ không giới hạn ở dạng băng. Trên đó ta có thể viết 0 và 1 cùng với một vài lệnh cơ bản như đọc, di chuyển và viết lên băng. Luận đề Church-Turing phát biểu rằng nếu một hàm là khả tính, thì máy Turing có thể lập trình để tính được nó. 

Turing đã chỉ ra rằng không thể viết một chương trình với đầu vào là một chương trình khác tùy ý, gọi là P và in ra True nếu và chỉ nếu P chạy mãi mãi. Đó gọi là halting problem (bài toán dừng).

Luận đề Church-Turing dẫn đến một khái niệm gọi là Turing completeness. Một ngôn ngữ lập trình được cho là Turing complete nếu như nó có thể sử dụng để mô phỏng máy Turing. Và tất cả ngôn ngữ lập trình hiện đại đều là Turing complete. Kết quả là bất cứ thứ gì có thể lập trình bằng một ngôn ngữ lập trình này thì đều có thể lập trình bằng một ngôn ngữ lập trình khác. Tuy nhiên có một vài thứ sẽ dễ dàng lập trình hơn trong một vài ngôn ngữ lập trình cụ thể. Nhưng về cơ bản tất cả các ngôn ngữ lập trình đều tương đương về sức mạnh tính toán. 

Điều tốt nhất và cũng là điều tồi tệ nhất trong lập trình chính là: máy tính sẽ làm chính xác những gì bạn yêu cầu.

Không có ngôn ngữ lập trình nào là tốt nhất. Mỗi ngôn ngữ lập trình đều có ưu và nhược điểm. 

Mỗi ngôn ngữ lập trình đều có: các cấu trúc cơ sở, cú pháp, ngữ nghĩa và ngữ nghĩa tĩnh. 
 Cú pháp định nghĩa chuỗi các kí tự như thế nào là hợp lệ về mặt hình thức.
 Ngữ nghĩa tĩnh định nghĩa chuôi các kí tự (đúng cú pháp) như thế nào là hợp lệ về mặt ý nghĩa.
 Ngữ nghĩa liên kết một nghĩa với một chuôi các kí tự đúng cú pháp và không mắc lỗi ngữ nghĩa tĩnh. Trong ngôn ngữ tự nhiên, ngữ nghĩa của một câu có thể mơ hồ. Nhưng ngôn ngữ lập trình được thiết kế sao cho mỗi chương trình đều chỉ có duy nhất một nghĩa.  
 
Lỗi cú pháp là lỗi phổ biến nhất (đặc biệt đối với những ai học ngôn ngữ lập trình mới), nhưng nó lại là lỗi ít nguy hiểm nhất. Điều tồi tệ là khi chương trình thực thi khác với những gì mà người viết mong muốn,cụ thể là:
 Chương trình bị crash.
 Hoặc nó không dừng.
 Hoặc nó đưa ra kết quả không đúng.
 
 Mặc dù các ngôn ngữ lập trình là khác nhau, tuy nhiên cũng có một số khía cạnh chúng có thể liên quan:
 * Ngôn ngữ lập trình bậc thấp vs Ngôn ngữ lập trình bậc cao:
   * Bậc thấp: Người lập trình sử dụng các câu lệnh và đối tượng dữ liệu ở mức độ phần cứng (dịch 64 bit dữ liệu từ nơi này sang nơi khác).
   * Bậc cao: Người lập trình sử dụng những thao tác ở mức độ trừu tượng hơn (pop up một menu lên màn hình).
 * Ngôn ngữ lập trình phổ thông vs Ngôn ngữ lập trình chuyên môn hóa:
   * Ngôn ngữ lập trình phổ thông: Những chức năng cơ bản của ngôn ngữ lập trình có ứng dụng rộng rãi.
   * Ngôn ngữ lập trình chuyên môn hóa: Những chức năng cơ bản của ngôn ngữ lập trình tập trung vào một lĩnh vực.
 * Ngôn ngữ lập trình thông dịch vs Ngôn ngữ lập trình biên dịch:
   * Ngôn ngữ lập trình thông dịch: Mã nguồn được thực thi một cách trực tiếp bởi trình thông dịch. Dễ dàng gỡ lỗi hơn vì dựa thông báo lỗi có thể dễ dàng đối chiếu với mã nguồn.
   * Ngôn ngữ lập trình biên dịch: Mã nguồn được chuyển sang mã máy (bằng trình biên dịch) trước. Chạy nhanh hơn và dùng ít không gian bộ nhớ hơn.
   * Vào thời kì sơ khai của máy tính, người ta phải viết mã nguồn bằng một ngôn ngữ rất gần với mã máy và nó có thể thông dịch một cách trực tiếp bằng phần cứng.
   
   Chương trình bằng ngôn ngữ Python còn được gọi là script (kịch bản). Trình thông dịch của python còn được gọi là shell (vỏ).  Một lệnh (command) thường được gọi là một phát biểu hay tuyên bố (statement), trình thông dịch dựa vào nó để thực thi. Câu lệnh print("Nguyen Le Quang Duy") yêu cầu trình biên dịch gọi hàm print xuất ra màn hình dòng chữ Nguyen Le Quang Duy. Đối tượng (objects) là cốt lõi trong chương trình, mỗi đối tượng đều có kiểu dữ liệu (type). Kiểu dữ liệu bao gồm vô hướng (scalar) và có hướng (non-scalar). Kiểu vô hướng: None, int, float, bool. Kiểu có hướng: string, list,... 
   
   Đối tượng và toán tử (operators) kết hợp tạo nên biểu thức (expressions). Biến (variables) là sự liên kết đối tượng với một cái tên, hay nói cách khác biến chỉ là một cái tên được gán cho đối tượng. Câu lệnh gán liên kết một cái tên ở bên trái phép gán với một đối tượng (được mô tả bởi một biểu thức) ở bên phải phép gán. Một đối tượng có thể có nhiều tên hoặc không có tên nào. 
 
 **2. Branching and Iteration**
 
 **3. String Manipulation, Guess and Check, Approximations, Bisection**
 
 **4. Decomposition, Abstractions, Functions**
 
 **5. Tuples, Lists, Aliasing, Mutability, Cloning**
 
 **6. Recursion, Dictionaries**
 
 **7. Testing, Debugging, Exceptions, Assertions**
 
 **8. Object Oriented Programming**
 
 **9. Python Classes and Inheritance**
 
 **10. Understanding Program Efficiency, Part 1**
 
 **11. Understanding Program Efficiency, Part 1 (Cont.)**
 
 **12. Searching and Sorting algorithms**
 
 
